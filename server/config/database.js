const mongoose = require("mongoose");
const config = require("./config");

const MONGO_URI = config.mongoose.url;
const MONGO_OPTIONS = config.mongoose.options;

const connectToDB = async () => {
  try {
    // console.log("mongo uri:",MONGO_URI);
    await mongoose.connect(MONGO_URI, MONGO_OPTIONS);
    console.log(`Database connection established`);
  } catch (err) {
    console.log("Error connecting to Database: ", err);
  }
};

module.exports = {
  connectToDB,
};
