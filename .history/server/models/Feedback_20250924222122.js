import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },        // 👤 User's name
  email: { type: String, required: true },       // 📧 User's email
  category: { type: String, required: true },    // 📂 Feedback category
  feedback: { type: String, required: true },    // 📝 Feedback text
  rating: { type: Number, min: 0, max: 5 },      // ⭐ Rating (0–5)
  createdAt: { type: Date, default: Date.now }   // ⏰ Timestamp
});

const Feedback = mongoose.model("Feedback", feedbackSchema);
export default Feedback;
