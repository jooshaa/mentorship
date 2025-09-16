const Review = require("../models/review");
const { successMessage, errorMessage } = require("../helper/send.Err_Suc");

// Создать отзыв
const createReview = async (req, res) => {
  try {
    const newReview = await Review.create(req.body);
    return successMessage(res, 201, "Review created", newReview);
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error creating review");
  }
};

// Получить все отзывы
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    return successMessage(res, 200, "All reviews", reviews);
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error fetching reviews");
  }
};

// Получить отзыв по ID
const getReviewById = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return errorMessage(res, "Review not found", 404, "Not found");

    return successMessage(res, 200, "Review found", review);
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error fetching review");
  }
};

// Обновить отзыв
const updateReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return errorMessage(res, "Review not found", 404, "Not found");

    await review.update(req.body);
    return successMessage(res, 200, "Review updated", review);
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error updating review");
  }
};

// Удалить отзыв
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return errorMessage(res, "Review not found", 404, "Not found");

    await review.destroy();
    return successMessage(res, 200, "Review deleted");
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error deleting review");
  }
};

module.exports = {
  createReview,
  getAllReviews,
  getReviewById,
  updateReview,
  deleteReview,
};
