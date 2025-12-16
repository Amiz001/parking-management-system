import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const EditProfileForm = ({ status, selectedUser, onClose, refresh, token }) => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    profilePhoto: "/uploads/default.jpg",
  });

  const widgetRef = useRef(null);

  useEffect(() => {
    if (selectedUser) {
      setFormData({
        fname: selectedUser.fname || "",
        lname: selectedUser.lname || "",
        email: selectedUser.email || "",
        phone: selectedUser.phone || "",
        profilePhoto: selectedUser.profilePhoto || "/uploads/default.jpg",
      });
    }
  }, [selectedUser]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      widgetRef.current = window.cloudinary.createUploadWidget(
        {
          cloudName: "dj18evtjj",
          uploadPreset: "profile_photos",
          cropping: true,
          multiple: false,
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            handleInputChange("profilePhoto", result.info.secure_url);
          }
        }
      );
    };
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { fname, lname, email, phone } = formData;

    if (!fname || !lname || !email || !phone) {
      return toast.error("Please fill all required fields!");
    }

    const isValidPhone = /^[0-9]{10}$/.test(phone);
    const isValidEmail = /\S+@\S+\.\S+/.test(email);

    if (!isValidEmail) return toast.error("Invalid email");
    if (!isValidPhone) return toast.error("Invalid phone number");

    try {
      const response = await axios.put(
        `http://localhost:5000/users/update-profile/${selectedUser._id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.message === "Updated successfully!") {
        toast.success("Profile updated successfully!");
        refresh();
        onClose();
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-[#00000080] backdrop-blur-sm flex items-center justify-center p-4 z-50 ${
        status ? "visible" : "hidden"
      }`}
    >
      <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="relative p-6 border-b border-gray-700">
          <h2 className="text-white text-xl font-semibold text-center">Edit Profile</h2>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-white transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">

          {/* Photo Upload */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
                <img
                  src={formData.profilePhoto}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Profile Photo
                </label>
                <button
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-lg font-medium shadow-sm transition"
                  onClick={() => widgetRef.current && widgetRef.current.open()}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>

          {/* First + Last Name */}
          <div className="flex gap-6">
            <div className="w-1/2">
              <label className="block text-gray-300 text-sm font-medium mb-2">First Name</label>
              <input
                type="text"
                value={formData.fname}
                placeholder="Enter first name"
                onChange={(e) => handleInputChange("fname", e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-gray-300 text-sm font-medium mb-2">Last Name</label>
              <input
                type="text"
                value={formData.lname}
                placeholder="Enter last name"
                onChange={(e) => handleInputChange("lname", e.target.value)}
                className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              disabled
              placeholder="Enter email"
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white/50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">Phone</label>
            <input
              type="text"
              value={formData.phone}
              placeholder="Enter phone"
              disabled
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white/50 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700 flex justify-end gap-3 bg-gray-800/40 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-6 py-3 text-gray-300 hover:text-white font-medium transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-lg font-medium transition"
          >
            Update
          </button>
        </div>

      </div>
    </div>
  );
};

export default EditProfileForm;
