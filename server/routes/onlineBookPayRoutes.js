// routes/onlineBookPayRoutes.js
const express = require("express");
const router = express.Router();
const OnlineBookPayController = require("../controllers/OnlineBookPayController");

// POST /onlineBookPay/create-intent
router.post("/create-intent", OnlineBookPayController.createPaymentIntent);

// POST /onlineBookPay/add
router.post("/add", OnlineBookPayController.addOnlineBookPay);

// GET /onlineBookPay/all
router.get("/all", OnlineBookPayController.getAllOnlineBookPays);

// PUT /onlineBookPay/:id - optional: to update payment status if needed
// router.put("/:id", OnlineBookPayController.updatePaymentStatus);

module.exports = router;
