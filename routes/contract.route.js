const express = require("express");
const router = express.Router();
const validate = require("../middleware/validation/joi.validator");
const contractController = require("../controllers/contract.controller");
const { createContractSchema, updateContractSchema } = require("../validations/contract.validation");
const isVerified = require('../middleware/guards/authMiddleware')
const onlyAdmins = require('../middleware/guards/onlyAdmins')
const selfUser = require('../middleware/guards/selfStudent')

router.post("/", validate(createContractSchema),isVerified, onlyAdmins, contractController.createContract);
router.get("/", isVerified, onlyAdmins, contractController.getAllContracts);
router.get("/:id", isVerified, selfUser, contractController.getContractById);
router.patch("/:id", validate(updateContractSchema),  isVerified, onlyAdmins, contractController.updateContract);
router.delete("/:id",isVerified, onlyAdmins, contractController.deleteContract);

module.exports = router;
