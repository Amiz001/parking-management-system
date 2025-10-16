// DashboardPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Ticket,
  AlertCircle,
  MessageSquare,
  Settings,
  LogOut,
  Sun,
  Moon,
  Search,
} from "lucide-react";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Axios from "axios";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [lightMode, setLightMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [stats, setStats] = useState({
    totalTickets: 0,
    totalComplaints: 0,
    totalFeedbacks: 0,
    totalRevenue: 0,
  });

  // Example graph data
  const ticketData = [
    { month: "Jan", tickets: 80 },
    { month: "Feb", tickets: 110 },
    { month: "Mar", tickets: 150 },
    { month: "Apr", tickets: 90 },
    { month: "May", tickets: 130 },
    { month: "Jun", tickets: 170 },
  ];

  const complaintData = [
    { name: "Resolved", value: 60 },
    { name: "Pending", value: 25 },
    { name: "Escalated", value: 15 },
  ];

  const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

  const sidebarItems = [
    { icon: Home, label: "Dashboard", link: "/customersupport/dashboard" },
    { icon: Ticket, label: "Ticket Request", link: "/customersupport/teckset" },
    { icon: AlertCircle, label: "Complaint Request", link: "/customersupport/comfetch" },
    { icon: MessageSquare, label: "Feedback Request", link: "/customersupport/feedback-requests" },
  ];

  const bottomItems = [
    { icon: Settings, label: "Settings", link: "/customersupport/setting" },
    { icon: LogOut, label: "Logout", link: "/" },
  ];

  // Fetch stats dynamically (optional: replace URLs)
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const tickets = await Axios.get("http://localhost:5000/api/tickets");
        const complaints = await Axios.get("http://localhost:5000/api/complaints");
        const feedbacks = await Axios.get("http://localhost:5000/api/feedback");

        setStats({
          totalTickets: tickets.data.length,
          totalComplaints: complaints.data.length,
          totalFeedbacks: feedbacks.data.length,
          totalRevenue: 45200, // Example static
        });
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className={`flex min-h-screen ${lightMode ? "bg-gray-100 text-gray-900" : "bg-gray-950 text-white"}`}>
      {/* Sidebar */}
      <div className="w-64 h-screen bg-[#151821] p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">✦</span>
          </div>
          <span className="font-semibold text-white">Customer Support</span>
        </div>

        <nav className="flex-1 space-y-2">
          {sidebarItems.map((item, i) => (
            <div
              key={i}
              onClick={() => navigate(item.link)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gradient-to-r from-blue-500 to-indigo-600 cursor-pointer"
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="mt-auto space-y-2">
          {bottomItems.map((item, i) => (
            <div
              key={i}
              onClick={() => navigate(item.link)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 cursor-pointer"
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Customer Support Dashboard</h1>
          <div className="flex items-center gap-3">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-1 rounded-lg text-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Sun onClick={() => setLightMode(true)} size={22} className="cursor-pointer" />
            <Moon onClick={() => setLightMode(false)} size={22} className="cursor-pointer" />
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-5 text-white shadow-lg">
            <h2 className="text-lg">Total Tickets</h2>
            <p className="text-3xl font-bold mt-2">{stats.totalTickets}</p>
          </div>
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-5 text-white shadow-lg">
            <h2 className="text-lg">Total Complaints</h2>
            <p className="text-3xl font-bold mt-2">{stats.totalComplaints}</p>
          </div>
          <div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl p-5 text-white shadow-lg">
            <h2 className="text-lg">Total Feedbacks</h2>
            <p className="text-3xl font-bold mt-2">{stats.totalFeedbacks}</p>
          </div>
          <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl p-5 text-white shadow-lg">
            <h2 className="text-lg">Total Revenue</h2>
            <p className="text-3xl font-bold mt-2">${stats.totalRevenue}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bar Chart */}
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-xl shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Monthly Ticket Trends</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ticketData}>
                <XAxis dataKey="month" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Legend />
                <Bar dataKey="tickets" fill="#6366f1" barSize={40} radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-xl shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Complaint Status Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={complaintData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {complaintData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
