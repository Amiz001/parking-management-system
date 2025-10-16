import React from "react";
import { Settings } from "lucide-react";

const AccountSettingsPage = () => {
  const options = [
    { label: "Profile Information", desc: "Update your name, phone number, and vehicle details." },
    { label: "Change Password", desc: "Secure your account with a new password." },
    { label: "Manage Parking Subscriptions", desc: "Modify or cancel your parking plans." },
  ];

  return (
    <div className="bg-[#1b1f2a] p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
        <Settings className="text-indigo-400" /> Account Settings
      </h2>
      <div className="space-y-4">
        {options.map((item, i) => (
          <div key={i} className="bg-[#242938] p-4 rounded-lg hover:bg-[#2b3142] transition">
            <h4 className="font-semibold">{item.label}</h4>
            <p className="text-sm text-gray-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountSettingsPage;
