import React, { useState } from "react";
import Axios from "axios";
import { Sun, Moon } from "lucide-react";

const TicketFormDashboard = () => {
  const [lightMode, setLightMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !subject || !description) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const response = await Axios.post("http://localhost:5000/api/ticket", {
        name,
        email,
        subject,
        description,
        priority,
      });

      if (response.status === 200 || response.status === 201) {
        setSubmitted(true);
        setName("");
        setEmail("");
        setSubject("");
        setDescription("");
        setPriority("Low");
      } else {
        setError(response.data.message || "Failed to submit ticket.");
      }
    } catch (err) {
      setError("Network error: Could not connect to server.");
      console.error(err);
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen px-4 ${
        lightMode
          ? "bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-black"
          : "bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#3b0764] text-white"
      }`}
    >
      {/* Header with theme toggle */}
      <header className="w-full flex justify-end items-center p-6 gap-4 max-w-4xl">
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

      {/* Form Card */}
      <div
        className={`w-full max-w-2xl rounded-2xl p-8 shadow-xl backdrop-blur-lg ${
          lightMode
            ? "bg-white/90 border border-gray-200"
            : "bg-gradient-to-b from-[#151821]/90 to-[#242938]/90 border border-gray-800"
        }`}
      >
        <h1 className="text-3xl font-bold mb-2 text-center">Submit a Support Ticket</h1>
        <p className={`mb-6 text-center ${lightMode ? "text-gray-600" : "text-gray-400"}`}>
          We're here to help! Please provide details about your issue 🛠️
        </p>

        {submitted ? (
          <div className={`text-center font-semibold ${lightMode ? "text-green-600" : "text-green-400"}`}>
            ✅ Your ticket has been submitted!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="text-red-500">{error}</div>}

            {/* Name */}
            <div>
              <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  lightMode ? "bg-white border border-gray-200 text-black" : "bg-[#151821] border border-gray-700 text-white"
                }`}
                required
              />
            </div>

            {/* Email */}
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

            {/* Subject */}
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

            {/* Description */}
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

            {/* Priority */}
            <div>
              <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  lightMode ? "bg-white border border-gray-200 text-black" : "bg-[#151821] border border-gray-700 text-white"
                }`}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            {/* Submit */}
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

export default TicketFormDashboard;
