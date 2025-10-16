// CustomerSupportSettingsLayout.jsx
import React, { useState } from "react";
import {
  Settings,
  Bell,
  HelpCircle,
  Star,
  Shield,
  LogOut,
  ChevronRight,
  Sun,
  Moon,
  Home,
} from "lucide-react";
import { useNavigate, Outlet } from "react-router-dom";

const CustomerSupportSettingsLayout = () => {
  const [lightMode, setLightMode] = useState(false);
  const navigate = useNavigate();

  const sidebarItems = [
    { icon: Settings, label: "Account Settings", path: "/customersupport/settings/account" },
    { icon: Bell, label: "Notifications", path: "/customersupport/settings/notifications" },
    { icon: HelpCircle, label: "FAQ & Help", path: "/customersupport/settings/faq" },
    { icon: Star, label: "Feedback", path: "/customersupport/settings/feedback" },
    { icon: Shield, label: "Privacy & Security", path: "/customersupport/settings/privacy" },
  ];

  return (
    <div className={`flex min-h-screen ${lightMode ? "bg-gray-100 text-black" : "bg-gray-950 text-white"}`}>
      {/* Sidebar */}
      <div className="w-72 bg-[#151821] p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">✦</div>
            <span className="font-semibold text-lg">Customer Settings</span>
          </div>

          <nav className="space-y-2">
            {sidebarItems.map((item, i) => (
              <button
                key={i}
                onClick={() => navigate(item.path)}
                className="flex items-center justify-between w-full text-left px-4 py-2 rounded-lg hover:bg-gradient-to-r from-blue-500 to-indigo-600 transition"
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
          <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-gray-800 cursor-pointer">
            <span>Dark Mode</span>
            {lightMode ? (
              <Sun size={18} onClick={() => setLightMode(false)} className="cursor-pointer text-yellow-400" />
            ) : (
              <Moon size={18} onClick={() => setLightMode(true)} className="cursor-pointer text-yellow-400" />
            )}
          </div>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 w-full px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default CustomerSupportSettingsLayout;
