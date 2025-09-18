const Payment = require("../models/payment");
const { successMessage, errorMessage } = require("../helper/send.Err_Suc");
const Student = require("../models/student");
const Contract = require("../models/contract");
const Course = require("../models/course");
const Mentor = require("../models/mentor");
const { Op } = require('sequelize')
const logger = require("../utils/logger");
const { model } = require("../config/db");


const createPayment = async (req, res) => {
  try {
    const newPayment = await Payment.create(req.body);

    return successMessage(res, 201, "Payment created", newPayment);
  } catch (error) {
    logger.error(`Error in payment: ${error.message}`);
    return errorMessage(res, error.message, 500, "Error creating payment");
  }
};

const findPaid = async (req, res) => {
  const { studentId } = req.query
  try {
    const payments = await Payment.findAll({
      include: [
        {
          model: Student,
          where: { id: studentId },
          attributes: ["name", "email", "phone"]
        },
        {
          model: Contract,
          include: [
            {
              model: Course,
              // attributes: ["name", "email", "phone"]
            },
            {
              model: Mentor,
              attributes: ["name", "email", "phone"],
            }


          ]
        }
      ]
    });

    return successMessage(res, 201, "Payment by student id", payments);
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error finding payment");
  }
}

const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.findAll();
    return successMessage(res, 200, "All payments", payments);
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error fetching payments");
  }
};


const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) return errorMessage(res, "Payment not found", 404, "Not found");

    return successMessage(res, 200, "Payment found", payment);
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error fetching payment");
  }
};


const updatePayment = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) return errorMessage(res, "Payment not found", 404, "Not found");

    await payment.update(req.body);

    return successMessage(res, 200, "Payment updated", payment);
  } catch (error) {
    logger.error(`Error in payment: ${error.message}`);
    return errorMessage(res, error.message, 500, "Error updating payment");
  }
};


const deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByPk(req.params.id);
    if (!payment) return errorMessage(res, "Payment not found", 404, "Not found");

    await payment.destroy();

    return successMessage(res, 200, "Payment deleted");
  } catch (error) {
    logger.error(`Error in payment: ${error.message}`);
    return errorMessage(res, error.message, 500, "Error deleting payment");
  }
};

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
  findPaid,
};
