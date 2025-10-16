import React from "react";
import { HelpCircle } from "lucide-react";

const HelpCenterPage = () => {
  return (
    <div className="space-y-8 pb-20">
      <h2 className="text-3xl font-bold flex items-center gap-2">
        <HelpCircle className="text-blue-400" /> Help Center
      </h2>

      <div className="bg-[#1b1f2a] p-6 rounded-lg space-y-4">
        <h3 className="font-semibold">Frequently Asked Questions</h3>
        <ul className="space-y-3 text-gray-400">
          <li>🚘 How do I add a new vehicle to my account?</li>
          <li>💳 Can I update my payment method anytime?</li>
          <li>🔔 How do I turn off SMS notifications?</li>
          <li>🧾 Where can I view my past parking bills?</li>
        </ul>
      </div>
    </div>
  );
};

export default HelpCenterPage;
