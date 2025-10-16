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
  Star,
  Bell,
  Search,
  MapPin,
  Car,
  Clock,
  DollarSign,
  Activity,
  TrendingUp,
  Award,
  ChevronDown,
  Plus,
  Filter,
  Download,
  Eye,
  EyeOff,
  AlertTriangle,
  Mail,
  Phone,
  Calendar as CalendarIcon,
  Navigation,
  Bookmark,
  History,
  CreditCard as CardIcon,
  Wallet,
  PieChart,
  Bus,
} from "lucide-react";
import Axios from "axios";
import { useClickOutside } from "../hooks/useClickOutside";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import EditProfileForm from "../components/EditProfileForm";
import AddVehicleForm from "../components/AddVehicleForm";
import PasswordResetForm from "../components/PasswordResetForm";
import AddDeleteRequest from "../components/AddDeleteRequest";
import { toast } from "react-toastify";

export default function ProfessionalParkingDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [deleteReq, setDeleteReq] = useState(null);
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState(3);
  const [showPassword, setShowPassword] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useClickOutside(() => setShowPopup(false));
  const [status, setStatus] = useState(false);
  const [vehicles, setVehicles] = useState(null);
  const [mode, setMode] = useState("add");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const navigate = useNavigate();

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
      const userId = decoded.id;

      console.log(decoded);

      if (!userId) {
        console.error("No userId in token");
        return;
      }

      const res = await Axios.get(`http://localhost:5000/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data) {
        setUser(res.data);
      } else {
        console.warn("User not found in response");
      }
    } catch (err) {
      console.error("Error fetching user:", err);
    }
  };

  const fetchVehicles = async () => {
    try {
      const decoded = jwtDecode(localStorage.getItem("token"));

      const vehicles = await Axios.get("http://localhost:5000/vehicles");

      if (!vehicles.data) {
        console.log("No vehicles found!");
        return;
      }

      const filtered = vehicles.data.filter((v) => v.userId == decoded.id);
      console.log(filtered);
      setVehicles(filtered);
    } catch (err) {
      console.log(err);
    }
  };

  const getDeleteRequest = async () => {
    try {
      const decoded = jwtDecode(localStorage.getItem("token"));

      const deleteRequest = await Axios.get(
        `http://localhost:5000/users/delete-req/${decoded.id}`
      );

      console.log(deleteRequest.data);
      if (!deleteRequest) {
        console.log("No Requests found!");
        return;
      }
      setDeleteReq(deleteRequest.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelDeleteRequest = async () => {
    try {
      if(deleteReq){
        const res = await Axios.delete(`http://localhost:5000/users/delete-req/${deleteReq._id}`);

        if (!res) {
        toast.error("Delete request deletion failed!");
        return;
      }
      }
      getDeleteRequest();
      toast.success("Delete request deleted successfully!");
    } catch (err) {
      console.error("Error cancelling delete request:", err);
      toast.error("Something went wrong while deleting the request!");
    }
  };

  useEffect(() => {
    fetchUser();
    fetchVehicles();
    getDeleteRequest();
  }, []);

  const handleDelete = async (id) => {
    const res = await Axios.delete(`http://localhost:5000/vehicles/${id}`);

    if (res.data.message === "Deletion failed!") {
      toast.error("Vehicle deletion failed!");
      return;
    }

    toast.success("Vehicle deleted successfully!");
    fetchVehicles();
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: Activity },
    { id: "profile", label: "Profile", icon: User },
    { id: "bookings", label: "Parking History", icon: Calendar },
    { id: "vehicles", label: "My Vehicles", icon: Car },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const quickActions = [
    { id: "back", label: "Back to Home", icon: House },
    { id: "logout", label: "Log Out", icon: LogOut },
  ];

  const recentBookings = [
    {
      id: 1,
      location: "Downtown Plaza - Level 2",
      slot: "A-045",
      date: "Today, 9:00 AM",
      duration: "3h 45m",
      status: "Active",
      amount: "$15.50",
      vehicle: "BMW X3 - ABC123",
    },
    {
      id: 2,
      location: "Mall Parking - B Wing",
      slot: "B-122",
      date: "Yesterday, 2:30 PM",
      duration: "2h 30m",
      status: "Completed",
      amount: "$12.00",
      vehicle: "Tesla Model 3 - XYZ789",
    },
    {
      id: 3,
      location: "Airport Terminal 1",
      slot: "C-067",
      date: "Dec 20, 2024",
      duration: "6h 15m",
      status: "Completed",
      amount: "$45.00",
      vehicle: "BMW X3 - ABC123",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };  

  const redirectUser = (role) => {
    switch (role) {
      case "user":
        navigate("/");
        break;
      case "admin":
        navigate("/admin/dashboard");
        break;
      case "operator":
        navigate("/operator/dashboard");
        break;
      case "customer support":
        navigate("/customersupport/dashboard");
        break;
      default:
        navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b-0">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ParkBay</h1>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search bookings, locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>

              <div
                className="flex items-center space-x-3 bg-gray-50 rounded-lg p-2"
                onClick={() => setShowPopup(true)}
              >
                <div className="w-9 h-9 overflow-hidden rounded-full flex items-center justify-center text-sm font-bold text-white">
                  <img
                    src={user ? user.profilePhoto : "/uploads/default.webp"}
                    className="h-fll w-full"
                  ></img>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">
                    {user ? user.fname : "Loading..."}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user ? user.membership.name + " Member" : "Loarding ..."}
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </div>

            {showPopup && (
              <div
                className="absolute z-10 right-[9.3%] mt-[9%] w-40 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
                ref={popupRef}
              >
                <ul className="text-gray-700 text-sm">
                  {user && user.role != "user" && (
                    <li
                      onClick={() => redirectUser(user.role)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      Dashboard
                    </li>
                  )}

                  <li
                    onClick={() => handleLogout()}
                    className="px-4 py-2 text-red-600 hover:bg-red-50 cursor-pointer font-medium"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-7xl min-w-10xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-sm rounded-2xl p-6 sticky top-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 overflow-hidden rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
                  <img
                    src={user ? user.profilePhoto : "/uploads/default.webp"}
                    className="h-fll w-full"
                  ></img>
                </div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {user ? user.fname : "Loading..."}
                </h2>
                <div className="flex items-center justify-center text-green-600 text-sm mt-1">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  {user ? user.membership.name + " Member" : "Loarding ..."}
                </div>
              </div>

              {/* Navigation */}
              <nav className="space-y-2 mb-8">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                        activeTab === tab.id
                          ? "bg-blue-50 text-blue-600 font-semibold shadow-sm border border-blue-100"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="border-t pt-4 space-y-2">
                {quickActions.map((action) => {
                  const IconComponent = action.icon;
                  return (
                    <button
                      key={action.id}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all duration-200"
                    >
                      <IconComponent className="w-5 h-5" />
                      <span className="text-sm">{action.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "dashboard" && (
              <div className="space-y-8">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">
                        Welcome back, {user ? user.fname : "Loading..."}! 👋
                      </h1>
                      <p className="text-blue-100 mb-4">
                        Here's what's happening with your parking today
                      </p>
                      <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-medium transition-colors backdrop-blur-sm">
                        <Plus className="w-4 h-4 mr-2 inline" />
                        Book New Spot
                      </button>
                    </div>
                  </div>
                </div>  

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-900">
                        Recent Parking Activity
                      </h2>
                      <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                        View All
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {recentBookings.slice(0, 3).map((booking) => (
                        <div
                          key={booking.id}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                              <MapPin className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {booking.location}
                              </h3>
                              <p className="text-sm text-gray-600">
                                Slot {booking.slot} • {booking.date}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold text-gray-900">
                              {booking.amount}
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                booking.status === "Active"
                                  ? "bg-green-100 text-green-600"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {booking.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* Profile */}
            {activeTab === "profile" && (
              <div className="space-y-8">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-900">
                        Personal Information
                      </h2>
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                        onClick={() => setStatus(true)}
                      >
                        <Edit className="w-4 h-4" />
                        <span>Edit Profile</span>
                      </button>
                    </div>
                  </div>

                  <EditProfileForm
                    status={status}
                    selectedUser={user}
                    onClose={() => setStatus(false)}
                    refresh={() => fetchUser()}
                    token={localStorage.getItem("token")}
                  />

                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-gray-500 text-sm font-medium flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          First Name
                        </label>
                        <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl font-medium text-gray-900">
                          {user ? user.fname : "Loading..."}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-gray-500 text-sm font-medium flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          Last Name
                        </label>
                        <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl font-medium text-gray-900">
                          {user ? user.lname : "Loading..."}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-gray-500 text-sm font-medium flex items-center">
                          <Mail className="w-4 h-4 mr-2" />
                          Email Address
                        </label>
                        <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl font-medium text-gray-900">
                          {user ? user.email : "Loading..."}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-gray-500 text-sm font-medium flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          Phone Number
                        </label>
                        <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl font-medium text-gray-900">
                          {user ? user.phone : "Loading..."}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-gray-500 text-sm font-medium flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-2" />
                          Role
                        </label>
                        <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl font-medium text-gray-900">
                          {user ? user.role : "Loading..."}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-gray-500 text-sm font-medium flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-2" />
                          Joined on
                        </label>
                        <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl font-medium text-gray-900">
                          {user ? formatDate(user.createdAt) : "Loading..."}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                        <Award className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {user
                            ? user.membership.name + " Membership"
                            : "Loading..."}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {user ? user.membership.price : "Loading..."}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Valid Until</span>
                        <span className="font-medium">Dec 31, 2025</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Parking Credits</span>
                        <span className="font-medium text-green-600">
                          $125.50
                        </span>
                      </div>
                    </div>
                    <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 px-4 rounded-xl font-medium transition-colors">
                      Upgrade to Platinum
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* Parking History */}
            {activeTab === "bookings" && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="p-6 border-b border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Parking History
                    </h2>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {recentBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                          <div className="flex items-start space-x-4">
                            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center">
                              <MapPin className="w-7 h-7 text-blue-600" />
                            </div>
                            <div className="space-y-1">
                              <h3 className="font-semibold text-gray-900 text-lg">
                                {booking.location}
                              </h3>
                              <p className="text-gray-600">
                                Slot: {booking.slot}
                              </p>
                              <p className="text-sm text-gray-500">
                                {booking.vehicle}
                              </p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span className="flex items-center">
                                  <Clock className="w-4 h-4 mr-1" />
                                  {booking.duration}
                                </span>
                                <span>{booking.date}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between lg:flex-col lg:items-end space-x-4 lg:space-x-0 lg:space-y-2">
                            <div className="text-right">
                              <div className="text-2xl font-bold text-gray-900">
                                {booking.amount}
                              </div>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  booking.status === "Active"
                                    ? "bg-green-100 text-green-600"
                                    : booking.status === "Completed"
                                    ? "bg-blue-100 text-blue-600"
                                    : "bg-yellow-100 text-yellow-600"
                                }`}
                              >
                                {booking.status}
                              </span>
                            </div>
                            
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {/* Vehicles */}
            {activeTab === "vehicles" && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-900">
                        My Vehicles
                      </h2>
                      <button
                        onClick={() => {
                          setMode("add");
                          setStatus(true);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Vehicle</span>
                      </button>
                    </div>

                    <AddVehicleForm
                      status={status}
                      mode={mode}
                      userId={user._id}
                      selectedVehicle={selectedVehicle}
                      onClose={() => setStatus(false)}
                      refresh={() => fetchVehicles()}
                      token={localStorage.getItem("token")}
                    />
                  </div>

                  <div className="p-6">
                    <div className="space-y-4">
                      {vehicles &&
                        vehicles.map((vehicle) => (
                          <div
                            key={vehicle._id}
                            className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                          >
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                              <div className="flex items-start space-x-4">
                                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center">
                                  {vehicle.type == "Car" && (
                                    <Car className="w-7 h-7 text-blue-600" />
                                  )}
                                  {vehicle.type == "Bus" && (
                                    <Bus className="w-7 h-7 text-blue-600" />
                                  )}
                                </div>
                                <div className="space-y-1">
                                  <h3 className="font-semibold text-gray-900 text-lg">
                                    {vehicle.vehicleNo}
                                  </h3>
                                  <p className="text-gray-600">
                                    Type: {vehicle.type}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center justify-between lg:flex-col lg:items-end space-x-4 lg:space-x-0 lg:space-y-2">
                                <div className="text-right">
                                  <button
                                    className="px-3 py-1 text-green-600 rounded-lg"
                                    onClick={() => {
                                      setMode("update");
                                      setStatus(true);
                                      setSelectedVehicle(vehicle);
                                    }}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="px-3 py-1 text-red-600 rounded-lg"
                                    onClick={() => handleDelete(vehicle._id)}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "settings" && (
              <div className="space-y-6">
                {/* Password Reset */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 flex items-center justify-center rounded-lg">
                        <Shield className="text-blue-600 w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                          Password
                        </h2>
                        <p className="text-sm text-gray-500">
                          Manage your account password
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setStatus(true)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Reset Password
                    </button>
                  </div>
                </div>

                {/* Delete Account */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-50 flex items-center justify-center rounded-lg">
                        <Trash2 className="text-red-600 w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                          Delete Account
                        </h2>
                        <p className="text-sm text-gray-500">
                          Permanently remove your account and all data
                        </p>
                      </div>
                    </div>

                    {!deleteReq && (
                      <button
                        onClick={() => setStatus(true)}
                        className={`bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2
                        }`}
                      >
                        Request Delete
                      </button>
                    )}

                    {deleteReq && (
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded-full">
                          Pending
                        </span>
                        <button
                          onClick={() => handleCancelDeleteRequest()}
                          className={`text-gray-600 hover:text-gray-900 text-sm font-medium transition
                            
                          }`}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <PasswordResetForm
                  status={status}
                  onClose={() => setStatus(false)}
                  userId={user._id}
                  token={localStorage.getItem("token")}
                />

                <AddDeleteRequest
                  status={status}
                  onClose={() => setStatus(false)}
                  user={user}
                  token={localStorage.getItem("token")}
                  refresh={() => getDeleteRequest()}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
