// Import React and useState hook to manage component state
import React, { useState } from "react";

// Import Axios to handle HTTP requests to the backend API
import Axios from "axios";

// Import Sun and Moon icons from lucide-react to toggle light/dark theme
import { Sun, Moon } from "lucide-react";

// Functional component for the Ticket Form Dashboard
const TicketFormDashboard = () => {
  // State to toggle between light mode and dark mode
  const [lightMode, setLightMode] = useState(false);

  // States to store form input values
  const [name, setName] = useState("");           // User's name
  const [email, setEmail] = useState("");         // User's email
  const [subject, setSubject] = useState("");     // Ticket subject
  const [description, setDescription] = useState(""); // Ticket description
  const [priority, setPriority] = useState("Low");    // Ticket priority, default is "Low"

  // State to indicate successful form submission
  const [submitted, setSubmitted] = useState(false);

  // State to store error messages for validation or network errors
  const [error, setError] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission (page reload)
    setError("");       // Clear any previous error messages

    // Simple validation: check if required fields are filled
    if (!name || !email || !subject || !description) {
      setError("Please fill in all required fields."); // Show error
      return; // Stop submission
    }

    try {
      // Send a POST request to the backend API with form data
      const response = await Axios.post("http://localhost:5000/api/ticket", {
        name,
        email,
        subject,
        description,
        priority,
      });

      // Check if the response indicates success (status 200 or 201)
      if (response.status === 200 || response.status === 201) {
        setSubmitted(true); // Mark form as submitted

        // Reset all form fields
        setName("");
        setEmail("");
        setSubject("");
        setDescription("");
        setPriority("Low");
      } else {
        // Handle failure response from server
        setError(response.data.message || "Failed to submit ticket.");
      }
    } catch (err) {
      // Handle network or other unexpected errors
      setError("Network error: Could not connect to server.");
      console.error(err);
    }
  };

  // JSX: the UI rendering
  return (
    <div
      // Main container for the page
      className={`flex flex-col items-center justify-center min-h-screen px-4 ${
        lightMode
          ? "bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-black" // Light mode background gradient
          : "bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#3b0764] text-white" // Dark mode background gradient
      }`}
    >
      {/* Header section with theme toggle */}
      <header className="w-full flex justify-end items-center p-6 gap-4 max-w-4xl">
        {/* Sun icon to switch to light mode */}
        <Sun
          onClick={() => setLightMode(true)} // Clicking sets lightMode to true
          size={22}
          className={`cursor-pointer ${lightMode ? "text-yellow-500" : "text-gray-400"}`} // Highlight if active
        />
        {/* Moon icon to switch to dark mode */}
        <Moon
          onClick={() => setLightMode(false)} // Clicking sets lightMode to false
          size={22}
          className={`cursor-pointer ${!lightMode ? "text-yellow-500" : "text-gray-700"}`} // Highlight if active
        />
      </header>

      {/* Card container for the form */}
      <div
        className={`w-full max-w-2xl rounded-2xl p-8 shadow-xl backdrop-blur-lg ${
          lightMode
            ? "bg-white/90 border border-gray-200" // Light mode card
            : "bg-gradient-to-b from-[#151821]/90 to-[#242938]/90 border border-gray-800" // Dark mode card
        }`}
      >
        {/* Title */}
        <h1 className="text-3xl font-bold mb-2 text-center">Submit a Support Ticket</h1>

        {/* Subtitle */}
        <p className={`mb-6 text-center ${lightMode ? "text-gray-600" : "text-gray-400"}`}>
          We're here to help! Please provide details about your issue 🛠️
        </p>

        {/* Show success message if form was submitted */}
        {submitted ? (
          <div className={`text-center font-semibold ${lightMode ? "text-green-600" : "text-green-400"}`}>
            ✅ Your ticket has been submitted!
          </div>
        ) : (
          // Form starts here
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error message */}
            {error && <div className="text-red-500">{error}</div>}

            {/* Name input field */}
            <div>
              <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>
                Name
              </label>
              <input
                type="text"
                value={name} // Bind input to state
                onChange={(e) => setName(e.target.value)} // Update state on change
                placeholder="Enter your name"
                className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  lightMode ? "bg-white border border-gray-200 text-black" : "bg-[#151821] border border-gray-700 text-white"
                }`}
                required
              />
            </div>

            {/* Email input field */}
            <div>
              <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  lightMode ? "bg-white border border-gray-200 text-black" : "bg-[#151821] border border-gray-700 text-white"
                }`}
                required
              />
            </div>

            {/* Subject input field */}
            <div>
              <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter ticket subject"
                className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  lightMode ? "bg-white border border-gray-200 text-black" : "bg-[#151821] border border-gray-700 text-white"
                }`}
                required
              />
            </div>

            {/* Description textarea */}
            <div>
              <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="5"
                placeholder="Describe your issue in detail"
                className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  lightMode ? "bg-white border border-gray-200 text-black" : "bg-[#151821] border border-gray-700 text-white"
                }`}
                required
              />
            </div>

            {/* Priority select */}
            <div>
              <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>
                Priority
              </label>
              <select
                value={priority} // Bind select to state
                onChange={(e) => setPriority(e.target.value)} // Update state on change
                className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  lightMode ? "bg-white border border-gray-200 text-black" : "bg-[#151821] border border-gray-700 text-white"
                }`}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:opacity-90 transition"
            >
              📨 Submit Ticket
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

// Export component for use in other parts of the app
export default TicketFormDashboard;
