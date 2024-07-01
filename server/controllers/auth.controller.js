const httpStatus = require("http-status");
const {
  userService,
  tokenService,
  authService,
  otpService,
  wishlistService,
  cartService,
} = require("../services");
const bcrypt = require("bcrypt");
const passport = require("passport");
require("../config/passport");
const config = require("../config/config");

const getTestCredentials = async (req, res) => {
  try {
    res.status(httpStatus.OK).json({
      success: true,
      email: "efgh53160@proton.me",
      password: "testUser@777",
    });
  } catch (err) {
    console.log("Error occured at getTestCredentials controller", err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

const googleLogin = async (req, res, next) => {
  passport.authenticate("google", { scope: ["profile", "email"] });
};

const googleLoginCallback = async (req, res, next) => {
  passport.authenticate(
    "google",
    { failureRedirect: "/login" },
    async (err, authUser, info) => {
      if (err) {
        return next(err);
      }
      //if user data not available
      if (!authUser) {
        return res.redirect("/login");
      }

      try {
        //generated auth token
        const { accessToken } = authUser;
        res.status(httpStatus.OK);
        //sending auth token as a url parameter(this is just a temporary auth token)
        res.redirect(
          `${config.frontend.url}/auth/redirect?token=${encodeURIComponent(
            accessToken.access.token
          )}`
        );
      } catch (error) {
        console.error("Error in callback:", error);
      }
    }
  )(req, res, next);
};

const resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;
    const userEmail = await authService.validateToken(token);
    const updatedUser = await userService.updateUserPassword(
      userEmail,
      password
    );
    if (!updatedUser) {
      throw new Error("Error in updating password");
    }
    res.status(httpStatus.OK).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (err) {
    console.log("Error in resetPassword product:", err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

//Controller to handle signup.
const signup = async (req, res) => {
  try {
    //Verifying otp
    const userDetails = await otpService.verifyOtp(
      req.body.otp,
      req.body.tempOtpId
    );
    //Creating User in DB
    if (!userDetails) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Invalid Otp or OTP not found",
      });
    }
    //Creating user
    const user = await userService.createUser(userDetails);

    //Generating JWT Token,refresh Token
    //Cart and Wishlist
    // on successfull creation of user in DB
    const [accessToken, refreshToken, cart, wishlist] = await Promise.all([
      tokenService.generateAuthTokens(user),
      tokenService.generateRefreshToken(user),
      userService.createCartForUser(user._id),
      userService.createWishlistForUser(user._id),
    ]);

    //Generating refresh token as a http cookie only
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "none",
    });

    const userResponse = {
      userId: user._id.toString(),
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    };
    //Sending successfull response
    res.status(httpStatus.CREATED).json({
      success: true,
      message: "User created successfully",
      userResponse,
      accessToken,
    });
  } catch (err) {
    console.log("Error occured in signup controller:", err);
    //Sending unsuccessfull response to user
    if (err.message === "Email already taken") {
      res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        error: err.message,
        message: "Account already signed up. Kindly login",
      });
    }
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: err.message,
      error: "Internal Server Error",
    });
  }
};

