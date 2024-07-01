const httpStatus = require("http-status");
const { userService, tokenService, authService } = require("../services/index");

const sendForgotPasswordEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const sendEmail = await authService.sendForgotPasswordEmail(email);
    //Validation email
    if (!sendEmail) {
      res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: "Error in send Email",
      });
    }

    res.status(httpStatus.OK).json({
      success: true,
      message: "Email sent Successfully",
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

const submitContactUsForm = async (req, res) => {
  try {
    const formData = req.body;

    const submitFormRes = await userService.submitContactUsForm(formData);

    if (!submitFormRes) {
      throw new Error("Error in creating contactus form data");
    }

    res.status(httpStatus.OK).json({
      success: true,
      message: "Form submitted successfully",
      submitFormRes,
    });
  } catch (err) {
    console.log("Error occured in submitContactUsForm:", err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

const getUser = async (req, res) => {
  try {
    //Fetching user by userId
    let user = await userService.getUserById(req.params.userId);

    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    //Successfull response
    res.status(httpStatus.OK).json({
      success: true,
      user,
    });
  } catch (err) {
    console.log("user controller error:", err);
    res.status(httpStatus[500]).json({
      success: false,
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

const setAddress = async (req, res) => {
  try {
    //Checking if user present
    const user = await userService.getUserById(req.params.userId);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, "User not found");
    }
    //Updating address
    const address = await userService.setAddress(user, req.body.address);

    //Successfull response
    res.status(httpStatus.CREATED).json({
      success: true,
      message: "Address has been updated successfully",
      address,
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

const sendOtp = async (req, res) => {
  try {
    const otp = otpService.createOtp(req.body.email);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const userCart = await userService.deleteCartForUser(userId);

    const userWishlist = await userService.deleteWishlistForUser(userId);

    const result = await userService.deleteUser(userId);

    if (!result || !userCart || !userWishlist) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: "Error in deleting the User",
      });
    }

    res.status(httpStatus.OK).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    console.log("Error in delete User controller:", err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

const getOrderHistory = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    const userId = await tokenService.extractUserIdFromToken(token);
    const orderDetails = await userService.getOrderHistory(userId);

    if (!orderDetails) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: "Error in getting the Order History",
      });
    }

    res.status(httpStatus.OK).json({
      success: true,
      message: "Order History fetched successfully",
      orderDetails,
    });
  } catch (err) {
    console.log("error in getOrderHistory service:", err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

const addRatingAndReview = async (req, res) => {
  //Extracting prodId,rating,review and userToken
  //from req
  const { productId, rating, review } = req.body;
  const userToken = req.headers.authorization.split(" ")[1];
  try {
    //Extract userId from token
    const userId = await tokenService.extractUserIdFromToken(userToken);
    //call userService to create review
    const ratingAndReview = await userService.addRatingAndReview(
      userId,
      rating,
      review,
      productId
    );
    //validating if review created successfully
    if (!ratingAndReview) {
      throw new Error("Error occured in fetching rating and review");
    }
    //Successfull response
    res.status(httpStatus.OK).json({
      success: true,
      message: "Review added successfully",
      ratingAndReview,
    });
  } catch (err) {
    console.log("Error in add rating and review:", err);
    if (err.message === "Product already reviewed") {
      res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        error: err.message,
        message: err.message,
      });
    }
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

const getUserReviews = async (req, res) => {
  const { userToken } = req.body;

  try {
    const userId = await tokenService.extractUserIdFromToken(userToken);
    const reviews = await userService.getUserReviews(userId);
    if (!reviews) {
      throw new Error("Reviews not found");
    }

    res.status(httpStatus.OK).json({
      success: true,
      message: "Reviews fethed successfully",
      reviews,
    });
  } catch (err) {
    console.log("Error occured in getUserReviews controller:", err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getUser,
  setAddress,
  sendOtp,
  deleteUser,
  getOrderHistory,
  addRatingAndReview,
  getUserReviews,
  submitContactUsForm,
  sendForgotPasswordEmail,
};

//signup->sendOtp
