import React, { useState } from "react";
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
        { userId: user._id, reason },
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
      className={`fixed inset-0 bg-[#000000aa] flex items-center justify-center p-4 z-50 ${
        status ? "visible" : "hidden"
      }`}
    >
      <div className="bg-[#14213d] rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto text-white">
        <div className="relative p-6 border-b border-gray-700">
          <h2 className="text-white text-xl font-semibold text-center">
            Request Account Deletion
          </h2>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-white transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleDeleteRequest} className="p-6 space-y-6">
          <div>
            <p className="text-gray-300 text-sm">
              Are you sure you want to request deletion of your account?
            </p>
          </div>

          {/* Reason */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Reason for Deletion
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Write your reason... (optional)"
              rows={4}
              className="w-full bg-[#1b264f] border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            ></textarea>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-gray-700 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 text-gray-300 hover:text-white font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-400 text-white rounded-lg font-medium transition ${
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
