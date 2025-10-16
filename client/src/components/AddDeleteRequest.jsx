import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const AddDeleteRequest = ({ status, user, onClose, refresh, token }) => {
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDeleteRequest = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/users/delete-req",
        {      
          userId: user._id,
          reason,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.message === "Delete request sent successfully!") {
        toast.success("Delete request submitted!");
        setReason("");
        onClose();
        refresh();
      } else {
        toast.error("Failed to send delete request!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-[#00000065] flex items-center justify-center p-4 z-50 ${
        status ? "visible" : "hidden"
      }`}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="relative p-6 border-b border-gray-200">
          <h2 className="text-gray-800 text-xl font-semibold text-center">
            Request Account Deletion
          </h2>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-500 hover:text-gray-800 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleDeleteRequest} className="p-6 space-y-6">
          <div>
            <p className="text-gray-700 text-sm">
              Are you sure you want to request deletion of your account?
            </p>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Reason for Deletion
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Write your reason... (optional)"
              rows={4}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-400"
            ></textarea>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-gray-200 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Sending..." : "Send Delete Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDeleteRequest;
