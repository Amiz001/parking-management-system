const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema(
  {
    vehicleNumber: { type: String, required: true, trim: true },
    entryDate: { type: Date, default: Date.now },
    duration: { type: String, default: "" },
    amount: { type: Number, required: true }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model('Payment', PaymentSchema);


