const express = require("express");
const router = express.Router();

const PhysicalBookingController = require("../controllers/PhysicalBookingController");

// Routes
router.get("/", PhysicalBookingController.getAllBookings); // GET all
router.post("/", PhysicalBookingController.addBookings);   // POST new
router.get("/:id", PhysicalBookingController.getById);     // GET by ID
router.put("/:id",PhysicalBookingController.updateBookings);  // Update 
router.delete("/:id",PhysicalBookingController.deleteBookings);  //Delete

module.exports = router;

