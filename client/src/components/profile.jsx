import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import {
  User,
  CreditCard,
  Calendar,
  Settings,
  Shield,
  Trash2,
  Edit,
  Lock,
  CheckCircle,
  LogOut,
  House,
} from "lucide-react";

export default function UserProfileDashboard() {
  const [activeTab, setActiveTab] = useState("profile");
  const [deleteStatus, setDeleteStatus] = useState("");
  const [user, setUser] = useState(null);

  const handleDeleteAccount = () => {
    setDeleteStatus("pending");
    setTimeout(() => {
      setDeleteStatus("requested");
    }, 2000);
  };

const fetchUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.warn("No token found");
    return;
  }

  try {
    const decoded = jwtDecode(token);

    const userId = decoded._id;
    if (!userId) {
      console.error("No userId in token");
      return;
    }

    const res = await Axios.get(`http://localhost:5000/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res?.data?.user) {
      setUser(res.data.user);
    } else {
      console.warn("User not found in response");
    }
  } catch (err) {
    console.error("Error fetching user:", err);
  }
};


  useEffect( () => {
    fetchUser();
  }, []);

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "bookings", label: "Bookings", icon: Calendar },
    { id: "payments", label: "Payment History", icon: CreditCard },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "Back", label: "Back", icon: House },
    { id: "Log out", label: "LogOut", icon: LogOut },
  ];

  const bookings = [
    {
      id: 1,
      service: "Slot W022",
      date: "Dec 15, 2024",
      status: "Completed",
      amount: "$150",
    },
    {
      id: 2,
      service: "Slot W003",
      date: "Jan 8, 2025",
      status: "In Progress",
      amount: "$300",
    },
    {
      id: 3,
      service: "Slot W012",
      date: "Jan 22, 2025",
      status: "Upcoming",
      amount: "$200",
    },
  ];

  const payments = [
    {
      id: 1,
      description: "Silver membership",
      date: "Dec 15, 2024",
      amount: "$150",
      status: "Paid",
    },
    {
      id: 2,
      description: "Custom",
      date: "Jan 8, 2025",
      amount: "$150",
      status: "Paid",
    },
    {
      id: 3,
      description: "Other",
      date: "Jan 22, 2025",
      amount: "$200",
      status: "Pending",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 mb-8">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-2xl font-bold">
              EJ
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2">Emily Johnson</h1>
              <p className="text-blue-100 mb-1">johnson@example.com</p>
              <div className="flex items-center text-blue-200 text-sm">
                <CheckCircle className="w-4 h-4 mr-2" />
                Verified Account
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <nav className="bg-gray-800 rounded-xl p-4">
              <div className="space-y-2">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "profile" && (
              <div className="bg-gray-800 rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Personal Details</h2>
                  <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2">
                    <Edit className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-gray-400 text-sm font-medium block mb-2">
                      Full Name
                    </label>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      Emily Johnson
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm font-medium block mb-2">
                      Date of Birth
                    </label>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      January 1, 1987
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm font-medium block mb-2">
                      Gender
                    </label>
                    <div className="bg-gray-700 p-3 rounded-lg">Female</div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm font-medium block mb-2">
                      Nationality
                    </label>
                    <div className="bg-gray-700 p-3 rounded-lg">American</div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm font-medium block mb-2">
                      Phone Number
                    </label>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      (213) 555-1234
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm font-medium block mb-2">
                      Email
                    </label>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      johnson@example.com
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-gray-400 text-sm font-medium block mb-2">
                      Address
                    </label>
                    <div className="bg-gray-700 p-3 rounded-lg">
                      California - United States
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "bookings" && (
              <div className="bg-gray-800 rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-gray-700 rounded-lg p-4 flex justify-between items-center"
                    >
                      <div>
                        <h3 className="font-semibold text-lg">
                          {booking.service}
                        </h3>
                        <p className="text-gray-400">{booking.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold">
                          {booking.amount}
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            booking.status === "Completed"
                              ? "bg-green-900 text-green-300"
                              : booking.status === "In Progress"
                              ? "bg-blue-900 text-blue-300"
                              : "bg-yellow-900 text-yellow-300"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "payments" && (
              <div className="bg-gray-800 rounded-xl p-6">
                <h2 className="text-2xl font-bold mb-6">Payment History</h2>
                <div className="space-y-4">
                  {payments.map((payment) => (
                    <div
                      key={payment.id}
                      className="bg-gray-700 rounded-lg p-4 flex justify-between items-center"
                    >
                      <div>
                        <h3 className="font-semibold text-lg">
                          {payment.description}
                        </h3>
                        <p className="text-gray-400">{payment.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold">
                          {payment.amount}
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            payment.status === "Paid"
                              ? "bg-green-900 text-green-300"
                              : "bg-yellow-900 text-yellow-300"
                          }`}
                        >
                          {payment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "settings" && (
              <div className="space-y-6">
                {/* Security Settings */}
                <div className="bg-gray-800 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <Shield className="w-6 h-6 text-blue-400" />
                    <h2 className="text-2xl font-bold">Security Settings</h2>
                  </div>

                  <div className="space-y-4">
                    <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2">
                      <Lock className="w-5 h-5" />
                      <span>Change Password</span>
                    </button>

                  </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-gray-800 border border-red-900/50 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <Trash2 className="w-6 h-6 text-red-400" />
                    <h2 className="text-2xl font-bold text-red-400">
                      Danger Zone
                    </h2>
                  </div>

                  <div className="bg-red-900/20 border border-red-800 rounded-lg p-4">
                    <h3 className="font-semibold text-red-400 mb-2">
                      Delete Account
                    </h3>
                    <p className="text-gray-300 text-sm mb-4">
                      Once you delete your account, there is no going back.
                      Please be certain.
                    </p>
                    <button
                      onClick={handleDeleteAccount}
                      disabled={deleteStatus !== ""}
                      className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                        deleteStatus === ""
                          ? "bg-red-600 hover:bg-red-700 text-white"
                          : deleteStatus === "pending"
                          ? "bg-yellow-600 text-white cursor-not-allowed"
                          : "bg-green-600 text-white cursor-not-allowed"
                      }`}
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>
                        {deleteStatus === ""
                          ? "Delete Account"
                          : deleteStatus === "pending"
                          ? "Pending..."
                          : "Requested"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
