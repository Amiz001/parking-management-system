import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const PasswordResetForm = ({ status, onClose, userId, token }) => {
  const [step, setStep] = useState(1);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerifyOldPassword = async (e) => {
    e.preventDefault();

    if (!oldPassword) {
      toast.error("Please enter your old password!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `http://localhost:5000/users/verify-password`,
        { userId, oldPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.message == "Valid password!") {
        toast.success("Password verified successfully!");
        setStep(2);
      } else {
        toast.error("Incorrect old password!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (!newPassword || !rePassword) {
      toast.error("Please fill both fields!");
      return;
    }

    if (newPassword !== rePassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters!");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.patch(
        `http://localhost:5000/users/reset-password/${userId}`,
        { password : newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.message == "Password changed successfully") {
        toast.success("Password updated!");
        setStep(1);
        setOldPassword("");
        setNewPassword("");
        setRePassword("");
        onClose();
      } else {
        toast.error("Failed to update password!");
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
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="relative p-6 border-b border-gray-200">
          <h2 className="text-gray-800 text-xl font-semibold text-center">
            Reset Password
          </h2>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-500 hover:text-gray-800 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Step 1: Old Password */}
        {step === 1 && (
          <form onSubmit={handleVerifyOldPassword} className="p-6 space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Old Password
              </label>
              <input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter old password"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
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
                className={`px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition ${
                  loading && "opacity-50 cursor-not-allowed"
                }`}
              >
                {loading ? "Verifying..." : "Next"}
              </button>
            </div>
          </form>
        )}

        {/* Step 2: New Password */}
        {step === 2 && (
          <form onSubmit={handleUpdatePassword} className="p-6 space-y-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Re-enter Password
              </label>
              <input
                type="password"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                placeholder="Re-enter password"
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex justify-between items-center pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 text-gray-500 hover:text-gray-900 text-md transition"
              >
                
              </button>
              <div className="flex gap-3">
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
                  className={`px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition ${
                    loading && "opacity-50 cursor-not-allowed"
                  }`}
                >
                  {loading ? "Updating..." : "Submit"}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default PasswordResetForm;
