import React, { useState,  useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";


import { 
  Search, 
  Settings, 
  MoreHorizontal,
  Bell,
  Sun,
  Moon,
  ChartColumnBig,
  CalendarCheck,
  Wallet,
  HeartHandshake,
  LogOut,
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  const [selectedPeriod, setSelectedPeriod] = useState('Monthly');
  const [lightMode, setLightMode] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState('All Segment');

  const [editingBooking, setEditingBooking] = useState(null);
  const [filteredBookings, setFilteredBookings] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(""); 

  const openEditModal = (booking) => {
    setEditingBooking(booking); 
  };

  const handleDownload = () => {
  if (!bookings || bookings.length === 0) {
    alert("No data available to download!");
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(
    bookings.map((b) => ({
      "Slot ID": b.slotId,
      "Vehicle Number": b.vehicleNumber,
      "Entry Date": new Date(b.entryDate).toLocaleDateString(),
      "Entry Time": b.entryTime,
      "Exit Date": new Date(b.exitDate).toLocaleDateString(),
      "Exit Time": b.exitTime,
      "Amount": b.amount,
      "Payment Status": b.status,
    }))
  );

  const data = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(data, "Bookings.xlsx");
  };

  const sidebarItems = [
  { icon: ChartColumnBig, label: "Dashboard", path: "/operator/dashboard" },
  { icon: CalendarCheck, label: "Booking", path: "/operator/physicalbooking" },
  { icon: HeartHandshake, label: "Membership", active: true, path: "/operator/membership" },
  { icon: Wallet, label: "Payment", path: "/operator/payment" },
  ];


  const bottomItems = [
    { icon: LogOut, label: 'Logout' },
  ];


const URL = "http://localhost:5000/user_memberships"; // ✅ backend endpoint

const fetchHandler = async () => {
  const res = await axios.get(URL);
  return res.data; // this returns array of memberships
};

const [memberships, setMemberships] = useState([]);
const [filteredMemberships, setFilteredMemberships] = useState([]);

useEffect(() => {
  fetchHandler().then((data) => {
    setMemberships(data || []);
    setFilteredMemberships(data || []);
  });
}, []);

  const handleSearch = () => {
  if (!searchQuery.trim()) {
    setFilteredMemberships(memberships);
    return;
  }

  const results = memberships.filter((m) =>
    Object.values(m).some((val) =>
      String(val).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  setFilteredMemberships(results);
};


  return (
    <div className={`flex h-auto bg-gray-950 text-white light:text-black light:bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ${lightMode ? "light" : "dark"}`}>
      {/* Sidebar */}
      <div className="w-64 h-screen sticky top-0 bg-[#151821] p-6 flex flex-col light:bg-white light:shadow-lg light:backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">✦</span>
          </div>
          <span className="text-xl font-semibold">Gate Operator</span>
        </div>

        {/* Main Menu */}
        <div className="mb-8">
          <nav className="space-y-2">
            {sidebarItems.map((item, index) => (
              <a
                key={index}
                 href={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  item.active 
                    ? 'bg-gradient-to-l from-blue-500 to-indigo-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 light:text-black light:hover:bg-gray-100'
                }`}
              >  
                <item.icon size={20} />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Bottom Items */}
        <div className="mt-auto space-y-2">
          {bottomItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 light:text-black hover:bg-gray-700 light:hover:bg-gray-100 transition-colors"
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </a>
          ))}
        </div>

        {/* User Profile */}
        <div className="mt-6 flex items-center gap-3 p-3 bg-[#222735] light:bg-gray-100 light:shadow-lg light:backdrop-blur-sm border-gray-400 rounded-lg ">
          <div className="w-10 h-10 bg-blue-500 light:text-white rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold">GO</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium light:text-gray-950">Gate Operator</p>
            <p className="text-xs text-gray-400 light:text-gray-700">gate@mail.com</p>
          </div>
          <MoreHorizontal size={16} className="text-gray-400 light:text-gray-950" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gray-950 light:bg-transparent p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search something..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-[#151821] light:bg-white border border-gray-900 light:border-gray-200 rounded-lg text-white placeholder-gray-400 light:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-gradient-to-l from-blue-500 to-indigo-600 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Search
            </button>
          </div>

          <div className="flex items-center gap-4">
            <Bell size={20} className="text-gray-400 light:text-gray-700 cursor-pointer hover:text-white light:hover:text-gray-500" />
            <Settings size={20} className="text-gray-400 light:text-gray-700 cursor-pointer hover:text-white light:hover:text-gray-500" />
            <Sun onClick={() => setLightMode(true)} size={20} className={`text-gray-400 ${lightMode ? "light:text-yellow-500 fill-yellow-500":""} cursor-pointer light:cursor-default hover:text-white light:hover:text-yellow-500`} />
            <Moon onClick={() => setLightMode(false)} size={20} className={`${!lightMode ? "text-yellow-500 fill-yellow-500":""} light:text-gray-700 light:cursor-pointer hover:text-yellow-500 light:hover:text-gray-500`} />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Dashboard Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            </div>
          </div>

          {/* Table */}
          <div className="bg-gradient-to-b from-[#151821] to-[#242938]  light:bg-gradient-to-b light:from-white light:to-white light:shadow-lg light:backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Customers</h3>
              <button 
                onClick={handleDownload}
                className="px-6 py-2 bg-gradient-to-l from-blue-500 to-indigo-600 text-white rounded-lg hover:bg-blue-600 transition-colors">
                Export Data
               </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-400">
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Membership ID </th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Vehicle Number</th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Start Date</th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">End Date</th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                    {filteredMemberships.map((m, index) => (
                        <tr
                        key={index}
                        className="border-b border-gray-200 hover:bg-gray-700 light:hover:bg-gray-100"
                        >
                        <td className="py-4 px-4 text-gray-300 light:text-gray-600">{m.membershipId?.planName || "N/A"}</td>
                        <td className="py-4 px-4 text-gray-300 light:text-gray-600">{m.vehicle_num}</td>
                        <td className="py-4 px-4 text-gray-300 light:text-gray-600">{m.startDate}</td>
                        <td className="py-4 px-4 text-gray-300 light:text-gray-600">{m.endDate}</td>
                        <td className="py-4 px-4 text-gray-300 light:text-gray-600">{m.status}</td>
                        </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;