import React, { useState } from "react";
import Axios from "axios";
import { Sun, Moon } from "lucide-react";

const ComplaintForm = () => {
  const [lightMode, setLightMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [complaint, setComplaint] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // ===================== VALIDATION FUNCTIONS =====================
  const validateEmailFormat = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateAlpha = (text) => /^[A-Za-z\s]+$/.test(text);
  const validateAlphanumeric = (text) => /^[A-Za-z0-9\s]+$/.test(text);
  const validateContainsNumber = (text) => /\d/.test(text);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // NAME VALIDATION
    if (!name) return setError("⚠️ Name is required.");
    if (name.length < 3) return setError("⚠️ Name must be at least 3 characters.");
    if (!validateAlpha(name)) return setError("⚠️ Name must contain only alphabets.");
    if (name.length > 30) return setError("⚠️ Name cannot exceed 30 characters.");

    // EMAIL VALIDATION
    if (!email) return setError("⚠️ Email is required.");
    if (email.length < 10) return setError("⚠️ Email must be at least 10 characters.");
    if (!email.includes("@")) return setError("⚠️ Email must contain '@'.");
    if (!validateEmailFormat(email)) return setError("⚠️ Invalid email format.");

    // SUBJECT VALIDATION
    if (!subject) return setError("⚠️ Subject is required.");
    if (subject.length < 5) return setError("⚠️ Subject must be at least 5 characters.");
    if (!validateAlphanumeric(subject)) return setError("⚠️ Subject must be alphanumeric.");
    if (subject.length > 50) return setError("⚠️ Subject cannot exceed 50 characters.");

    // COMPLAINT VALIDATION
    if (!complaint) return setError("⚠️ Complaint is required.");
    if (complaint.length < 10) return setError("⚠️ Complaint must be at least 10 characters.");
    if (!validateContainsNumber(complaint)) return setError("⚠️ Complaint must contain at least one number.");
    if (complaint.length > 300) return setError("⚠️ Complaint cannot exceed 300 characters.");

    try {
      const response = await Axios.post("http://localhost:5000/complaints", { name, email, subject, complaint });
      if (response.status === 201) {
        setSubmitted(true);
        setName("");
        setEmail("");
        setSubject("");
        setComplaint("");
      }
    } catch (err) {
      setError("Network error: Could not connect to server.");
      console.error(err);
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen px-4 ${lightMode ? "bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-black" : "bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#3b0764] text-white"}`}>
      <header className="w-full flex justify-end items-center p-6 gap-4 max-w-4xl">
        <Sun onClick={() => setLightMode(true)} size={22} className={`cursor-pointer ${lightMode ? "text-yellow-500" : "text-gray-400"}`} />
        <Moon onClick={() => setLightMode(false)} size={22} className={`cursor-pointer ${!lightMode ? "text-yellow-500" : "text-gray-700"}`} />
      </header>

      <div className={`w-full max-w-2xl rounded-2xl p-8 shadow-xl backdrop-blur-lg ${lightMode ? "bg-white/90 border border-gray-200" : "bg-gradient-to-b from-[#151821]/90 to-[#242938]/90 border border-gray-800"}`}>
        <h1 className="text-3xl font-bold mb-2 text-center">Submit a Complaint</h1>
        <p className={`mb-6 text-center ${lightMode ? "text-gray-600" : "text-gray-400"}`}>We value your feedback. Please let us know your concerns.</p>

        {submitted ? (
          <div className={`text-center font-semibold ${lightMode ? "text-green-600" : "text-green-400"}`}>✅ Your complaint has been submitted successfully!</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <div className="text-red-500">{error}</div>}

            <div>
              <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${lightMode ? "bg-white border border-gray-200 text-black" : "bg-[#151821] border border-gray-700 text-white"}`} />
            </div>

            <div>
              <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${lightMode ? "bg-white border border-gray-200 text-black" : "bg-[#151821] border border-gray-700 text-white"}`} />
            </div>

            <div>
              <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>Complaint Subject</label>
              <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Enter complaint subject" className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${lightMode ? "bg-white border border-gray-200 text-black" : "bg-[#151821] border border-gray-700 text-white"}`} />
            </div>

            <div>
              <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>Complaint Details</label>
              <textarea value={complaint} onChange={(e) => setComplaint(e.target.value)} rows="5" placeholder="Describe your complaint..." className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${lightMode ? "bg-white border border-gray-200 text-black" : "bg-[#151821] border border-gray-700 text-white"}`} />
            </div>

            <button type="submit" className="w-full py-3 bg-gradient-to-r from-red-500 via-pink-600 to-purple-500 text-white font-semibold rounded-lg hover:opacity-90 transition">🚨 Submit Complaint</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ComplaintForm;
