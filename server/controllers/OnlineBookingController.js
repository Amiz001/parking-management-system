// server/controllers/physicalBookingController.js
const PhysicalBooking = require("../models/PhysicalBookingModel");

// ✅ Get all bookings
const getAllBookings = async (req, res, next) => {
  let bookings;
  try {
    bookings = await PhysicalBooking.find();
  } catch (error) {
    return res.status(500).json({ message: "Error fetching bookings", error: error.message });
  }

  if (!bookings || bookings.length === 0) {
    return res.status(404).json({ message: "No bookings found" });
  }
  return res.status(200).json({ bookings });
};

// ✅ Add a new booking
const addBookings = async (req, res, next) => {
  const { slotId, vehicleNumber, entryDate, entryTime, exitDate, exitTime, amount } = req.body;
  let booking;

  try {
    booking = new PhysicalBooking({
      bookingId,  
      slotId,
      vehicleNumber,
      customerName,
      cusPhoneNumber,
      entryDate: entryDate ? new Date(entryDate) : undefined,
      entryTime,
      exitDate: exitDate ? new Date(exitDate) : undefined,
      exitTime,
      amount,
    });

    await booking.save();
  } catch (error) {
    return res.status(500).json({ message: "Unable to add booking", error: error.message });
  }

  if (!booking) {
    return res.status(500).json({ message: "Unable to add booking" });
  }

  return res.status(201).json({ booking });
};

// ✅ Get booking by ID
const getById = async (req, res, next) => {
  const id = req.params.id;
  let booking;

  try {
    booking = await PhysicalBooking.findById(id);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching booking", error: error.message });
  }

  if (!booking) {
    return res.status(404).json({ message: "Booking not found" });
  }

  return res.status(200).json({ booking });
};

// ✅ Update booking
const updateBookings = async (req, res) => {
  const id = req.params.id;
  const { slotId, vehicleNumber, entryDate, entryTime, exitDate, exitTime, amount } = req.body;

  // ✅ Combine date + time into full Date objects
  const entryDateTime = entryDate && entryTime ? new Date(`${entryDate}T${entryTime}`) : null;
  const exitDateTime = exitDate && exitTime ? new Date(`${exitDate}T${exitTime}`) : null;

  try {
    const booking = await PhysicalBooking.findByIdAndUpdate(
      id,
      {
        slotId,
        vehicleNumber,
        customerName,
        cusPhoneNumber,
        entryDate: entryDateTime,
        entryTime,
        exitDate: exitDateTime,
        exitTime,
        amount,
      },
      { new: true, runValidators: true } // ✅ return updated doc & validate
    );

    if (!booking) {
      return res.status(404).json({ message: "Unable to update booking" });
    }

    return res.status(200).json({ booking });
  } catch (error) {
    return res.status(500).json({ message: "Error updating booking", error: error.message });
  }
};


// ✅ Delete booking
const deleteBookings = async (req, res, next) => {
  const id = req.params.id;
  let booking;

  try {
    booking = await PhysicalBooking.findByIdAndDelete(id);
  } catch (error) {
    return res.status(500).json({ message: "Error deleting booking", error: error.message });
  }

  if (!booking) {
    return res.status(404).json({ message: "Unable to delete booking" });
  }

  return res.status(200).json({ message: "Successfully deleted booking" });
};

exports.getAllBookings = getAllBookings;
exports.addBookings = addBookings;
exports.getById = getById;
exports.updateBookings = updateBookings;
exports.deleteBookings = deleteBookings;
