// ===================== IMPORTS =====================
import React, { useState } from "react";                 // React and useState hook
import Axios from "axios";                              // Axios for HTTP requests
import { Sun, Moon } from "lucide-react";               // Icons for theme toggle

// ===================== COMPONENT =====================
const RefundFormDashboard = () => {
  // ----------------- STATES -----------------
  const [lightMode, setLightMode] = useState(false);    // Theme toggle
  const [name, setName] = useState("");                 // User name
  const [email, setEmail] = useState("");               // User email
  const [orderId, setOrderId] = useState("");           // Order ID for refund
  const [reason, setReason] = useState("");             // Reason for refund
  const [amount, setAmount] = useState("");             // Refund amount

  const [submitted, setSubmitted] = useState(false);    // Flag for successful form submission
  const [error, setError] = useState("");               // Error message handling

  // ----------------- HANDLE SUBMIT FUNCTION -----------------
  const handleSubmit = async (e) => {
    e.preventDefault();     // Prevent form reload
    setError("");           // Clear existing errors

    // ----------- SIMPLE VALIDATION -----------
    if (!name || !email || !orderId || !reason || !amount) {
      return setError("⚠️ Please fill in all required fields.");
    }

    try {
      const response = await Axios.post("http://localhost:5000/refunds", {
        name,
        email,
        orderId,
        reason,
        amount,
      });

      if (response.status === 200 || response.status === 201) {
        setSubmitted(true);
        setName("");
        setEmail("");
        setOrderId("");
        setReason("");
        setAmount("");
      } else {
        setError(response.data.message || "Failed to submit refund request.");
      }
    } catch (err) {
      setError("Network error: Could not connect to server.");
      console.error(err);
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
      <div
        className={`w-full max-w-2xl rounded-2xl p-8 shadow-xl backdrop-blur-lg ${
          lightMode
            ? "bg-white/90 border border-gray-200"
            : "bg-gradient-to-b from-[#151821]/90 to-[#242938]/90 border border-gray-800"
        }`}
      >
        {/* ----------- FORM TITLE ----------- */}
        <h1 className="text-3xl font-bold mb-2 text-center">Refund Request Form</h1>
        <p className={`mb-6 text-center ${lightMode ? "text-gray-600" : "text-gray-400"}`}>
          Please fill in your details to request a refund 💳💰
        </p>

        {/* ----------- SUCCESS / ERROR MESSAGES ----------- */}
        {submitted ? (
          <div className={`text-center font-semibold ${lightMode ? "text-green-600" : "text-green-400"}`}>
            ✅ Your refund request has been submitted!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="text-red-500">{error}</div>}

            {/* ----------- NAME INPUT ----------- */}
            <div>
              <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  lightMode ? "bg-white border border-gray-200 text-black" : "bg-[#151821] border border-gray-700 text-white"
                }`}
              />
            </div>

            {/* ----------- EMAIL INPUT ----------- */}
            <div>
              <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  lightMode ? "bg-white border border-gray-200 text-black" : "bg-[#151821] border border-gray-700 text-white"
                }`}
              />
            </div>

            {/* ----------- ORDER ID INPUT ----------- */}
            <div>
              <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>Order ID</label>
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter your order ID"
                className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  lightMode ? "bg-white border border-gray-200 text-black" : "bg-[#151821] border border-gray-700 text-white"
                }`}
              />
            </div>

            {/* ----------- REFUND AMOUNT INPUT ----------- */}
            <div>
              <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>Refund Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter refund amount"
                className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  lightMode ? "bg-white border border-gray-200 text-black" : "bg-[#151821] border border-gray-700 text-white"
                }`}
              />
            </div>

            {/* ----------- REASON TEXTAREA ----------- */}
            <div>
              <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>Reason for Refund</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows="5"
                placeholder="Explain the reason for your refund request..."
                className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  lightMode ? "bg-white border border-gray-200 text-black" : "bg-[#151821] border border-gray-700 text-white"
                }`}
              />
            </div>

            {/* ----------- SUBMIT BUTTON ----------- */}
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

// ===================== EXPORT COMPONENT =====================
export default RefundFormDashboard;
