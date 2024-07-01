const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const httpStatus = require("http-status");
const passport = require("passport");
const { jwtStrategy, googleStrategy } = require("./config/passport");
const routes = require("./routes/v1/index");
const fileUpload = require("express-fileupload");
const ApiError = require("./utils/ApiError");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const config = require("./config/config");

const app = express();
app.use(cookieParser());

app.get("/test", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server Reachable",
  });
});

//Set security HTTP headers
app.use(helmet());

//prase JSON request body
app.use(express.json());

//Parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: `${config.frontend.url}`,
    credentials: true,
  })
);

//telling passport to use jwtStrategy for 'jwt' strategy name
//passport.authenticate takes the strategy name as first argument
passport.use("jwt", jwtStrategy);
passport.use("google", googleStrategy);

//Initialize passport and add 'jwt' authentication strategy
app.use(passport.initialize());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp",
  })
);

app.use("/v1", routes);

app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not Found"));
});

module.exports = app;
