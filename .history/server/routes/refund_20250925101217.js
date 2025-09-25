
const express = require("express");
const router = express.Router();
const { submitrefund } = require("../controllers/refundController");

router.post("/", submitrefund);

module.exports = router;
