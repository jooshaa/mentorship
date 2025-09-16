const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const courseController = require("../controllers/course.controller");
const { createCourseSchema, updateCourseSchema } = require("../validations/course.validation");


router.post("/", validate(createCourseSchema), courseController.createCourse);
router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourseById);
router.patch("/:id", validate(updateCourseSchema), courseController.updateCourse);
router.delete("/:id", courseController.deleteCourse);

module.exports = router;
