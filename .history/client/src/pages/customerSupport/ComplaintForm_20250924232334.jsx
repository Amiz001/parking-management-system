import React, { useState } from "react";
import { Sun, Moon } from "lucide-react";

const ComplaintForm = () => {
  const [lightMode, setLightMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [complaint, setComplaint] = useState("");
  const [type, setType] = useState("Service");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !complaint) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, type, complaint }),
      });

      const data = await response.json();
      if (response.ok) {
        setSubmitted(true);
        setName("");
        setEmail("");
        setComplaint("");
        setType("Service");
      } else {
        setError(data.message || "Failed to submit complaint.");
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
          className={`cursor-pointer ${
            lightMode ? "text-yellow-500" : "text-gray-400"
          }`}
        />
        <Moon
          onClick={() => setLightMode(false)}
          size={22}
          className={`cursor-pointer ${
            !lightMode ? "text-yellow-500" : "text-gray-700"
          }`}
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
        <h1 className="text-3xl font-bold mb-2 text-center">
          Submit a Complaint
        </h1>
        <p
          className={`mb-6 text-center ${
            lightMode ? "text-gray-600" : "text-gray-400"
          }`}
        >
          Let us know about any issues or concerns you have 🛠️
        </p>

        {submitted ? (
          <div
            className={`text-center font-semibold ${
              lightMode ? "text-green-600" : "text-green-400"
            }`}
          >
            ✅ Your complaint has been submitted!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="text-red-500">{error}</div>}

            {/* Name */}
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
                className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  lightMode
                    ? "bg-white border border-gray-200 text-black"
                    : "bg-[#151821] border border-gray-700 text-white"
                }`}
              />
            </div>

            {/* Email */}
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
                className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  lightMode
                    ? "bg-white border border-gray-200 text-black"
                    : "bg-[#151821] border border-gray-700 text-white"
                }`}
              />
            </div>

            {/* Complaint Type */}
            <div>
              <label
                className={`block mb-2 text-sm font-medium ${
                  lightMode ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Complaint Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  lightMode
                    ? "bg-white border border-gray-200 text-black"
                    : "bg-[#151821] border border-gray-700 text-white"
                }`}
              >
                <option>Service</option>
                <option>Product</option>
                <option>Billing</option>
                <option>Other</option>
              </select>
            </div>

            {/* Complaint Details */}
            <div>
              <label
                className={`block mb-2 text-sm font-medium ${
                  lightMode ? "text-gray-700" : "text-gray-300"
                }`}
              >
                Complaint Details
              </label>
              <textarea
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                rows="5"
                required
                placeholder="Describe your complaint..."
                className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  lightMode
                    ? "bg-white border border-gray-200 text-black"
                    : "bg-[#151821] border border-gray-700 text-white"
                }`}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white font-semibold rounded-lg hover:opacity-90 transition"
            >
              📢 Submit Complaint
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ComplaintForm;
