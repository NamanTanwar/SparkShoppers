const { options } = require("joi");
const Category = require("../models/Category");
const SuperCategory = require("../models/SuperCategory");
const mongoose = require("mongoose");
const Product = require("../models/Product");

const getCategoryProducts = async (categoryName) => {
  let categoryProducts = [];

  const category = await Category.findOne({ name: categoryName }).populate(
    "products"
  );

  if (!category) {
    throw new Error("Category does not exist");
  }

  categoryProducts = category.products;

  return categoryProducts;
};

const getAllCategories = async () => {
  const categories = await Category.find({});

  if (!categories) {
    throw new Error("No categories found");
  }

  return categories;
};

const findCategory = async (category) => {
  const isCategory = await Category.findOne({ name: category });

  return isCategory;
};

const createCategory = async (category, products) => {
  const newCategory = await Category.create({
    name: category,
    products: products,
  });

  return newCategory;
};

const getAllSuperCategories = async () => {
  //Fetching all super categories
  const superCategories = await SuperCategory.find({});
  //validating fetched data
  if (!superCategories) {
    throw new Error("No super categories found");
  }
  //return result
  return superCategories;
};

const createSuperCategory = async (superCategoryName) => {
  const superCategory = await SuperCategory.create({
    name: superCategoryName,
    products: [],
    categories: [],
  });

  if (!superCategory) {
    throw new Error("Error in creating superCategory");
  }

  return superCategory;
};

const getSuperCategoryDataByName = async (
  superCategoryName,
  skip,
  limit,
  option,
  categoriesFilter = [],
  brandsFilter = [],
  priceFilter = { start: -Infinity, end: Infinity }
) => {
  // Fetch the super category data by name and populate the products with category info
  const superCategoryData = await SuperCategory.findOne({
    name: superCategoryName,
  }).populate({
    path: "products",
    populate: {
      path: "category",
      select: "name",
    },
    select: "brand cost category",
  });
  // Initialize arrays and variables for categories, brands, min and max price
  let categories = [];
  let brands = [];
  let minPrice = Infinity;
  let maxPrice = -Infinity;
  // Get the products from the super category data
  const superCategoryProducts = superCategoryData.products;
  //calculating up the categories brands and min,maxPrice
  for (let i = 0; i < superCategoryProducts.length; i++) {
    categories.push(superCategoryProducts[i].category);
    brands.push(superCategoryProducts[i].brand);
    minPrice = Math.min(superCategoryProducts[i].cost, minPrice);
    maxPrice = Math.max(superCategoryProducts[i].cost, maxPrice);
  }

  let data = null;
  //prepare the base query with filters
  let productMatch = {};

  if (priceFilter.start !== null && priceFilter.end !== null) {
    productMatch = {
      //price range filter
      cost: { $gte: priceFilter.start, $lte: priceFilter.end },
    };
  }

  if (categoriesFilter.length > 0) {
    //categories filter
    productMatch.category = { $in: categoriesFilter };
  }

  if (brandsFilter.length > 0) {
    //brands filter
    productMatch.brand = { $in: brandsFilter };
  }

  switch (option) {
    case "recomended":
      data = await SuperCategory.findOne({ name: superCategoryName }) //skip(skip).limit(limit).
        .populate({
          path: "products",
          match: productMatch,
          select: "_id name brand cost images ratingAndReviews",
          options: {
            skip: skip,
            limit: limit,
          },
        })
        .populate({
          path: "categories",
          select: "name",
        });
      break;
    case "newest":
      data = await SuperCategory.findOne({ name: superCategoryName }) //skip(skip).limit(limit).
        .populate({
          path: "products",
          match: productMatch,
          select: "_id name brand cost images ratingAndReviews createdAt",
          options: {
            sort: { createdAt: -1 },
            skip: skip,
            limit: limit,
          },
        })
        .populate({
          path: "categories",
          select: "name",
        });
      break;
    case "price:lowtohigh":
      data = await SuperCategory.findOne({ name: superCategoryName }) //skip(skip).limit(limit).
        .populate({
          path: "products",
          match: productMatch,
          select: "_id name brand cost images ratingAndReviews createdAt",
          options: {
            sort: { cost: 1 },
            skip: skip,
            limit: limit,
          },
        })
        .populate({
          path: "categories",
          select: "name",
        });
      break;
    case "price:hightolow":
      data = await SuperCategory.findOne({ name: superCategoryName }) //skip(skip).limit(limit).
        .populate({
          path: "products",
          match: productMatch,
          select: "_id name brand cost images ratingAndReviews createdAt",
          options: {
            sort: { cost: -1 },
            skip: skip,
            limit: limit,
          },
        })
        .populate({
          path: "categories",
          select: "name",
        });
      break;
    case "popularity":
      data = await SuperCategory.aggregate([
        { $match: { name: superCategoryName } },
        {
          $lookup: {
            from: "products",
            localField: "products",
            foreignField: "_id",
            as: "products",
          },
        },
        { $unwind: "$products" },
        {
          $lookup: {
            from: "categories",
            localField: "categories",
            foreignField: "_id",
            as: "categories",
          },
        },
        {
          $addFields: {
            "products.ratingAndReviewsLength": {
              $size: "$products.ratingAndReviews",
            },
          },
        },
        { $match: productMatch },
        {
          $sort: {
            "products.ratingAndReviewsLength": -1,
          },
        },
        { $skip: skip },
        { $limit: limit },
        {
          $group: {
            _id: "$_id",
            products: { $push: "$products" },
            categories: { $first: "$categories" },
            name: { $first: "$name" },
          },
        },
        {
          $project: {
            "products._id": 1,
            "products.name": 1,
            "products.brand": 1,
            "products.cost": 1,
            "products.images": 1,
            "products.ratingAndReviews": 1,
            "products.createdAt": 1,
            categories: 1,
            name: 1,
          },
        },
      ]);
      break;
    case "customerRating":
      data = await SuperCategory.aggregate([
        { $match: { name: superCategoryName } },
        {
          $lookup: {
            from: "products", // The name of the product collection
            localField: "products",
            foreignField: "_id",
            as: "products",
          },
        },
        {
          $lookup: {
            from: "categories", // The name of the category collection
            localField: "categories",
            foreignField: "_id",
            as: "categories",
          },
        },
        {
          $unwind: "$products",
        },
        {
          $match: productMatch,
        },
        {
          $lookup: {
            from: "ratingandreviews", // The name of the ratingAndReview collection
            localField: "products.ratingAndReviews",
            foreignField: "_id",
            as: "ratingAndReviews",
          },
        },
        {
          $addFields: {
            "products.avgRating": {
              $avg: "$ratingAndReviews.rating",
            },
          },
        },
        {
          $sort: {
            "products.avgRating": -1, // Sort by avgRating in descending order
          },
        },
        { $skip: skip },
        { $limit: limit },
        {
          $group: {
            _id: "$_id",
            products: { $push: "$products" },
            categories: { $first: "$categories" },
            name: { $first: "$name" },
          },
        },
        {
          $project: {
            "products._id": 1,
            "products.name": 1,
            "products.brand": 1,
            "products.cost": 1,
            "products.images": 1,
            "products.avgRating": 1,
            "products.createdAt": 1,
            categories: 1,
            name: 1,
          },
        },
      ]);
      break;
  }

  if (!data) {
    throw new Error("Error in fetching superCategoryData");
  }

  let products = data.products ? data.products : data[0].products;

  let hasNextPage = true;
  if (products.length < limit) hasNextPage = false;

  return {
    products: products,
    categories: categories,
    brands: brands,
    minPrice: minPrice,
    maxPrice: maxPrice,
    hasNextPage: hasNextPage,
  };
};

