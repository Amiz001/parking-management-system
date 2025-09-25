import React, { useState } from "react";
import { Sun, Moon } from "lucide-react";
import Axios from "axios";
import { FaStar } from "react-icons/fa";

const FeedbackInterface = () => {
  const [lightMode, setLightMode] = useState(false);
  const [category, setCategory] = useState("Feedback");
  const [formData, setFormData] = useState({});
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await Axios.post("http://localhost:5000/api/forms", {
        category,
        rating: category === "Feedback" ? rating : undefined,
        ...formData,
      });
      if (response) {
        setSubmitted(true);
        setFormData({});
        setRating(0);
      }
    } catch (err) {
      setError("Network error: Could not connect to server.");
    }
  };

  const getInputClass = () => {
    switch (category) {
      case "Feedback":
        return "bg-white text-black placeholder-gray-400";
      case "Complaint":
        return "bg-gray-700 text-white placeholder-gray-300";
      case "Ticket":
        return "bg-gray-600 text-white placeholder-gray-300";
      default:
        return "bg-gray-800 text-white placeholder-gray-400";
    }
  };

  const baseInputClass =
    "w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-500";

  const inputClass = `${baseInputClass} ${getInputClass()}`;

  const renderFields = () => {
    switch (category) {
      case "Feedback":
        return (
          <>
            <input
              name="userId"
              value={formData.userId || ""}
              onChange={handleChange}
              placeholder="User ID"
              className={inputClass}
            />
            <input
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              placeholder="Your Name"
              className={inputClass}
            />
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              placeholder="Your Email"
              className={inputClass}
            />
            <input
              name="title"
              value={formData.title || ""}
              onChange={handleChange}
              placeholder="Feedback Title"
              className={inputClass}
            />
            <textarea
              name="feedback"
              value={formData.feedback || ""}
              onChange={handleChange}
              rows="4"
              placeholder="Write your feedback..."
              className={inputClass}
            />
            <div className="flex items-center gap-2 mt-2">
              <span className="text-gray-500 mr-2">Your Rating:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={24}
                  className="cursor-pointer transition-colors"
                  color={star <= (hoverRating || rating) ? "#FFD700" : "#555"}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                />
              ))}
              <span className="ml-2 text-gray-500">{rating}/5</span>
            </div>
          </>
        );

      case "Complaint":
        return (
          <>
            <input
              name="userId"
              value={formData.userId || ""}
              onChange={handleChange}
              placeholder="User ID"
              className={inputClass}
            />
            <input
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              placeholder="Your Name"
              className={inputClass}
            />
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              placeholder="Your Email"
              className={inputClass}
            />
            <select
              name="complaintType"
              value={formData.complaintType || ""}
              onChange={handleChange}
              className={inputClass}
            >
              <option>Service Issue</option>
              <option>Payment Problem</option>
              <option>Staff Misconduct</option>
              <option>Other</option>
            </select>
            <select
              name="priority"
              value={formData.priority || ""}
              onChange={handleChange}
              className={inputClass}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <textarea
              name="complaint"
              value={formData.complaint || ""}
              onChange={handleChange}
              rows="5"
              placeholder="Describe your complaint..."
              className={inputClass}
            />
          </>
        );

      case "Ticket":
        return (
          <>
            <input
              name="userId"
              value={formData.userId || ""}
              onChange={handleChange}
              placeholder="User ID"
              className={inputClass}
            />
            <input
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
              placeholder="Your Name"
              className={inputClass}
            />
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              placeholder="Your Email"
              className={inputClass}
            />
            <input
              name="subject"
              value={formData.subject || ""}
              onChange={handleChange}
              placeholder="Ticket Subject"
              className={inputClass}
            />
            <textarea
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              rows="5"
              placeholder="Describe the issue..."
              className={inputClass}
            />
            <select
              name="priority"
              value={formData.priority || ""}
              onChange={handleChange}
              className={inputClass}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className={`flex flex-col min-h-screen p-6 ${
        lightMode ? "bg-gray-50 text-black" : "bg-gray-950 text-white"
      }`}
    >
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Feedback & Support</h1>
        <div className="flex gap-3">
          <Sun onClick={() => setLightMode(true)} size={24} className="cursor-pointer" />
          <Moon onClick={() => setLightMode(false)} size={24} className="cursor-pointer" />
        </div>
      </header>

      <section className="mb-6 p-6 rounded-xl bg-gray-800 shadow-inner">
        <h2 className="text-xl font-semibold mb-2">How to submit your feedback</h2>
        <p className="text-gray-300">
          Select a category, fill in all fields, and submit your feedback, complaint, or ticket.
          Inputs will change color based on the category for clarity.
        </p>
      </section>

      <div className="bg-gray-900 rounded-2xl p-6 max-w-3xl w-full mx-auto shadow-inner">
        {submitted ? (
          <div className="text-green-400 font-semibold">✅ Your submission has been recorded!</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && <div className="text-red-500">{error}</div>}

            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setFormData({});
                setRating(0);
              }}
              className={`${baseInputClass} bg-gray-700 text-white placeholder-gray-300`}
            >
              <option>Feedback</option>
              <option>Complaint</option>
              <option>Ticket</option>
            </select>

            <div className="space-y-4">{renderFields()}</div>

            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl text-white font-bold shadow-lg hover:scale-105 transform transition-all"
            >
              Submit {category}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default FeedbackInterface;
