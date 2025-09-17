const express = require("express");
const router = express.Router();
const SessionController = require("../controllers/l_session.controller");
const validate = require("../middleware/validation/joi.validator");
const { createSessionSchema, updateSessionSchema } = require('../validations/l_session.validation');
const isVerified = require('../middleware/guards/authMiddleware')
const onlyAdmins = require('../middleware/guards/onlyAdmins')
const selfUser = require('../middleware/guards/selfStudent')


router.post("/", validate(createSessionSchema), isVerified, onlyAdmins, SessionController.createSession);
router.get("/", isVerified, onlyAdmins, SessionController.getAllSessions);
router.get("/:id", isVerified, selfUser, onlyAdmins ,SessionController.getSessionById);
router.patch("/:id", validate(updateSessionSchema), isVerified, onlyAdmins, SessionController.updateSession);
router.delete("/:id", isVerified, onlyAdmins, SessionController.deleteSession);

module.exports = router;
