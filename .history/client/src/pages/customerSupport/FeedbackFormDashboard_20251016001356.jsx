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
      className={`relative flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden ${
        lightMode
          ? "bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-black"
          : "bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#3b0764] text-white"
      }`}
    >
      {/* ========== Floating Planet Glow Backgrounds ========== */}
      <motion.div
        className="absolute w-96 h-96 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 rounded-full blur-3xl opacity-30"
        animate={{
          y: [0, 40, 0],
          x: [0, 30, 0],
          rotate: [0, 10, -10, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-indigo-500 via-blue-600 to-cyan-400 rounded-full blur-3xl opacity-20"
        animate={{
          y: [0, -50, 0],
          x: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />

      {/* ----------------- HEADER ----------------- */}
      <header className="w-full flex justify-end items-center p-6 gap-4 max-w-4xl z-10">
        <Sun
          onClick={() => setLightMode(true)}
          size={24}
          className={`cursor-pointer transition-transform hover:scale-110 ${
            lightMode ? "text-yellow-500" : "text-gray-400"
          }`}
        />
        <Moon
          onClick={() => setLightMode(false)}
          size={24}
          className={`cursor-pointer transition-transform hover:scale-110 ${
            !lightMode ? "text-yellow-500" : "text-gray-700"
          }`}
        />
      </header>

      {/* ----------------- FORM CARD ----------------- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`relative z-10 w-full max-w-2xl rounded-2xl p-8 shadow-2xl backdrop-blur-lg border ${
          lightMode
            ? "bg-white/90 border-purple-300"
            : "bg-gradient-to-b from-[#151821]/90 to-[#242938]/90 border border-indigo-700"
        }`}
      >
        {/* Animated Border Glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-transparent"
          animate={{
            background: [
              "linear-gradient(90deg, #8b5cf6, #ec4899, #f59e0b)",
              "linear-gradient(270deg, #3b82f6, #a855f7, #ec4899)",
            ],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          style={{
            mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "2px",
          }}
        ></motion.div>

        {/* Form Title */}
        <motion.h1
          className="text-4xl font-extrabold mb-3 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Share Your Feedback 💫
        </motion.h1>

        <p
          className={`mb-6 text-center text-lg ${
            lightMode ? "text-gray-600" : "text-gray-400"
          }`}
        >
          Help us improve by sharing your cosmic thoughts 🌍✨
        </p>

        {submitted ? (
          <motion.div
            className={`text-center font-semibold text-2xl ${
              lightMode ? "text-green-600" : "text-green-400"
            }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            ✅ Thank you for your stellar feedback!
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {error && <div className="text-red-500 text-center">{error}</div>}

            {/* --------- NAME --------- */}
            <div>
              <label
                className={`block mb-2 text-sm font-medium ${
                  lightMode ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter your name"
                className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all ${
                  lightMode
                    ? "bg-white border border-gray-200 text-black"
                    : "bg-[#151821] border border-gray-700 text-white"
                }`}
              />
            </div>

            {/* --------- EMAIL --------- */}
            <div>
              <label
                className={`block mb-2 text-sm font-medium ${
                  lightMode ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
                className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all ${
                  lightMode
                    ? "bg-white border border-gray-200 text-black"
                    : "bg-[#151821] border border-gray-700 text-white"
                }`}
              />
            </div>

            {/* --------- CATEGORY --------- */}
            <div>
              <label
                className={`block mb-2 text-sm font-medium ${
                  lightMode ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Feedback Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all ${
                  lightMode
                    ? "bg-white border border-gray-200 text-black"
                    : "bg-[#151821] border border-gray-700 text-white"
                }`}
              >
                <option>General</option>
                <option>Bug Report</option>
                <option>Feature Request</option>
                <option>Other</option>
              </select>
            </div>

            {/* --------- FEEDBACK --------- */}
            <div>
              <label
                className={`block mb-2 text-sm font-medium ${
                  lightMode ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Your Feedback
              </label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows="5"
                required
                placeholder="Write your thoughts like stardust..."
                className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all ${
                  lightMode
                    ? "bg-white border border-gray-200 text-black"
                    : "bg-[#151821] border border-gray-700 text-white"
                }`}
              />
            </div>

            {/* --------- RATING --------- */}
            <div>
              <label
                className={`block mb-2 text-sm font-medium ${
                  lightMode ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Your Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.div
                    key={star}
                    whileHover={{ scale: 1.3, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    <FaStar
                      size={30}
                      className="cursor-pointer"
                      color={star <= (hoverRating || rating) ? "#FFD700" : "#555"}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                    />
                  </motion.div>
                ))}
                <span className="ml-2 text-sm text-gray-400">
                  {rating ? `${rating}/5` : "No rating"}
                </span>
              </div>
            </div>

            {/* --------- SUBMIT BUTTON --------- */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className={`w-full py-3 font-semibold rounded-lg shadow-lg text-white ${
                lightMode
                  ? "bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400"
                  : "bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600"
              }`}
            >
              🚀 Submit Feedback
            </motion.button>
          </motion.form>
        )}
      </motion.div>
    </div>
  );
};

// Export
export default FeedbackFormDashboard;
