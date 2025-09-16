const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const mentorController = require("../controllers/mentor.controller");
const { createMentorSchema, updateMentorSchema } = require("../validations/mentor.validation");


router.post("/", validate(createMentorSchema), mentorController.createMentor);
router.get("/", mentorController.getAllMentors);
router.get("/:id", mentorController.getMentorById);
router.patch("/:id", validate(updateMentorSchema), mentorController.updateMentor);
router.delete("/:id", mentorController.deleteMentor);

module.exports = router;
