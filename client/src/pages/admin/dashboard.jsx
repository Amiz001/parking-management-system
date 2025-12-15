import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Calendar,
  Users,
  Settings,
  MoreHorizontal,
  Bell,
  Sun,
  Moon,
  SquareParking,
  ChartColumnBig,
  Car,
  Megaphone,
  BanknoteArrowDown,
  HeartHandshake,
  LogOut,
} from "lucide-react";

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly");
  const [lightMode, setLightMode] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState("All Segment");
  const [statsCards, setStatsCards] = useState([
    { title: "Total Users", value: "—" },
    { title: "Total Slots", value: "—" },
    { title: "Total Zones", value: "—" },
    { title: "Total Memberships", value: "—" },
    { title: "Total Refund Requests", value: "—" },
    { title: "Total Vehicles", value: "—" },
  ]);
  const [loadingStats, setLoadingStats] = useState(true);
  const navigate = useNavigate();

  const API = "http://localhost:5000";

  const fetchStats = async () => {
    setLoadingStats(true);
    try {
      const [
        usersRes,
        slotsRes,
        zonesRes,
        membershipsRes,
        refundsRes,
        vehiclesRes,
      ] = await Promise.all([
        axios.get(`${API}/users`).catch(() => ({ data: [] })),
        axios.get(`${API}/slots`).catch(() => ({ data: [] })),
        axios.get(`${API}/zones`).catch(() => ({ data: [] })),
        axios.get(`${API}/user_memberships`).catch(() => ({ data: [] })),
        axios.get(`${API}/refunds`).catch(() => ({ data: [] })),
        axios.get(`${API}/vehicles`).catch(() => ({ data: [] })),
      ]);

      // Normalize safely for any backend response shape
      const normalize = (res) => {
        if (!res || !res.data) return [];
        if (Array.isArray(res.data)) return res.data;
        const d = res.data;
        return (
          d.data ||
          d.slots ||
          d.zones ||
          d.users ||
          d.user_memberships ||
          d.memberships ||
          d.refunds ||
          d.vehicles ||
          []
        );
      };

      const users = normalize(usersRes);
      const slots = normalize(slotsRes);
      const zones = normalize(zonesRes);
      const memberships = normalize(membershipsRes);
      const refunds = normalize(refundsRes);
      const vehicles = normalize(vehiclesRes);

      // ✅ Correct totals
      const totalUsers = users.length;
      const totalSlots = slots.length;
      const totalZones = zones.length;
      const totalMemberships = memberships.length;
      const totalRefunds = refunds.length;
      const totalVehicles = vehicles.length;

      setStatsCards([
        { title: "Total Users", value: totalUsers },
        { title: "Total Slots", value: totalSlots },
        { title: "Total Zones", value: totalZones },
        { title: "Total Memberships", value: totalMemberships },
        { title: "Total Refund Requests", value: totalRefunds },
        { title: "Total Vehicles", value: totalVehicles },
      ]);
    } catch (err) {
      console.error("Error fetching dashboard stats:", err);
    } finally {
      setLoadingStats(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const sidebarItems = [
    { icon: ChartColumnBig, link: "/admin/dashboard", label: "Dashboard", active: true },
    { icon: SquareParking, link: "/admin/slot-management", label: "Slot Management" },
    { icon: HeartHandshake, link: "/admin/membership-management", label: "Membership plans" },
    { icon: BanknoteArrowDown, link: "/admin/refund-requests", label: "Refund requests" },
    { icon: Megaphone, link: "/admin/notifications", label: "Notifications" },
  ];

  const userItems = [
    { icon: Users, link: "/admin/users", label: "User Management" },
    { icon: Car, link: "/admin/vehicles", label: "Vehicles" },
  ];

  const bottomItems = [
    { icon: Settings, link: "/admin/settings", label: "Settings" },
    { icon: LogOut, link: "/", label: "Logout" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");

    setTimeout(() => {
      navigate("/", { replace: true });
    }, 300);
  };

  return (
    <div
      className={`flex h-auto bg-gray-950 text-white light:text-black light:bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ${
        lightMode ? "light" : "dark"
      }`}
    >
      {/* Sidebar */}
      <div className="w-64 h-screen bg-[#151821] p-6 flex flex-col light:bg-white light:shadow-lg light:backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">✦</span>
          </div>
          <span className="text-xl font-semibold">Admin</span>
        </div>

        <div className="mb-8">
          <p className="text-gray-400 light:text-black text-sm mb-4 uppercase tracking-wide">
            Main Menu
          </p>
          <nav className="space-y-2">
            {sidebarItems.map((item, index) => (
              <a
                key={index}
                onClick={() => navigate(item.link)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  item.active
                    ? "bg-gradient-to-l from-blue-500 to-indigo-600 text-white"
                    : "text-gray-300 hover:bg-gray-700 light:text-black light:hover:bg-gray-100"
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="mb-8">
          <p className="text-gray-400 light:text-black text-sm mb-4 uppercase tracking-wide">
            Users
          </p>
          <nav className="space-y-2">
            {userItems.map((item, index) => (
              <a
                key={index}
                onClick={() => navigate(item.link)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 light:text-black hover:bg-gray-700 light:hover:bg-gray-100 transition-colors"
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-auto space-y-2">
          {bottomItems.map((item, index) => (
            <a
              key={index}
              onClick={() => navigate(item.link)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 light:text-black hover:bg-gray-700 light:hover:bg-gray-100 transition-colors"
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col">
        <header className="bg-gray-950 light:bg-transparent p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search something..."
                className="pl-10 pr-4 py-2 bg-[#151821] light:bg-white border border-gray-900 light:border-gray-200 rounded-lg text-white placeholder-gray-400 light:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="px-4 py-2 bg-gradient-to-l from-blue-500 to-indigo-600 text-white rounded-lg hover:bg-blue-600 transition-colors">
              Search
            </button>
          </div>

          <div className="flex items-center gap-4">
            <Bell size={20} className="text-gray-400 light:text-gray-700 cursor-pointer hover:text-white light:hover:text-gray-500" />
            <Settings size={20} className="text-gray-400 light:text-gray-700 cursor-pointer hover:text-white light:hover:text-gray-500" />
            <Sun onClick={() => setLightMode(true)} size={20} className={`text-gray-400 ${lightMode ? "light:text-yellow-500 fill-yellow-500" : ""} cursor-pointer hover:text-white light:hover:text-yellow-500`} />
            <Moon onClick={() => setLightMode(false)} size={20} className={`${!lightMode ? "text-yellow-500 fill-yellow-500" : ""} light:text-gray-700 cursor-pointer hover:text-yellow-500 light:hover:text-gray-500`} />
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-gray-400 light:text-gray-600">
                Here is today's report and performances
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-[#151821] light:bg-white rounded-lg">
                <Calendar size={16} />
                <span>Jun 1 - Jun 30</span>
              </div>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 bg-[#151821] light:bg-white border border-gray-900 light:border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Monthly</option>
                <option>Weekly</option>
                <option>Daily</option>
              </select>
              <select
                value={selectedSegment}
                onChange={(e) => setSelectedSegment(e.target.value)}
                className="px-4 py-2 bg-[#151821] light:bg-white border border-gray-900 light:border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>All Segment</option>
                <option>HR</option>
                <option>Engineering</option>
              </select>
              <button className="px-6 py-2 bg-gradient-to-l from-blue-500 to-indigo-600 text-white rounded-lg hover:bg-blue-600 transition-colors">
                AI Assistant
              </button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6 mb-8">
            {statsCards.map((card, index) => (
              <div
                key={index}
                className="bg-gradient-to-b from-[#151821] to-[#242938] light:bg-gradient-to-b light:from-white light:to-white light:shadow-lg light:backdrop-blur-sm p-6 rounded-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400 light:text-gray-600 text-sm">{card.title}</h3>
                  <MoreHorizontal size={20} className="text-gray-400 light:text-gray-600 cursor-pointer" />
                </div>
                <div className="mb-2">
                  <span className="text-3xl font-bold">
                    {loadingStats ? "—" : card.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
