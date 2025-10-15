const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/bookingController");

router.get("/", bookingController.getAllBookings);      
router.post("/", bookingController.addBookings);         
router.get("/:id", bookingController.getById);          
router.put("/:id", bookingController.updateBookings);    
router.delete("/:id", bookingController.deleteBookings); 

module.exports = router;
