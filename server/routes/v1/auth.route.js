const express = require("express");
const {
  signupSchema,
  loginSchema,
  otpSchema,
  resetPasswordSchema,
  googleAuthInfo,
  resendOtpToUserSchema,
  testLoginSchema,
} = require("../../validations/auth.validation");
const { validate } = require("../../middlewares/validate");
const authController = require("../../controllers/auth.controller");
const passport = require("passport");
require("../../config/passport");

const router = express.Router();

router.get("/get-test-credentials", authController.getTestCredentials);

//login route for test credentials
router.post("/test-login", validate(testLoginSchema), authController.login);

//Route to resent verification otp to user
router.post(
  "/resend-otp-to-user",
  validate(resendOtpToUserSchema),
  authController.resendOtpToUser
);

//send user details after successfull google login
router.post(
  "/google-auth-info",
  validate(googleAuthInfo),
  authController.googleAuthInfo
);
//Route for google authentication initiation
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
//Callback route executed after succesfull login
router.get("/google/callback", authController.googleLoginCallback);

router.post(
  "/reset-password",
  validate(resetPasswordSchema),
  authController.resetPassword
);

//Send otp to user for verification
router.post("/send-otp", validate(signupSchema), authController.sendOtp);

//routes for signup and login
router.post("/signup", validate(otpSchema), authController.signup);
router.post("/login", validate(loginSchema), authController.login);

//Refresh token route
router.post("/refresh-token", authController.refreshToken);

router.post("/logout", authController.logout);

module.exports = router;
