const Mentor = require("../models/mentor");
const { hashPass } = require("../utils/bcrypt");
const { successMessage, errorMessage } = require("../helper/send.Err_Suc");


const createMentor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existing = await Mentor.findOne({ where: { email } });
    if (existing) return errorMessage(res, "Mentor already exists", 409, "Validation error");

    const hashedPassword = hashPass(password);
    const newMentor = await Mentor.create({ ...req.body, password: hashedPassword });

    return successMessage(res, 201, "Mentor created", newMentor);
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error in creating ");
  }
};


const getAllMentors = async (req, res) => {
  try {
    const mentors = await Mentor.findAll();
    return successMessage(res, 200, "Mentors", mentors);
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error in getting");
  }
};


const getMentorById = async (req, res) => {
  try {
    const mentor = await Mentor.findByPk(req.params.id);
    if (!mentor) return errorMessage(res, "Not found", 404, "Not found");

    return successMessage(res, 200, "Mentor found", mentor);
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error in getting");
  }
};


const updateMentor = async (req, res) => {
  try {
    const mentor = await Mentor.findByPk(req.params.id);
    if (!mentor) return errorMessage(res, "Not found", 404, "Not found");

    if (req.body.password) req.body.password = hashPass(req.body.password);

    await mentor.update(req.body);
    return successMessage(res, 200, " updated", mentor);
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error in updating ");
  }
};


const deleteMentor = async (req, res) => {
  try {
    const mentor = await Mentor.findByPk(req.params.id);
    if (!mentor) return errorMessage(res, "Not found", 404, "Not found");

    await mentor.destroy();
    return successMessage(res, 200, " deleted");
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error in deleting ");
  }
};

module.exports = {
  createMentor,
  getAllMentors,
  getMentorById,
  updateMentor,
  deleteMentor,
};
