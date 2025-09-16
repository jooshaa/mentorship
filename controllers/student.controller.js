const Student = require("../models/student");
const { hashPass, compareHash } = require("../utils/bcrypt");
const { successMessage, errorMessage } = require("../helper/send.Err_Suc");

// create 
const createStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existing = await Student.findOne({ where: { email } });
    if (existing) return errorMessage(res, "Student already exists", 409, "Validation error");

    const hashedPassword = hashPass(password);
    const newStudent = await Student.create({ ...req.body, password: hashedPassword });

    return successMessage(res, 201, "created", newStudent);
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error creating student");
  }
};

// get 
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    return successMessage(res, 200, "gotten", students);
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error in getting");
  }
};

// Get byID
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return errorMessage(res, "Student not found", 404, "Not found");

    return successMessage(res, 200, "Student found", student);
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error fetching student");
  }
};

// update 
const updateStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return errorMessage(res, "Not found", 404, "Not found");

    if (req.body.password) req.body.password = hashPass(req.body.password);

    await student.update(req.body);
    return successMessage(res, 200, "updated", student);
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error updating ");
  }
};

// delete 
const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (!student) return errorMessage(res, "Not found", 404, "Not found");

    await student.destroy();
    return successMessage(res, 200, "deleted");
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error in deleting ");
  }
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};