const getSuperCategoryCategoryData = async (
  categoryId,
  superCategoryName,
  skip,
  limit
) => {
  try {
    // Fetch the super category to get relevant categories and products
    const superCategory = await SuperCategory.findOne({
      name: superCategoryName,
    }).populate({ path: "categories", select: "_id name" });

    if (!superCategory) {
      throw new Error("SuperCategory not found");
    }

    // Get all category names within the super category
    const categories = superCategory.categories.map((category) => ({
      _id: category._id,
      name: category.name,
    }));
    // Base query for filtering products
    const baseQuery = {
      category: new mongoose.Types.ObjectId(categoryId),
      superCategory: new mongoose.Types.ObjectId(superCategory._id),
    };

    // Fetch all matching products to calculate min and max prices
    const allMatchingProducts = await Product.find(baseQuery).select("cost");

    // Calculate min and max price of the filtered products
    const prices = allMatchingProducts.map((product) => product.cost);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    // Fetch total number of products matching the criteria
    const totalProducts = allMatchingProducts.length;

    // Fetch products with pagination and select specific fields
    const products = await Product.find(baseQuery)
      .select("_id name brand cost images ratingAndReviews createdAt")
      .skip(skip)
      .limit(limit);

    // Extract brand objects from the filtered products
    const brands = [];
    const brandSet = new Set();

    products.forEach((product) => {
      if (!brandSet.has(product.brand)) {
        brandSet.add(product.brand);
        brands.push({ _id: product._id, brand: product.brand });
      }
    });

    return { products, brands, categories, minPrice, maxPrice, totalProducts };
  } catch (error) {
    console.error("Error fetching super category data:", error);
    throw error;
  }
};

//products,brands,categories,minPrice,maxPrice
const getSuperCategoryBrandData = async (
  superCategoryName,
  brandName,
  limit,
  skip
) => {
  try {
    //get all brand names on the basis of superCategoryName
    const superCategoryData = await SuperCategory.findOne({
      name: superCategoryName,
    }).populate({ path: "products", select: "_id brand" });
    //brand
    const products = await Product.find({
      superCategory: superCategoryData._id,
      brand: brandName,
    })
      .select("_id name brand cost images ratingAndReviews createdAt category")
      .populate("category");

    //calculating minPrice and maxPrice:
    const prices = products.map((product) => product.cost);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    //categories
    const categories = products.map((product) => {
      return {
        _id: product.category._id,
        name: product.category.name,
      };
    });
    const finalProducts = await Product.find({
      superCategory: superCategoryData._id,
      brand: brandName,
    })
      .select("_id name brand cost images ratingAndReviews createdAt category")
      .populate("category")
      .skip(skip)
      .limit(limit);

    return {
      products: finalProducts,
      brands: superCategoryData.products,
      categories: categories,
      minPrice: minPrice,
      maxPrice: maxPrice,
    };
  } catch (err) {
    console.log("Error in fetching super category brand data:", err);
    throw err;
  }
};

module.exports = {
  getCategoryProducts,
  getAllCategories,
  findCategory,
  createCategory,
  getAllSuperCategories,
  createSuperCategory,
  getSuperCategoryDataByName,
  getSuperCategoryCategoryData,
  getSuperCategoryBrandData,
};
