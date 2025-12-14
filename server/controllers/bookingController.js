const Booking = require("../models/bookingModel");
const Slot = require("../models/slots"); 

// Get all bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();

    if (!bookings.length) {
      return res.status(404).json({ message: "No bookings found" });
    }

    return res.status(200).json({ bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return res.status(500).json({ message: "Error fetching bookings", error: error.message });
  }
};

// Add new booking
const addBookings = async (req, res) => {
  const { userId, types, slotId, zone, vehicleNum, date, entryTime, exitTime } = req.body;

  try {
    const booking = new Booking({
      userId,
      types,
      slotId,
      zone,
      vehicleNum,
      date,
      entryTime,
      exitTime,
    });

    await booking.save();

    // Update slot status (if slot exists by slotId string)
    const slotUpdate = await Slot.findOneAndUpdate(
      { slotId: slotId }, 
      { status: "occupied" },
      { new: true }
    );

    if (!slotUpdate) {
      console.warn(`⚠️ Slot ${slotId} not found to update`);
    }

    return res.status(201).json({ message: "Booking created", booking });
  } catch (error) {
    console.error("Error adding booking:", error);
    return res.status(500).json({ message: "Unable to add booking", error: error.message });
  }
};

// Get booking by ID
const getById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.status(200).json({ booking });
  } catch (error) {
    console.error("Error fetching booking:", error);
    return res.status(500).json({ message: "Error fetching booking", error: error.message });
  }
};

// Update booking
const updateBookings = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    return res.status(200).json({ booking });
  } catch (error) {
    console.error("Error updating booking:", error);
    return res.status(500).json({ message: "Error updating booking", error: error.message });
  }
};

// Delete booking
const deleteBookings = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await Slot.findOneAndUpdate({ slotId: booking.slotId }, { status: "available" });

    return res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    console.error("Error deleting booking:", error);
    return res.status(500).json({ message: "Error deleting booking", error: error.message });
  }
};

module.exports = {
  getAllBookings,
  addBookings,
  getById,
  updateBookings,
  deleteBookings,
};