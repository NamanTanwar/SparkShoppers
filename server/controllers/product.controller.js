const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();
const Product = require("../models/Product");
const httpStatus = require("http-status");
const RatingAndReview = require("../models/RatingAndReview");
const categoryService = require("../services/category.service");
const productService = require("../services/product.service");
const { client } = require("../config/redisConfig");
const embeddingsService = require("../services/embeddings.service.js");
const mongoose = require("mongoose");
const { normalizeL2 } = require("../utils/embeddings");

const getBrowseUserData = async (req, res) => {
  try {
    const newArrivalsProducts = await productService.getNewProducts(6);
    const mostShoppedProducts = await productService.getMostShoppedProducts(6);
    const highestRatedProducts = await productService.getHighestRatedProducts(
      6
    );

    if (!newArrivalsProducts || !mostShoppedProducts || !highestRatedProducts) {
      throw new Error("Unable to fetch products properly");
    }
    res.status(httpStatus.OK).json({
      success: true,
      mesage: "Product fetched successfully",
      productData: {
        newArrivalsProducts,
        mostShoppedProducts,
        highestRatedProducts,
      },
    });
  } catch (err) {
    console.log("Error occured at getBrowseUser Data controller:", err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

const getNewProducts = async (req, res) => {
  try {
    const newProducts = await productService.getNewProducts();

    if (!newProducts || newProducts.length === 0) {
      res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: "No products found",
      });
    }

    res.status(httpStatus.OK).json({
      success: true,
      message: "New Arrivals fetched successfully",
      newProducts,
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

const createProduct = async (req, res) => {
  //session for transaction
  const session = await mongoose.startSession();

  //Starting transaction
  await session.startTransaction();

  try {
    const {
      name,
      description,
      category,
      superCategory,
      cost,
      quantity,
      brand,
      ...productOptions
    } = req.body;

    //newProduct created and textToEmbedd string
    const { newProduct, textToEmbbed } = await productService.createProduct(
      name,
      description,
      category,
      superCategory,
      cost,
      quantity,
      brand,
      req.files["images[]"]
    );

    if (!newProduct) {
      throw new Error("Error in creating product");
    }

    //creating productOptions
    const newProductOptions = await productService.createProductOptions(
      newProduct._id,
      productOptions
    );

    if (!newProductOptions) {
      throw new Error("Error in creating product Options");
    }

    //adding productOptions
    newProduct.productOptions = newProductOptions._id;
    //creating embeddings
    const embedding = await embeddingsService.createEmbeddings(textToEmbbed);
    //normalizing vector embedding
    const normalizedEmbedding = normalizeL2(embedding);
    //adding product embeddings to newProduct
    newProduct.productEmbedding = normalizedEmbedding;
    //Finally saving the newProduct to db
    await newProduct.save();

    res.status(httpStatus.CREATED).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });

    await session.commitTransaction();
  } catch (err) {
    await session.abortTransaction();

    let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    let errorMessage = "Internal Server Error";

    if (err.message === "Product Already exists") {
      (statusCode = httpStatus.CONFLICT), (errorMessage = err.message);
    }

    if (err.message === "Super Category does not exist") {
      (statusCode = httpStatus.NOT_FOUND), (errorMessage = err.message);
    }

    res.status(statusCode).json({
      success: false,
      error: err.message,
      message: errorMessage,
    });
  } finally {
    await session.endSession();
  }
};

const getProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { getRelatedProducts } = req.body;

    const { product, relatedProducts } = await productService.getProduct(
      productId,
      getRelatedProducts
    );

    if (!product) {
      throw new Error("Product not found");
    }

    res.status(httpStatus.OK).json({
      success: true,
      message: "Product fetched successfully",
      product: product,
      relatedProducts: relatedProducts,
    });
  } catch (err) {
    console.log("Error in getProduct controller:", err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

const searchProduct = async (req, res) => {
  try {
    //Extracting query params from request
    let { q, brands, categories, price_start, price_end, filter_option } =
      req.query;
    //Extracting pagination parameters
    const { skip, limit, page } = req.pagination;
    if (typeof brands === "string") brands = brands.split(",");
    if (typeof categories === "string") categories = categories.split(",");
    let priceRange = {};
    if (price_start !== "-Infinity" && price_end !== "Infinity") {
      priceRange.start = Number(price_start);
      priceRange.end = Number(price_end);
    }
    //Calling service for product search
    const {
      finalResult,
      totalProductDocuments,
      hasNextPage,
      nextPage,
      brandsResult,
      categoriesResult,
      minPrice,
      maxPrice,
      productOptions = null,
    } = await productService.searchProduct(
      skip,
      parseInt(limit),
      q,
      page,
      categories,
      brands,
      priceRange,
      filter_option
    );

    let priceRanges = [];
    if (minPrice && maxPrice) {
      const interval = (maxPrice - minPrice) / 4;
      for (let i = 0; i < 4; i++) {
        const start = minPrice + i * interval;
        const end = i === 3 ? maxPrice : start + interval;
        priceRanges.push({ start, end });
      }
    }

    if (!finalResult || totalProductDocuments == 0)
      throw new Error("No Products Found");

    res.status(httpStatus.OK).json({
      success: true,
      message: "Products fetched successfully",
      products: finalResult,
      brands: brandsResult,
      categories: categoriesResult,
      priceRanges: priceRanges,
      totalPages: Math.ceil(totalProductDocuments / limit),
      hasNextPage,
      nextPage,
    });
  } catch (err) {
    console.log("Error in searchProduct controller: ", err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

const filterByRating = async (req, res) => {
  try {
    const { rating } = req.query;

    const ratings = await RatingAndReview.find({
      rating: { $gte: rating },
    }).populate("product");

    if (!ratings) {
      return res.status(httpResponse.NOT_FOUND).json({
        success: false,
        message: "No products exist for the specified rating",
      });
    }

    let products = [];

    for (let i = 0; i < ratings.length; i++) {
      products.push(ratings[i].product);
    }

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: true,
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

const addImage = async (req, res) => {
  try {
    const { productId } = req.body;
    const { productImage } = req.files;

    const image = await uploadImageToCloudinary(
      productImage,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    if (!image) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: "Error in creating the product",
      });
    }

    const updatedProduct = await productService.addImageToProduct(
      productId,
      image.secure_url
    );

    res.status(httpStatus.OK).json({
      success: true,
      message: "Image added successfully",
      data: updatedProduct,
    });
  } catch (err) {
    console.log("Error in product controller", err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    //update product logic

    //invalidate cache
    const prodId = productId.toString();
    client.del(`product:${prodId}`);
    res.status(httpStatus.OK).json({
      success: true,
      message: "Product deleted Successfully",
    });
  } catch (err) {
    console.log("Error in product delete controller:", err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

const testEmbedding = async (req, res) => {
  const { text } = req.body;
  try {
    const embedding = await embeddingsService.createEmbeddings(text);
    return res.status(200).json({
      success: true,
      messageL: "Embedding created successfully",
      embedding,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: err.message,
      message: "Interal Server Error",
    });
  }
};

module.exports = {
  createProduct,
  getProduct,
  searchProduct,
  filterByRating,
  addImage,
  deleteProduct,
  testEmbedding,
  getNewProducts,
  getBrowseUserData,
};
