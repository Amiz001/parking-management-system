const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    userId: { type: String }, 
    types: { type: String, enum: ["physical", "online"], required: true },
    slotId: { type: String, required: true },
    zone: { type: String, required: true },
    vehicleNum: { type: String, required: true },
    date: { type: Date, required: true },
    entryTime: { type: String, required: true },
    exitTime: { type: String, required: true },
    status: { type: String, enum: ["pending", "paid"], default: "pending" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
