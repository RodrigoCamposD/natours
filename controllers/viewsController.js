const Tour = require("../models/tourModel");
const catchAsync = require("../utils/catchAsync");
// const AppError = require("../utils/appError");

exports.getOverview = catchAsync(async (req, res) => {
  const tours = await Tour.find();
  res.status(200).render("overview", {
    title: "All tours",
    tours,
  });
});

exports.getTour = catchAsync(async (req, res) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: "reviews",
    fields: "review rating user",
  });
  // if (!tour) return next(new AppError("No document found with that slug", 404));
  res.status(200).render("tour", { title: `${tour.name} Tour`, tour });
});
