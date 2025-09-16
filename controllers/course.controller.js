const Course = require("../models/course");
const { successMessage, errorMessage } = require("../helper/send.Err_Suc");


const createCourse = async (req, res) => {
  try {
    const newCourse = await Course.create(req.body);
    return successMessage(res, 201, " created", newCourse);
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error in creating ");
  }
};


const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.findAll();
    return successMessage(res, 200, "All courses", courses);
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error fetching courses");
  }
};


const getCourseById = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return errorMessage(res, "Course not found", 404, "Not found");

    return successMessage(res, 200, "Course found", course);
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error fetching course");
  }
};


const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return errorMessage(res, "Course not found", 404, "Not found");

    await course.update(req.body);
    return successMessage(res, 200, "Course updated", course);
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error updating course");
  }
};


const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (!course) return errorMessage(res, "Course not found", 404, "Not found");

    await course.destroy();
    return successMessage(res, 200, "Course deleted");
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error deleting course");
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
