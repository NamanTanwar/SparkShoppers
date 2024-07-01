const { Strategy: JwtSrategy, ExtractJwt } = require("passport-jwt");
const config = require("../config/config");
const { tokenTypes } = require("./token");
const User = require("../models/User");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const tokenService = require("../services/token.service");
const userService = require("../services/user.service");
const passport = require("passport");
const cartService = require("../services/cart.service");
const wishlistService = require("../services/wishlist.service");

//Specifying the jwt secret and method of extraction
//of jwt from request
const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

//Takes payload and done as argument
const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error("Invalid token type");
    }
    //payload.sub contains mongoId
    const user = await User.findById(payload.sub);

    //user not found
    if (!user) {
      return done(null, false);
    }
    //user successfully found
    done(null, user);
  } catch (err) {
    done(err, false);
  }
};

//jwtStrategy is created jwtOptions object
//and jwtVerify function to be used by passport
const jwtStrategy = new JwtSrategy(jwtOptions, jwtVerify);

const googleStrategy = new GoogleStrategy(
  {
    clientID: config.google.client_id,
    clientSecret: config.google.client_secret,
    callbackURL: `${config.backend.url}/v1/auth/google/callback`,
  },
  async function (accessToken, refreshToken, profile, cb) {
    try {
      //Extrating relevent user profile information
      let email =
        profile.emails && profile.emails.length > 0
          ? profile.emails[0].value
          : null;
      const firstName =
        profile.name && profile.name.givenName ? profile.name.givenName : null;
      const lastName =
        profile.name && profile.name.familyName
          ? profile.name.familyName
          : null;
      let user;
      //Checking if user already exists in db with same email
      user = await User.findOne({ email });
      if (user) {
        //if exists only updating googleId for auth
        user = await User.findOneAndUpdate(
          { email },
          { googleId: profile.id },
          { new: true }
        );
      } else {
        //User does not exist
        //so creating user ,wishlist and cart
        user = await User.create({
          firstname: firstName,
          lastname: lastName,
          email: email,
          googleId: profile.id,
        });

        cart = await userService.createCartForUser(user._id);
        wishlist = await userService.createWishlistForUser(user._id);
      }
      //generating accessToken
      const generatedAccessToken = await tokenService.generateAuthTokens(user);
      return cb(null, {
        user,
        accessToken: generatedAccessToken,
      });
    } catch (err) {
      console.log("Error occured at google Strategy:", err);
      return cb(err, null);
    }
  }
);

module.exports = {
  jwtStrategy,
  googleStrategy,
};
