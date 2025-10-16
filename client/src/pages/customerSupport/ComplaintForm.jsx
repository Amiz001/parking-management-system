// Import necessary modules from React and external libraries
import React, { useState } from "react"; 
// React: Main library to create UI components
// useState: Hook to manage state within functional components

import Axios from "axios"; 
// Axios: Library to make HTTP requests to a backend API

import { Sun, Moon } from "lucide-react"; 
// Sun & Moon icons for theme toggle (light/dark mode)

const ComplaintForm = () => {
  // ===================== STATE VARIABLES =====================
  const [lightMode, setLightMode] = useState(false); 
  // Boolean: true = light theme, false = dark theme

  const [name, setName] = useState(""); 
  // Stores the name input by the user

  const [email, setEmail] = useState(""); 
  // Stores the email input by the user

  const [subject, setSubject] = useState(""); 
  // Stores the complaint subject input by the user

  const [complaint, setComplaint] = useState(""); 
  // Stores the detailed complaint input

  const [submitted, setSubmitted] = useState(false); 
  // Tracks if the complaint has been successfully submitted

  const [error, setError] = useState(""); 
  // Stores error messages to display to the user

  // ===================== HANDLE FORM SUBMISSION =====================
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    // Prevent page reload on form submission

    setError(""); 
    // Clear any previous errors

    // ===================== VALIDATION =====================
    if (!name || !email || !subject || !complaint) {
      setError("Please fill in all required fields."); 
      // Show error if any field is empty
      return; 
      // Stop submission if validation fails
    }

    try {
      // ===================== API REQUEST =====================
      const response = await Axios.post("http://localhost:5000/api/complaint", {
        name,
        email,
        subject,
        complaint,
      });
      // Send POST request to backend API with form data

      // ===================== SUCCESS CHECK =====================
      if (response.status === 200 || response.status === 201) {
        setSubmitted(true); 
        // Mark form as successfully submitted

        // Reset all input fields
        setName("");
        setEmail("");
        setSubject("");
        setComplaint("");
      } else {
        // Handle unexpected API errors
        setError(response.data.message || "Failed to submit complaint.");
      }
    } catch (err) {
      // Handle network or server errors
      setError("Network error: Could not connect to server.");
      console.error(err); 
      // Log detailed error for debugging
    }
  };

  return (
    // ===================== CONTAINER =====================
    <div
      className={`flex flex-col items-center justify-center min-h-screen px-4 ${
        lightMode
          ? "bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-black" 
          // Light mode background gradient
          : "bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#3b0764] text-white" 
          // Dark mode background gradient
      }`}
    >
      {/* ===================== HEADER ===================== */}
      <header className="w-full flex justify-end items-center p-6 gap-4 max-w-4xl">
        {/* Sun icon: click to switch to light mode */}
        <Sun
          onClick={() => setLightMode(true)} 
          size={22}
          className={`cursor-pointer ${lightMode ? "text-yellow-500" : "text-gray-400"}`} 
        />
        {/* Moon icon: click to switch to dark mode */}
        <Moon
          onClick={() => setLightMode(false)}
          size={22}
          className={`cursor-pointer ${!lightMode ? "text-yellow-500" : "text-gray-700"}`}
        />
      </header>

      {/* ===================== FORM CARD ===================== */}
      <div
        className={`w-full max-w-2xl rounded-2xl p-8 shadow-xl backdrop-blur-lg ${
          lightMode
            ? "bg-white/90 border border-gray-200" 
            // Light mode card styling
            : "bg-gradient-to-b from-[#151821]/90 to-[#242938]/90 border border-gray-800" 
            // Dark mode card styling
        }`}
      >
        {/* Form Title */}
        <h1 className="text-3xl font-bold mb-2 text-center">Submit a Complaint</h1>
        <p className={`mb-6 text-center ${lightMode ? "text-gray-600" : "text-gray-400"}`}>
          We value your feedback. Please let us know your concerns.
        </p>

        {/* ===================== CONDITIONAL RENDERING ===================== */}
        {submitted ? (
          // Show success message if form submitted
          <div className={`text-center font-semibold ${lightMode ? "text-green-600" : "text-green-400"}`}>
            ✅ Your complaint has been submitted successfully!
          </div>
        ) : (
          // Show the form inputs if not submitted
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Display errors if any */}
            {error && <div className="text-red-500">{error}</div>}

            {/* Name Input */}
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

            {/* Complaint Subject */}
            <div>
              <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>
                Complaint Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                placeholder="Enter complaint subject"
                className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  lightMode ? "bg-white border border-gray-200 text-black" : "bg-[#151821] border border-gray-700 text-white"
                }`}
              />
            </div>

            {/* Complaint Details */}
            <div>
              <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>
                Complaint Details
              </label>
              <textarea
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                rows="5"
                required
                placeholder="Describe your complaint..."
                className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  lightMode ? "bg-white border border-gray-200 text-black" : "bg-[#151821] border border-gray-700 text-white"
                }`}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-red-500 via-pink-600 to-purple-500 text-white font-semibold rounded-lg hover:opacity-90 transition"
            >
              🚨 Submit Complaint
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// Export the component to be used in other files
export default ComplaintForm;
