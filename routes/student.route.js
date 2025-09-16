const express = require("express");
const router = express.Router();
const validate = require("../middleware/validation/joi.validator");
const studentController = require("../controllers/student.controller");
const { createStudentSchema, updateStudentSchema } = require("../validations/student.validation");


router.post("/", validate(createStudentSchema), studentController.createStudent);
router.get("/", studentController.getAllStudents);
router.get("/:id", studentController.getStudentById);
router.patch("/:id", validate(updateStudentSchema), studentController.updateStudent);
router.delete("/:id", studentController.deleteStudent);

module.exports = router;
