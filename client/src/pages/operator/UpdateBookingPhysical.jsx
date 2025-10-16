import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function BookingForm() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    slotId: "",
    zone: "",
    types: "",
    vehicleNum: "",
    date: "",
    entryTime: "",
    exitTime: ""
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:5000/bookings/${id}`)
        .then((res) => res.json())
        .then((data) => {
          const booking = data.booking ? data.booking : data;

          setFormData({
            slotId: booking.slotId || "",
            zone: booking.zone || "",
            types: booking.types || "",
            vehicleNum: booking.vehicleNum || "",
            date: booking.date ? booking.date.split("T")[0] : "",
            entryTime: booking.entryTime || "",
            exitTime: booking.exitTime || "",
          });
        })
        .catch((err) => console.error("Error loading booking:", err));
    }
  }, [id]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.slotId.trim()) newErrors.slotId = "Slot ID is required";
    if (!formData.zone.trim()) newErrors.zone = "Zone is required";
    if (!formData.types) newErrors.types = "Type is required";
    if (!formData.vehicleNum.trim()) newErrors.vehicleNum = "Vehicle number is required";
    if (!formData.date) newErrors.date = "Date is required";
    if (!formData.entryTime) newErrors.entryTime = "Entry time is required";
    if (!formData.exitTime) newErrors.exitTime = "Exit time is required";

    if (formData.entryTime && formData.exitTime && formData.date) {
      const entryDateTime = new Date(`${formData.date}T${formData.entryTime}`);
      const exitDateTime = new Date(`${formData.date}T${formData.exitTime}`);
      if (exitDateTime <= entryDateTime)
        newErrors.exitTime = "Exit time must be after entry time";
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
        ? `http://localhost:5000/bookings/${id}`
        : "http://localhost:5000/bookings";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Booking failed");

      console.log("Booking saved:", data);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert(error.message || "Something went wrong.");
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
            {/* Slot ID & Zone */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Slot ID</label>
                <input
                  type="text"
                  name="slotId"
                  value={formData.slotId}
                  onChange={handleInputChange}
                  readOnly
                  className="w-full border px-3 py-2 rounded-lg"
                />
                {errors.slotId && <p className="text-red-500 text-sm">{errors.slotId}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Zone</label>
                <input
                  type="text"
                  name="zone"
                  value={formData.zone}
                  onChange={handleInputChange}
                  readOnly
                  className="w-full border px-3 py-2 rounded-lg"
                />
                {errors.zone && <p className="text-red-500 text-sm">{errors.zone}</p>}
              </div>
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium mb-1">Type</label>
              <select
                name="types"
                value={formData.types}
                onChange={handleInputChange}
                disabled
                className="w-full border px-3 py-2 rounded-lg"
              >
                <option value="">Select Type</option>
                <option value="online">Online</option>
                <option value="physical">Physical</option>
              </select>
              {errors.types && <p className="text-red-500 text-sm">{errors.types}</p>}
            </div>

            {/* Vehicle & Date */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Vehicle Number</label>
                <input
                  type="text"
                  name="vehicleNum"
                  value={formData.vehicleNum}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded-lg"
                />
                {errors.vehicleNum && <p className="text-red-500 text-sm">{errors.vehicleNum}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded-lg"
                  min={today}
                  max={today}
                />
                {errors.date && <p className="text-red-500 text-sm">{errors.date}</p>}
              </div>
            </div>

            {/* Entry & Exit Time */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Entry Time</label>
                <input
                  type="time"
                  name="entryTime"
                  value={formData.entryTime}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded-lg"
                />
                {errors.entryTime && <p className="text-red-500 text-sm">{errors.entryTime}</p>}
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
                {errors.exitTime && <p className="text-red-500 text-sm">{errors.exitTime}</p>}
              </div>
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

