const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const contractController = require("../controllers/contract.controller");
const { createContractSchema, updateContractSchema } = require("../validations/contract.validation");


router.post("/", validate(createContractSchema), contractController.createContract);


router.get("/", contractController.getAllContracts);


router.get("/:id", contractController.getContractById);


router.patch("/:id", validate(updateContractSchema), contractController.updateContract);


router.delete("/:id", contractController.deleteContract);

module.exports = router;
