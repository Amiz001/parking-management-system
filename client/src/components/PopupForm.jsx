import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const UserFormModal = ({
  status,
  mode,
  selectedUser,
  onClose,
  refresh,
  token,
}) => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    profilePhoto: "/uploads/default.jpg",
  });

  const [uploadedUrl, setUploadedUrl] = useState("");
  const roles = ["user", "admin", "operator", "customer support"];
  const widgetRef = useRef(null);

  useEffect(() => {
    if (mode === "Update" && selectedUser) {
      setFormData({
        fname: selectedUser.fname || "",
        lname: selectedUser.lname || "",
        email: selectedUser.email || "",
        phone: selectedUser.phone || "",
        role: selectedUser.role || "",
        password: selectedUser.password || "",
        profilePhoto: selectedUser.profilePhoto || "",
      });
    } else {
      setFormData({
        fname: "",
        lname: "",
        email: "",
        phone: "",
        role: "",
        password: "",
        profilePhoto: "/uploads/default.jpg",
      });
    }
  }, [mode, selectedUser]);

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
            handleInputChange("profilePhoto", result.info.secure_url)
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

    if (
      !(formData.fname || formData.lname) ||
      !formData.password ||
      !formData.email ||
      !formData.phone
    ) {
      toast.error("Please fill all fields!");
      return;
    }

    const isValidFirstName = /^[A-Za-z]{2,}$/.test(formData.firstName);
    const isValidLastName = /^[A-Za-z]{2,}$/.test(formData.lastName);
    const isValidPhone = /^[0-9]{10}$/.test(formData.phone);
    const isValidEmail = /\S+@\S+\.\S+/.test(formData.email);
    const isValidPassword = /^(?=.*[0-9]).{8,}$/.test(formData.password);

    if (!isValidPassword) {
      toast.error("Invalid password format");
      return;
    }

    if (!isValidEmail) {
      toast.error("Invalid email address");
      return;
    }

    if (!isValidPhone) {
      toast.error("Invalid phone number");
      return;
    }

    if (!isValidFirstName) {
      toast.error("Invalid First name");
      return;
    }

    if (!isValidLastName) {
      toast.error("Invalid Last name");
      return;
    }

    try {
      if (mode === "Update") {
        const response = await axios.put(
          `http://localhost:5000/users/${selectedUser._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.message == "Updated successfully!") {
          toast.success("User updated successfully");
        }
      } else {
        const response = await axios.post(
          "http://localhost:5000/users/",
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (response.data.message == "Added successfully") {
          toast.success("User added successfully");
        }

        if (response.data.message == "User already exists!") {
          toast.error("User already exists");
        }
      }

      onClose();
      refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-[#0000007d] flex items-center justify-center p-4 z-50 ${
        status ? "visible" : "hidden"
      }`}
    >
      <div className="bg-[#151821] light:bg-gradient-to-b light:from-white light:to-gray-50 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scroll">
        {/* Header */}
        <div className="relative p-6 border-b border-gray-700 light:border-gray-200">
          <h2 className="text-white light:text-gray-900 text-xl font-semibold text-center">
            {mode == "Add" ? "Add user" : "Update user"}
          </h2>

          <button
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-white light:text-gray-500 light:hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-6 space-y-6">
          <div className="flex justify-center mb-4">

            {/* Profile Photo */}
            <div className="flex items-center gap-6 mb-6">
              <div className="w-24 h-24 bg-gray-700 light:bg-gray-300 rounded-xl overflow-hidden shadow-md">
                <img
                  src={mode == 'Update' ? formData.profilePhoto : "/uploads/default.webp" || formData.profilePhoto}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <label className="block text-gray-300 light:text-gray-700 text-sm font-medium mb-2">
                  Profile Photo
                </label>
                <button
                  className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg text-sm font-medium transition-all shadow-sm"
                  onClick={() => widgetRef.current && widgetRef.current.open()}
                >
                  Upload Profile
                </button>
              </div>
            </div>
          </div>
          {/* Name Fields */}
          <div className="flex gap-25">
            <div>
              <label className="block text-gray-300 light:text-gray-700 text-sm font-medium mb-2">
                FIRST NAME
              </label>
              <input
                type="text"
                value={formData.fname}
                placeholder="Enter first name"
                onChange={(e) => handleInputChange("fname", e.target.value)}
                className="w-[140%] bg-[#212634] light:bg-white border border-gray-700 light:border-gray-300 rounded-lg px-4 py-3 text-white light:text-gray-900 placeholder-gray-400 light:placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 light:text-gray-700 text-sm font-medium mb-2">
                LAST NAME
              </label>
              <input
                type="text"
                value={formData.lname}
                placeholder="Enter last name"
                onChange={(e) => handleInputChange("lname", e.target.value)}
                className="w-[140%] bg-[#212634] light:bg-white border border-gray-700 light:border-gray-300 rounded-lg px-4 py-3 text-white light:text-gray-900 placeholder-gray-400 light:placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-300 light:text-gray-700 text-sm font-medium mb-2">
              EMAIL
            </label>
            <input
              type="email"
              value={formData.email}
              placeholder="Enter email"
              onChange={(e) => handleInputChange("email", e.target.value)}
              className="w-full bg-[#212634] light:bg-white border border-gray-700 light:border-gray-300 rounded-lg px-4 py-3 text-white light:text-gray-900 placeholder-gray-400 light:placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-300 light:text-gray-700 text-sm font-medium mb-2">
              PHONE
            </label>
            <input
              type="phone"
              value={formData.phone}
              placeholder="Enter phone"
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className="w-full bg-[#212634] light:bg-white border border-gray-700 light:border-gray-300 rounded-lg px-4 py-3 text-white light:text-gray-900 placeholder-gray-400 light:placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Password */}
          {mode == "Add" && (
            <div>
              <label className="block text-gray-300 light:text-gray-700 text-sm font-medium mb-2">
                PASSWORD
              </label>
              <input
                type="password"
                value={formData.password}
                placeholder="At least 8 characters including numbers"
                onChange={(e) => handleInputChange("password", e.target.value)}
                className="w-full bg-[#212634] light:bg-white border border-gray-700 light:border-gray-300 rounded-lg px-4 py-3 text-white light:text-gray-900 placeholder-gray-400 light:placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

          {/* Role */}
          <div>
            <label className="block text-gray-300 light:text-gray-700 text-sm font-medium mb-3">
              ROLE
            </label>
            <div className="flex flex-wrap gap-3">
              {roles.map((role) => (
                <button
                  key={role}
                  value={formData.role}
                  onClick={() => handleInputChange("role", role)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    formData.role === role
                      ? role === "admin"
                        ? "bg-indigo-600 text-white"
                        : role === "operator"
                        ? "bg-indigo-600 text-white"
                        : role === "customer support"
                        ? "bg-indigo-600 text-white"
                        : "bg-indigo-600 text-white"
                      : "bg-gray-700 light:bg-gray-200 text-gray-300 light:text-gray-700 hover:bg-gray-600 light:hover:bg-gray-300"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-700 light:border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-3  text-gray-300 light:text-gray-700 hover:text-white light:hover:text-gray-900 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-3 bg-gradient-to-l cursor-pointer from-blue-500 to-indigo-600 hover:bg-gradient-to-l hover:from-blue-600 hover:to-indigo-700 text-white rounded-lg font-medium"
          >
            {mode == "Add" ? "Add" : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserFormModal;
