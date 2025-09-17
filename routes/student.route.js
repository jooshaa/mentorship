const express = require("express");
const router = express.Router();
const validate = require("../middleware/validation/joi.validator");
const studentController = require("../controllers/student.controller");
const { createStudentSchema, updateStudentSchema } = require("../validations/student.validation");
const isVerified = require('../middleware/guards/authMiddleware')
const onlyAdmins = require('../middleware/guards/onlyAdmins')
const selfUser = require('../middleware/guards/selfStudent');


router.post("/", validate(createStudentSchema), isVerified, onlyAdmins,  studentController.createStudent);
router.get("/active", isVerified, studentController.findByTimeActive);
router.get("/cancelled", isVerified, studentController.findByTimeActivCancelled);
router.get("/", isVerified, onlyAdmins, studentController.getAllStudents);
router.get("/:id", isVerified, selfUser, studentController.getStudentById);
router.patch("/:id",isVerified, selfUser, validate(updateStudentSchema), studentController.updateStudent);
router.delete("/:id", isVerified, selfUser, studentController.deleteStudent);

module.exports = router;
