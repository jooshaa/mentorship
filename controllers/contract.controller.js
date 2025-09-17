const Contract = require("../models/contract");
const { successMessage, errorMessage } = require("../helper/send.Err_Suc");
const Course = require("../models/course");
const Mentor = require("../models/mentor");
const Student = require("../models/student");
const {Op} = require('sequelize')


const createContract = async (req, res) => {
  try {
    const newContract = await Contract.create(req.body);
    return successMessage(res, 201, "Contract created", newContract);
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error creating contract");
  }
};


const findByTime = async (req, res) => {
const { startDate, endDate } = req.params;
const start = new Date(startDate);
const end = new Date(endDate);


  try{
    const contracts = await Contract.findAll({
    where: {
      createdAt: {
        [Op.between]: [start, end]
      },
      status: "active"
    },
    include: [Student, Mentor, Course]
  });
  successMessage(res, 200, "find", contracts)

  }catch(error){
    errorMessage(res, error.message, 400, "Error in finding by time")
  }
}




const getAllContracts = async (req, res) => {
  try {
    const contracts = await Contract.findAll();
    return successMessage(res, 200, "All contracts", contracts);
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error fetching contracts");
  }
};


const getContractById = async (req, res) => {
  try {
    const contract = await Contract.findByPk(req.params.id);
    if (!contract) return errorMessage(res, "Contract not found", 404, "Not found");

    return successMessage(res, 200, "Contract found", contract);
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error fetching contract");
  }
};


const updateContract = async (req, res) => {
  try {
    const contract = await Contract.findByPk(req.params.id);
    if (!contract) return errorMessage(res, "Contract not found", 404, "Not found");

    await contract.update(req.body);
    return successMessage(res, 200, "Contract updated", contract);
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error updating contract");
  }
};


const deleteContract = async (req, res) => {
  try {
    const contract = await Contract.findByPk(req.params.id);
    if (!contract) return errorMessage(res, "Contract not found", 404, "Not found");

    await contract.destroy();
    return successMessage(res, 200, "Contract deleted");
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error deleting contract");
  }
};

module.exports = {
  createContract,
  getAllContracts,
  getContractById,
  updateContract,
  deleteContract,
  findByTime
};
