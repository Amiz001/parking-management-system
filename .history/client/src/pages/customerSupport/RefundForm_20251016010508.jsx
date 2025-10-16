// ===================== IMPORTS =====================
import React, { useState } from "react";
import Axios from "axios";
import { Sun, Moon, MessageSquare, BarChart2, Info } from "lucide-react";
import { motion } from "framer-motion";

// ===================== COMPONENT =====================
const RefundFormDashboard = () => {
  // ----------------- STATES -----------------
  const [lightMode, setLightMode] = useState(false);
  const [activePanel, setActivePanel] = useState("refundForm");

  // Refund form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState("");

  const [submitted, setSubmitted] = useState(false);

  // Validation errors
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [orderIdError, setOrderIdError] = useState("");
  const [reasonError, setReasonError] = useState("");
  const [amountError, setAmountError] = useState("");

  // Sample submitted refunds
  const sampleRefunds = [
    { id: 1, name: "Alice", orderId: "ORD123", reason: "Wrong size", amount: 50 },
    { id: 2, name: "Bob", orderId: "ORD456", reason: "Item damaged", amount: 120 },
    { id: 3, name: "Charlie", orderId: "ORD789", reason: "Changed mind", amount: 30 },
  ];

  // Sidebar items
  const sidebarItems = [
    { key: "refundForm", label: "Refund Form", icon: MessageSquare },
    { key: "submitted", label: "Submitted Refunds", icon: BarChart2 },
    { key: "faq", label: "FAQ / Help", icon: Info },
  ];

  // ----------------- HANDLE SUBMIT -----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setNameError(""); setEmailError(""); setOrderIdError(""); setReasonError(""); setAmountError("");

    let valid = true;
    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Name
    if (!name) { setNameError("Name is required."); valid = false; }
    else if (name.length < 3) { setNameError("Name must be at least 3 characters."); valid = false; }
    else if (!nameRegex.test(name)) { setNameError("Name can only contain letters and spaces."); valid = false; }

    // Email
    if (!email) { setEmailError("Email is required."); valid = false; }
    else if (!emailRegex.test(email)) { setEmailError("Enter a valid email address."); valid = false; }

    // Order ID
    if (!orderId) { setOrderIdError("Order ID is required."); valid = false; }

    // Reason
    if (!reason) { setReasonError("Reason is required."); valid = false; }
    else if (reason.length < 10) { setReasonError("Reason must be at least 10 characters."); valid = false; }

    // Amount
    if (!amount) { setAmountError("Amount is required."); valid = false; }
    else if (Number(amount) <= 0) { setAmountError("Amount must be greater than 0."); valid = false; }

    if (!valid) return;

    // Submit
    try {
      const response = await Axios.post("http://localhost:5000/refunds", {
        name, email, orderId, reason, amount,
      });
      if (response.status === 200 || response.status === 201) {
        setSubmitted(true);
        setName(""); setEmail(""); setOrderId(""); setReason(""); setAmount("");
      } else {
        alert(response.data.message || "Failed to submit refund request.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error: Could not connect to server.");
    }
  };

  // ----------------- RENDER CONTENT -----------------
  const renderContent = () => {
    switch (activePanel) {
      case "refundForm":
        return (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-2xl p-8 rounded-2xl shadow-xl backdrop-blur-lg"
            style={{
              background: lightMode ? "rgba(255,255,255,0.9)" : "rgba(21,24,33,0.9)",
              border: lightMode ? "1px solid #ccc" : "1px solid #444",
            }}
          >
            <h1 className="text-3xl font-bold mb-2 text-center">Refund Request Form</h1>
            <p className={`mb-6 text-center ${lightMode ? "text-gray-600" : "text-gray-400"}`}>
              Please fill in your details to request a refund 💳💰
            </p>

            {submitted && (
              <div className={`text-center font-semibold ${lightMode ? "text-green-600" : "text-green-400"}`}>
                ✅ Your refund request has been submitted!
              </div>
            )}

            {!submitted && (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>Name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${lightMode ? "bg-white border border-gray-200 text-black" : "bg-[#151821] border border-gray-700 text-white"}`} />
                  {nameError && <p className="text-red-500 text-sm mt-1">{nameError}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${lightMode ? "bg-white border border-gray-200 text-black" : "bg-[#151821] border border-gray-700 text-white"}`} />
                  {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                </div>

                {/* Order ID */}
                <div>
                  <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>Order ID</label>
                  <input type="text" value={orderId} onChange={(e) => setOrderId(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${lightMode ? "bg-white border border-gray-200 text-black" : "bg-[#151821] border border-gray-700 text-white"}`} />
                  {orderIdError && <p className="text-red-500 text-sm mt-1">{orderIdError}</p>}
                </div>

                {/* Amount */}
                <div>
                  <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>Refund Amount</label>
                  <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${lightMode ? "bg-white border border-gray-200 text-black" : "bg-[#151821] border border-gray-700 text-white"}`} />
                  {amountError && <p className="text-red-500 text-sm mt-1">{amountError}</p>}
                </div>

                {/* Reason */}
                <div>
                  <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>Reason for Refund</label>
                  <textarea value={reason} onChange={(e) => setReason(e.target.value)} rows="5"
                    className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${lightMode ? "bg-white border border-gray-200 text-black" : "bg-[#151821] border border-gray-700 text-white"}`} />
                  {reasonError && <p className="text-red-500 text-sm mt-1">{reasonError}</p>}
                </div>

                {/* Submit Button */}
                <motion.button type="submit"
                  whileHover={{ scale: 1.07, boxShadow: "0px 0px 20px rgba(56, 189, 248, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white font-semibold rounded-lg transition-all duration-300">
                  💳 Submit Refund Request
                </motion.button>
              </form>
            )}
          </motion.div>
        );

      case "submitted":
        return (
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Submitted Refunds</h2>
            {sampleRefunds.map((r) => (
              <div key={r.id} className="p-4 rounded-lg border border-gray-500 bg-gradient-to-r from-purple-800 to-indigo-700 hover:from-indigo-600 hover:to-purple-600 transition-all">
                <p><strong>Name:</strong> {r.name}</p>
                <p><strong>Order ID:</strong> {r.orderId}</p>
                <p><strong>Reason:</strong> {r.reason}</p>
                <p><strong>Amount:</strong> ${r.amount}</p>
              </div>
            ))}
          </motion.div>
        );

      case "faq":
        return (
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">FAQ / Help</h2>
            <p>Here you can find answers to frequently asked questions and tips about using the refund dashboard.</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Fill all fields in the refund form before submitting.</li>
              <li>Submitted refunds can be viewed in the "Submitted Refunds" panel.</li>
              <li>Refund amounts must be greater than zero.</li>
              <li>Light/Dark mode toggle is available in the top right corner.</li>
            </ul>
          </motion.div>
        );

      default:
        return null;
    }
  };

  // ----------------- RETURN JSX -----------------
  return (
    <div className={`flex min-h-screen relative overflow-hidden ${lightMode ? "bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-black" : "bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#3b0764] text-white"}`}>
      {/* Animated background */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-blue-500/40 rounded-full animate-pulse-slow blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500/30 rounded-full animate-pulse-slow blur-2xl"></div>
      <div className="absolute top-1/3 right-1/2 w-16 h-16 bg-indigo-400/40 rounded-full animate-pulse-slow blur-xl"></div>

      {/* Sidebar */}
      <aside className="w-64 bg-[#151821]/90 p-6 flex flex-col gap-4 z-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <div className="flex gap-2">
            <Sun onClick={() => setLightMode(true)} size={22} className={`cursor-pointer ${lightMode ? "text-yellow-500" : "text-gray-400"}`} />
            <Moon onClick={() => setLightMode(false)} size={22} className={`cursor-pointer ${!lightMode ? "text-yellow-500" : "text-gray-700"}`} />
          </div>
        </div>
        {sidebarItems.map((item) => (
          <button key={item.key} onClick={() => setActivePanel(item.key)} className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${activePanel === item.key ? "bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 text-white" : "text-gray-300 hover:bg-gray-700"}`}>
            <item.icon size={20} />
            {item.label}
          </button>
        ))}
      </aside>

      {/* Main content */}
      <main className="flex-1 flex items-center justify-center p-8 overflow-auto z-10">
        {renderContent()}
      </main>
    </div>
  );
};

export default RefundFormDashboard;
