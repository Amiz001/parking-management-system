const express = require("express");
const router = express.Router();

//insert model
const Payment = require("../models/PaymentModel");

//insert controller
const PaymentController = require("../controllers/PaymentController");

router.get("/",PaymentController.getAllPayment);
router.post("/",PaymentController.addPayment);
router.get("/:id",PaymentController.getById);
router.put("/:id",PaymentController.updatePayment);
router.delete("/:id",PaymentController.deletePayment);

//export
module.exports=router;

