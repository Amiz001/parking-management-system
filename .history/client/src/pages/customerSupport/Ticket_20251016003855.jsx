// ===================== IMPORTS =====================
import React, { useState } from "react";
import Axios from "axios";
import { Sun, Moon, MessageSquare, BarChart2, Info } from "lucide-react";
import { motion } from "framer-motion";

// ===================== COMPONENT =====================
const TicketDashboard = () => {
  // ----------------- STATES -----------------
  const [lightMode, setLightMode] = useState(false);
  const [activePanel, setActivePanel] = useState("ticketForm");

  // Ticket form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // ----------------- HANDLE SUBMIT FUNCTION -----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Simple validation
    if (!name || !email || !subject || !description) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const response = await Axios.post("http://localhost:5000/tickets", {
        name,
        email,
        subject,
        description,
        priority,
      });

      if (response.status === 200 || response.status === 201) {
        setSubmitted(true);
        setName(""); setEmail(""); setSubject(""); setDescription(""); setPriority("Low");
      } else {
        setError(response.data.message || "Failed to submit ticket.");
      }
    } catch (err) {
      setError("Network error: Could not connect to server.");
      console.error(err);
    }
  };

  // ----------------- SIDEBAR ITEMS -----------------
  const sidebarItems = [
    { key: "ticketForm", label: "Submit Ticket", icon: MessageSquare },
    { key: "submitted", label: "Submitted Tickets", icon: BarChart2 },
    { key: "faq", label: "FAQ / Help", icon: Info },
  ];

  // ----------------- SAMPLE SUBMITTED TICKETS -----------------
  const sampleTickets = [
    { id: 1, name: "Alice", email: "alice@example.com", subject: "Login Issue", description: "Cannot login after update", priority: "High" },
    { id: 2, name: "Bob", email: "bob@example.com", subject: "Bug Report", description: "Crash on checkout page", priority: "Medium" },
  ];

  // ----------------- RENDER MAIN CONTENT -----------------
  const renderContent = () => {
    switch (activePanel) {
      case "ticketForm":
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

                <div>
                  <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>Name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${lightMode ? "bg-white border border-gray-200 text-black" : "bg-[#151821] border border-gray-700 text-white"}`} />
                </div>

                <div>
                  <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${lightMode ? "bg-white border border-gray-200 text-black" : "bg-[#151821] border border-gray-700 text-white"}`} />
                </div>

                <div>
                  <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>Subject</label>
                  <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Enter ticket subject" className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${lightMode ? "bg-white border border-gray-200 text-black" : "bg-[#151821] border border-gray-700 text-white"}`} />
                </div>

                <div>
                  <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>Description</label>
                  <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows="5" placeholder="Describe your issue in detail" className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${lightMode ? "bg-white border border-gray-200 text-black" : "bg-[#151821] border border-gray-700 text-white"}`} />
                </div>

                <div>
                  <label className={`block mb-2 text-sm font-medium ${lightMode ? "text-gray-700" : "text-gray-300"}`}>Priority</label>
                  <select value={priority} onChange={(e) => setPriority(e.target.value)} className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 ${lightMode ? "bg-white border border-gray-200 text-black" : "bg-[#151821] border border-gray-700 text-white"}`}>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>

                <button type="submit" className="w-full py-3 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700 text-white font-semibold rounded-lg hover:opacity-90 transition">
                  📨 Submit Ticket
                </button>
              </form>
            )}
          </motion.div>
        );
      case "submitted":
        return (
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">Submitted Tickets</h2>
            {sampleTickets.map((t) => (
              <div key={t.id} className="p-4 rounded-lg border border-gray-500 bg-gradient-to-r from-purple-800 to-indigo-700 hover:from-indigo-600 hover:to-purple-600 transition-all">
                <p><strong>Name:</strong> {t.name}</p>
                <p><strong>Email:</strong> {t.email}</p>
                <p><strong>Subject:</strong> {t.subject}</p>
                <p><strong>Description:</strong> {t.description}</p>
                <p><strong>Priority:</strong> {t.priority}</p>
              </div>
            ))}
          </motion.div>
        );
      case "faq":
        return (
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="space-y-4">
            <h2 className="text-2xl font-semibold mb-4">FAQ / Help</h2>
            <p>Here you can find answers to frequently asked questions and tips about using the ticket dashboard.</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Fill all fields in the ticket form before submitting.</li>
              <li>You can see submitted tickets in the "Submitted Tickets" panel.</li>
              <li>Set the correct priority to get faster support.</li>
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
    <div className={`flex min-h-screen relative overflow-hidden ${lightMode ? "bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-200 text-black" : "bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#3b0764] text-white"}`}>
      {/* PLANET ANIMATED BACKGROUND */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-blue-500/40 rounded-full animate-pulse-slow blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-500/30 rounded-full animate-pulse-slow blur-2xl"></div>
      <div className="absolute top-1/3 right-1/2 w-16 h-16 bg-indigo-400/40 rounded-full animate-pulse-slow blur-xl"></div>

      {/* SIDEBAR */}
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

      {/* MAIN CONTENT CENTERED */}
      <main className="flex-1 flex items-center justify-center p-8 overflow-auto z-10">
        {renderContent()}
      </main>
    </div>
  );
};

export default TicketDashboard;
