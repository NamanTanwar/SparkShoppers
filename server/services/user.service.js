const User = require("../models/User");
const ApiError = require("../utils/ApiError");
const bcrypt = require("bcrypt");
const Cart = require("../models/Cart");
const Wishlist = require("../models/Wishlist");
const httpStatus = require("http-status");
const Order = require("../models/Order");
const RatingAndReview = require("../models/RatingAndReview");
const Product = require("../models/Product");
const { client } = require("../config/redisConfig");
const ContactUs = require("../models/ContactUs");

const submitContactUsForm = async (formData) => {
  try {
    const submitForm = await ContactUs.create({
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      address: formData.address,
      message: formData.message,
    });

    return submitForm;
  } catch (err) {
    console.log("Error occured:", err);
    throw err;
  }
};

const createUser = async (body) => {
  try {
    //Check if user email already taken
    if (await User.isEmailTaken(body.email))
      throw new Error("Email already taken");

    //Hashing user password
    const hashedPassword = await bcrypt.hash(body.password, 10);

    //Creating new user in database
    const newUser = await User.create({ ...body, password: hashedPassword });

    return newUser;
  } catch (err) {
    console.log("Error occured in user.service.js:", err);
  }
};

const updateUserPassword = async (userEmail, userPassword) => {
  try {
    //hashing passowrd
    const hashedPassword = await bcrypt.hash(userPassword, 10);
    //updating user password
    const user = await User.updateOne(
      { email: userEmail },
      { password: hashedPassword },
      { new: true }
    );
    return user;
  } catch (err) {
    console.log("error occured at updateUserPassword service:", err);
    throw err;
  }
};

//Finding the user by email in database
const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (err) {
    console.log("Error in getUserByEmail:", err);
  }
};

const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (err) {
    console.log("Error in getUserById", err);
  }
};

const setAddress = async (user, address) => {
  const updatedUser = await User.findByIdAndUpdate(
    { _id: user._id },
    { $set: { address: address } },
    { new: true }
  );

  return updatedUser.address;
};

const createCartForUser = async (userId) => {
  try {
    const userCart = await Cart.create({
      user: userId,
      products: [],
    });

    return userCart;
  } catch (err) {
    console.log("Error in user service:", err);
  }
};

const createWishlistForUser = async (userId) => {
  try {
    const userWishlist = await Wishlist.create({
      user: userId,
      products: [],
    });
    return userWishlist;
  } catch (err) {
    console.log("Error in user Service:", err);
  }
};

const deleteCartForUser = async (userId) => {
  const deletedCart = await Cart.findOneAndDelete({
    user: userId,
  });

  return deletedCart;
};

const deleteWishlistForUser = async (userId) => {
  const deletedWishlist = await Wishlist.findOneAndDelete({
    user: userId,
  });

  return deletedWishlist;
};

const deleteUser = async (userId) => {
  const deletedUser = await User.findByIdAndDelete(userId);
  return deletedUser;
};

const updateAddress = async (formData, userId) => {
  try {
    const user = await User.findById(userId);
    if (user) {
      user.address = JSON.stringify(formData);
      return user;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
};

const getOrderHistory = async (userId) => {
  try {
    const orderDetails = await Order.find({ user: userId }).populate({
      path: "products.product",
      select: "name",
    });

    return orderDetails;
  } catch (err) {
    console.log("error occured in getOrderHistory:", err);
    throw err;
  }
};

const addRatingAndReview = async (userId, rating, review, productId) => {
  try {
    //trimming review
    review = review.trim();
    //cache keys to invalidate products
    const relatedDataCacheKey = `relatedProducts:${productId}`;
    const cacheKey = `product:${productId}`;

    const userReview = await RatingAndReview.findOne({
      user: userId,
      product: productId,
    });
    //only allow to review once
    if (userReview) {
      throw new Error("Product already reviewed");
    }

    const ratingAndReview = await RatingAndReview.create({
      user: userId,
      rating: rating,
      product: productId,
      review: review,
    });

    const product = await Product.findById(productId);

    product.ratingAndReviews.push(ratingAndReview._id);

    product.save();
    //Invalidating cache as the reviews for product has been updated
    cacheDeletionResult = await Promise.all([
      await client.del(relatedDataCacheKey),
      await client.del(cacheKey),
    ]);

    return ratingAndReview;
  } catch (err) {
    console.log("Error occured in ratingAndReview service:", err);
    throw err;
  }
};

const getUserReviews = async (userId) => {
  try {
    const reviews = await RatingAndReview.find({ user: userId }).populate({
      path: "product",
      select: "name brand",
    });
    return reviews;
  } catch (err) {
    console.log("Error in getUserReviews service:", err);
  }
};

module.exports = {
  createUser,
  getUserByEmail,
  getUserById,
  setAddress,
  createCartForUser,
  createWishlistForUser,
  deleteCartForUser,
  deleteWishlistForUser,
  deleteUser,
  updateAddress,
  getOrderHistory,
  addRatingAndReview,
  getUserReviews,
  submitContactUsForm,
  updateUserPassword,
};
