const express = require("express");
const router = express.Router();
const validate = require("../middleware/validation/joi.validator");
const paymentController = require("../controllers/payment.controller");
const { createPaymentSchema, updatePaymentSchema } = require("../validations/payment.validation");
const isVerified = require('../middleware/guards/authMiddleware')
const onlyAdmins = require('../middleware/guards/onlyAdmins')
const selfUser = require('../middleware/guards/selfStudent');


router.post("/", validate(createPaymentSchema), isVerified, onlyAdmins,  paymentController.createPayment);
router.get("/find", isVerified, onlyAdmins, paymentController.findPaid);
router.get("/", isVerified, onlyAdmins, paymentController.getAllPayments);
router.get("/:id", isVerified, selfUser, onlyAdmins, paymentController.getPaymentById);
router.patch("/:id", isVerified, onlyAdmins, validate(updatePaymentSchema), paymentController.updatePayment);
router.delete("/:id", isVerified, onlyAdmins, paymentController.deletePayment);

module.exports = router;
