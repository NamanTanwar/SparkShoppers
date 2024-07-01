const { client } = require("../config/redisConfig");
const { mailSender } = require("../utils/mailSender");
const { otpTemplate } = require("../mail/templates/emailVerificationTemplate");
const { otpGenerator } = require("../utils/otpGenerator");
//Generate a unique otp with given input

const resendOtpToUser = async (prevKey) => {
  //retrieve prevKey with user temp info
  const storedObj = await client.hGetAll(prevKey);
  //retrieve user email from stored temp info
  const { email } = storedObj;
  //generate new otp
  const newOtp = otpGenerator(6);
  //invalidate previous otp
  const deletedKeysCount = await client.del(prevKey);
  //Generating new key
  let newKey = `user-session:123:${Date.now()}`;
  //storing new otp with user temp info
  await client.hSet(newKey, { ...storedObj, otp: newOtp });
  //sending mail to user
  const result = await mailSender(
    email,
    "OTP Verification",
    otpTemplate(newOtp)
  );

  return newKey;
};

const generateOtp = async (obj) => {
  //Generating unique 6 digit otp
  const generatedOtp = otpGenerator(6);
  //storing user signup info temporarily
  let key = `user-session:123:${Date.now()}`;
  await client.hSet(key, { ...obj, otp: generatedOtp });
  const storedObj = await client.hGetAll("user-session:123");
  return key;
};

const sendOtpToUser = async (email, key) => {
  //Getting otp from temporary storage
  const otp = await client.hGet(key, "otp");
  //Sending otp to user via mail
  const result = await mailSender(email, "OTP Verification", otpTemplate(otp));
};

const verifyOtp = async (userOtp, tempOtpId) => {
  //Verifying user otp
  const otp = await client.hGet(tempOtpId, "otp");

  //if otp not present
  if (!otp) {
    return false;
  }

  if (otp === userOtp) {
    //Extrating chached used data from redis
    let userSession = await client.hGetAll(tempOtpId);
    //Converting to json object
    let jsonObject = userSession;
    //removing unnecessary fields
    delete jsonObject.otp;
    //to be used to create user
    //Deleting the users chached data from redis
    const deletedKeysCount = await client.del(tempOtpId);
    return jsonObject;
  } else {
    return false;
  }
};

module.exports = {
  generateOtp,
  sendOtpToUser,
  verifyOtp,
  resendOtpToUser,
};
