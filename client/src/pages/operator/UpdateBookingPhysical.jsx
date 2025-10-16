import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function BookingForm() {
  const { id } = useParams(); // 👈 for editing
  const navigate = useNavigate();

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

  // Load booking data if editing
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/physicalbookings/${id}`)
        .then((res) => res.json())
        .then((data) => {
          const booking = data.booking ? data.booking : data;

          setFormData({
            slotId: booking.slotId || "",
            vehicleNumber: booking.vehicleNumber || "",
            entryDate: booking.entryDate ? booking.entryDate.split("T")[0] : "",
            entryTime: booking.entryDate
                ? new Date(booking.entryDate).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                })
                : "",
            exitDate: booking.exitDate ? booking.exitDate.split("T")[0] : "",
            exitTime: booking.exitDate
                ? new Date(booking.exitDate).toLocaleTimeString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                })
                : "",
            amount: booking.amount ? String(booking.amount) : "",
            });

        })
        .catch((err) => console.error("Error loading booking:", err));
    }
  }, [id]);

  // 🔹 Automatically calculate amount when times change
  useEffect(() => {
    if (formData.entryDate && formData.entryTime && formData.exitDate && formData.exitTime) {
      const entryDateTime = new Date(`${formData.entryDate}T${formData.entryTime}`);
      const exitDateTime = new Date(`${formData.exitDate}T${formData.exitTime}`);

      if (exitDateTime > entryDateTime) {
        const diffMs = exitDateTime - entryDateTime;
        const diffHours = Math.ceil(diffMs / (1000 * 60 * 60)); // round up to hours
        const ratePerHour = 100; // 👈 change as needed (or fetch from API)
        const calculatedAmount = diffHours * ratePerHour;

        setFormData((prev) => ({
          ...prev,
          amount: String(calculatedAmount),
        }));
      }
    }
  }, [formData.entryDate, formData.entryTime, formData.exitDate, formData.exitTime]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.slotId.trim()) newErrors.slotId = "Slot ID is readonly";
    if (!formData.vehicleNumber.trim())
      newErrors.vehicleNumber = "Vehicle number is readonly";
    if (!formData.entryDate) newErrors.entryDate = "Entry date is readonly";
    if (!formData.entryTime) newErrors.entryTime = "Entry time is required";
    if (!formData.exitDate) newErrors.exitDate = "Exit date is readonly";
    if (!formData.exitTime) newErrors.exitTime = "Exit time is required";
    if (!formData.amount.trim()) newErrors.amount = "Amount is readOnly";
    else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0)
      newErrors.amount = "Amount must be a positive number";

    // exit must be after entry
    if (
      formData.entryDate &&
      formData.exitDate &&
      formData.entryTime &&
      formData.exitTime
    ) {
      const entryDateTime = new Date(
        `${formData.entryDate}T${formData.entryTime}`
      );
      const exitDateTime = new Date(
        `${formData.exitDate}T${formData.exitTime}`
      );

      if (exitDateTime <= entryDateTime) {
        newErrors.exitTime = "Exit time must be after entry time";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const method = id ? "PUT" : "POST";
      const url = id
        ? `http://localhost:5000/physicalbookings/${id}`
        : "http://localhost:5000/physicalbookings";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // ✅ send full formData
      });

      if (!response.ok) throw new Error("Failed to save booking");

      const data = await response.json();
      console.log("Booking saved:", data);

      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
          <h2 className="text-2xl font-bold text-green-600 mb-4">
            {id ? "Booking Updated!" : "Booking Confirmed!"}
          </h2>
          <p className="text-gray-600 mb-4">
            {id
              ? "Your booking has been successfully updated."
              : "Your booking has been successfully submitted."}
          </p>
          <button
            onClick={() => navigate("/operator/physicalBooking")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            OK
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">
              {id ? "Update Booking" : "Create Booking"}
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Slot ID */}
            <div>
              <label className="block text-sm font-medium mb-2">Slot ID</label>
              <input
                type="text"
                name="slotId"
                value={formData.slotId}
                onChange={handleInputChange}
                readOnly
                className="w-full px-4 py-2 border rounded-lg" 
              />
              {errors.slotId && (
                <p className="text-red-500 text-sm">{errors.slotId}</p>
              )}
            </div>

            {/* Vehicle Number */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Vehicle Number
              </label>
              <input
                type="text"
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleInputChange}
                readOnly
                className="w-full px-4 py-2 border rounded-lg"
              />
              {errors.vehicleNumber && (
                <p className="text-red-500 text-sm">{errors.vehicleNumber}</p>
              )}
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Entry Date
                </label>
                <input
                  type="date"
                  name="entryDate"
                  value={formData.entryDate}
                  onChange={handleInputChange}
                  disabled
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Entry Time
                </label>
                <input
                  type="time"
                  name="entryTime"
                  value={formData.entryTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Exit Date
                </label>
                <input
                  type="date"
                  name="exitDate"
                  value={formData.exitDate}
                  onChange={handleInputChange}
                  disabled
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Exit Time
                </label>
                <input
                  type="time"
                  name="exitTime"
                  value={formData.exitTime}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium mb-2">Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                readOnly
                className="w-full px-4 py-2 border rounded-lg"
              />
              {errors.amount && (
                <p className="text-red-500 text-sm">{errors.amount}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => navigate("/operator/physicalBooking")}
                className="flex-1 bg-gray-200 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg"
              >
                {id ? "Update" : "Book Now"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
