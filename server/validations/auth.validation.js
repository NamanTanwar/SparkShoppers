const Joi = require("joi");
const { password } = require("./custom.validation");

const testLoginSchema = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const resendOtpToUserSchema = {
  body: Joi.object().keys({
    tempOtpId: Joi.string().required(),
  }),
};

const googleAuthInfo = {
  body: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

const resetPasswordSchema = {
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
    confirmPassword: Joi.string().required().custom(password),
    token: Joi.string().required(),
  }),
};

const signupSchema = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    password: Joi.string().required().custom(password),
  }),
};

const loginSchema = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
  }),
};

const otpSchema = {
  body: Joi.object().keys({
    otp: Joi.string().length(6).required(),
    tempOtpId: Joi.string().required(),
  }),
};

module.exports = {
  signupSchema,
  loginSchema,
  otpSchema,
  resetPasswordSchema,
  resendOtpToUserSchema,
  testLoginSchema,
};
