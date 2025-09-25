import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const UserFormModal = ({ status, mode, selectedUser, onClose, refresh }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    profilePhoto: "",
  });

  const roles = ["user", "admin", "operator", "customer support"];

  useEffect(() => {
    if (mode === "Update" && selectedUser) {
      setFormData({
        name: selectedUser.name || "",
        email: selectedUser.email || "",
        role: selectedUser.role || "",
        password: selectedUser.password || "",
        profilePhoto: selectedUser.profilePhoto || "",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        role: "user",
        password: "",
        profilePhoto: "",
      });
    }
  }, [mode, selectedUser]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.password || !formData.email) {
      toast.error("Please fill all fields!");
      return;
    }

    const isValidName = /^[A-Za-z\s'.-]{1,30}$/.test(formData.name);
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

    if (!isValidName) {
      toast.error("Invalid name");
      return;
    }

    try {
      if (mode === "Update") {
        const response = await axios.put(
          `http://localhost:5000/users/${selectedUser._id}`,
          formData
        );

        if (response.data.message == "Updated successfully!") {
          toast.success("User updated successfully");
        }
      } else {
        const response = await axios.post(
          "http://localhost:5000/users/",
          formData
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

      <div className="bg-[#151821] light:from-white light:to-gray-50 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto custom-scroll">
        {/* Header */}
        <div className="relative p-6 border-b border-gray-700 light:border-gray-200">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gray-700 light:bg-gray-200 rounded-full flex items-center justify-center">
              <div className="w-12 h-12 bg-gray-600 light:bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-white light:text-gray-800 text-lg font-medium">
                  MR
                </span>
              </div>
            </div>
          </div>
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
          {/* Name Fields */}
          <div>
            <label className="block text-gray-300 light:text-gray-700 text-sm font-medium mb-2">
              NAME
            </label>
            <input
              type="text"
              value={formData.name}
              placeholder="Enter name"
              onChange={(e) => handleInputChange("name", e.target.value)}
              className="w-full bg-[#212634] light:bg-white border border-gray-700 light:border-gray-300 rounded-lg px-4 py-3 text-white light:text-gray-900 placeholder-gray-400 light:placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
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
