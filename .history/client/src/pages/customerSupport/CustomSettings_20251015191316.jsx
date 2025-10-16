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
} from "lucide-react";

const CustomerSettingsDashboard = () => {
  const [lightMode, setLightMode] = useState(false);
  const [selected, setSelected] = useState("Account");

  const sidebarItems = [
    { icon: User, label: "Account" },
    { icon: Car, label: "Vehicles" },
    { icon: CreditCard, label: "Payments" },
    { icon: Bell, label: "Notifications" },
    { icon: Shield, label: "Privacy & Security" },
    { icon: HelpCircle, label: "Help Center" },
  ];

  const renderContent = () => {
    switch (selected) {
      case "Account":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Account Information</h2>
            <p className="text-gray-400 mb-6">
              Update your profile details and contact information.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Phone</label>
                <input
                  type="text"
                  className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                  placeholder="+1 9876543210"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <input
                  type="text"
                  className="w-full p-2 rounded bg-gray-800 border border-gray-700"
                  placeholder="123 Park Street, NY"
                />
              </div>
            </div>
            <button className="mt-6 px-6 py-2 bg-blue-600 rounded hover:bg-blue-700">
              Save Changes
            </button>
          </div>
        );

      case "Vehicles":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">My Vehicles</h2>
            <p className="text-gray-400 mb-4">Manage your registered vehicles.</p>
            <div className="space-y-4">
              {["Toyota Corolla", "Honda Civic", "Tesla Model 3"].map((v, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between bg-gray-800 p-4 rounded-lg"
                >
                  <span>{v}</span>
                  <button className="bg-red-600 px-3 py-1 rounded hover:bg-red-700 text-sm">
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button className="mt-6 px-6 py-2 bg-green-600 rounded hover:bg-green-700">
              + Add Vehicle
            </button>
          </div>
        );

      case "Payments":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Payment Methods</h2>
            <p className="text-gray-400 mb-4">Manage your saved payment options.</p>
            <div className="space-y-4">
              <div className="bg-gray-800 p-4 rounded flex justify-between items-center">
                <span>Visa **** 4587</span>
                <button className="text-red-400 hover:text-red-600">Delete</button>
              </div>
              <div className="bg-gray-800 p-4 rounded flex justify-between items-center">
                <span>Mastercard **** 8923</span>
                <button className="text-red-400 hover:text-red-600">Delete</button>
              </div>
            </div>
            <button className="mt-6 px-6 py-2 bg-blue-600 rounded hover:bg-blue-700">
              + Add Payment Method
            </button>
          </div>
        );

      case "Notifications":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Notifications</h2>
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
            <h2 className="text-2xl font-bold mb-4">Privacy & Security</h2>
            <div className="space-y-4">
              <button className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">
                Change Password
              </button>
              <button className="px-4 py-2 bg-red-700 rounded hover:bg-red-800">
                Delete My Account
              </button>
            </div>
          </div>
        );

      case "Help Center":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4">Help Center</h2>
            <p className="text-gray-400 mb-6">
              Find answers to your questions or contact support.
            </p>
            <div className="space-y-4">
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold">How to update my vehicle info?</h4>
                <p className="text-gray-400 mt-2">
                  Go to the “Vehicles” tab to add, edit, or remove your vehicles.
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg">
                <h4 className="font-semibold">Forgot my password</h4>
                <p className="text-gray-400 mt-2">
                  Click “Change Password” in Privacy & Security settings.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return <div>Select a section</div>;
    }
  };

  return (
    <div
      className={`flex min-h-screen ${
        lightMode ? "bg-gray-100 text-gray-900" : "bg-[#0f111a] text-white"
      }`}
    >
      {/* Sidebar */}
      <aside className="w-72 bg-[#151821] p-6 flex flex-col justify-between shadow-2xl">
        <div>
          <h1 className="text-xl font-semibold mb-10 text-center">🚗 Customer Settings</h1>
          <nav className="space-y-2">
            {sidebarItems.map((item, i) => (
              <button
                key={i}
                onClick={() => setSelected(item.label)}
                className={`flex items-center justify-between w-full px-4 py-2 rounded-lg transition ${
                  selected === item.label
                    ? "bg-gradient-to-r from-blue-500 to-indigo-600"
                    : "hover:bg-gray-800"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon size={20} />
                  <span>{item.label}</span>
                </div>
                <ChevronRight size={16} />
              </button>
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

      {/* Main content */}
      <main className="flex-1 p-10 overflow-y-auto max-h-screen">{renderContent()}</main>
    </div>
  );
};

export default CustomerSettingsDashboard;
