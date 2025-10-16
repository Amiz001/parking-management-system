const Complaint = require("../models/ComplaintModel");

// Save complaint
const createComplaint = async (req, res, next) => {
  try {
    const { name, email, subject, complaint } = req.body;
    if (!name || !email || !subject || !complaint) {
      const err = new Error("All fields are required");
      err.status = 400;
      throw err; 
    }
    const newComplaint = new Complaint({ name, email, subject, complaint });
    await newComplaint.save();
    res.status(201).json({ message: "Complaint submitted successfully 🚀" });
  } catch (error) {
    next(error);
  }
};

// Fetch all complaints
const getComplaints = async (req, res, next) => {
  try {
    const complaints = await Complaint.find({}).sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (error) {
    next(error);
  }
};

// Reply to a complaint
const replyToComplaint = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;
    if (!reply) {
      const err = new Error("Reply is required");
      err.status = 400;
      throw err;
    }
    const updated = await Complaint.findByIdAndUpdate(
      id,
      { $set: { reply } },
      { new: true }
    );
    if (!updated) {
      const err = new Error("Complaint not found");
      err.status = 404;
      throw err;
    }
    res.status(200).json({ message: "Reply saved", complaint: updated });
  } catch (error) {
    next(error);
  }
};

module.exports = { createComplaint, getComplaints, replyToComplaint };
