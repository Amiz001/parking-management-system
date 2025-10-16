import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const PhysicalPayForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    slotId: "",
    vehicleNumber: "",
    entryDate: "",
    entryTime: "",
    exitTime: "",
    amount: 0,
    duration: "",
  });

  const [loading, setLoading] = useState(false);

  // Format date to YYYY-MM-DD
  const formatDate = (d) => {
    const dateObj = new Date(d);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/bookings/${id}`);
        const b = res.data.booking;

        if (!b) {
          alert("Booking not found");
          navigate("/operator/physicalBooking");
          return;
        }

        // Parse entry/exit times
        const [entryHour, entryMin] = b.entryTime.split(":").map(Number);
        const [exitHour, exitMin] = b.exitTime.split(":").map(Number);

        const entry = new Date(b.date);
        entry.setHours(entryHour, entryMin, 0, 0);

        const exit = new Date(b.date);
        exit.setHours(exitHour, exitMin, 0, 0);

        let diffMs = exit - entry;
        if (diffMs < 0) diffMs = 0;

        const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMin = Math.ceil((diffMs % (1000 * 60 * 60)) / (1000 * 60));

        // Calculate amount (Rs 100 per hour, round up partial hours)
        const amount = Math.ceil(diffMs / (1000 * 60 * 60)) * 100;

        setFormData({
          slotId: b.slotId || "",
          vehicleNumber: b.vehicleNum || "",
          entryDate: formatDate(b.date),
          entryTime: b.entryTime,
          exitTime: b.exitTime,
          amount: amount || 0,
          duration: `${diffHrs}h ${diffMin}m`,
        });
      } catch (err) {
        console.error("Fetch booking error:", err);
        alert("Failed to load booking");
        navigate("/operator/physicalBooking");
      }
    };

    fetchBooking();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.slotId || !formData.vehicleNumber || !formData.entryDate || !formData.amount) {
      alert("Missing required fields");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/payment", {
        slotId: formData.slotId,
        vehicleNumber: formData.vehicleNumber,
        entryDate: formData.entryDate,
        duration: formData.duration,
        amount: Number(formData.amount),
      });

      alert("Payment saved successfully!");
      navigate("/operator/physicalBooking");
    } catch (err) {
      console.error("Payment save error:", err.response?.data || err.message);
      if (err.response?.data?.message) {
        alert(`Error: ${err.response.data.message}`);
      } else {
        alert("Error saving payment");
        navigate("/operator/physicalBooking");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg w-[420px] mx-auto mt-10">
      <h2 className="text-2xl font-semibold text-blue-600 mb-5 text-center">
        Physical Payment
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Vehicle Number</label>
          <input
            type="text"
            value={formData.vehicleNumber}
            readOnly
            className="w-full border rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Entry Date</label>
          <input
            type="date"
            value={formData.entryDate}
            readOnly
            className="w-full border rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 mb-1">Entry Time</label>
            <input
              type="time"
              value={formData.entryTime}
              readOnly
              className="w-full border rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Exit Time</label>
            <input
              type="time"
              value={formData.exitTime}
              readOnly
              className="w-full border rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Amount (Rs)</label>
          <input
            type="number"
            value={formData.amount}
            readOnly
            className="w-full border rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={() => navigate("/operator/physicalBooking")}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Payment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PhysicalPayForm;
