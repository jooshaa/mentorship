const Location = require("../models/location");
const { successMessage, errorMessage } = require("../helper/send.Err_Suc");


const createLocation = async (req, res) => {
  try {
    const newLocation = await Location.create(req.body);
    return successMessage(res, 201, "Location created", newLocation);
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error creating location");
  }
};


const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.findAll();
    return successMessage(res, 200, "All locations", locations);
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error fetching locations");
  }
};


const getLocationById = async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.id);
    if (!location) return errorMessage(res, "Location not found", 404, "Not found");

    return successMessage(res, 200, "Location found", location);
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error fetching location");
  }
};


const updateLocation = async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.id);
    if (!location) return errorMessage(res, "Location not found", 404, "Not found");

    await location.update(req.body);
    return successMessage(res, 200, "Location updated", location);
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error updating location");
  }
};


const deleteLocation = async (req, res) => {
  try {
    const location = await Location.findByPk(req.params.id);
    if (!location) return errorMessage(res, "Location not found", 404, "Not found");

    await location.destroy();
    return successMessage(res, 200, "Location deleted");
  } catch (error) {
    return errorMessage(res, error.message, 500, "Error deleting location");
  }
};

module.exports = {
  createLocation,
  getAllLocations,
  getLocationById,
  updateLocation,
  deleteLocation,
};
