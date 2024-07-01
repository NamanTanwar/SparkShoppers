const Product = require("../models/Product");
const SuperCategory = require("../models/SuperCategory");
const Category = require("../models/Category");
const mongoose = require("mongoose");
const ProductOptions = require("../models/ProductOptions");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const embeddingsService = require("./embeddings.service");
const { normalizeL2 } = require("../utils/embeddings");
const { reciprocalRankFusion, meanFilter } = require("../utils/ranking");
const { client } = require("../config/redisConfig");
const Order = require("../models/Order");
const RatingAndReview = require("../models/RatingAndReview");

const avgRating = (arr) => {
  if (arr.length === 0) return 0;
};

const getHighestRatedProducts = async (limitOption = 8) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: "$product",
          averageRating: { $avg: "$rating" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { averageRating: -1 },
      },
      {
        $lookup: {
          from: "products", // The name of the collection containing the product details
          localField: "_id",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails",
      },
      {
        $project: {
          _id: 0,
          product: "$productDetails",
          averageRating: 1,
          count: 1,
        },
      },
    ];

    const products = await RatingAndReview.aggregate(pipeline);
    return products.map((product, idx) => product.product);
  } catch (err) {
    console.log("Error occured in getHighestRatedProducts:", err);
    throw err;
  }
};

const getMostShoppedProducts = async (limitOption = 8) => {
  try {
    const products = await Order.find({})
      .sort({ "products.quantity": -1 })
      .populate({
        path: "products.product",
        select: "_id images name brand cost ratingAndReviews",
      })
      .select("products.product")
      .limit(limitOption);

    const allProducts = products
      .flatMap((shop) => shop.products)
      .map((product, idx) => product.product);
    return allProducts;
  } catch (err) {
    console.log("Error occured in getMostShoppedProducts service:", err);
    throw err;
  }
};

const getNewProducts = async (limitOption = 8) => {
  try {
    //Fetching products on the basis of createdAt field and
    //a limit option
    const newProducts = await Product.find({})
      .sort({ createdAt: -1 })
      .limit(limitOption)
      .populate({
        path: "ratingAndReviews",
        select: "_id rating reviews",
      })
      .select("_id images name brand cost ratingAndReviews");
    return newProducts;
  } catch (err) {
    console.log("error occured at getNewProducts service:", err);
    throw err;
  }
};

const createProduct = async (
  productName,
  productDescription,
  productCategory,
  productSuperCategory,
  productCost,
  productQuantity,
  productBrand,
  productImages
) => {
  //Store images secure_urls
  let imagesSecureUrls = [];
  //Store categoryId
  let categoryId;
  //Store new Category
  let newCategory;
  //Check if superCategory exists
  const sCategory = await SuperCategory.findById(
    new mongoose.Types.ObjectId(productSuperCategory)
  );

  if (!sCategory) {
    throw new Error("Super Category does not exist");
  }

  //Check if already a product exists with same name and same category
  const category = await Category.findOne({ name: productCategory });
  if (category) {
    const findProduct = await Product.findOne({
      name: productName,
    });

    if (findProduct) {
      throw new Error("Product Already exists");
    }
    categoryId = category._id;
  } else {
    //creating new Category
    newCategory = await Category.create({
      name: productCategory,
      products: [],
    });
    categoryId = newCategory._id;
  }

  //Uploading images to cloudinary
  for (let i = 0; i < productImages.length; i++) {
    const image = await uploadImageToCloudinary(
      productImages[i],
      process.env.FOLDER_NAME,
      500,
      500
    );
    if (!image) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: "Error in creating the product",
      });
    }

    imagesSecureUrls.push(image.secure_url);
  }

  const newProduct = await Product.create({
    name: productName,
    description: productDescription,
    category: categoryId,
    superCategory: productSuperCategory,
    cost: productCost,
    quantity: productQuantity,
    brand: productBrand,
    ratingAndReviews: [],
    images: imagesSecureUrls,
    superCategory: sCategory._id,
  });

  const textToEmbbed = `${productName} ${productDescription} ${productBrand} ${productCategory} ${sCategory.name}`;

  if (!newProduct) {
    throw new Error("Error in creating product");
  }

  sCategory.products.push(newProduct._id);
  sCategory.categories.push(categoryId);
  if (category) {
    category.products.push(newProduct._id);
    category.save();
  } else {
    newCategory.products.push(newProduct._id);
    newCategory.save();
  }

  sCategory.save();

  return { newProduct, textToEmbbed };
};

