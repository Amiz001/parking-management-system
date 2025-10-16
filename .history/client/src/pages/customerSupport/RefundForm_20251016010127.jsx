// ===================== IMPORTS =====================
import React, { useState } from "react";
import Axios from "axios";
import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

// ===================== COMPONENT =====================
const RefundFormDashboard = () => {
  // ----------------- STATE -----------------
  const [lightMode, setLightMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState("");

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // ----------------- VALIDATION & SUBMIT -----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // -------- VALIDATION --------
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email || !orderId || !reason || !amount)
      return setError("⚠️ Please fill in all required fields.");

    if (!nameRegex.test(name))
      return setError("⚠️ Name can only contain letters and spaces.");
    if (!emailRegex.test(email))
      return setError("⚠️ Please enter a valid email address.");
    if (reason.length < 10)
      return setError("⚠️ Please provide more details in the reason.");
    if (Number(amount) <= 0)
      return setError("⚠️ Refund amount must be greater than zero.");

    // -------- SUBMIT DATA --------
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

  // ===================== RETURN =====================
  return (
    <div
      className={`flex min-h-screen relative overflow-hidden items-center justify-center px-4 ${
        lightMode
          ? "bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-black"
          : "bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#3b0764] text-white"
      }`}
    >
      {/* ---------------- PLANET-LIKE BACKGROUND ---------------- */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-blue-500/40 rounded-full animate-pulse-slow blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500/30 rounded-full animate-pulse-slow blur-2xl"></div>
      <div className="absolute top-1/3 right-1/2 w-16 h-16 bg-indigo-400/40 rounded-full animate-pulse-slow blur-xl"></div>

      {/* ---------------- THEME TOGGLE HEADER ---------------- */}
      <header className="absolute top-6 right-6 flex gap-4 z-10">
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

      {/* ---------------- FORM CARD ---------------- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-2xl rounded-2xl p-8 shadow-xl backdrop-blur-lg z-10 ${
          lightMode
            ? "bg-white/90 border border-gray-200"
            : "bg-gradient-to-b from-[#151821]/90 to-[#242938]/90 border border-gray-800"
        }`}
      >
        <h1 className="text-3xl font-bold mb-2 text-center">Refund Request Form</h1>
        <p className={`mb-6 text-center ${lightMode ? "text-gray-600" : "text-gray-400"}`}>
          Please fill in your details to request a refund 💳💰
        </p>

        {submitted ? (
          <div className={`text-center font-semibold ${lightMode ? "text-green-600" : "text-green-400"}`}>
            ✅ Your refund request has been submitted!
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
                  lightMode
                    ? "bg-white border border-gray-200 text-black"
                    : "bg-[#151821] border border-gray-700 text-white"
                }`}
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
                  lightMode
                    ? "bg-white border border-gray-200 text-black"
                    : "bg-[#151821] border border-gray-700 text-white"
                }`}
              />
            </div>

            {/* Order ID */}
            <div>
              <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>
                Order ID
              </label>
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter your order ID"
                className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  lightMode
                    ? "bg-white border border-gray-200 text-black"
                    : "bg-[#151821] border border-gray-700 text-white"
                }`}
              />
            </div>

            {/* Amount */}
            <div>
              <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>
                Refund Amount
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter refund amount"
                className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  lightMode
                    ? "bg-white border border-gray-200 text-black"
                    : "bg-[#151821] border border-gray-700 text-white"
                }`}
              />
            </div>

            {/* Reason */}
            <div>
              <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>
                Reason for Refund
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows="5"
                placeholder="Explain the reason for your refund request..."
                className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                  lightMode
                    ? "bg-white border border-gray-200 text-black"
                    : "bg-[#151821] border border-gray-700 text-white"
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
      </motion.div>
    </div>
  );
};

export default RefundFormDashboard;
