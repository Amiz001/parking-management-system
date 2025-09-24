
const mongoose = require('mongoose');

const zoneSchema = new mongoose.Schema({
  zoneId: { type: String, unique: true, required: true }, // e.g. 4WA, 3WB
  zoneName: { type: String, required: true },
  totalSlots: { type: Number, required: true },
  parkType: { type: String, enum: ["4wheel", "3wheel", "2wheel"], required: true },
  status: { type: String, enum: ["active", "disabled"], default: "active" }
}, { timestamps: true });

module.exports = mongoose.model('Zone', zoneSchema);
