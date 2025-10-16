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
import { Outlet, useNavigate } from "react-router-dom";

const CustomerSettingsLayout = () => {
  const [lightMode, setLightMode] = useState(false);
  const navigate = useNavigate();

  const sidebarItems = [
    { icon: User, label: "Account", path: "/customersupport/account" },
    { icon: Car, label: "Vehicles", path: "/customersupport/vehicles" },
    { icon: CreditCard, label: "Payments", path: "/customersupport/payments" },
    { icon: Bell, label: "Notifications", path: "/customersupport/notifications" },
    { icon: Shield, label: "Privacy & Security", path: "/customersupport/privacy" },
    { icon: HelpCircle, label: "Help Center", path: "/customersupport/help" },
  ];

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
                onClick={() => navigate(item.path)}
                className="flex items-center justify-between w-full px-4 py-2 rounded-lg hover:bg-gradient-to-r from-blue-500 to-indigo-600 transition"
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
          <div className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded-lg cursor-pointer">
            <span>Dark Mode</span>
            {lightMode ? (
              <Sun onClick={() => setLightMode(false)} className="cursor-pointer text-yellow-400" />
            ) : (
              <Moon onClick={() => setLightMode(true)} className="cursor-pointer text-yellow-400" />
            )}
          </div>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 w-full px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10 overflow-y-auto max-h-screen">
        <Outlet />
      </main>
    </div>
  );
};

export default CustomerSettingsLayout;
