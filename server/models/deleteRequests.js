const mongoose = require('mongoose');

const DeleteRequestSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  reason: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "declined"],
    default: "pending",
  },
}, { timestamps: true });

module.exports = mongoose.model("DeleteRequest", DeleteRequestSchema);
