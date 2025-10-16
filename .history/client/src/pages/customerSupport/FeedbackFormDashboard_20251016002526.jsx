// ===================== IMPORTS =====================
import React, { useState } from "react";
import Axios from "axios";
import { Sun, Moon } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

// ===================== COMPONENT =====================
const FeedbackFormDashboard = () => {
  // ----------------- STATES -----------------
  const [lightMode, setLightMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [category, setCategory] = useState("General");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // ----------------- HANDLE SUBMIT FUNCTION -----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !feedback) {
      setError("Please fill in all required fields.");
      return;
    }
    try {
      const response = await Axios.post("http://localhost:5000/feedbacks", {
        name,
        email,
        category,
        feedback,
        rating,
      });

      if (response.status === 200 || response.status === 201) {
        setSubmitted(true);
        setName("");
        setEmail("");
        setFeedback("");
        setCategory("General");
        setRating(0);
      } else {
        setError(response.data.message || "Failed to submit feedback.");
      }
    } catch (err) {
      setError("Network error: Could not connect to server.");
      console.error(err);
    }
  };

  // ===================== RETURN JSX =====================
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen px-4 
        ${lightMode
          ? "bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-200 text-black"
          : "bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#3b0764] text-white"
      } relative overflow-hidden`}
    >
      {/* Floating "planet" circles */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-blue-500/40 rounded-full animate-pulse-slow blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500/30 rounded-full animate-pulse-slow blur-2xl"></div>
      <div className="absolute top-1/3 right-1/2 w-16 h-16 bg-indigo-400/40 rounded-full animate-pulse-slow blur-xl"></div>

      {/* ----------------- HEADER ----------------- */}
      <header className="w-full flex justify-end items-center p-6 gap-4 max-w-4xl z-10">
        <Sun
          onClick={() => setLightMode(true)}
          size={22}
          className={`cursor-pointer ${lightMode ? "text-yellow-500" : "text-gray-400"}`}
        />
        <Moon
          onClick={() => setLightMode(false)}
          size={22}
          className={`cursor-pointer ${!lightMode ? "text-yellow-500" : "text-gray-700"}`}
        />
      </header>

      {/* ----------------- FORM CARD ----------------- */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`w-full max-w-2xl rounded-2xl p-8 shadow-xl backdrop-blur-lg z-10 
          ${lightMode
            ? "bg-white/90 border border-gray-200"
            : "bg-gradient-to-b from-[#151821]/90 to-[#242938]/90 border border-gray-800"
          }`}
      >
        <h1 className="text-3xl font-bold mb-2 text-center">Share Your Feedback</h1>
        <p className={`mb-6 text-center ${lightMode ? "text-gray-600" : "text-gray-400"}`}>
          Help us improve by sharing your thoughts 🌍✨
        </p>

        {submitted ? (
          <div className={`text-center font-semibold ${lightMode ? "text-green-600" : "text-green-400"}`}>
            ✅ Thank you for your feedback!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="text-red-500">{error}</div>}

            {/* NAME */}
            <div>
              <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your name"
                className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  lightMode ? "bg-white border border-gray-200 text-black" : "bg-[#151821] border border-gray-700 text-white"
                }`}
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  lightMode ? "bg-white border border-gray-200 text-black" : "bg-[#151821] border border-gray-700 text-white"
                }`}
              />
            </div>

            {/* CATEGORY */}
            <div>
              <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>
                Feedback Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  lightMode ? "bg-white border border-gray-200 text-black" : "bg-[#151821] border border-gray-700 text-white"
                }`}
              >
                <option>General</option>
                <option>Bug Report</option>
                <option>Feature Request</option>
                <option>Other</option>
              </select>
            </div>

            {/* FEEDBACK */}
            <div>
              <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>
                Your Feedback
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows="5"
                required
                placeholder="Write your feedback here..."
                className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  lightMode ? "bg-white border border-gray-200 text-black" : "bg-[#151821] border border-gray-700 text-white"
                }`}
              />
            </div>

            {/* RATING */}
            <div>
              <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>
                Your Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    size={28}
                    className="cursor-pointer transition-transform hover:scale-110"
                    color={star <= (hoverRating || rating) ? "#FFD700" : "#555"}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-400">{rating ? `${rating}/5` : "No rating"}</span>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <motion.button
              whileHover={{ scale: 1.07, boxShadow: "0px 0px 20px rgba(56, 189, 248, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3 rounded-lg text-white font-semibold 
                         bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700
                         shadow-lg shadow-indigo-700/40 hover:shadow-blue-500/50 
                         transition-all duration-300"
            >
              🌌 Submit Feedback
            </motion.button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default FeedbackFormDashboard;
