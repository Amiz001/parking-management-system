const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  vehicleNo: { type: String, required: true, unique: true },
  type: { type: String, enum: ["Bike", "Car", "Van", "Bus", "Lorry"], required: true },
  model: {type: String}
});

module.exports = mongoose.model("Vehicle", VehicleSchema);
