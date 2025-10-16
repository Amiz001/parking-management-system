// CustomerSupportSettings.jsx
import React, { useState } from "react";
import { MessageCircle, Phone, Mail, Bell, Settings, ChevronRight, HelpCircle, Shield, Info, Headphones, Star } from "lucide-react";

const CustomerSupportSettings = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
  });

  return (
    <div
      className={`min-h-screen ${
        darkMode
          ? "bg-gradient-to-b from-[#0f111a] to-[#151821] text-white"
          : "bg-gradient-to-br from-white to-blue-50 text-gray-900"
      } p-8 overflow-y-auto`}
    >
      {/* Header */}
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Customer Support & Settings</h1>
          <p className="text-gray-400">
            Manage your support requests, preferences, and contact settings
          </p>
        </div>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 bg-gradient-to-l from-blue-500 to-indigo-600 rounded-lg text-white font-medium shadow-md hover:opacity-90"
        >
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>
      </header>

      {/* Contact Support Section */}
      <section className="bg-[#1b1f2a] light:bg-white rounded-xl p-6 mb-10 shadow-md">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Headphones className="text-blue-400" /> Contact Support
        </h2>
        <p className="text-gray-400 mb-4">
          Our support team is available 24/7 to assist with account, payment, or parking issues.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center p-4 rounded-lg bg-[#242938] hover:bg-[#2b3142] cursor-pointer transition">
            <Phone className="text-green-400 mb-2" size={28} />
            <h4 className="font-semibold">Phone Support</h4>
            <p className="text-sm text-gray-400">+1 800 555 9823</p>
          </div>
          <div className="flex flex-col items-center p-4 rounded-lg bg-[#242938] hover:bg-[#2b3142] cursor-pointer transition">
            <Mail className="text-blue-400 mb-2" size={28} />
            <h4 className="font-semibold">Email Us</h4>
            <p className="text-sm text-gray-400">support@parkingsystem.com</p>
          </div>
          <div className="flex flex-col items-center p-4 rounded-lg bg-[#242938] hover:bg-[#2b3142] cursor-pointer transition">
            <MessageCircle className="text-yellow-400 mb-2" size={28} />
            <h4 className="font-semibold">Live Chat</h4>
            <p className="text-sm text-gray-400">Chat with our support team instantly</p>
          </div>
        </div>
      </section>

      {/* Account Settings */}
      <section className="bg-[#1b1f2a] light:bg-white rounded-xl p-6 mb-10 shadow-md">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Settings className="text-indigo-400" /> Account Settings
        </h2>
        <div className="space-y-4">
          {[
            { label: "Profile Information", desc: "Update your name, contact number, and vehicle info." },
            { label: "Change Password", desc: "Secure your account with a new password." },
            { label: "Manage Parking Subscriptions", desc: "Modify or cancel your current parking plans." },
          ].map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-4 bg-[#242938] hover:bg-[#2b3142] rounded-lg cursor-pointer transition"
            >
              <div>
                <h4 className="font-semibold">{item.label}</h4>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
              <ChevronRight />
            </div>
          ))}
        </div>
      </section>

      {/* Notification Settings */}
      <section className="bg-[#1b1f2a] light:bg-white rounded-xl p-6 mb-10 shadow-md">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Bell className="text-yellow-400" /> Notification Preferences
        </h2>
        <div className="space-y-4">
          {Object.keys(notifications).map((type, index) => (
            <label
              key={index}
              className="flex items-center justify-between bg-[#242938] hover:bg-[#2b3142] p-4 rounded-lg cursor-pointer transition"
            >
              <span className="capitalize font-medium">{type} Notifications</span>
              <input
                type="checkbox"
                checked={notifications[type]}
                onChange={() =>
                  setNotifications((prev) => ({ ...prev, [type]: !prev[type] }))
                }
                className="w-5 h-5 accent-blue-500 cursor-pointer"
              />
            </label>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#1b1f2a] light:bg-white rounded-xl p-6 mb-10 shadow-md">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <HelpCircle className="text-blue-400" /> Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {[
            {
              q: "How can I reset my password?",
              a: "Go to Account Settings > Change Password and follow the instructions.",
            },
            {
              q: "How to request a refund for a parking booking?",
              a: "Visit Refund Requests under Customer Support and submit your request with booking ID.",
            },
            {
              q: "How to contact the parking owner?",
              a: "Use the contact form or call the number displayed on your booking confirmation.",
            },
          ].map((faq, index) => (
            <div key={index} className="p-4 bg-[#242938] rounded-lg hover:bg-[#2b3142] transition">
              <h4 className="font-semibold mb-1">{faq.q}</h4>
              <p className="text-gray-400 text-sm">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feedback & Rating */}
      <section className="bg-[#1b1f2a] light:bg-white rounded-xl p-6 mb-10 shadow-md">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Star className="text-yellow-400" /> Give Feedback
        </h2>
        <p className="text-gray-400 mb-4">
          Help us improve our parking management service. Your opinion matters!
        </p>
        <textarea
          placeholder="Write your feedback here..."
          className="w-full p-3 bg-[#242938] rounded-lg border border-gray-700 text-white placeholder-gray-400 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
        />
        <button className="px-6 py-2 bg-gradient-to-l from-blue-500 to-indigo-600 rounded-lg font-medium text-white hover:opacity-90 transition">
          Submit Feedback
        </button>
      </section>

      {/* Privacy and Policy */}
      <section className="bg-[#1b1f2a] light:bg-white rounded-xl p-6 mb-10 shadow-md">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <Shield className="text-green-400" /> Privacy & Security
        </h2>
        <p className="text-gray-400 mb-4">
          Your personal data and payment details are securely protected under our advanced encryption policies.
        </p>
        <button className="flex items-center gap-2 text-blue-400 hover:underline">
          <Info size={18} /> Learn more about our data policies
        </button>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-500 mt-10 text-sm">
        © 2025 Parking Management System | Designed with ❤️ for better parking experiences.
      </footer>
    </div>
  );
};

export default CustomerSupportSettings;
