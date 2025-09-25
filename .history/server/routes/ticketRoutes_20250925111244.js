

const express = require("express");
const router = express.Router();
const { submitticket } = require("../controllers/ticketController");

router.post("/", submitticket);

module.exports = router;
