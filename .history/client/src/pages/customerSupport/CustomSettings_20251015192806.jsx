// CustomerSettingsDashboard.jsx
import React, { useState } from "react";
import {
  User,
  Car,
  CreditCard,
  Bell,
  Shield,
  HelpCircle,
  LogOut,
  Sun,
  Moon,
  ChevronRight,
  PlusCircle,
  Settings,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CustomerSettingsDashboard = () => {
  const [lightMode, setLightMode] = useState(false);
  const [selected, setSelected] = useState("Account");
  const [modal, setModal] = useState({ open: false, title: "", content: "" });

  const sidebarItems = [
    { icon: User, label: "Account" },
    { icon: Car, label: "Vehicles" },
    { icon: CreditCard, label: "Payments" },
    { icon: Bell, label: "Notifications" },
    { icon: Shield, label: "Privacy & Security" },
    { icon: HelpCircle, label: "Help Center" },
  ];

  const openModal = (title, content) => setModal({ open: true, title, content });
  const closeModal = () => setModal({ open: false, title: "", content: "" });

  const renderContent = () => {
    switch (selected) {
      case "Account":
        return (
          <div>
            <h2 className="text-3xl font-bold mb-4">Account Information</h2>
            <p className="text-gray-400 mb-6">
              Manage your profile and update contact information.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {["Full Name", "Email", "Phone", "Address"].map((label, i) => (
                <div key={i}>
                  <label className="block text-sm font-medium mb-1">{label}</label>
                  <input
                    type="text"
                    className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-indigo-500"
                    placeholder={`Enter ${label}`}
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => openModal("Save Changes", "Your profile changes were saved successfully.")}
              className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg hover:opacity-90 transition-all"
            >
              Save Changes
            </button>
          </div>
        );

      case "Vehicles":
        return (
          <div>
            <h2 className="text-3xl font-bold mb-4">My Vehicles</h2>
            <p className="text-gray-400 mb-4">Manage your registered vehicles.</p>
            <div className="space-y-4">
              {["Toyota Corolla", "Honda Civic", "Tesla Model 3"].map((v, i) => (
                <div key={i} className="flex items-center justify-between bg-gray-800 p-4 rounded-lg">
                  <span>{v}</span>
                  <button
                    onClick={() => openModal("Remove Vehicle", `${v} has been removed from your account.`)}
                    className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => openModal("Add Vehicle", "Enter your new vehicle details.")}
              className="mt-6 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg hover:opacity-90 transition-all flex items-center gap-2"
            >
              <PlusCircle size={18} /> Add Vehicle
            </button>
          </div>
        );

      case "Payments":
        return (
          <div>
            <h2 className="text-3xl font-bold mb-4">Payment Methods</h2>
            <p className="text-gray-400 mb-4">Manage your payment options securely.</p>
            <div className="space-y-4">
              {["Visa **** 4587", "Mastercard **** 8923"].map((card, i) => (
                <div key={i} className="bg-gray-800 p-4 rounded flex justify-between items-center">
                  <span>{card}</span>
                  <button
                    onClick={() => openModal("Delete Card", `${card} has been deleted.`)}
                    className="text-red-400 hover:text-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
            <button
              onClick={() => openModal("Add Payment", "Enter your new payment method.")}
              className="mt-6 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg hover:opacity-90 transition-all flex items-center gap-2"
            >
              <PlusCircle size={18} /> Add Payment Method
            </button>
          </div>
        );

      case "Notifications":
        return (
          <div>
            <h2 className="text-3xl font-bold mb-4">Notifications</h2>
            <div className="space-y-3">
              {["Email Alerts", "SMS Alerts", "App Notifications"].map((n, i) => (
                <div key={i} className="flex justify-between bg-gray-800 p-4 rounded-lg">
                  <span>{n}</span>
                  <input type="checkbox" className="w-5 h-5 accent-blue-500" />
                </div>
              ))}
            </div>
          </div>
        );

      case "Privacy & Security":
        return (
          <div>
            <h2 className="text-3xl font-bold mb-4">Privacy & Security</h2>
            <div className="space-y-4">
              <button
                onClick={() => openModal("Change Password", "Password reset link sent to your email.")}
                className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
              >
                Change Password
              </button>
              <button
                onClick={() => openModal("Delete Account", "Your account deletion is being processed.")}
                className="px-4 py-2 bg-red-700 rounded hover:bg-red-800"
              >
                Delete My Account
              </button>
            </div>
          </div>
        );

      case "Help Center":
        return (
          <div>
            <h2 className="text-3xl font-bold mb-4">Help Center</h2>
            <div className="space-y-4">
              {[
                {
                  q: "How to update my vehicle info?",
                  a: "Go to 'Vehicles' tab and click 'Add Vehicle' or 'Remove'.",
                },
                {
                  q: "Forgot my password?",
                  a: "Use 'Change Password' in Privacy & Security section.",
                },
                {
                  q: "How to change my plan?",
                  a: "Contact customer support to upgrade your membership.",
                },
              ].map((faq, i) => (
                <div key={i} className="bg-gray-800 p-4 rounded-lg">
                  <h4 className="font-semibold">{faq.q}</h4>
                  <p className="text-gray-400 mt-2">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div
      className={`flex h-screen ${
        lightMode
          ? "bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-gray-900"
          : "bg-gray-950 text-white"
      }`}
    >
      {/* Sidebar */}
      <aside className="w-72 bg-[#151821] p-6 flex flex-col justify-between shadow-2xl">
        <div>
          <h1 className="text-xl font-semibold mb-10 text-center flex items-center justify-center gap-2">
            <Settings size={20} /> Customer Settings
          </h1>
          <nav className="space-y-2">
            {sidebarItems.map((item, i) => (
              <motion.button
                whileHover={{ scale: 1.05 }}
                key={i}
                onClick={() => setSelected(item.label)}
                className={`flex items-center justify-between w-full px-4 py-2 rounded-lg transition-all ${
                  selected === item.label
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600"
                    : "hover:bg-gray-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </div>
                <ChevronRight size={16} />
              </motion.button>
            ))}
          </nav>
        </div>

        <div className="space-y-4">
          <div
            onClick={() => setLightMode(!lightMode)}
            className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded-lg cursor-pointer"
          >
            <span>{lightMode ? "Light Mode" : "Dark Mode"}</span>
            {lightMode ? <Sun size={18} /> : <Moon size={18} />}
          </div>

          <button className="flex items-center gap-3 w-full px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">{renderContent()}</main>

      {/* Modal */}
      <AnimatePresence>
        {modal.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 p-8 rounded-3xl w-full max-w-md text-center"
            >
              <h2 className="text-2xl font-bold mb-4">{modal.title}</h2>
              <p className="text-gray-100 mb-6">{modal.content}</p>
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-white text-blue-700 rounded-lg font-semibold hover:bg-gray-200 transition"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomerSettingsDashboard;
