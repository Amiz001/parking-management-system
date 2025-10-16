const express = require("express");
const { createComplaint, getComplaints, replyToComplaint } = require("../controllers/complaintController");
const router = express.Router();

router.post("/", createComplaint);
router.get("/", getComplaints);
router.put("/reply/:id", replyToComplaint);

module.exports = router;
