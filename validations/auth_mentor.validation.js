const Joi = require("joi");

//register login otp
const registerSchema = Joi.object({
  name: Joi.string().max(72).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(32).required(),
  phone: Joi.string().pattern(/^[0-9]{9,15}$/).required(),
  specialization: Joi.string().max(72).required(),
});


const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});


const otpSchema = Joi.object({
  otp: Joi.string().length(6).required(),
});




module.exports = {
  registerSchema,
  loginSchema,
  otpSchema,
};
