const passport = require("passport");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const tokenService = require("../services/token.service");

const verifyCallback =
  (req, res, resolve, reject) => async (err, user, info) => {
    const token =
      req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (err || info || !user) {
      //console.log("Authentication failed. Error:", err, "Info:", info);

      const refreshToken = req.cookies.jwt?.refresh?.token;
      const refreshTokenExpires = new Date(req.cookies.jwt?.refresh?.expires);

      if (refreshToken && refreshTokenExpires > new Date()) {
        try {
          let decoded = await tokenService.verifyJwtToken(refreshToken);

          let newRefreshToken = await tokenService.generateRefreshToken(
            decoded.sub
          );
          let newAccessToken = await tokenService.generateAuthTokens(
            decoded.sub
          );

          res.cookie("jwt", newRefreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            sameSite: "none",
          });
          res.setHeader(
            "authorization",
            `Bearer ${newAccessToken.access.token}`
          );
          req.headers.authorization = `Bearer ${newAccessToken.access.token}`;
          req.user = user;
          return resolve();
        } catch (err) {
          console.log("Error in refresh token:", err);
          res.status(httpStatus.UNAUTHORIZED).json({
            success: false,
            message: "Login again",
          });
        }
      } else {
        res.status(httpStatus.UNAUTHORIZED).json({
          success: false,
          message: "Login again",
        });
      }
    } else {
      req.user = user;
      return resolve();
    }
  };

const auth = async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      "jwt",
      { session: false },
      verifyCallback(req, res, resolve, reject)
    )(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

module.exports = auth;
