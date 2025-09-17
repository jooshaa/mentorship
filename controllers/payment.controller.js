const Payment = require("../models/payment");
const { successMessage, errorMessage } = require("../helper/send.Err_Suc");
const Student = require("../models/student");
const Contract = require("../models/contract");
const Course = require("../models/course");
const Mentor = require("../models/mentor");
const {Op} = require('sequelize')



const createPayment = async (req, res) => {
  try {
    const newPayment = await Payment.create(req.body);
    return successMessage(res, 201, "Payment created", newPayment);
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error creating payment");
  }
};

const findPaid = async (req, res)=>{
  const {studentId} = req.params
  try{
     const payments = await Payment.findAll({
  include: [
    {
      model: Student,
      where: { id: studentId } 
    },
    {
      model: Contract,
      include: [Course, Mentor]
    }
  ]
});

  }catch(error){
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
    return errorMessage(res, error.message, 500, "Error deleting payment");
  }
};

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  deletePayment,
};
