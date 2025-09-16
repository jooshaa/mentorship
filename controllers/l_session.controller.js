
const L_Session = require("../models/lesson_session");
const { errorMessage, successMessage } = require("../helper/send.Err_Suc");

const createSession = async (req, res) => {
  try {
    const session = await L_Session.create(req.body);
    successMessage(res, 201, "Session created", session);
  } catch (error) {
    errorMessage(res, error.message, 500, "Error creating session");
  }
};

const getAllSessions = async (req, res) => {
  try {
    const sessions = await L_Session.findAll();
    successMessage(res, 200, "All sessions", sessions);
  } catch (error) {
    errorMessage(res, error.message, 500, "Error fetching sessions");
  }
};

const getSessionById = async (req, res) => {
  try {
    const session = await L_Session.findByPk(req.params.id);
    if (!session) return errorMessage(res, "Session not found", 404, "Error");
    successMessage(res, 200, "Session found", session);
  } catch (error) {
    errorMessage(res, error.message, 500, "Error fetching session");
  }
};

const updateSession = async (req, res) => {
  try {
    const session = await L_Session.findByPk(req.params.id);
    if (!session) return errorMessage(res, "Session not found", 404, "Error");

    await session.update(req.body);
    successMessage(res, 200, "Session updated", session);
  } catch (error) {
    errorMessage(res, error.message, 500, "Error updating session");
  }
};

const deleteSession = async (req, res) => {
  try {
    const session = await L_Session.findByPk(req.params.id);
    if (!session) return errorMessage(res, "Session not found", 404, "Error");

    await session.destroy();
    successMessage(res, 200, "Session deleted");
  } catch (error) {
    errorMessage(res, error.message, 500, "Error deleting session");
  }
};

module.exports = {
  createSession,
  getAllSessions,
  getSessionById,
  updateSession,
  deleteSession,
};
