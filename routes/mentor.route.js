const express = require("express");
const router = express.Router();
const validate = require("../middleware/validation/joi.validator");
const mentorController = require("../controllers/mentor.controller");
const { createMentorSchema, updateMentorSchema } = require("../validations/mentor.validation");
const isVerified = require('../middleware/guards/authMiddleware')
const onlyAdmins = require('../middleware/guards/onlyAdmins')
const selfUser = require('../middleware/guards/selfStudent');



router.post("/", validate(createMentorSchema), isVerified, onlyAdmins, mentorController.createMentor);
router.get("/", isVerified, onlyAdmins, mentorController.getAllMentors);
router.get("/:id", isVerified, selfUser, onlyAdmins, mentorController.getMentorById);
router.patch("/:id", isVerified, onlyAdmins, validate(updateMentorSchema), mentorController.updateMentor);
router.delete("/:id", isVerified , onlyAdmins, mentorController.deleteMentor);

module.exports = router;
