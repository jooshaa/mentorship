const express = require("express");
const router = express.Router();
const SessionController = require("../controllers/l_session.controller");
const validate = require("../middleware/validation/joi.validator");
const { createSessionSchema, updateSessionSchema } = require('../validations/l_session.validation');

// Create
router.post("/", validate(createSessionSchema), SessionController.createSession);

// Read
router.get("/", SessionController.getAllSessions);
router.get("/:id", SessionController.getSessionById);

// Update
router.patch("/:id", validate(updateSessionSchema), SessionController.updateSession);

// Delete
router.delete("/:id", SessionController.deleteSession);

module.exports = router;
