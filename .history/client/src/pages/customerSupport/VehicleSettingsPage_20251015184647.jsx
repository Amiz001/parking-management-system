import React from "react";
import { Car, Trash2, Plus } from "lucide-react";

const VehicleSettingsPage = () => {
  return (
    <div className="space-y-8 pb-20">
      <h2 className="text-3xl font-bold flex items-center gap-2">
        <Car className="text-yellow-400" /> Vehicle Management
      </h2>
      <p className="text-gray-400">Manage your registered vehicles for automatic entry & billing.</p>

      {[1, 2, 3].map((v) => (
        <div key={v} className="bg-[#1b1f2a] p-6 rounded-xl flex justify-between items-center hover:bg-[#242938]">
          <div>
            <h3 className="font-semibold text-lg">Vehicle #{v}</h3>
            <p className="text-gray-400">Number: ABC-{1000 + v}</p>
            <p className="text-gray-400">Type: Car</p>
          </div>
          <Trash2 className="text-red-500 cursor-pointer hover:text-red-700" />
        </div>
      ))}

      <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg flex items-center gap-2">
        <Plus size={18} /> Add New Vehicle
      </button>
    </div>
  );
};

export default VehicleSettingsPage;
