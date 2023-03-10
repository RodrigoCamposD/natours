const router = require("express").Router();
const tourController = require("../controllers/tourController");
const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

router
  .route("/top-5-cheap")
  .get(tourController.aliasTopTour, tourController.getAllTours);
router.route("/tour-stats").get(tourController.getTourStats);
router.route("/monthly-plan/:year").get(tourController.getMonthlyPlan);

router
  .route("/")
  .get(authController.protect, tourController.getAllTours)
  .post(authController.protect, tourController.createTour);
router
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo("admin", "lead-guide"),
    tourController.deleteTour,
  );

router
  .route("/:tourId/reviews")
  .post(
    authController.protect,
    authController.restrictTo("user"),
    reviewController.createReview,
  );

module.exports = router;
