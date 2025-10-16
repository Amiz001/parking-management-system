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
      toast.error("Please fill all required fields!");
      return;
    }

    const isValidPhone = /^[0-9]{10}$/.test(phone);
    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    const isValidFirstName = /^[A-Za-z]{2,}$/.test(fname);
    const isValidLastName = /^[A-Za-z]{2,}$/.test(lname);

    if (!isValidEmail) return toast.error("Invalid email address");
    if (!isValidPhone) return toast.error("Invalid phone number");
    if (!isValidFirstName) return toast.error("Invalid first name");
    if (!isValidLastName) return toast.error("Invalid last name");

    try {
      const response = await axios.put(
        `http://localhost:5000/users/update-profile/${selectedUser._id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.message === "Updated successfully!") {
        toast.success("Profile updated successfully");
        onClose();
        refresh();
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
      className={`fixed inset-0 bg-[#00000065] flex items-center justify-center p-4 z-50 ${
        status ? "visible" : "hidden"
      }`}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="relative p-6 border-b border-gray-200">
          <h2 className="text-gray-800 text-xl font-semibold text-center">
            Edit Profile
          </h2>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-500 hover:text-gray-800 transition"
          >
            <X size={22} />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {/* Profile Photo */}
          <div className="flex justify-center mb-6">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden shadow-sm border border-gray-200">
                <img
                  src={formData.profilePhoto || "/uploads/default.webp"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Profile Photo
                </label>
                <button
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-all shadow-sm"
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
              <label className="block text-gray-700 text-sm font-medium mb-2">
                First Name
              </label>
              <input
                type="text"
                value={formData.fname}
                placeholder="Enter first name"
                onChange={(e) => handleInputChange("fname", e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={formData.lname}
                placeholder="Enter last name"
                onChange={(e) => handleInputChange("lname", e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              placeholder="Enter email"
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Phone
            </label>
            <input
              type="text"
              value={formData.phone}
              placeholder="Enter phone"
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3 bg-gray-50 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileForm;
