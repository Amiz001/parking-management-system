import React, { useState, useEffect, useRef } from "react";
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
  Menu,
  X,
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

export default function DarkProfileDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [deleteReq, setDeleteReq] = useState(null);
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState(3);
  const [showPassword, setShowPassword] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [status, setStatus] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [mode, setMode] = useState("add");
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const popupRef = useClickOutside(() => setShowPopup(false));
  const navigate = useNavigate();

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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

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
      if (deleteReq) {
        const res = await Axios.delete(
          `http://localhost:5000/users/delete-req/${deleteReq._id}`
        );

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
    <div className="min-h-screen bg-gradient-to-b from-gray-800/5s0 to-black">
      {/* Glassmorphism Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img src="/images/parkbay.png" className="w-26"></img>
            </div>

            {/* Desktop Search Bar */}
            <div className="hidden md:block flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search bookings, locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-white placeholder-gray-400 transition-all"
                />
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-400 hover:text-cyan-400 hover:bg-gray-800/50 rounded-lg transition-all">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/50">
                    {notifications}
                  </span>
                )}
              </button>

              <div
                className="hidden md:flex items-center space-x-3 bg-gray-900/50 border border-gray-700 rounded-lg p-2 cursor-pointer hover:border-cyan-500/50 transition-all"
                onClick={() => setShowPopup(!showPopup)}
              >
                <div className="w-9 h-9 overflow-hidden rounded-full border-2 border-cyan-400 shadow-lg shadow-cyan-500/30">
                  <img
                    src={user ? user.profilePhoto : "/uploads/default.webp"}
                    className="h-full w-full object-cover"
                    alt="Profile"
                  />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-white">
                    {user ? user.fname : "Loading..."}
                  </p>
                  <p className="text-xs text-gray-400">
                    {user ? user.membership.name : "Loading..."} Member
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-gray-400 hover:text-cyan-400"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>

            {showPopup && (
              <div className="absolute right-38 top-16 w-48 bg-gray-900 rounded-xl shadow-2xl border border-gray-700 overflow-hidden z-50 backdrop-blur-md" ref={popupRef}>
                <ul className="text-gray-200 text-sm">
                  {user && user.role !== "user" && (
                    <li
                      className="px-4 py-3 hover:bg-cyan-500/20 cursor-pointer transition-colors"
                      onClick={() => redirectUser(user.role)}
                    >
                      Dashboard
                    </li>
                  )}
                  <li
                    className="px-4 py-3 text-red-400 hover:bg-red-500/20 cursor-pointer font-medium transition-colors"
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-700">
              <div className="flex flex-col space-y-2">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setActiveTab(tab.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                        activeTab === tab.id
                          ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-400 border border-cyan-500/30"
                          : "text-gray-300 hover:bg-gray-800/50"
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 py-24 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Sidebar Navigation */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-2xl p-6 sticky top-24">
              <div className="text-center mb-8">
                <div className="w-20 h-20 overflow-hidden rounded-full mx-auto mb-4 border-4 border-cyan-400 shadow-lg shadow-cyan-500/30">
                  <img
                    src={user ? user.profilePhoto : "/uploads/default.webp"}
                    className="h-full w-full object-cover"
                    alt="Profile"
                  />
                </div>
                <h2 className="text-lg font-semibold text-white">
                  {user ? user.fname : "Loading..."}
                </h2>
                <div className="flex items-center justify-center text-cyan-400 text-sm mt-1">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  {user ? user.membership.name : "Loading..."} Member
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
                          ? "bg-gradient-to-r from-cyan-500/20 to-blue-600/20 text-cyan-400 font-semibold border border-cyan-500/30 shadow-lg shadow-cyan-500/20"
                          : "text-gray-300 hover:bg-gray-800/50 hover:text-white"
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="border-t border-gray-700 pt-4 space-y-2">
                {quickActions.map((action) => {
                  const IconComponent = action.icon;
                  return (
                    <button
                      key={action.id}
                      onClick={() => setActiveTab(action.id)}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-gray-400 hover:text-cyan-400 hover:bg-gray-800/50 rounded-xl transition-all duration-200"
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
                {/* Hero Welcome Card */}
                <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 rounded-2xl p-8 text-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="relative z-10">
                    <h1 className="text-3xl font-bold mb-2">
                      Welcome back, {user ? user.fname : "Loading..."}! 👋
                    </h1>
                    <p className="text-blue-100 mb-4">
                      Here's what's happening with your parking today
                    </p>
                    <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-medium transition-all backdrop-blur-sm border border-white/20 hover:border-white/40 shadow-lg" onClick={()=>{navigate('/operator/onlinebookingPage')}}>
                      <Plus className="w-4 h-4 mr-2 inline" />
                      Book New Spot
                    </button>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-2xl overflow-hidden">
                  <div className="p-6 border-b border-gray-800">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-white">
                        Recent Parking Activity
                      </h2>
                      <button className="text-cyan-400 hover:text-cyan-300 font-medium text-sm transition-colors">
                        View All
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4">
                      {recentBookings.slice(0, 3).map((booking) => (
                        <div
                          key={booking.id}
                          className="flex items-center justify-between p-4 bg-gray-800/50 border border-gray-700 rounded-xl hover:border-cyan-500/30 transition-all"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                              <MapPin className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-white">
                                {booking.location}
                              </h3>
                              <p className="text-sm text-gray-400">
                                Slot {booking.slot} • {booking.date}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-semibold text-white">
                              {booking.amount}
                            </div>
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                booking.status === "Active"
                                  ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                  : "bg-gray-700 text-gray-300"
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
                <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-2xl overflow-hidden">
                  <div className="p-6 border-b border-gray-800">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-white">
                        Personal Information
                      </h2>
                      <button
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 shadow-lg shadow-cyan-500/30"
                        onClick={() => setStatus(true)}
                      >
                        <Edit className="w-4 h-4" />
                        <span>Edit Profile</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-gray-400 text-sm font-medium flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          First Name
                        </label>
                        <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-xl font-medium text-white">
                          {user ? user.fname : "Loading..."}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-gray-400 text-sm font-medium flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          Last Name
                        </label>
                        <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-xl font-medium text-white">
                          {user ? user.lname : "Loading..."}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-gray-400 text-sm font-medium flex items-center">
                          <Mail className="w-4 h-4 mr-2" />
                          Email Address
                        </label>
                        <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-xl font-medium text-white">
                          {user ? user.email : "Loading..."}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-gray-400 text-sm font-medium flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          Phone Number
                        </label>
                        <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-xl font-medium text-white">
                          {user ? user.phone : "Loading..."}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-gray-400 text-sm font-medium flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-2" />
                          Role
                        </label>
                        <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-xl font-medium text-white capitalize">
                          {user ? user.fname : "Loading..."}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-gray-400 text-sm font-medium flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-2" />
                          Joined on
                        </label>
                        <div className="bg-gray-800/50 border border-gray-700 p-4 rounded-xl font-medium text-white">
                          {user ? formatDate(user.createdAt) : "Loading..."}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Membership Card */}
                <div className="bg-gradient-to-br from-cyan-500/70 via-blue-500/60 to-blue-600/60 border border-cyan-500/30 rounded-2xl p-6 backdrop-blur-md">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-yellow-500/30">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {user ? user.membership.name : "Loading..."} Membership
                      </h3>
                      <p className="text-sm text-gray-300">
                        {user ? user.membership.price : "Loading..."}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Valid Until</span>
                      <span className="font-medium text-white">
                        Dec 31, 2025
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Parking Credits</span>
                      <span className="font-medium text-green-400">
                        $125.50
                      </span>
                    </div>
                  </div>
                  <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white py-3 px-4 rounded-xl font-medium transition-all shadow-lg shadow-blue-500/30">
                    Upgrade to Platinum
                  </button>
                </div>

                {/* Edit profile form */}
                <EditProfileForm
                    status={status}
                    selectedUser={user}
                    onClose={() => setStatus(false)}
                    refresh={() => fetchUser()}
                    token={localStorage.getItem("token")}
                  />

              </div>
            )}

            {/* Parking History */}
            {activeTab === "bookings" && (
              <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-gray-800">
                  <h2 className="text-xl font-semibold text-white">
                    Parking History
                  </h2>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {recentBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="border border-gray-700 rounded-xl p-6 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10 transition-all bg-gray-800/30"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                          <div className="flex items-start space-x-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                              <MapPin className="w-7 h-7 text-white" />
                            </div>
                            <div className="space-y-1">
                              <h3 className="font-semibold text-white text-lg">
                                {booking.location}
                              </h3>
                              <p className="text-gray-400">
                                Slot: {booking.slot}
                              </p>
                              <p className="text-sm text-gray-500">
                                {booking.vehicle}
                              </p>
                              <div className="flex items-center space-x-4 text-sm text-gray-400">
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
                              <div className="text-2xl font-bold text-white">
                                {booking.amount}
                              </div>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${
                                  booking.status === "Active"
                                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                    : booking.status === "Completed"
                                    ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                    : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
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
                <>
              <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-gray-800">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-white">
                      My Vehicles
                    </h2>
                    <button
                      onClick={() => {
                        setMode("add");
                        setStatus(true);
                      }}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center space-x-2 shadow-lg shadow-cyan-500/30"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Vehicle</span>
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {vehicles.map((vehicle) => (
                      <div
                        key={vehicle._id}
                        className="border border-gray-700 rounded-xl p-6 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10 transition-all bg-gray-800/30"
                      >
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0">
                          <div className="flex items-start space-x-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                              {vehicle.type === "Car" ? (
                                <Car className="w-7 h-7 text-white" />
                              ) : (
                                <Bus className="w-7 h-7 text-white" />
                              )}
                            </div>
                            <div className="space-y-1">
                              <h3 className="font-semibold text-white text-lg">
                                {vehicle.vehicleNo}
                              </h3>
                              <p className="text-gray-400">
                                Type: {vehicle.type}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <button
                              className="px-4 py-2 text-green-400 hover:bg-green-500/20 border border-green-500/30 rounded-lg transition-all"
                              onClick={() => {
                                setMode("update");
                                setStatus(true);
                                setSelectedVehicle(vehicle);
                              }}
                            >
                              Edit
                            </button>
                            <button className="px-4 py-2 text-red-400 hover:bg-red-500/20 border border-red-500/30 rounded-lg transition-all">
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

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

              </>
            )}
            {/* Settings */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                {/* Password Reset */}
                <div className="bg-gray-900/50 backdrop-blur-md border border-gray-800 rounded-2xl overflow-hidden">
                  <div className="p-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center rounded-lg shadow-lg shadow-cyan-500/30">
                        <Shield className="text-white w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-white">
                          Password
                        </h2>
                        <p className="text-sm text-gray-400">
                          Manage your account password
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setStatus(true)}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-all shadow-lg shadow-cyan-500/30"
                    >
                      Reset Password
                    </button>
                  </div>
                </div>

                {/* Delete Account */}
                <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-800">
                  <div className="p-6 border-b border-gray-700/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-500/20 flex items-center justify-center rounded-lg border border-red-500/30">
                        <Trash2 className="text-red-400 w-5 h-5" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-white">
                          Delete Account
                        </h2>
                        <p className="text-sm text-gray-400">
                          Permanently remove your account and all data
                        </p>
                      </div>
                    </div>

                    {!deleteReq ? (
                      <button className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-4 py-2 rounded-lg font-medium transition-all border border-red-500/30">
                        Request Delete
                      </button>
                    ) : (
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 text-sm bg-yellow-500/20 text-yellow-400 rounded-full border border-yellow-500/30">
                          Pending
                        </span>
                        <button className="text-gray-400 hover:text-gray-300 text-sm font-medium transition">
                          Cancel
                        </button>
                      </div>
                    )}
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
              </div>
            )}

            {activeTab === "logout" && handleLogout()}
            {activeTab === "back" && navigate('/')}

          </div>
        </div>
      </div>
    </div>
  );
}
