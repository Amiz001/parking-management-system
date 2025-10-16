import React, { useState, useEffect } from "react";
import { Shield, Trash2, Loader2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import PasswordResetForm from "./PasswordResetForm";

const SettingsSection = ({ user, token }) => {
  const [status, setStatus] = useState(false); // for reset password modal
  const [deleteStatus, setDeleteStatus] = useState("none"); // 'none', 'pending', 'approved'
  const [loading, setLoading] = useState(false);

  // Fetch delete request status
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/users/${user._id}/delete-status`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.status) {
          setDeleteStatus(res.data.status);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchStatus();
  }, [user._id, token]);

  // Send delete request
  const handleSendDeleteRequest = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        `http://localhost:5000/users/delete-request`,
        { userId: user._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.message === "Delete request sent") {
        toast.success("Delete request sent successfully!");
        setDeleteStatus("pending");
      } else {
        toast.error("Failed to send delete request!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  // Cancel delete request
  const handleCancelDeleteRequest = async () => {
    setLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:5000/users/cancel-delete-request/${user._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.message === "Delete request canceled") {
        toast.info("Delete request canceled!");
        setDeleteStatus("none");
      } else {
        toast.error("Failed to cancel request!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Password Reset Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-50 flex items-center justify-center rounded-lg">
              <Shield className="text-blue-600 w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Password</h2>
              <p className="text-sm text-gray-500">Manage your account password</p>
            </div>
          </div>
          <button
            onClick={() => setStatus(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Reset Password
          </button>
        </div>
      </div>

      {/* Delete Account Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-50 flex items-center justify-center rounded-lg">
              <Trash2 className="text-red-600 w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Delete Account</h2>
              <p className="text-sm text-gray-500">
                Permanently remove your account and all data
              </p>
            </div>
          </div>

          {deleteStatus === "none" && (
            <button
              onClick={handleSendDeleteRequest}
              disabled={loading}
              className={`bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                loading && "opacity-50 cursor-not-allowed"
              }`}
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Request Delete
            </button>
          )}

          {deleteStatus === "pending" && (
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded-full">
                Pending
              </span>
              <button
                onClick={handleCancelDeleteRequest}
                disabled={loading}
                className={`text-gray-600 hover:text-gray-900 text-sm font-medium transition ${
                  loading && "opacity-50 cursor-not-allowed"
                }`}
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Password Reset Modal */}
      <PasswordResetForm
        status={status}
        onClose={() => setStatus(false)}
        userId={user._id}
        token={token}
      />
    </div>
  );
};

export default SettingsSection;
