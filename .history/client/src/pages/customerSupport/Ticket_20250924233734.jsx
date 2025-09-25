import React, { useState } from "react";
import { Bell, Settings, Sun, Moon } from "lucide-react";

const TicketForm = () => {
  const [lightMode, setLightMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issueType: "",
    description: "",
    priority: "Medium",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Ticket Raised Successfully 🚀");
  };

  return (
    <div
      className={`flex h-screen bg-gray-950 text-white light:text-black light:bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ${
        lightMode ? "light" : "dark"
      }`}
    >
      {/* Sidebar */}
      <div className="w-64 bg-[#151821] p-6 flex flex-col light:bg-white">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-2">
          <a
            href="#"
            className="block px-3 py-2 rounded-lg hover:bg-gray-700 light:hover:bg-gray-100"
          >
            Refund Form
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-lg hover:bg-gray-700 light:hover:bg-gray-100"
          >
            Complaint Form
          </a>
          <a
            href="#"
            className="block px-3 py-2 rounded-lg bg-blue-600 text-white"
          >
            Ticket Raising
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="p-6 flex items-center justify-between border-b border-gray-700 light:border-gray-200">
          <h1 className="text-2xl font-bold">Raise a Ticket</h1>
          <div className="flex items-center gap-4">
            <Bell size={20} className="text-gray-400 cursor-pointer" />
            <Settings size={20} className="text-gray-400 cursor-pointer" />
            <Sun
              onClick={() => setLightMode(true)}
              size={20}
              className="cursor-pointer"
            />
            <Moon
              onClick={() => setLightMode(false)}
              size={20}
              className="cursor-pointer"
            />
          </div>
        </header>

        {/* Form */}
        <main className="p-6 flex-1 overflow-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-gradient-to-b from-[#151821] to-[#242938] light:bg-white p-6 rounded-xl shadow-lg max-w-2xl"
          >
            <div className="grid gap-4 mb-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="px-4 py-2 rounded-lg bg-[#222735] light:bg-gray-100 focus:ring-2 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="px-4 py-2 rounded-lg bg-[#222735] light:bg-gray-100 focus:ring-2 focus:ring-blue-500"
                required
              />
              <select
                name="issueType"
                value={formData.issueType}
                onChange={handleChange}
                className="px-4 py-2 rounded-lg bg-[#222735] light:bg-gray-100 focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Issue Type</option>
                <option value="Parking Access">Parking Access</option>
                <option value="Payment Issue">Payment Issue</option>
                <option value="Technical Error">Technical Error</option>
                <option value="Other">Other</option>
              </select>

              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="px-4 py-2 rounded-lg bg-[#222735] light:bg-gray-100 focus:ring-2 focus:ring-blue-500"
              >
                <option value="Low">Low Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="High">High Priority</option>
              </select>

              <textarea
                name="description"
                placeholder="Describe your issue..."
                value={formData.description}
                onChange={handleChange}
                rows="5"
                className="px-4 py-2 rounded-lg bg-[#222735] light:bg-gray-100 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-l from-blue-500 to-indigo-600 text-white rounded-lg hover:bg-blue-700"
            >
              Raise Ticket
            </button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default TicketForm;
