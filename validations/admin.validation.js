const Joi = require("joi");

const adminRegisterSchema = Joi.object({
  name: Joi.string().max(72).required(),
  email: Joi.string().email().max(82).required(),
  password: Joi.string().min(6).max(100).required(),
  phone: Joi.string().pattern(/^[0-9+\-() ]*$/).optional(),
  is_creator: Joi.boolean().optional(),
  role: Joi.string().valid("admin", "superadmin").optional(),
});

const adminLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

module.exports = {
  adminRegisterSchema,
  adminLoginSchema,
};