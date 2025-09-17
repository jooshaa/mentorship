const express = require("express");
const router = express.Router();
const validate = require("../middleware/validation/joi.validator");
const reviewController = require("../controllers/review.controller");
const { createReviewSchema, updateReviewSchema } = require("../validations/review.validation");
const isVerified = require('../middleware/guards/authMiddleware')
const onlyAdmins = require('../middleware/guards/onlyAdmins')
const selfUser = require('../middleware/guards/selfStudent');
const roleChecker = require("../middleware/guards/roleMiddleware")


router.post("/", validate(createReviewSchema), isVerified, roleChecker("student"), reviewController.createReview);
router.get("/", isVerified, reviewController.getAllReviews);
router.get("/:id", isVerified, reviewController.getReviewById);
router.patch("/:id", isVerified, selfUser, roleChecker('student'), validate(updateReviewSchema), reviewController.updateReview);
router.delete("/:id",isVerified , selfUser,  roleChecker('student'), reviewController.deleteReview);

module.exports = router;
