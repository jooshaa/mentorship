const express = require("express");
const router = express.Router();
const validate = require("../middleware/validation/joi.validator");
const reviewController = require("../controllers/review.controller");
const { createReviewSchema, updateReviewSchema } = require("../validations/review.validation");

router.post("/", validate(createReviewSchema), reviewController.createReview);
router.get("/", reviewController.getAllReviews);
router.get("/:id", reviewController.getReviewById);
router.patch("/:id", validate(updateReviewSchema), reviewController.updateReview);
router.delete("/:id", reviewController.deleteReview);

module.exports = router;
