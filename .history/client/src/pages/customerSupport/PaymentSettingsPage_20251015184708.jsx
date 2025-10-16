import React from "react";
import { CreditCard, Plus, Trash2 } from "lucide-react";

const PaymentSettingsPage = () => {
  return (
    <div className="space-y-8 pb-20">
      <h2 className="text-3xl font-bold flex items-center gap-2">
        <CreditCard className="text-purple-400" /> Payment & Billing
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
          <div key={i} className="bg-[#1b1f2a] p-5 rounded-lg">
            <p className="font-semibold mb-2">Visa Card **** **** **** {4567 + i}</p>
            <p className="text-gray-400 text-sm">Expires: 06/{28 + i}</p>
            <button className="mt-3 flex items-center gap-2 text-red-500 hover:text-red-700">
              <Trash2 size={16} /> Remove
            </button>
          </div>
        ))}
      </div>

      <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg flex items-center gap-2">
        <Plus size={18} /> Add Payment Method
      </button>
    </div>
  );
};

export default PaymentSettingsPage;
