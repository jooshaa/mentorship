const express = require("express");
const router = express.Router();
const validate = require("../middleware/validation/joi.validator");
const courseController = require("../controllers/course.controller");
const { createCourseSchema, updateCourseSchema } = require("../validations/course.validation");
const isVerified = require('../middleware/guards/authMiddleware')
const onlyAdmins = require('../middleware/guards/onlyAdmins')
const selfUser = require('../middleware/guards/selfStudent')

router.post("/",  validate(createCourseSchema),  isVerified, onlyAdmins, courseController.createCourse);///mentors also can add lesson or admin
router.get("/", isVerified, onlyAdmins, courseController.getAllCourses);
router.get("/:id", isVerified, selfUser, onlyAdmins, courseController.getCourseById);
router.patch("/:id",   validate(updateCourseSchema), isVerified, onlyAdmins, courseController.updateCourse);
router.delete("/:id",  isVerified, onlyAdmins, courseController.deleteCourse);

module.exports = router;
