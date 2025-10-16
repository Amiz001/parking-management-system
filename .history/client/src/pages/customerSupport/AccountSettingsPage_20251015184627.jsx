import React from "react";
import { User, Save } from "lucide-react";

const AccountSettingsPage = () => {
  return (
    <div className="space-y-8 pb-20">
      <h2 className="text-3xl font-bold flex items-center gap-2">
        <User className="text-blue-400" /> Account Settings
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="text-gray-400">Full Name</label>
          <input className="w-full bg-[#1b1f2a] mt-2 p-3 rounded-lg" defaultValue="John Doe" />
        </div>
        <div>
          <label className="text-gray-400">Email</label>
          <input className="w-full bg-[#1b1f2a] mt-2 p-3 rounded-lg" defaultValue="john@email.com" />
        </div>
        <div>
          <label className="text-gray-400">Phone</label>
          <input className="w-full bg-[#1b1f2a] mt-2 p-3 rounded-lg" defaultValue="+94 712345678" />
        </div>
        <div>
          <label className="text-gray-400">Location</label>
          <input className="w-full bg-[#1b1f2a] mt-2 p-3 rounded-lg" defaultValue="Colombo, Sri Lanka" />
        </div>
      </div>

      <button className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg flex items-center gap-2">
        <Save size={18} /> Save Changes
      </button>
    </div>
  );
};

export default AccountSettingsPage;
