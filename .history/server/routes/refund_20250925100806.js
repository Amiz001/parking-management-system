
const express = require("express");
const router = express.Router();
const { submitRefund } = require("../controllers/refundController");

router.post("/", submitRefund);

module.exports = router;
