const httpStatus = require("http-status");
const wishlistService = require("../services/wishlist.service");
const tokenService = require("../services/token.service");

const addToWishlist = async (req, res) => {
  try {
    //Fetching userId and productId from request
    const { productId } = req.body;
    const userToken = req.headers.authorization.split(" ")[1];
    const userId = await tokenService.extractUserIdFromToken(userToken);
    const newWishlist = await wishlistService.addToWishlist(userId, productId);

    //Successfull response
    res.status(httpStatus.OK).json({
      success: true,
      message: "Product added to wishlist",
      updatedWishlist: newWishlist.products,
    });
  } catch (err) {
    let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    let errorMessage = "Internal Server Error";

    if (err.message === "User wishlist does not exist") {
      statusCode = httpStatus.BAD_REQUEST;
      errorMessage = err.message;
    }

    console.log("Error in wishlist controller:", err);
    res.status(statusCode).json({
      success: false,
      error: err.message,
      message: errorMessage,
    });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    //Extracting productId and
    //userToken from req
    const { productId } = req.body;
    const userToken = req.headers.authorization.split(" ")[1];
    //extracting userId from token
    const userId = await tokenService.extractUserIdFromToken(userToken);
    //Validating userId
    if (!userId) {
      throw new Error("User not authenticated");
    }
    //Removing product from wishlist
    const updatedWishlist = await wishlistService.removeFromWishlist(
      userId,
      productId
    );
    //Successfull response
    res.status(httpStatus.OK).json({
      success: true,
      message: "Item removed from wishlist successfully",
      data: updatedWishlist,
    });
  } catch (err) {
    console.log("Error in wishlist controller:", err);
    let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    let errorMessage = "Internal Server Error";

    if (err.message === "User wishlist not found" || "User not authenticated") {
      (statusCode = httpStatus.BAD_REQUEST), (errorMessage = err.message);
    }

    res.status(statusCode).json({
      success: false,
      error: err.message,
      message: errorMessage,
    });
  }
};

const getUserWishlist = async (req, res) => {
  try {
    //Extracting userToken from req
    const { userId } = req.params;
    //fetching all products in wishlist
    const products = await wishlistService.getAllItems(userId);

    res.status(httpStatus.OK).json({
      success: true,
      message: "Wishlist items fetched successfully",
      data: products,
    });
  } catch (err) {
    console.log(err);
    let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    let errorMessage = "Internal Server Error";

    if (err.message === "User Wishlist not found") {
      statusCode = httpStatus.BAD_REQUEST;
      errorMessage = err.message;
    }

    res.status(statusCode).json({
      success: false,
      error: err.message,
      message: errorMessage,
    });
  }
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
  getUserWishlist,
};
