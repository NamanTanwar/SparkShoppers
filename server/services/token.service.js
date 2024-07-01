const jwt = require("jsonwebtoken");
const config = require("../config/config");
const { tokenTypes } = require("../config/token");

//Generate a jwt token
const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  //Constructing payload for token to be generated
  const payload = {
    sub: userId,
    iat: Math.floor(Date.now() / 1000),
    exp: expires,
    type,
  };
  //Signing token with secret
  return jwt.sign(payload, secret);
};

//Generating an acccess token to be used when user is signing in
const generateAuthTokens = async (user) => {
  //Setting auth token expiration time
  const accessTokenExpires =
    Math.floor(Date.now() / 1000) + config.jwt.accessExpirationMinutes * 60;
  //conditionally handling different types of input
  let id;
  if (typeof user === "string") id = user;
  else id = user._id;
  //Generating access token
  const accessToken = generateToken(id, accessTokenExpires, tokenTypes.ACCESS);

  return {
    access: {
      token: accessToken,
      expires: new Date(accessTokenExpires * 1000),
    },
  };
};

const generateRefreshToken = async (user) => {
  //Setting refresh token expiration time
  const refreshTokenExpires =
    Math.floor(Date.now() / 1000) +
    config.jwt.refreshExpirationDays * 24 * 60 * 60;
  //conditionally handling different types of input
  let id;
  if (typeof user === "string") id = user;
  else id = user._id;
  //Generating refresh token
  const refreshToken = generateToken(
    id,
    refreshTokenExpires,
    tokenTypes.REFRESH
  );

  return {
    refresh: {
      token: refreshToken,
      expires: new Date(refreshTokenExpires * 1000),
    },
  };
};

const newRefreshToken = async (refreshToken) => {
  jwt.verify(refreshToken, config.jwt.secret, (err, user) => {
    if (err) {
      throw new Error("Invalid token provided");
    }

    const newAccessToken = generateAuthTokens(user);
    const newRefreshToken = generateRefreshToken(user);

    return {
      newAccessToken,
      newRefreshToken,
    };
  });
};

const extractUserIdFromToken = async (token, secret = config.jwt.secret) => {
  try {
    //Validating token structure
    const parts = token.split(".");
    if (!parts.length) {
      throw new Error("Invalid token");
    }
    //decoding the received user token
    const decodedToken = jwt.verify(token, secret);
    //returning the user id
    return decodedToken.sub;
  } catch (err) {
    console.log("Error in extract userId from token:", err);
  }
};

const verifyJwtToken = async (token, secret = config.jwt.secret) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        throw err;
      }
      resolve(decoded);
    });
  });
};

module.exports = {
  generateToken,
  generateAuthTokens,
  generateRefreshToken,
  newRefreshToken,
  extractUserIdFromToken,
  verifyJwtToken,
};
