const Joi = require("joi");


const createMentorSchema = Joi.object({
  name: Joi.string().max(72).required(),
  email: Joi.string().email().max(82).required(),
  password: Joi.string().min(6).max(100).required(),
  phone: Joi.string().pattern(/^[0-9+\-() ]*$/).optional(),
  specialization: Joi.string().max(100).optional(),
  role: Joi.string().valid("mentor").optional(),
});


const updateMentorSchema = Joi.object({
  name: Joi.string().max(72).optional(),
  email: Joi.string().email().max(82).optional(),
  password: Joi.string().min(6).max(100).optional(),
  phone: Joi.string().pattern(/^[0-9+\-() ]*$/).optional(),
  specialization: Joi.string().max(100).optional(),
  role: Joi.string().valid("mentor").optional(),
});

module.exports = {
  createMentorSchema,
  updateMentorSchema,
};
