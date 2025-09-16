const Joi = require("joi");


const createLocationSchema = Joi.object({
  address: Joi.string().required(),
  location: Joi.string().required(),
});


const updateLocationSchema = Joi.object({
  address: Joi.string().optional(),
  location: Joi.string().optional(),
});

module.exports = {
  createLocationSchema,
  updateLocationSchema,
};
