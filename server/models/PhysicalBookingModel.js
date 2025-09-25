const mongoose = require('mongoose');

const physicalBookingSchema = new mongoose.Schema({
  slotId: { type: String, required: true, unique: true },
  vehicleNumber: { type: String, required: true },
  entryDate: { type: Date, required: true },
  entryTime: { type: String, required: true },
  exitDate: { type: Date, required: true },
  exitTime: { type: String, required: true },
  amount: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('PhysicalBooking', physicalBookingSchema);