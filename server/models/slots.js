
const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema({
  slotId: { type: String, required: true, unique: true, index: true }, 
  type: { type: String, enum: ['4wheel', '3wheel', '2wheel'], required: true },
  status: { type: String, enum: ['available', 'disabled', 'emergency', 'occupied'], default: 'available' },
  zone: { type: String, required: true },
  park: { type: String, enum: ['4-Wheeler Park', '3-Wheeler Park', '2-Wheeler Park'], required: true },
  notice: { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Slot', SlotSchema);
