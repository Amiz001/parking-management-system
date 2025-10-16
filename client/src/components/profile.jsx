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
} from "lucide-react";
import Axios from "axios";

export default function ProfessionalParkingDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [deleteStatus, setDeleteStatus] = useState("");
  const [user, setUser] = useState(null);
  const [notifications, setNotifications] = useState(3);
  const [showPassword, setShowPassword] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

      console.log(decoded)

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

  useEffect(() => {
    fetchUser();
  }, []);

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: Activity },
    { id: "profile", label: "Profile", icon: User },
    { id: "bookings", label: "Parking History", icon: Calendar },
    { id: "vehicles", label: "My Vehicles", icon: Car },
    { id: "payments", label: "Payments", icon: CreditCard },
    { id: "favorites", label: "Favorites", icon: Bookmark },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const quickActions = [
    { id: "back", label: "Back to Home", icon: House },
    { id: "logout", label: "Log Out", icon: LogOut },
  ];

  // Sample data
  const stats = [
    {
      label: "Total Bookings",
      value: "147",
      change: "+12%",
      icon: Calendar,
      color: "blue",
    },
    {
      label: "Money Spent",
      value: "$2,340",
      change: "+8%",
      icon: DollarSign,
      color: "green",
    },
    {
      label: "Hours Parked",
      value: "324h",
      change: "+15%",
      icon: Clock,
      color: "purple",
    },
    {
      label: "Favorite Spots",
      value: "8",
      change: "+2",
      icon: Star,
      color: "yellow",
    },
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

  const vehicles = [
    {
      id: 1,
      make: "BMW",
      model: "X3",
      year: "2022",
      plate: "ABC-123",
      color: "Pearl White",
      isPrimary: true,
      lastUsed: "Today",
    },
    {
      id: 2,
      make: "Tesla",
      model: "Model 3",
      year: "2023",
      plate: "XYZ-789",
      color: "Midnight Black",
      isPrimary: false,
      lastUsed: "Yesterday",
    },
  ];

  const paymentHistory = [
    {
      id: 1,
      description: "Premium Membership - Monthly",
      date: "Jan 15, 2025",
      amount: "$29.99",
      status: "Paid",
      method: "Credit Card •••• 4532",
    },
    {
      id: 2,
      description: "Downtown Plaza Parking",
      date: "Jan 14, 2025",
      amount: "$15.50",
      status: "Paid",
      method: "Digital Wallet",
    },
    {
      id: 3,
      description: "Airport Long-term Parking",
      date: "Jan 12, 2025",
      amount: "$45.00",
      status: "Pending",
      method: "Credit Card •••• 4532",
    },
  ];

  const favoriteSpots = [
    {
      id: 1,
      name: "Downtown Plaza",
      address: "123 Main St",
      rating: 4.8,
      price: "$5-15/hr",
    },
    {
      id: 2,
      name: "Central Mall",
      address: "456 Oak Ave",
      rating: 4.6,
      price: "$4-12/hr",
    },
    {
      id: 3,
      name: "Office Complex",
      address: "789 Business Blvd",
      rating: 4.9,
      price: "$8-20/hr",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b-0">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">ParkBay</h1>
                <p className="text-sm text-gray-500">Smart Parking Solutions</p>
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

              <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-sm font-bold text-white">
                  {user ? user.name.slice(0,2) : "Loading..."}
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-gray-900">
                    {user ? user.name.split(" ")[0] : "Loading..."}
                  </p>
                  <p className="text-xs text-gray-500">Premium Member</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow-sm rounded-2xl p-6 sticky top-8">
              {/* Profile Summary */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4">
                  {user ? user.name.slice(0,2) : "Loading..."}
                </div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {user ? user.name : "Loading..."}
                </h2>
                <div className="flex items-center justify-center text-green-600 text-sm mt-1">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  {user ? (user.membership.charAt(0).toUpperCase() + user.membership.slice(1)) : "Loading..."} Member
                </div>
                <div className="mt-3 flex items-center justify-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Award className="w-3 h-3 mr-1" />
                    Gold Status
                  </div>
                  <div className="flex items-center">
                    <Star className="w-3 h-3 mr-1" />
                    4.9 Rating
                  </div>
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

              {/* Quick Actions */}
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
            {/* Dashboard */}
            {activeTab === "dashboard" && (
              <div className="space-y-8">
                {/* Welcome Banner */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold mb-2">
                        Welcome back, Emily! 👋
                      </h1>
                      <p className="text-blue-100 mb-4">
                        Here's what's happening with your parking today
                      </p>
                      <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-medium transition-colors backdrop-blur-sm">
                        <Plus className="w-4 h-4 mr-2 inline" />
                        Book New Spot
                      </button>
                    </div>
                    <div className="hidden md:block">
                      <div className="w-24 h-24 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                        <Car className="w-12 h-12 text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                  {stats.map((stat) => {
                    const IconComponent = stat.icon;
                    const colorClasses = {
                      blue: "bg-blue-50 text-blue-600 border-blue-100",
                      green: "bg-green-50 text-green-600 border-green-100",
                      purple: "bg-purple-50 text-purple-600 border-purple-100",
                      yellow: "bg-yellow-50 text-yellow-600 border-yellow-100",
                    };

                    return (
                      <div
                        key={stat.label}
                        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center border ${
                              colorClasses[stat.color]
                            }`}
                          >
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <div className="flex items-center text-green-600 text-sm font-medium">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            {stat.change}
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">
                          {stat.value}
                        </h3>
                        <p className="text-gray-600 text-sm">{stat.label}</p>
                      </div>
                    );
                  })}
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
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="space-y-8">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-900">
                        Personal Information
                      </h2>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                        <Edit className="w-4 h-4" />
                        <span>Edit Profile</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-gray-500 text-sm font-medium flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          Full Name
                        </label>
                        <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl font-medium text-gray-900">
                          Emily Johnson
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-gray-500 text-sm font-medium flex items-center">
                          <Mail className="w-4 h-4 mr-2" />
                          Email Address
                        </label>
                        <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl font-medium text-gray-900">
                          emily.johnson@example.com
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-gray-500 text-sm font-medium flex items-center">
                          <Phone className="w-4 h-4 mr-2" />
                          Phone Number
                        </label>
                        <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl font-medium text-gray-900">
                          (555) 123-4567
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-gray-500 text-sm font-medium flex items-center">
                          <CalendarIcon className="w-4 h-4 mr-2" />
                          Date of Birth
                        </label>
                        <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl font-medium text-gray-900">
                          January 15, 1987
                        </div>
                      </div>

                      <div className="md:col-span-2 space-y-2">
                        <label className="text-gray-500 text-sm font-medium flex items-center">
                          <Navigation className="w-4 h-4 mr-2" />
                          Address
                        </label>
                        <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl font-medium text-gray-900">
                          1234 Oak Street, Apartment 4B, Los Angeles, CA 90210
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Membership Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                        <Award className="w-6 h-6 text-yellow-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          Premium Membership
                        </h3>
                        <p className="text-sm text-gray-600">Gold Status</p>
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

                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      Preferences
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">
                          Email Notifications
                        </span>
                        <div className="w-11 h-6 bg-blue-600 rounded-full p-1 transition-colors">
                          <div className="w-4 h-4 bg-white rounded-full translate-x-5 transition-transform"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">SMS Alerts</span>
                        <div className="w-11 h-6 bg-blue-600 rounded-full p-1 transition-colors">
                          <div className="w-4 h-4 bg-white rounded-full translate-x-5 transition-transform"></div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">Location Services</span>
                        <div className="w-11 h-6 bg-gray-300 rounded-full p-1 transition-colors">
                          <div className="w-4 h-4 bg-white rounded-full transition-transform"></div>
                        </div>
                      </div>
                    </div>
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
                    <div className="flex items-center space-x-4">
                      <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        <Filter className="w-4 h-4" />
                        <span>Filter</span>
                      </button>
                      <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <Download className="w-4 h-4" />
                        <span>Export</span>
                      </button>
                    </div>
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
                            {booking.status === "Active" && (
                              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                End Session
                              </button>
                            )}
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
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2">
                        <Plus className="w-4 h-4" />
                        <span>Add Vehicle</span>
                      </button>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {vehicles.map((vehicle) => (
                        <div
                          key={vehicle.id}
                          className={`border-2 rounded-2xl p-6 transition-all ${
                            vehicle.isPrimary
                              ? "border-blue-200 bg-blue-50"
                              : "border-gray-200 bg-white hover:border-gray-300"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center">
                                <Car className="w-8 h-8 text-gray-600" />
                              </div>
                              <div>
                                <h3 className=""></h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
