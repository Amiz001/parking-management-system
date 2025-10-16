import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Sun, Moon, Home, MessageSquare, Info, HelpCircle } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const FeedbackFormDashboard = () => {
  const [lightMode, setLightMode] = useState(false);
  const [activeTab, setActiveTab] = useState("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [category, setCategory] = useState("General");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);

  // Fetch previous feedbacks when "My Feedbacks" tab is open
  useEffect(() => {
    if (activeTab === "myFeedbacks") {
      Axios.get("http://localhost:5000/feedbacks")
        .then((res) => setFeedbacks(res.data))
        .catch((err) => console.error("Error fetching feedbacks:", err));
    }
  }, [activeTab]);

  // Submit feedback
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !feedback) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const res = await Axios.post("http://localhost:5000/feedbacks", {
        name,
        email,
        category,
        feedback,
        rating,
      });
      if (res.status === 200 || res.status === 201) {
        setSubmitted(true);
        setName("");
        setEmail("");
        setFeedback("");
        setCategory("General");
        setRating(0);
      }
    } catch {
      setError("Server error. Try again later.");
    }
  };

  // Sidebar tabs
  const tabs = [
    { id: "form", icon: <Home size={20} />, label: "Submit Feedback" },
    { id: "myFeedbacks", icon: <MessageSquare size={20} />, label: "My Feedbacks" },
    { id: "faq", icon: <HelpCircle size={20} />, label: "FAQs" },
    { id: "about", icon: <Info size={20} />, label: "About" },
  ];

  return (
    <div
      className={`relative flex min-h-screen overflow-hidden ${
        lightMode
          ? "bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-black"
          : "bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#3b0764] text-white"
      }`}
    >
      {/* Planet auras */}
      <motion.div
        className="absolute w-96 h-96 bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-400 rounded-full blur-3xl opacity-30"
        animate={{ y: [0, 40, 0], x: [0, 30, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-indigo-500 via-blue-600 to-cyan-400 rounded-full blur-3xl opacity-20"
        animate={{ y: [0, -50, 0], x: [0, -30, 0] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`w-72 h-screen flex flex-col backdrop-blur-lg p-6 border-r shadow-lg z-20 ${
          lightMode
            ? "bg-white/80 border-purple-300"
            : "bg-[#1a1c2e]/80 border-indigo-700"
        }`}
      >
        <h1 className="text-2xl font-bold mb-8 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
          🌍 Feedback Portal
        </h1>
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-3 px-4 py-3 mb-3 rounded-lg font-medium transition-all w-full ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md"
                : lightMode
                ? "text-gray-700 hover:bg-gray-200"
                : "text-gray-300 hover:bg-[#2c2f47]"
            }`}
          >
            {tab.icon} {tab.label}
          </motion.button>
        ))}

        <div className="mt-auto flex gap-3 justify-center">
          <Sun
            onClick={() => setLightMode(true)}
            size={24}
            className={`cursor-pointer ${lightMode ? "text-yellow-500" : "text-gray-400"}`}
          />
          <Moon
            onClick={() => setLightMode(false)}
            size={24}
            className={`cursor-pointer ${!lightMode ? "text-yellow-400" : "text-gray-400"}`}
          />
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center p-10 relative z-10">
        {/* Feedback Form */}
        {activeTab === "form" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className={`max-w-2xl w-full rounded-2xl p-8 shadow-2xl backdrop-blur-lg border ${
              lightMode
                ? "bg-white/90 border-purple-300"
                : "bg-gradient-to-b from-[#151821]/90 to-[#242938]/90 border-indigo-700"
            }`}
          >
            <h2 className="text-3xl font-bold mb-4 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Share Your Feedback 💫
            </h2>
            {submitted ? (
              <div
                className={`text-center text-2xl font-semibold ${
                  lightMode ? "text-green-600" : "text-green-400"
                }`}
              >
                ✅ Thank you for your feedback!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && <div className="text-red-500 text-center">{error}</div>}

                <input
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-500 ${
                    lightMode ? "bg-white text-black" : "bg-[#1c1f33] text-white"
                  }`}
                />

                <input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-500 ${
                    lightMode ? "bg-white text-black" : "bg-[#1c1f33] text-white"
                  }`}
                />

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-500 ${
                    lightMode ? "bg-white text-black" : "bg-[#1c1f33] text-white"
                  }`}
                >
                  <option>General</option>
                  <option>Bug Report</option>
                  <option>Feature Request</option>
                  <option>Other</option>
                </select>

                <textarea
                  rows="5"
                  placeholder="Write your feedback..."
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className={`w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-pink-500 ${
                    lightMode ? "bg-white text-black" : "bg-[#1c1f33] text-white"
                  }`}
                />

                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.div key={star} whileHover={{ scale: 1.3 }}>
                      <FaStar
                        size={30}
                        className="cursor-pointer"
                        color={star <= (hoverRating || rating) ? "#FFD700" : "#555"}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                      />
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600"
                >
                  🚀 Submit Feedback
                </motion.button>
              </form>
            )}
          </motion.div>
        )}

        {/* My Feedbacks */}
        {activeTab === "myFeedbacks" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-3xl w-full p-8 rounded-2xl bg-white/10 backdrop-blur-lg border border-indigo-700 shadow-lg"
          >
            <h2 className="text-3xl font-bold mb-6 text-center text-purple-400">📜 My Feedbacks</h2>
            {feedbacks.length === 0 ? (
              <p className="text-center text-gray-400">No feedbacks yet.</p>
            ) : (
              <ul className="space-y-4">
                {feedbacks.map((f, i) => (
                  <li key={i} className="p-4 rounded-lg bg-white/5 border border-gray-700">
                    <h3 className="font-semibold text-lg text-pink-400">{f.name}</h3>
                    <p className="text-gray-300">{f.feedback}</p>
                    <p className="text-sm text-yellow-400">⭐ {f.rating}/5</p>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        )}

        {/* FAQs */}
        {activeTab === "faq" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl bg-white/10 p-8 rounded-2xl backdrop-blur-lg border border-indigo-700"
          >
            <h2 className="text-3xl font-bold mb-4 text-indigo-400">❓ Frequently Asked Questions</h2>
            <ul className="space-y-3 text-gray-300">
              <li>💬 How do I submit feedback? → Go to the “Submit Feedback” tab.</li>
              <li>🌟 Can I rate the service? → Yes! You can give 1–5 stars.</li>
              <li>🛡️ Is my feedback public? → No, it’s private to the admin.</li>
            </ul>
          </motion.div>
        )}

        {/* About */}
        {activeTab === "about" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-2xl bg-white/10 p-8 rounded-2xl backdrop-blur-lg border border-indigo-700"
          >
            <h2 className="text-3xl font-bold mb-4 text-pink-400">🌟 About This Portal</h2>
            <p className="text-gray-300">
              This feedback portal is designed to gather your valuable input with an engaging,
              colorful, and smooth animated experience — just like exploring planets in the galaxy 🌌
              Your suggestions help us evolve better each day 🚀
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FeedbackFormDashboard;
