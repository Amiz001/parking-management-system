// Import necessary modules from React and external libraries
import React, { useState } from "react"; // React library and useState hook for managing component state
import Axios from "axios"; // Axios library for making HTTP requests
import { Sun, Moon } from "lucide-react"; // Import icons for theme toggle (light/dark mode)

const ComplaintForm = () => {
  // State variables
  const [lightMode, setLightMode] = useState(false); // Boolean to track light or dark theme
  const [name, setName] = useState(""); // Store user's name input
  const [email, setEmail] = useState(""); // Store user's email input
  const [subject, setSubject] = useState(""); // Store complaint subject input
  const [complaint, setComplaint] = useState(""); // Store detailed complaint input
  const [submitted, setSubmitted] = useState(false); // Track if form has been successfully submitted
  const [error, setError] = useState(""); // Store error messages to display to user

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default page reload on form submit
    setError(""); // Reset previous errors

    // Validate that all required fields are filled
    if (!name || !email || !subject || !complaint) {
      setError("Please fill in all required fields."); // Show error if any field is empty
      return; // Stop execution
    }

    try {
      // Send POST request to backend API with complaint data
      const response = await Axios.post("http://localhost:5000/api/complaint", {
        name,
        email,
        subject,
        complaint,
      });

      // Check if the request was successful
      if (response.status === 200 || response.status === 201) {
        setSubmitted(true); // Mark as submitted
        // Reset form fields
        setName("");
        setEmail("");
        setSubject("");
        setComplaint("");
      } else {
        setError(response.data.message || "Failed to submit complaint."); // Handle API error
      }
    } catch (err) {
      setError("Network error: Could not connect to server."); // Handle network errors
      console.error(err); // Log error in console for debugging
    }
  };

  return (
    // Container div for full-screen layout with dynamic background based on theme
    <div
      className={`flex flex-col items-center justify-center min-h-screen px-4 ${
        lightMode
          ? "bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-black" // Light mode gradient
          : "bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#3b0764] text-white" // Dark mode gradient
      }`}
    >
      {/* Header with theme toggle buttons */}
      <header className="w-full flex justify-end items-center p-6 gap-4 max-w-4xl">
        {/* Sun icon for light mode */}
        <Sun
          onClick={() => setLightMode(true)} // Clicking sets light mode
          size={22}
          className={`cursor-pointer ${lightMode ? "text-yellow-500" : "text-gray-400"}`} // Highlight if active
        />
        {/* Moon icon for dark mode */}
        <Moon
          onClick={() => setLightMode(false)} // Clicking sets dark mode
          size={22}
          className={`cursor-pointer ${!lightMode ? "text-yellow-500" : "text-gray-700"}`} // Highlight if active
        />
      </header>

      {/* Form Card Container */}
      <div
        className={`w-full max-w-2xl rounded-2xl p-8 shadow-xl backdrop-blur-lg ${
          lightMode
            ? "bg-white/90 border border-gray-200" // Light mode card style
            : "bg-gradient-to-b from-[#151821]/90 to-[#242938]/90 border border-gray-800" // Dark mode card style
        }`}
      >
        {/* Form Header */}
        <h1 className="text-3xl font-bold mb-2 text-center">Submit a Complaint</h1>
        <p className={`mb-6 text-center ${lightMode ? "text-gray-600" : "text-gray-400"}`}>
          We value your feedback. Please let us know your concerns.
        </p>

        {/* Conditional rendering: Show success message if submitted */}
        {submitted ? (
          <div className={`text-center font-semibold ${lightMode ? "text-green-600" : "text-green-400"}`}>
            ✅ Your complaint has been submitted successfully!
          </div>
        ) : (
          // Form fields for user input
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Display validation or submission errors */}
            {error && <div className="text-red-500">{error}</div>}

            {/* Name Input */}
            <div>
              <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>
                Name
              </label>
              <input
                type="text"
                value={name} // Bind input to state
                onChange={(e) => setName(e.target.value)} // Update state on change
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

            {/* Complaint Subject Input */}
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

            {/* Complaint Details Textarea */}
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

// Export the component to be used in other parts of the app
export default ComplaintForm;
