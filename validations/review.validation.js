const Joi = require("joi");

const createReviewSchema = Joi.object({
  rate: Joi.number().min(1).max(5).required(),
  opinion: Joi.string().optional(),
  studentId: Joi.number().optional(),
  mentorId: Joi.number().optional(),
  courseId: Joi.number().optional(),
});

const updateReviewSchema = Joi.object({
  rate: Joi.number().min(1).max(5).optional(),
  opinion: Joi.string().optional(),
});

module.exports = {
  createReviewSchema,
  updateReviewSchema,
};
