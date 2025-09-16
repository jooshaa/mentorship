const Contract = require("../models/contract");
const { successMessage, errorMessage } = require("../helper/send.Err_Suc");

// Создать контракт
const createContract = async (req, res) => {
  try {
    const newContract = await Contract.create(req.body);
    return successMessage(res, 201, "Contract created", newContract);
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error creating contract");
  }
};

// Получить все контракты
const getAllContracts = async (req, res) => {
  try {
    const contracts = await Contract.findAll();
    return successMessage(res, 200, "All contracts", contracts);
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error fetching contracts");
  }
};

// Получить контракт по ID
const getContractById = async (req, res) => {
  try {
    const contract = await Contract.findByPk(req.params.id);
    if (!contract) return errorMessage(res, "Contract not found", 404, "Not found");

    return successMessage(res, 200, "Contract found", contract);
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error fetching contract");
  }
};

// Обновить контракт
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

// Удалить контракт
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
};
