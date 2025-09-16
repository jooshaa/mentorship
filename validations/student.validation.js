const Joi = require("joi");


const createStudentSchema = Joi.object({
  name: Joi.string().max(72).required(),
  email: Joi.string().email().max(82).required(),
  password: Joi.string().min(6).max(100).required(),
  phone: Joi.string().pattern(/^[0-9+\-() ]*$/).optional(),
  role: Joi.string().valid("student").optional(),
});


const updateStudentSchema = Joi.object({
  name: Joi.string().max(72).optional(),
  email: Joi.string().email().max(82).optional(),
  password: Joi.string().min(6).max(100).optional(),
  phone: Joi.string().pattern(/^[0-9+\-() ]*$/).optional(),
  role: Joi.string().valid("student").optional(),
});

module.exports = {
  createStudentSchema,
  updateStudentSchema,
};