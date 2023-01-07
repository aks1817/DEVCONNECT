const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const config = require("config");
const db =
  config.get(
    "mongoURI"
  ); /* we can access any thing like this that is in default,json file which is inside config folder */
const connectDB = async () => {
  // mongoose.connect() returns a promise
  try {
    await mongoose.connect(db);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.log(err.message);
    //Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
