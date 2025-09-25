// ===================== IMPORTS =====================
import React, { useState } from "react"; 
// React library: needed to create components
// useState: React hook to manage state variables

import Axios from "axios"; 
// Axios library for making HTTP requests (to send feedback to server)

import { Sun, Moon } from "lucide-react"; 
// Sun and Moon icons for theme toggle (light/dark mode)

import { FaStar } from "react-icons/fa"; 
// Font Awesome star icon for rating system

// ===================== COMPONENT =====================
const FeedbackFormDashboard = () => {
  // ----------------- STATES -----------------
  const [lightMode, setLightMode] = useState(false); 
  // Boolean state to switch between light and dark themes

  const [name, setName] = useState(""); 
  // Input state for user's name

  const [email, setEmail] = useState(""); 
  // Input state for user's email

  const [feedback, setFeedback] = useState(""); 
  // Input state for user's feedback message

  const [category, setCategory] = useState("General"); 
  // Input state for feedback category (dropdown)

  const [rating, setRating] = useState(0); 
  // Stores user's selected star rating (1-5)

  const [hoverRating, setHoverRating] = useState(0); 
  // Stores star currently hovered over for hover effect

  const [submitted, setSubmitted] = useState(false); 
  // Boolean to check if feedback is submitted successfully

  const [error, setError] = useState(""); 
  // String for validation or network errors

  // ----------------- HANDLE SUBMIT FUNCTION -----------------
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    // Prevent default form submit (page reload)

    setError(""); 
    // Reset error message before submission

    // Simple validation: check required fields
    if (!name || !email || !feedback) {
      setError("Please fill in all required fields."); 
      return; // Stop submission if validation fails
    }

    try {
      // Make POST request to backend API
      const response = await Axios.post("http://localhost:5000/api/feedback", {
        name,
        email,
        category,
        feedback,
        rating,
      });

      // If server responds with success
      if (response.status === 200 || response.status === 201) {
        setSubmitted(true); // Show thank you message
        // Reset form fields
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
      console.error(err); // Log network errors
    }
  };

  // ===================== RETURN JSX =====================
  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen px-4 ${
        lightMode
          ? "bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-black"
          : "bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#3b0764] text-white"
      }`}
    >
      {/* ----------------- HEADER ----------------- */}
      <header className="w-full flex justify-end items-center p-6 gap-4 max-w-4xl">
        {/* Sun icon to activate light mode */}
        <Sun
          onClick={() => setLightMode(true)}
          size={22}
          className={`cursor-pointer ${lightMode ? "text-yellow-500" : "text-gray-400"}`}
        />
        {/* Moon icon to activate dark mode */}
        <Moon
          onClick={() => setLightMode(false)}
          size={22}
          className={`cursor-pointer ${!lightMode ? "text-yellow-500" : "text-gray-700"}`}
        />
      </header>

      {/* ----------------- FORM CARD ----------------- */}
      <div
        className={`w-full max-w-2xl rounded-2xl p-8 shadow-xl backdrop-blur-lg ${
          lightMode
            ? "bg-white/90 border border-gray-200"
            : "bg-gradient-to-b from-[#151821]/90 to-[#242938]/90 border border-gray-800"
        }`}
      >
        {/* Form Title */}
        <h1 className="text-3xl font-bold mb-2 text-center">Share Your Feedback</h1>
        {/* Form Subtitle */}
        <p className={`mb-6 text-center ${lightMode ? "text-gray-600" : "text-gray-400"}`}>
          Help us improve by sharing your thoughts 🌍✨
        </p>

        {/* ----------------- SUBMISSION MESSAGE ----------------- */}
        {submitted ? (
          <div className={`text-center font-semibold ${lightMode ? "text-green-600" : "text-green-400"}`}>
            ✅ Thank you for your feedback!
          </div>
        ) : (
          /* ----------------- FORM ----------------- */
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Show validation or network error */}
            {error && <div className="text-red-500">{error}</div>}

            {/* --------- NAME INPUT --------- */}
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

            {/* --------- EMAIL INPUT --------- */}
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

            {/* --------- CATEGORY SELECT --------- */}
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

            {/* --------- FEEDBACK TEXTAREA --------- */}
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

            {/* --------- RATING STARS --------- */}
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
                    color={star <= (hoverRating || rating) ? "#FFD700" : "#555"} // gold if selected or hovered
                    onClick={() => setRating(star)} // set rating on click
                    onMouseEnter={() => setHoverRating(star)} // highlight on hover
                    onMouseLeave={() => setHoverRating(0)} // reset hover when leaving
                  />
                ))}
                <span className="ml-2 text-sm text-gray-400">{rating ? `${rating}/5` : "No rating"}</span>
              </div>
            </div>

            {/* --------- SUBMIT BUTTON --------- */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:opacity-90 transition"
            >
              🚀 Submit Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// Export component to use in other parts of app
export default FeedbackFormDashboard;
