const express = require("express");
const router = express.Router();
const validate = require("../middleware/validation/joi.validator");
const locationController = require("../controllers/location.controller");
const { createLocationSchema, updateLocationSchema } = require("../validations/location.validation");
const isVerified = require('../middleware/guards/authMiddleware')
const onlyAdmins = require('../middleware/guards/onlyAdmins')
const selfUser = require('../middleware/guards/selfStudent');



router.post("/", validate(createLocationSchema),isVerified, onlyAdmins, locationController.createLocation);
router.get("/", isVerified, onlyAdmins, locationController.getAllLocations);
router.get("/:id",isVerified, selfUser, onlyAdmins, locationController.getLocationById);
router.patch("/:id", isVerified, onlyAdmins, validate(updateLocationSchema), locationController.updateLocation);
router.delete("/:id", isVerified, onlyAdmins, locationController.deleteLocation);

module.exports = router;
