const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const locationController = require("../controllers/location.controller");
const { createLocationSchema, updateLocationSchema } = require("../validations/location.validation");


router.post("/", validate(createLocationSchema), locationController.createLocation);
router.get("/", locationController.getAllLocations);
router.get("/:id", locationController.getLocationById);
router.patch("/:id", validate(updateLocationSchema), locationController.updateLocation);
router.delete("/:id", locationController.deleteLocation);

module.exports = router;