const googleAuthInfo = async (req, res) => {
  try {
    const { token } = req.body;
    const userId = await tokenService.extractUserIdFromToken(token);

    //getUser by id
    const user = await userService.getUserById(userId);
    //generate auth tokens
    const [accessToken, refreshToken, userWishlist, userCart, cartTotal] =
      await Promise.all([
        tokenService.generateAuthTokens(user),
        tokenService.generateRefreshToken(user),
        wishlistService.getUserWishlist(user._id),
        cartService.getUserCart(user._id),
        cartService.calculateTotal(user._id),
      ]);

    //Generating refresh token as a http cookie only
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "none",
    });
    //Sending successfull response
    const userResponse = {
      userId: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      userWishlist: userWishlist,
      userCart: userCart,
      cartTotal: cartTotal,
    };

    //sending user along with generated token to client
    res.status(200).json({
      success: true,
      message: "Login Successfull",
      userResponse,
      accessToken,
    });
  } catch (err) {
    console.log("Error occured in googleAuthInfo controller", err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

//Controller to handle login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Login user service
    const user = await authService.loginUserWithEmailAndPassword(
      email,
      password
    );
    //generate auth tokens
    const accessToken = await tokenService.generateAuthTokens(user);
    //Generating refresh token
    const refreshToken = await tokenService.generateRefreshToken(user);
    //fetch user wishlist
    const userWishlist = await wishlistService.getUserWishlist(email);
    //fetch user cart
    const userCart = await cartService.getUserCart(user._id);
    //fetch cart total
    const cartTotal = await cartService.calculateTotal(user._id);
    //sending refresh token as http only cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    //user information response
    const userResponse = {
      userId: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      userWishlist: userWishlist,
      userCart: userCart,
      cartTotal: cartTotal,
    };

    //sending user along with generated token to client
    res.status(200).json({
      success: true,
      message: "Login Successfull",
      userResponse,
      accessToken,
    });
  } catch (err) {
    console.log("Error occured at login controller:", err);
    let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    let errorMessage = "Internal Server Error";

    if (err.message === "Incorrect email or password") {
      statusCode = httpStatus.UNAUTHORIZED;
      errorMessage = err.message;
    }

    res.status(statusCode).json({
      success: false,
      message: err.message,
      error: errorMessage,
    });
  }
};

const resendOtpToUser = async (req, res) => {
  try {
    //id of prev otp object
    const { tempOtpId } = req.body;
    //new otp object key
    const key = await otpService.resendOtpToUser(tempOtpId);
    //Successfull response
    res.status(httpStatus.OK).json({
      success: true,
      message: "Otp sent successfully",
      key: key,
    });
  } catch (err) {
    console.log("Error occured at sentOtpToUser controller:", err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: err.message,
      message: "Something went wrong",
    });
  }
};

const sendOtp = async (req, res) => {
  try {
    //Creating and storing otp in redis cache
    const key = await otpService.generateOtp(req.body);
    //Sending otp to user via email
    await otpService.sendOtpToUser(req.body.email, key);
    //Sending successfull response to user
    res.status(httpStatus.OK).json({
      success: true,
      message: "Otp sent successfully",
      tempOtpKey: key,
    });
  } catch (err) {
    console.log("Error occured in sendOtp controller:", err);
    //Sending Failed response to user
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    //Extracting current refresh token from cookie
    const refreshToken = req.cookies?.jwt;
    //if refresh token present
    if (!refreshToken) {
      return res.status(httpStatus.UNAUTHORIZED).json({
        success: false,
        message: "Unauthorized user",
      });
    }
    //Genrating new acessToken and refreshToken
    const { newAccessToken, newRefreshToken } =
      await tokenService.newRefreshToken(refreshToken);

    //Setting http only cookie for refresh token
    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    //Successfull response
    res.status(httpStatus.OK).json({
      success: true,
      message: "New tokens generated successfully",
      accessToken: newAccessToken,
    });
  } catch (err) {
    console.log("Error in refresh token :", err);
    let statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    if (err.message === "Invalid token provided")
      statusCode = httpStatus.UNAUTHORIZED;

    res.status(httpStatus.statusCode).json({
      success: false,
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

const logout = async (req, res) => {
  try {
    const result = await authService.logoutUser(res);
    if (!result) {
      throw new Error("logout failed");
    }
    res.status(httpStatus.OK).json({
      success: true,
      message: "Logged out Successfully",
    });
  } catch (err) {
    console.log("Error in logout controller:", err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  signup,
  login,
  sendOtp,
  refreshToken,
  logout,
  resetPassword,
  googleLogin,
  googleLoginCallback,
  googleAuthInfo,
  resendOtpToUser,
  getTestCredentials,
};
