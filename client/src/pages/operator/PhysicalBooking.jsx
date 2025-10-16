import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom"; 
import { toast } from 'react-toastify';

import {
  Search,
  CalendarCheck,
  Settings,
  Bell,
  Sun,
  Moon,
  ChartColumnBig,
  HeartHandshake,
  Wallet,
  LogOut,
  MoreHorizontal,
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation(); 
  const [lightMode, setLightMode] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  const URL = "http://localhost:5000/bookings";

  const fetchHandler = async () => {
    try {
      const res = await axios.get(URL);
      return res.data;
    } catch (err) {
      console.error("Fetch error:", err);
      return { bookings: [] };
    }
  };

  //  fetch bookings, refresh on navigate back after payment
  useEffect(() => {
    fetchHandler().then((data) => {
      setBookings(data.bookings || []);
      setFilteredBookings(data.bookings || []);
    });
  }, [location]); 

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      filterBookings(selectedType);
      return;
    }
    const results = bookings.filter((b) =>
      Object.values(b).some((val) =>
        String(val).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredBookings(results);
  };

  useEffect(()=>{
    if (location.state?.updateBookingId){
      const updateId = location.state.updatedBookingId;

      setBookings((prev)=> 
        prev.map((b)=> 
        b._id === updatedId ? {...b, status: "paid"}:b
    )
      );

      setFilteredBookings((prev)=>
        prev.map((b)=> 
        b._id === updatedId ? {...b, status: "paid"}:b
    )
      );
      navigate(location.pathname, {replace:true});
    }
  },[location, navigate]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${URL}/${id}`);
      const updated = bookings.filter((b) => b._id !== id);
      setBookings(updated);
      filterBookings(selectedType, updated);
      toast.success("Booking delete successfully!");
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
    }
  };

  
  const filterBookings = (type, data = bookings) => {
    let filtered;
    if (type === "All") {
      filtered = data;
    } else {
      filtered = data.filter((b) => b.types.toLowerCase() === type.toLowerCase());
    }
    setFilteredBookings(filtered);
    setSelectedType(type);
  };

  const sidebarItems = [
    { icon: ChartColumnBig, label: "Dashboard", path: "/operator/dashboard" },
    { icon: CalendarCheck, label: "Booking", active: true, path: "/operator/physicalbooking" },
     { icon: HeartHandshake, label: "Membership", path: "/operator/membership" },
    { icon: Wallet, label: "Payment", path: "/operator/payment" },
  ];

  const bottomItems = [
    { icon: LogOut, label: "Logout" },
  ];

  return (
    <div className={`flex h-auto bg-gray-950 text-white light:text-black light:bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ${lightMode ? "light" : "dark"}`}>
      {/* Sidebar */}
      <div className="w-64 h-screen sticky top-0 bg-[#151821] p-6 flex flex-col light:bg-white">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">✦</span>
          </div>
          <span className="text-xl font-semibold">Gate Operator</span>
        </div>

        <nav className="space-y-2 mb-8">
          {sidebarItems.map((item, i) => (
            <a
              key={i}
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg ${item.active ? "bg-gradient-to-l from-blue-500 to-indigo-600 text-white" : "text-black-300 hover:bg-gray-700"}`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        <div className="mt-auto space-y-2">
          {bottomItems.map((item, i) => (
            <a
              key={i}
              href="#"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-black-300 hover:bg-gray-700"
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </a>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3 p-3 bg-[#222735] rounded-lg light:bg-white light:border-gray-200">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold">GO</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Gate Operator</p>
            <p className="text-xs text-gray-400">gate@mail.com</p>
          </div>
          <MoreHorizontal size={16} className="text-gray-400" />
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
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-[#151821] light:bg-white border-gray-900 light:border-gray-200 rounded-lg text-white light:text-black"
              />
            </div>
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-gradient-to-l from-blue-500 to-indigo-600 text-white rounded-lg hover:bg-blue-600"
            >
              Search
            </button>
          </div>

          <div className="flex items-center gap-4">
            <Bell size={20} className="text-gray-400" />
            <Settings size={20} className="text-gray-400" />
            <Sun onClick={() => setLightMode(true)} size={20} className={`text-gray-400 ${lightMode ? "light:text-yellow-500 fill-yellow-500":""} cursor-pointer light:cursor-default hover:text-white light:hover:text-yellow-500`} />
            <Moon onClick={() => setLightMode(false)} size={20} className={`${!lightMode ? "text-yellow-500 fill-yellow-500":""} light:text-gray-700 light:cursor-pointer hover:text-yellow-500 light:hover:text-gray-500`} />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>

            {/* FILTER BUTTONS */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => filterBookings("Online")}
                className={`px-6 py-2 rounded-lg ${selectedType === "Online" ? "bg-gradient-to-l from-blue-500 to-indigo-600 text-white" : "bg-gray-700 hover:bg-gray-600 text-white"}`}
              >
                Online
              </button>

              <button
                onClick={() => filterBookings("Physical")}
                className={`px-6 py-2 rounded-lg ${selectedType === "Physical" ? "bg-gradient-to-l from-blue-500 to-indigo-600 text-white" : "bg-gray-700 hover:bg-gray-600 text-white"}`}
              >
                Physical
              </button>

              <button
                onClick={() => filterBookings("All")}
                className={`px-6 py-2 rounded-lg ${selectedType === "All" ? "bg-gradient-to-l from-blue-500 to-indigo-600 text-white" : "bg-gray-700 hover:bg-gray-600 text-white"}`}
              >
                All
              </button>
            </div>
          </div>

          {/* TABLE */}
          <div className="bg-[#151821] p-6 light:bg-white border-gray-900 light:border-gray-200 rounded-lg text-white light:text-black">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Bookings</h3>
              <button className="px-6 py-2 bg-gradient-to-l from-blue-500 to-indigo-600 text-white rounded-lg hover:bg-blue-600">
                Export Data
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-400">
                    <th className="py-3 px-4 text-left text-gray-400">Slot ID</th>
                    <th className="py-3 px-4 text-left text-gray-400">Zone</th>
                    <th className="py-3 px-4 text-left text-gray-400">Type</th>
                    <th className="py-3 px-4 text-left text-gray-400">Vehicle</th>
                    <th className="py-3 px-4 text-left text-gray-400">Date</th>
                    <th className="py-3 px-4 text-left text-gray-400">Entry</th>
                    <th className="py-3 px-4 text-left text-gray-400">Exit</th>
                    <th className="py-3 px-4 text-left text-gray-400">Status</th>
                    <th className="py-3 px-4 text-left text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((b, i) => (
                    <tr key={i} className="border-b border-gray-700 hover:bg-gray-800">
                      <td className="py-3 px-4">{b.slotId}</td>
                      <td className="py-3 px-4">{b.zone}</td>
                      <td className="py-3 px-4">{b.types}</td>
                      <td className="py-3 px-4">{b.vehicleNum}</td>
                      <td className="py-3 px-4">{new Date(b.date).toLocaleDateString()}</td>
                      <td className="py-3 px-4">{b.entryTime}</td>
                      <td className="py-3 px-4">{b.exitTime}</td>
                      <td className="py-3 px-4">
  {b.status === "paid" ? (
    <button className="px-3 py-1 bg-green-500 text-white rounded cursor-not-allowed">
      Paid
    </button>
  ) : b.types.toLowerCase() === "physical" ? (
    <button
      onClick={() => navigate(`/operator/PhysicalPayForm/${b._id}`)}
      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Non Paid
    </button>
  ) : b.types.toLowerCase() === "online" ? (
    <button
      className="px-7 py-1 bg-gray-400 text-white rounded cursor-not-allowed"
      disabled
    >
      Paid
    </button>
  ) : (
    <button
      className="px-3 py-1 bg-blue-500 text-white rounded"
    >
      Non Paid
    </button>
  )}
</td>


                      <td className="py-3 px-4 flex gap-2">
  {b.types === "physical" && (
    <button
      onClick={() => navigate(`/operator/updatebookingPhysical/${b._id}`)}
      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      Update
    </button>
  )}

  {b.types === "online" && (
    <button
      className="px-3 py-1 bg-gray-400 text-white rounded cursor-not-allowed"
      disabled
    >
      Update
    </button>
  )}

  
  <button
    onClick={() => handleDelete(b._id)}
    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
  >
    Delete
  </button>
</td>

                      
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
