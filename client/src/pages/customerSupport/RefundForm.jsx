// Importing React and useState hook for managing component state
import React, { useState } from "react";

// Importing Axios for making HTTP requests
import Axios from "axios";

// Importing Sun and Moon icons from lucide-react for theme toggling
import { Sun, Moon } from "lucide-react";

// Functional component for the Refund Form Dashboard
const RefundFormDashboard = () => {
  // State to toggle light/dark theme
  const [lightMode, setLightMode] = useState(false);

  // State variables to store user input
  const [name, setName] = useState("");        // Name of user
  const [email, setEmail] = useState("");      // Email of user
  const [orderId, setOrderId] = useState("");  // Order ID for refund
  const [reason, setReason] = useState("");    // Reason for refund
  const [amount, setAmount] = useState("");    // Refund amount

  // State to track form submission success
  const [submitted, setSubmitted] = useState(false);

  // State to store error messages
  const [error, setError] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission (page reload)
    setError("");       // Clear previous errors

    // Validation: check if any field is empty
    if (!name || !email || !orderId || !reason || !amount) {
      setError("Please fill in all required fields."); // Show error message
      return; // Stop submission
    }

    try {
      // Send POST request to backend API with form data
      const response = await Axios.post("http://localhost:5000/api/refund", {
        name,
        email,
        orderId,
        reason,
        amount,
      });

      // Check if request was successful
      if (response.status === 200 || response.status === 201) {
        setSubmitted(true); // Mark form as submitted
        // Reset all input fields
        setName("");
        setEmail("");
        setOrderId("");
        setReason("");
        setAmount("");
      } else {
        // Handle failure response from server
        setError(response.data.message || "Failed to submit refund request.");
      }
    } catch (err) {
      // Handle network errors
      setError("Network error: Could not connect to server.");
      console.error(err);
    }
  };

  // JSX: the rendered UI
  return (
    <div
      // Main container with full screen height, centered content, and padding
      className={`flex flex-col items-center justify-center min-h-screen px-4 ${
        lightMode
          ? "bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-black" // Light theme
          : "bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#3b0764] text-white" // Dark theme
      }`}
    >
      {/* Header with theme toggle */}
      <header className="w-full flex justify-end items-center p-6 gap-4 max-w-4xl">
        {/* Sun icon toggles light mode */}
        <Sun
          onClick={() => setLightMode(true)}
          size={22}
          className={`cursor-pointer ${lightMode ? "text-yellow-500" : "text-gray-400"}`}
        />
        {/* Moon icon toggles dark mode */}
        <Moon
          onClick={() => setLightMode(false)}
          size={22}
          className={`cursor-pointer ${!lightMode ? "text-yellow-500" : "text-gray-700"}`}
        />
      </header>

      {/* Form Card container */}
      <div
        className={`w-full max-w-2xl rounded-2xl p-8 shadow-xl backdrop-blur-lg ${
          lightMode
            ? "bg-white/90 border border-gray-200" // Light card background
            : "bg-gradient-to-b from-[#151821]/90 to-[#242938]/90 border border-gray-800" // Dark card background
        }`}
      >
        {/* Form Title */}
        <h1 className="text-3xl font-bold mb-2 text-center">Refund Request Form</h1>

        {/* Form Subtitle */}
        <p className={`mb-6 text-center ${lightMode ? "text-gray-600" : "text-gray-400"}`}>
          Please fill in your details to request a refund 💳💰
        </p>

        {/* Show success message if submitted */}
        {submitted ? (
          <div className={`text-center font-semibold ${lightMode ? "text-green-600" : "text-green-400"}`}>
            ✅ Your refund request has been submitted!
          </div>
        ) : (
          // The actual form
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Display error message */}
            {error && <div className="text-red-500">{error}</div>}

            {/* Name Input */}
            <div>
              <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>
                Name
              </label>
              <input
                type="text"
                value={name} // Bind state
                onChange={(e) => setName(e.target.value)} // Update state
                required
                placeholder="Enter your name"
                className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  lightMode ? "bg-white border border-gray-200 text-black" : "bg-[#151821] border border-gray-700 text-white"
                }`}
              />
            </div>

            {/* Email Input */}
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

            {/* Order ID Input */}
            <div>
              <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>
                Order ID
              </label>
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                required
                placeholder="Enter your order ID"
                className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  lightMode ? "bg-white border border-gray-200 text-black" : "bg-[#151821] border border-gray-700 text-white"
                }`}
              />
            </div>

            {/* Refund Amount Input */}
            <div>
              <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>
                Refund Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                placeholder="Enter refund amount"
                className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  lightMode ? "bg-white border border-gray-200 text-black" : "bg-[#151821] border border-gray-700 text-white"
                }`}
              />
            </div>

            {/* Reason Textarea */}
            <div>
              <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>
                Reason for Refund
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows="5"
                required
                placeholder="Explain the reason for your refund request..."
                className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  lightMode ? "bg-white border border-gray-200 text-black" : "bg-[#151821] border border-gray-700 text-white"
                }`}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:opacity-90 transition"
            >
              💳 Submit Refund Request
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// Export component so it can be used in other files
export default RefundFormDashboard;
