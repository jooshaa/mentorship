const Joi = require("joi");


const createCourseSchema = Joi.object({
  name: Joi.string().max(100).required(),
  duration: Joi.string().required(),
  description: Joi.string().optional(),
});


const updateCourseSchema = Joi.object({
  name: Joi.string().max(100).optional(),
  duration: Joi.string().optional(),
  description: Joi.string().optional(),
});

module.exports = {
  createCourseSchema,
  updateCourseSchema,
};
