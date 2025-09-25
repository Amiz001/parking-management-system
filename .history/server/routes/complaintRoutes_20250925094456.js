const express = require("express");
const router = express.Router();
const {  submitComplaint  } = require("../controllers/complaintController");

router.post("/", submitComplaint);

module.exports = router;
