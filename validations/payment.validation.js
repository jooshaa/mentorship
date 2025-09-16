const Joi = require("joi");

const createPaymentSchema = Joi.object({
  amount: Joi.number().precision(2).positive().required(),
  paid_at: Joi.date().optional(),
  status: Joi.string().valid("pending", "paid", "failed", "refunded").optional(),
  currency: Joi.string().length(3).uppercase().optional(),
  studentId: Joi.number().required(),
  contractId: Joi.number().required(),
});

const updatePaymentSchema = Joi.object({
  amount: Joi.number().precision(2).positive().optional(),
  paid_at: Joi.date().optional(),
  status: Joi.string().valid("pending", "paid", "failed", "refunded").optional(),
  currency: Joi.string().length(3).uppercase().optional(),
});

module.exports = {
  createPaymentSchema,
  updatePaymentSchema,
};
