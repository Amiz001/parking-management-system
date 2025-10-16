import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const PhysicalPayForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
   const initialSlotId = location.state?.vehicleNumber || "";

  const [formData, setFormData] = useState({
    vehicleNumber: initialSlotId,
    entryDate: "",
    entryTime: "",
    exitDate: "",
    exitTime: "",
    amount: "",
  });

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/physicalbookings/${id}`);
        const booking = res.data.booking;

        const toISODate = (dateStr) => {
          const [month, day, year] = dateStr.split("/");
          return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
        };

        setFormData({
          vehicleNumber: booking.vehicleNumber || "",
          entryDate: toISODate(booking.entryDate),
          entryTime: booking.entryTime || "00:00",
          exitDate: toISODate(booking.exitDate),
          exitTime: booking.exitTime || "00:00",
          amount: booking.amount || "", // if amount is saved already
        });
      } catch (err) {
        console.error("Error fetching booking:", err);
      }
    };

    fetchBooking();
  }, [id]);

  // Calculate amount based on entry and exit datetime
  useEffect(() => {
    if (formData.entryDate && formData.exitDate && formData.entryTime && formData.exitTime) {
      const entry = new Date(`${formData.entryDate}T${formData.entryTime}`);
      const exit = new Date(`${formData.exitDate}T${formData.exitTime}`);

      if (!isNaN(entry) && !isNaN(exit) && exit > entry) {
        const diffMs = exit - entry;
        const diffHrs = Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60)));
        const ratePerHour = 100;
        setFormData((prev) => ({ ...prev, amount: diffHrs * ratePerHour }));
      }
    }
  }, [formData.entryDate, formData.exitDate, formData.entryTime, formData.exitTime]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    navigate(-1); // Go back
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        amount: Number(formData.amount),
      };

      await axios.post("http://localhost:5000/payment", payload, {
        headers: { "Content-Type": "application/json" },
      });

      alert("✅ Payment saved successfully!");
      navigate("/"); // or wherever you want to redirect
    } catch (error) {
      console.error("Error saving payment:", error.response?.data || error.message);
      alert("❌ Failed to save payment!");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-blue-600">Physical Payment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-semibold">Vehicle Number</label>
          <input
            type="text"
            name="vehicleNumber"
            value={formData.vehicleNumber}
            onChange={handleChange}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Entry Date</label>
            <input
              type="date"
              name="entryDate"
              value={formData.entryDate}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Entry Time</label>
            <input
              type="time"
              name="entryTime"
              value={formData.entryTime}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-semibold">Exit Date</label>
            <input
              type="date"
              name="exitDate"
              value={formData.exitDate}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Exit Time</label>
            <input
              type="time"
              name="exitTime"
              value={formData.exitTime}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Amount (Rs.)</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Payment
          </button>
        </div>
      </form>
    </div>
  );
};

export default PhysicalPayForm;
