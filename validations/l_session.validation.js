const Joi = require("joi");

const createSessionSchema = Joi.object({
  start_time: Joi.string().pattern(/^\d{2}:\d{2}$/).required(), // формат HH:MM
  end_time: Joi.string().pattern(/^\d{2}:\d{2}$/).required(),
  courseId: Joi.number().integer().required(),
  locationId: Joi.number().integer().required(),
  mentorId: Joi.number().integer().required(),
});

const updateSessionSchema = Joi.object({
  start_time: Joi.string().pattern(/^\d{2}:\d{2}$/),
  end_time: Joi.string().pattern(/^\d{2}:\d{2}$/),
  courseId: Joi.number().integer(),
  locationId: Joi.number().integer(),
  mentorId: Joi.number().integer(),
});

module.exports = {
  createSessionSchema,
  updateSessionSchema,
};
