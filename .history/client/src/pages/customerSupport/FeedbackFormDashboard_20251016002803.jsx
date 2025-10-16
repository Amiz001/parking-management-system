// ===================== IMPORTS =====================
import React, { useState } from "react";
import Axios from "axios";
import { Sun, Moon, MessageSquare, BarChart2, Info } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

// ===================== COMPONENT =====================
const FeedbackDashboard = () => {
  // ----------------- STATES -----------------
  const [lightMode, setLightMode] = useState(false);
  const [activePanel, setActivePanel] = useState("feedbackForm");

  // Feedback form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [category, setCategory] = useState("General");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // ----------------- HANDLE SUBMIT FUNCTION -----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !feedback) {
      setError("Please fill in all required fields.");
      return;
    }
    try {
      const response = await Axios.post("http://localhost:5000/feedbacks", {
        name,
        email,
        category,
        feedback,
        rating,
      });
      if (response.status === 200 || response.status === 201) {
        setSubmitted(true);
        setName("");
        setEmail("");
        setFeedback("");
        setCategory("General");
        setRating(0);
      } else {
        setError(response.data.message || "Failed to submit feedback.");
      }
    } catch (err) {
      setError("Network error: Could not connect to server.");
      console.error(err);
    }
  };

  // ----------------- SAMPLE SUBMITTED FEEDBACKS -----------------
  const sampleFeedbacks = [
    { id: 1, name: "Alice", category: "Bug", feedback: "App crashes on login", rating: 4 },
    { id: 2, name: "Bob", category: "Feature Request", feedback: "Add dark mode toggle", rating: 5 },
    { id: 3, name: "Charlie", category: "General", feedback: "Great experience overall!", rating: 5 },
  ];

  // ----------------- SIDEBAR ITEMS -----------------
  const sidebarItems = [
    { key: "feedbackForm", label: "Feedback Form", icon: MessageSquare },
    { key: "submitted", label: "Submitted Feedbacks", icon: BarChart2 },
    { key: "faq", label: "FAQ / Help", icon: Info },
  ];

  // ----------------- RENDER MAIN CONTENT -----------------
  const renderContent = () => {
    switch (activePanel) {
      case "feedbackForm":
        return (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            {submitted && (
              <div className={`text-center font-semibold ${lightMode ? "text-green-600" : "text-green-400"}`}>
                ✅ Thank you for your feedback!
              </div>
            )}

            {!submitted && (
              <>
                {error && <div className="text-red-500">{error}</div>}

                {/* NAME */}
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
                  />
                </div>

                {/* EMAIL */}
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
                  />
                </div>

                {/* CATEGORY */}
                <div>
                  <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>
                    Feedback Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      lightMode ? "bg-white border border-gray-200 text-black" : "bg-[#151821] border border-gray-700 text-white"
                    }`}
                  >
                    <option>General</option>
                    <option>Bug Report</option>
                    <option>Feature Request</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* FEEDBACK */}
                <div>
                  <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>
                    Your Feedback
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows="5"
                    placeholder="Write your feedback here..."
                    className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                      lightMode ? "bg-white border border-gray-200 text-black" : "bg-[#151821] border border-gray-700 text-white"
                    }`}
                  />
                </div>

                {/* RATING */}
                <div>
                  <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>
                    Your Rating
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <FaStar
                        key={star}
                        size={28}
                        className="cursor-pointer transition-transform hover:scale-110"
                        color={star <= (hoverRating || rating) ? "#FFD700" : "#555"}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-400">{rating ? `${rating}/5` : "No rating"}</span>
                  </div>
                </div>

                {/* SUBMIT BUTTON */}
                <motion.button
                  whileHover={{ scale: 1.07, boxShadow: "0px 0px 20px rgba(56, 189, 248, 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSubmit}
                  className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 shadow-lg shadow-indigo-700/40 transition-all duration-300"
                >
                  🌌 Submit Feedback
                </motion.button>
              </>
            )}
          </motion.div>
        );
      case "submitted":
        return (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-semibold mb-4">Submitted Feedbacks</h2>
            {sampleFeedbacks.map((f) => (
              <div
                key={f.id}
                className="p-4 rounded-lg border border-gray-500 bg-gradient-to-r from-purple-800 to-indigo-700 hover:from-indigo-600 hover:to-purple-600 transition-all"
              >
                <p><strong>Name:</strong> {f.name}</p>
                <p><strong>Category:</strong> {f.category}</p>
                <p><strong>Feedback:</strong> {f.feedback}</p>
                <p><strong>Rating:</strong> {f.rating}/5</p>
              </div>
            ))}
          </motion.div>
        );
      case "faq":
        return (
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-semibold mb-4">FAQ / Help</h2>
            <p>Here you can find answers to frequently asked questions and tips about using the feedback dashboard.</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Fill all fields in the feedback form before submitting.</li>
              <li>You can see submitted feedbacks in the "Submitted Feedbacks" panel.</li>
              <li>Use the rating stars to provide accurate feedback scores.</li>
              <li>Light/Dark mode is toggleable using the sun/moon icons.</li>
            </ul>
          </motion.div>
        );
      default:
        return null;
    }
  };

  // ===================== RETURN JSX =====================
  return (
    <div
      className={`flex min-h-screen relative overflow-hidden ${
        lightMode
          ? "bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-200 text-black"
          : "bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#3b0764] text-white"
      }`}
    >
      {/* ----------------- PLANET ANIMATED BACKGROUND ----------------- */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-blue-500/40 rounded-full animate-pulse-slow blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500/30 rounded-full animate-pulse-slow blur-2xl"></div>
      <div className="absolute top-1/3 right-1/2 w-16 h-16 bg-indigo-400/40 rounded-full animate-pulse-slow blur-xl"></div>

      {/* ----------------- SIDEBAR ----------------- */}
      <aside className="w-64 bg-[#151821]/90 p-6 flex flex-col gap-4 z-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <div className="flex gap-2">
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
          </div>
        </div>
        {sidebarItems.map((item) => (
          <button
            key={item.key}
            onClick={() => setActivePanel(item.key)}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
              activePanel === item.key
                ? "bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            <item.icon size={20} />
            {item.label}
          </button>
        ))}
      </aside>

      {/* ----------------- MAIN CONTENT ----------------- */}
      <main className="flex-1 p-8 overflow-auto z-10">
        {renderContent()}
      </main>
    </div>
  );
};

export default FeedbackDashboard;
