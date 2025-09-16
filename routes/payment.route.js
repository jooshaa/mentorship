const express = require("express");
const router = express.Router();
const validate = require("../middleware/validate");
const paymentController = require("../controllers/payment.controller");
const { createPaymentSchema, updatePaymentSchema } = require("../validations/payment.validation");

router.post("/", validate(createPaymentSchema), paymentController.createPayment);
router.get("/", paymentController.getAllPayments);
router.get("/:id", paymentController.getPaymentById);
router.patch("/:id", validate(updatePaymentSchema), paymentController.updatePayment);
router.delete("/:id", paymentController.deletePayment);

module.exports = router;
