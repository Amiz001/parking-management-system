import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const AddVehicleForm = ({
  status,
  onClose,
  refresh,
  token,
  userId,
  selectedVehicle,
  mode,
}) => {
  const [formData, setFormData] = useState({
    vehicleNo: "",
    userId: userId,
    type: "",
    model: "",
  });

  useEffect(() => {
    if (mode === "update" && selectedVehicle) {
      setFormData({
        vehicleNo: selectedVehicle.vehicleNo || "",
        userId: selectedVehicle.userId || "",
        type: selectedVehicle.type || "",
        model: selectedVehicle.model || "",
      });
    }
  }, [mode, selectedVehicle]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const isValidSriLankanVehicleNo = (vehicleNo) => {
    const regex =
      /^(?:[A-Z]{2,3}-\d{4}|[A-Z]{2,3}\s[A-Z]{2,3}-\d{4}|\d{2}-\d{4}|[A-Z]{1,3}\s?\d{4})$/i;
    return regex.test(vehicleNo.trim());
  };

  const isValidModel = (model) => /^[A-Za-z0-9\s]*$/.test(model);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { vehicleNo, userId, type, model } = formData;

    if (!vehicleNo || !type) {
      toast.error("Please fill all required fields!");
      return;
    }

    if (!isValidSriLankanVehicleNo(vehicleNo)) {
      toast.error("Invalid Sri Lankan vehicle number format!");
      return;
    }

    if (model && !isValidModel(model)) {
      toast.error(
        "Vehicle model can only contain letters, numbers, and spaces!"
      );
      return;
    }
    if (mode == "add") {
      try {
        const response = await axios.post(
          "http://localhost:5000/vehicles",
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.message === "Added successfully") {
          toast.success("Vehicle added successfully!");
          refresh();
          onClose();
        } else {
          console.log(response.data.message);
          toast.error("Failed to add vehicle");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
      }
    }

    else{

      try {
        const response = await axios.put(
          `http://localhost:5000/vehicles/${selectedVehicle._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.message === "Updated successfully!") {
          toast.success("Vehicle updated successfully!");
          refresh();
          onClose();
        } else {
          console.log(response.data.message);
          toast.error("Failed to update vehicle");
        }
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-[#00000065] flex items-center justify-center p-4 z-50 ${
        status ? "visible" : "hidden"
      }`}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative p-6 border-b border-gray-200">
          <h2 className="text-gray-800 text-xl font-semibold text-center">
            {mode == "add" ? "Add Vehicle" : "Update Vehicle"}
          </h2>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-500 hover:text-gray-800 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {/* Vehicle No */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Vehicle Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.vehicleNo}
              placeholder="Enter vehicle number (e.g., WP-ABC-1234)"
              onChange={(e) => handleInputChange("vehicleNo", e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Vehicle Type */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Vehicle Type <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.type}
              onChange={(e) => handleInputChange("type", e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select type</option>
              <option value="Car">Car</option>
              <option value="Van">Van</option>
              <option value="Bike">Bike</option>
              <option value="Bus">Bus</option>
              <option value="Lorry">Lorry</option>
              <option value="SUV">SUV</option>
            </select>
          </div>

          {/* Vehicle Model (Optional) */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Vehicle Model (Optional)
            </label>
            <input
              type="text"
              value={formData.model}
              placeholder="Enter model (e.g., Civic, Corolla)"
              onChange={(e) => handleInputChange("model", e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3 bg-gray-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition"
          >
            {mode == "add" ? "Add Vehicle" : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddVehicleForm;
