const { getUserByEmail } = require("./user.service");
const bcrypt = require("bcrypt");
const {
  forgotPasswordTemplate,
} = require("../mail/templates/forgotPasswordTemplate");
const PasswordResetSchema = require("../models/PasswordResetSchema");
const crypto = require("crypto");
const { mailSender } = require("../utils/mailSender");
const config = require("../config/config");

const loginUserWithEmailAndPassword = async (email, password) => {
  //getting user by email
  const user = await getUserByEmail(email);
  //checking if password correct
  const isValidPass = await bcrypt.compare(password, user.password);
  //in case user not found or passowords does not match
  if (!user || !isValidPass) {
    throw new Error("Incorrect email or password");
  }
  return user;
};

const logoutUser = async (res) => {
  res.clearCookie("refresh");
  return true;
};

const sendForgotPasswordEmail = async (email) => {
  try {
    //Generating random unique token
    const uniqueToken = crypto.randomBytes(32).toString("hex");
    //storing random token in db with 30min expiration time
    const newDoc = await PasswordResetSchema.create({
      email: email,
      token: uniqueToken,
      expiresAt: new Date(Date.now() + 30 * 60 * 1000),
    });
    //throw error is not created doc
    if (!newDoc) {
      throw new Error("Error in creating new password reset doc");
    }
    //sending email with unique link
    const title = "Password Reset";
    const info = await mailSender(
      email,
      title,
      forgotPasswordTemplate(
        `${config.frontend.url}/reset-password?token=${uniqueToken}` //created unique link with random token
      )
    );

    if (!info) {
      throw new Error("Error in send email to user");
    }

    return info;
  } catch (err) {
    console.log("Error occured at sendForgotPasswordEmail service:", err);
    throw err;
  }
};

const validateToken = async (token) => {
  try {
    //validating generated token for user for reset password
    const doc = await PasswordResetSchema.findOne({ token: token });
    if (!doc) {
      throw new Error("Invalid Token");
    }
    return doc.email;
  } catch (err) {
    console.log("Error occured in validateToken service:", err);
    throw err;
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
  logoutUser,
  sendForgotPasswordEmail,
  validateToken,
};