const addImageToProduct = async (productId, image) => {
  const product = await Product.findByIdAndUpdate(
    productId,
    {
      $push: {
        images: image,
      },
    },
    {
      new: true,
    }
  );

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
};

const getProduct = async (productId, getRelatedProducts) => {
  const relatedDataCacheKey = `relatedProducts:${productId}`;
  const cacheKey = `product:${productId}`;

  let relatedProducts;

  const product = await Product.findById(productId)
    .populate("category")
    .populate("ratingAndReviews")
    .populate("superCategory")
    .populate("productOptions")
    .select("-productEmbedding");

  if (!product) {
    throw new Error("Product not found");
  }

  if (getRelatedProducts) {
    const superCategoryId = product.superCategory._id;
    relatedProducts = await Product.find(
      {
        superCategory: new mongoose.Types.ObjectId(superCategoryId),
        _id: { $ne: new mongoose.Types.ObjectId(productId) },
      },
      "name brand price images ratingAndReviews",
      { limit: 10 }
    ).populate("ratingAndReviews");
  }

  const relatedProductData = JSON.stringify(relatedProducts);
  const productData = JSON.stringify(product);

  let cacheResult;

  if (relatedProducts) {
    cacheResult = await Promise.all([
      await client.hSet(relatedDataCacheKey, "data", relatedProductData),
      await client.hSet(cacheKey, "data", productData),
    ]);
  } else {
    cacheResult = await client.hSet(cacheKey, "data", productData);
  }

  return { product, relatedProducts };
};

const filterProducts = async (filteringConditions) => {
  const products = await Product.find(filteringConditions);

  return products;
};

const createProductOptions = async (productId, productOptions) => {
  //Constructing options object to save
  const entries = Object.entries(productOptions);
  const optionsToSave = [];
  for (const [key, value] of entries) {
    let newKey = key.endsWith("[]") ? key.slice(0, -2) : key;
    const newValue = Array.isArray(value) ? value : [value];
    optionsToSave.push({
      name: newKey,
      values: newValue,
    });
  }

  try {
    const newProductOptions = await ProductOptions.create({
      product: productId,
      options: optionsToSave,
    });

    if (!newProductOptions) {
      throw new Error("Failed to add product options");
    }

    return newProductOptions;
  } catch (err) {
    console.log("Error in create product options service", err);
    throw err;
  }
};

