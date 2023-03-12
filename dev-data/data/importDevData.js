require("dotenv").config();
const { readFileSync } = require("fs");
const mongoose = require("mongoose");
const Tour = require("../../models/tourModel");
const User = require("../../models/userModel");
const Review = require("../../models/reviewModel");

console.log(__dirname);
const tours = JSON.parse(readFileSync(`${__dirname}/tours.json`, "utf8"));
const users = JSON.parse(readFileSync(`${__dirname}/users.json`, "utf8"));
const reviews = JSON.parse(readFileSync(`${__dirname}/reviews.json`, "utf8"));

mongoose
  .set("strictQuery", false)
  .connect(process.env.MONGO_STR)
  .then(() => console.log("Connected Mongo"))
  .catch((err) => console.error(err));

const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log("data loaded");
  } catch (error) {
    console.error(error);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log("data deleted");
  } catch (error) {
    console.error(error);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

console.log(process.argv);
