import { useState, useEffect } from "react";
import { Calendar, Clock, Car, CreditCard, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function BookingForm() {
  const [formData, setFormData] = useState({
    slotId: "",
    vehicleNumber: "",
    entryDate: "",
    entryTime: "",
    exitDate: "",
    exitTime: "",
    amount: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  // 🔹 Rate per hour (can be changed)
  const RATE_PER_HOUR = 100;

  // 🔹 Auto-calculate amount whenever times change
  useEffect(() => {
    if (
      formData.entryDate &&
      formData.entryTime &&
      formData.exitDate &&
      formData.exitTime
    ) {
      const entry = new Date(`${formData.entryDate}T${formData.entryTime}`);
      const exit = new Date(`${formData.exitDate}T${formData.exitTime}`);
      const diffMs = exit - entry;

      if (diffMs > 0) {
        const diffHours = diffMs / (1000 * 60 * 60);
        const calculatedAmount = Math.ceil(diffHours) * RATE_PER_HOUR;
        setFormData((prev) => ({ ...prev, amount: calculatedAmount.toString() }));
      } else {
        setFormData((prev) => ({ ...prev, amount: "" }));
      }
    }
  }, [formData.entryDate, formData.entryTime, formData.exitDate, formData.exitTime]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // clear error when typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.slotId.trim()) newErrors.slotId = "Slot ID is readOnly";
    if (!formData.vehicleNumber.trim())
      newErrors.vehicleNumber = "Vehicle number is required";
    if (!formData.entryDate) newErrors.entryDate = "Entry date is required";
    if (!formData.entryTime) newErrors.entryTime = "Entry time is required";
    if (!formData.exitDate) newErrors.exitDate = "Exit date is required";
    if (!formData.exitTime) newErrors.exitTime = "Exit time is required";
    if (!formData.amount) newErrors.amount = "Amount could not be calculated";

    if (
      formData.entryDate &&
      formData.entryTime &&
      formData.exitDate &&
      formData.exitTime
    ) {
      const entryDateTime = new Date(
        `${formData.entryDate}T${formData.entryTime}`
      );
      const exitDateTime = new Date(`${formData.exitDate}T${formData.exitTime}`);
      if (exitDateTime <= entryDateTime) {
        newErrors.exitTime = "Exit must be after entry";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /*const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch("http://localhost:5000/physicalbookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),

      });

      if (!response.ok) throw new Error("Failed to save booking");

      const data = await response.json();
      console.log("Booking saved:", data);

    
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Something went wrong. Please try again.");
    }
  };*/

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  try {
    // 1️⃣ Create the booking
    const response = await fetch("http://localhost:5000/physicalbookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error("Failed to save booking");

    const data = await response.json();
    console.log("Booking saved:", data);

    // 2️⃣ Update the slot status to "occupied"
    if (formData.slotId) {
      const slotResponse = await fetch(
        `http://localhost:5000/slots/${formData.slotId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "occupied" }),
        }
      );

      if (!slotResponse.ok) throw new Error("Failed to update slot status");
      console.log(`Slot ${formData.slotId} is now occupied`);
    }

    // 3️⃣ Show confirmation
    setSubmitted(true);

  } catch (error) {
    console.error("Error submitting booking:", error);
    alert("Something went wrong. Please try again.");
  }
};


  const resetForm = () => {
    setFormData({
      slotId: "",
      vehicleNumber: "",
      entryDate: "",
      entryTime: "",
      exitDate: "",
      exitTime: "",
      amount: "",
    });
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="bg-white shadow-xl rounded-xl p-6 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            Booking Confirmed!
          </h2>
          <p className="text-gray-700 mb-4">
            Your booking has been successfully submitted.
          </p>
          <div className="text-left text-sm mb-6 bg-gray-100 p-4 rounded-lg">
            <p><strong>Slot:</strong> {formData.slotId}</p>
            <p><strong>Vehicle:</strong> {formData.vehicleNumber}</p>
            <p><strong>Entry:</strong> {formData.entryDate} {formData.entryTime}</p>
            <p><strong>Exit:</strong> {formData.exitDate} {formData.exitTime}</p>
            <p><strong>Amount:</strong> Rs.{formData.amount}</p>
          </div>
          <button
            onClick={() => navigate("/operator/dashboard")}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <MapPin className="w-6 h-6" /> Parking Booking Form
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Slot ID */}
            <div>
              <label className="block text-sm font-medium mb-1">Slot ID</label>
              <input
                type="text"
                name="slotId"
                value={formData.slotId}
                onChange={handleInputChange}
                
                className="w-full border px-3 py-2 rounded-lg"
              />
              {errors.slotId && (
                <p className="text-red-500 text-sm">{errors.slotId}</p>
              )}
            </div>
            

            {/* Vehicle Number */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Vehicle Number
              </label>
              <input
                type="text"
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleInputChange}
                className="w-full border px-3 py-2 rounded-lg"
              />
              {errors.vehicleNumber && (
                <p className="text-red-500 text-sm">{errors.vehicleNumber}</p>
              )}
            </div>

            {/* Entry Date/Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Entry Date</label>
                <input
                  type="date"
                  name="entryDate"
                  value={formData.entryDate}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded-lg"
                />
                {errors.entryDate && (
                  <p className="text-red-500 text-sm">{errors.entryDate}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Entry Time</label>
                <input
                  type="time"
                  name="entryTime"
                  value={formData.entryTime}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded-lg"
                />
                {errors.entryTime && (
                  <p className="text-red-500 text-sm">{errors.entryTime}</p>
                )}
              </div>
            </div>

            {/* Exit Date/Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Exit Date</label>
                <input
                  type="date"
                  name="exitDate"
                  value={formData.exitDate}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded-lg"
                />
                {errors.exitDate && (
                  <p className="text-red-500 text-sm">{errors.exitDate}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Exit Time</label>
                <input
                  type="time"
                  name="exitTime"
                  value={formData.exitTime}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded-lg"
                />
                {errors.exitTime && (
                  <p className="text-red-500 text-sm">{errors.exitTime}</p>
                )}
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium mb-1">Amount (Rs.)</label>
              <input
                type="text"
                name="amount"
                value={formData.amount}
                readOnly
                className="w-full border px-3 py-2 rounded-lg bg-gray-100"
              />
              {errors.amount && (
                <p className="text-red-500 text-sm">{errors.amount}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                  onClick={() => navigate("/operator/dashboard")}
                className="flex-1 bg-gray-200 py-2 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Book Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
