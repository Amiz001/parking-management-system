import React from "react";
import { Shield, Lock } from "lucide-react";

const PrivacySettingsPage = () => {
  return (
    <div className="space-y-8 pb-20">
      <h2 className="text-3xl font-bold flex items-center gap-2">
        <Shield className="text-green-400" /> Privacy & Security
      </h2>

      <div className="bg-[#1b1f2a] p-6 rounded-lg space-y-4">
        <p className="text-gray-400">
          Manage your account privacy settings and security options. Keep your data safe and control who can access it.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg flex items-center gap-2">
          <Lock size={18} /> Change Password
        </button>
      </div>
    </div>
  );
};

export default PrivacySettingsPage;
