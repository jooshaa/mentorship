const Joi = require("joi");

const createContractSchema = Joi.object({
  amount: Joi.number().precision(2).positive().required(),
  payment_type: Joi.string().valid("cash", "card").optional(),
  status: Joi.string().valid("active", "cancelled", "completed").optional(),
  studentId: Joi.number().required(),
  courseId: Joi.number().required(),
  mentorId: Joi.number().required(),
});

const updateContractSchema = Joi.object({
  amount: Joi.number().precision(2).positive().optional(),
  payment_type: Joi.string().valid("cash", "card").optional(),
  status: Joi.string().valid("active", "cancelled", "completed").optional(),
});
  
module.exports = { createContractSchema, updateContractSchema };