const searchProduct = async (
  skip,
  limit,
  userQuery,
  page,
  categories = null,
  brands = null,
  priceRange = null,
  filter_option = "",
  availability = null
) => {
  //Converting user query to embedding
  const embeddedUserQuery = await embeddingsService.createEmbeddings(userQuery);
  //Normalizing the embedding
  const normalizedEmbedding = normalizeL2(embeddedUserQuery);

  let initialFilterPipeline = [];

  if (categories) {
    //pushing category filter to pipeline
    for (let i = 0; i < categories.length; i++) {
      categories[i] = new mongoose.Types.ObjectId(categories[i]);
    }
    initialFilterPipeline.push({ $match: { category: { $in: categories } } });
  }

  if (brands) {
    //pushing brand filter to pipeline
    initialFilterPipeline.push({ $match: { brand: { $in: brands } } });
  }

  if (priceRange && Object.keys(priceRange).length > 0) {
    //pushing price filter to pipeline
    if (priceRange.start !== null && priceRange.end !== null) {
      initialFilterPipeline.push({
        $match: { cost: { $gte: priceRange.start, $lte: priceRange.end } },
      });
    } else if (priceRange.start !== null) {
      initialFilterPipeline.push({
        $match: { cost: { $gte: priceRange.start } },
      });
    } else if (priceRange.end !== null) {
      initialFilterPipeline.push({
        $match: { cost: { $lte: priceRange.end } },
      });
    }
  }

  if (availability) {
    //pushing availability filter to pipeline
    initialFilterPipeline.push({ $match: { quantity: { $gte: 1 } } });
  }
  //let outer join with category
  //and storing as categoryDetails
  const lookupCategoryStage = {
    $lookup: {
      from: "categories",
      localField: "category",
      foreignField: "_id",
      as: "categoryDetails",
    },
  };
  //unwinding the array field and creating
  //a separate document for each of the array entry
  const unwindCategoryStage = {
    $unwind: "$categoryDetails",
  };

  //adding a new field category for each document
  const addFieldsCategoryStage = {
    $addFields: {
      category: {
        _id: "$categoryDetails._id",
        name: "$categoryDetails.name",
      },
    },
  };

  //left outer join with ratingAndReviews stage
  //and storing as ratingAndReviewsDetails
  const lookupRatingAndReviewsStage = {
    $lookup: {
      from: "ratingAndReviews",
      localField: "_id",
      foreignField: "product",
      as: "ratingAndReviewsDetails",
    },
  };

  //create separate doc for each unique value of ratingAndReviewsDetails
  const unwindRatingAndReviewsStage = {
    $unwind: {
      path: "$ratingAndReviewsDetails",
      preserveNullAndEmptyArrays: true,
    },
  };

  //adding a field ratingAndReviews to each document
  //with a ratingAndReviews
  const addFieldsRatingAndReviewsStage = {
    $addFields: {
      ratingAndReviews: {
        $ifNull: ["$ratingAndReviewsDetails", []],
      },
    },
  };

  //creating text search pipeline
  //uses mongodb inverted index search
  const textSearchPipeline = [
    {
      $search: {
        index: "searchProducts",
        text: {
          query: userQuery,
          path: [
            "name",
            "description",
            "brand",
            "category",
            "superCategory",
            "ratingAndReviews",
          ],
        },
      },
    },
    lookupCategoryStage, //left join with category model and creating a categoryDetails field
    unwindCategoryStage, //creating separate documents for each unique entry in categoryDetails
    addFieldsCategoryStage, //adding field category to each document
    lookupRatingAndReviewsStage, //left join with ratingAndReview model and creating a ratingAndReviews field
    unwindRatingAndReviewsStage, //creating separate documents for each unique entry in ratingAndReviews
    addFieldsRatingAndReviewsStage, //adding field ratingAndReviews to each document
    {
      $project: {
        _id: 1,
        name: 1,
        brand: 1,
        cost: 1,
        images: 1,
        ratingAndReviews: 1,
        category: 1,
        score: { $meta: "searchScore" }, //search score associated to each result
      },
    },
    { $sort: { score: -1 } }, //sort via score in desc order->higher score ones first
  ];

  //Building pipeline to perform schemantic search
  //for products
  const schematicSearchPipeline = [
    {
      //Using mongodb atlas vector search
      $vectorSearch: {
        index: "vector_index",
        path: "productEmbedding",
        queryVector: normalizedEmbedding,
        numCandidates: 100,
        limit: 100,
      },
    },
    lookupCategoryStage, //left join with category model and creating a categoryDetails field
    unwindCategoryStage, //creating separate documents for each unique entry in categoryDetails
    addFieldsCategoryStage, //adding field category to each document
    lookupRatingAndReviewsStage, //left join with ratingAndReview model and creating a ratingAndReviews field
    unwindRatingAndReviewsStage, //creating separate documents for each unique entry in ratingAndReviews
    addFieldsRatingAndReviewsStage, //adding field ratingAndReviews to each document
    {
      $project: {
        _id: 1,
        name: 1,
        brand: 1,
        cost: 1,
        images: 1,
        ratingAndReviews: 1,
        category: 1,
        score: { $meta: "vectorSearchScore" }, //vector search score for each document
      },
    },
    { $sort: { score: -1 } }, //sort by score in descending order
  ];

  try {
    //text search results
    const productsFromTextSearch = await Product.aggregate(textSearchPipeline);
    //schematic search results
    const productsFromSchematicSearch = await Product.aggregate(
      schematicSearchPipeline
    );
    //updating the score
    let updatedProductsFromSchematicSearch = productsFromSchematicSearch.map(
      (product) => ({
        ...product,
        score: product.score + 1,
      })
    );
    //applying rff algo to get the most relevent results according to ranking
    const finalResult = reciprocalRankFusion(
      productsFromTextSearch,
      updatedProductsFromSchematicSearch
    );
    //applying mean filter to filter out potential irrelevent results
    let filteredResults = meanFilter(finalResult);
    //Extrating brands, categories and prices from the resultant products
    const brands = Array.from(
      new Set(filteredResults.map((product) => product.product.product.brand))
    );
    const categories = Array.from(
      new Set(
        filteredResults.map((product) => product.product.product.category)
      )
    );
    const prices = filteredResults.map(
      (product) => product.product.product.cost
    );
    //calculating min and max prices
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    //This means results have to be filtered according to the user inputs
    if (initialFilterPipeline.length > 0) {
      //extracting resultant product ids
      const releventProdIds = filteredResults.map(
        (product) => product.product.product._id
      );

      //Constructing the final output pipeline
      const finalPipeline = [
        {
          $match: { _id: { $in: releventProdIds } },
        },
        ...initialFilterPipeline,
        lookupCategoryStage,
        unwindCategoryStage,
        addFieldsCategoryStage,
        lookupRatingAndReviewsStage,
        unwindRatingAndReviewsStage,
        addFieldsRatingAndReviewsStage,
        {
          $addFields: {
            product: {
              _id: "$_id",
              name: "$name",
              brand: "$brand",
              cost: "$cost",
              images: "$images",
              ratingAndReviews: "$ratingAndReviews",
              category: "$category",
              product: {
                _id: "$_id",
                name: "$name",
                brand: "$brand",
                cost: "$cost",
                images: "$images",
                ratingAndReviews: "$ratingAndReviews",
                category: "$category",
              },
            },
          },
        },
        {
          $project: {
            _id: 1,
            product: 1,
          },
        },
      ];

      filteredResults = await Product.aggregate(finalPipeline);
    }
    //calculating total products length
    const totalProductDocuments = finalResult.length;

    if (filter_option) {
      //Price: Low to High
      if (filter_option === "Price: Low to High") {
        filteredResults.sort(
          (a, b) => a.product.product.cost - b.product.product.cost
        );
      }
      //Price: High to low
      else if (filter_option === "Popularity High to Low") {
        filteredResults.sort(
          (a, b) => -(a.product.product.cost - b.product.product.cost)
        );
        //Customer Rating
      } else if (filter_option === "Customer Rating") {
        filteredResults.sort(
          (a, b) =>
            -(
              avgRating(a.product.product.ratingAndReviews) -
              avgRating(b.product.product.ratingAndReviews)
            )
        );
        //Popularity
      } else if (filter_option === "Popularity") {
        filteredResults.sort(
          (a, b) =>
            -(
              a.product.product.ratingAndReviews.length -
              b.product.product.ratingAndReviews.length
            )
        );
      }
    }
    //Paginating results and calculating hasNextPage
    const paginatedResults = filteredResults.slice(skip, skip + limit);
    const hasNextPage = filteredResults.length > paginatedResults.length;

    return {
      finalResult: paginatedResults,
      brandsResult: brands,
      categoriesResult: categories,
      minPrice: minPrice,
      maxPrice: maxPrice,
      totalProductDocuments,
      hasNextPage,
      nextPage: hasNextPage ? page + 1 : null,
    };
  } catch (err) {
    console.log("Error in product service:", err);
    throw err;
  }
};

module.exports = {
  createProduct,
  addImageToProduct,
  getProduct,
  filterProducts,
  createProductOptions,
  searchProduct,
  getNewProducts,
  getMostShoppedProducts,
  getHighestRatedProducts,
};
