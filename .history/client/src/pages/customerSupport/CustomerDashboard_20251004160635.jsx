import React, { useState, useEffect } from "react";
import {
  Search, CalendarCheck, Settings, MoreHorizontal, Bell, Sun, Moon,
  ChartColumnBig, HeartHandshake, LogOut, Car, Bookmark, Wrench, LayoutGrid,Plus,Wallet,
  Truck,
  BarChart3,
  Bike,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const sidebarItems = [
    { icon: ChartColumnBig, label: 'Dashboard', active: true, path: "/operator/dashboard" },
    { icon: CalendarCheck , label: 'Physical Booking', path: "/operator/physicalbooking" },
    { icon: CalendarCheck, label: 'Online Booking', path: "/operator/onlinebooking"},
    { icon: HeartHandshake, label: 'Memebership', path: "/operator/membershipplan"},
    { icon: HeartHandshake, label: 'Online Booking', path: "/operator/OnlineBookingPage"},
    { icon: Wallet, label: 'Physical Payment ', path: "/operator/Physicalpayment"},
   // { icon: FileText, label: 'Report' },
  ];


  const bottomItems = [
    { icon: Settings, link:"/", label: "Settings" },
    // { icon: HelpCircle, label: 'Help & Support' },
    { icon: LogOut, link:"/", label: "Logout" },
  ];


  // ---------- ParkingSpot ----------
  const ParkingSpot = ({ spot, onClick }) => {
    const navigate = useNavigate();
    const baseClasses =
      "relative w-25 h-25 rounded-xl border-2 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center text-sm font-medium hover:scale-105 hover:shadow-lg transform";

 const getSpotClasses = () => {
    switch (spot.status) {
      case "available":
        return `${baseClasses} bg-green-50 border-green-300 text-green-700 hover:bg-green-100 hover:border-green-400`;
      case "occupied":
        return `${baseClasses} bg-red-50 border-red-300 text-red-700 hover:bg-red-100 hover:border-red-400`;
      case "disabled":
        return `${baseClasses} bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400`;
      case "emergency":
        return `${baseClasses} bg-yellow-50 border-yellow-300 text-yellow-700 hover:bg-yellow-100 hover:border-yellow-400`;
      default:
        return baseClasses;
    }
  };



  const getStatusIcon = () => {
    switch (spot.status) {
      case "available":
        return (
          <div
            onClick={() => navigate(`/operator/bookingPhysical`)}
            className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-sm"
          >
            P
          </div>
        );
      case "occupied":
        return <Car className="w-6 h-6" />;
      case "disabled":
        return <Wrench className="w-6 h-6" />;
      case "emergency":
        return <Bookmark className="w-6 h-6 text-yellow-600" />;
      default:
        return null;
    }
  };

  return (
    <div className={getSpotClasses()} onClick={() => onClick?.(spot)}>
      <div
        className={getSpotClasses()}
        onClick={() =>
            spot.status === "available" &&
            navigate("/operator/bookingPhysical", { state: { slotId: spot.slotId } })
        }
        >
      <div className="flex flex-col items-center space-y-1">
        {getStatusIcon()}
        <span className="text-xs text-gray-500">{spot.slotId}</span>
        <span className="text-xs font-medium">{spot.status}</span>
        <span className="text-xs font-medium">{spot.zone}</span>
      </div>
      </div>  
    </div>
  );
};


// ---------- StatsCard ----------
const StatsCard = ({ title, value, color }) => {
  const valueColorClasses = {
    blue: "text-white-700",
    green: "text-white-700",
    red: "text-white-700",
    yellow: "text-white-700",
  };
  return (
    <div className="bg-gradient-to-b from-[#151821] to-[#242938] light:bg-gradient-to-b light:from-white light:to-white light:shadow-lg light:backdrop-blur-sm p-6 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-400 light:text-gray-600 text-sm">{title}</p>
        <MoreHorizontal size={20} className="text-gray-400 light:text-gray-600 cursor-pointer" />
      </div>
      <div className="mb-2">
        <p className={`text-3xl font-bold ${valueColorClasses[color]} leading-none`}>
          {value}
        </p>
      </div>
    </div>
  );
};

// ---------- StatsGrid ----------
const StatsGrid = ({ stats }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <StatsCard title="Total Spots" value={stats.totalSpots} color="blue" />
    <StatsCard title="Available" value={stats.availableSpots} color="green" />
    <StatsCard title="Occupied" value={stats.occupiedSpots} color="red" />
    <StatsCard title="Emergency" value={stats.emergencySpots} color="yellow" />
  </div>
);


// ---------- ParkingLayout ----------
const ParkingLayout = ({ spots }) => {
  const handleSpotClick = (spot) => console.log("Spot clicked:", spot);
  
  return (
    <div className="bg-gradient-to-b from-[#151821] to-[#242938] light:bg-gradient-to-b light:from-white light:to-white light:shadow-lg light:backdrop-blur-sm rounded-xl p-6">
      <div className="flex items-center space-x-3 mb-6">
        <LayoutGrid className="w-5 h-5 text-white-600" />
        <h2 className="text-2xl font-bold text-white-900">Parking Layout</h2>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-6 mb-8 p-6 bg-gray-50 rounded-xl border border-gray-100">
        {["Available", "Occupied", "Disabled", "Emergency"].map((label, i) => (
          <div key={i} className="flex items-center space-x-3">
            <div
              className={`w-4 h-4 rounded-full shadow-sm ${
                label === "Available"
                  ? "bg-green-500"
                  : label === "Occupied"
                  ? "bg-red-500"
                  : label === "Disabled"
                  ? "bg-gray-500"
                  : "bg-yellow-500"
              }`}
            />
            <span className="text-sm font-medium text-gray-700">{label}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 gap-4">
        {spots.map((spot) => (
          <ParkingSpot key={spot._id} spot={spot} onClick={handleSpotClick} />
        ))}
      </div>
    </div>
  );
};

// ---------- Full Dashboard ----------
const Dashboard = () => {
  const [lightMode, setLightMode] = useState(false);
  const [spots, setSpots] = useState([]);
  const [stats, setStats] = useState(null);


  const fetchSpots = async () => {
    try {
      const response = await fetch("http://localhost:5000/slots");
      const data = await response.json();
      setSpots(data.slots);

      setStats({
        totalSpots: data.slots.length,
        availableSpots: data.slots.filter((s) => s.status === "available").length,
        occupiedSpots: data.slots.filter((s) => s.status === "occupied").length,
        emergencySpots: data.slots.filter((s) => s.status === "emergency").length,
      });
    } catch (error) {
      console.error("Error fetching spots:", error);
    }
  };
 
  useEffect(() => { fetchSpots(); }, []);
  const navigate2 = useNavigate();
    
  return (
    <div className={`flex h-auto bg-gray-950 text-white light:text-black light:bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ${lightMode ? "light" : "dark"}`}>
      {/* Sidebar */}
      <div className="w-64 h-screen sticky top-0 bg-[#151821] p-6 flex flex-col light:bg-white light:shadow-lg light:backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">✦</span>
          </div>
          <span className="text-L font-semibold">Customer Suppoet</span>
        </div>

        {/* Main Menu */}
        <div className="mb-8">
          <p className="text-gray-400 light:text-black text-sm mb-4 uppercase tracking-wide">Main Menu</p>
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

        {/* Bottom Sidebar */}
        <div className="mt-auto space-y-2">
          <a href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 light:text-black hover:bg-gray-700 light:hover:bg-gray-100 transition-colors">
            <Settings size={20} /> <span>Settings</span>
          </a>
          <a className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 light:text-black hover:bg-gray-700 light:hover:bg-gray-100 transition-colors">
            <LogOut size={20}  /> <span onClick={() => navigate2('/')}>Logout</span>
          </a>
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
            <Sun onClick={() => setLightMode(true)} size={20} className={`text-gray-400 cursor-pointer ${lightMode ? "light:text-yellow-500 fill-yellow-500":""}`} />
            <Moon onClick={() => setLightMode(false)} size={20} className={`text-gray-400 cursor-pointer ${!lightMode ? "text-yellow-500 fill-yellow-500":""}`} />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Dashboard Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            </div>
             <div className="flex items-center gap-4">
             <button className="px-6 py-2 bg-gradient-to-l from-blue-500 to-indigo-600 text-white rounded-lg hover:bg-blue-600 transition-colors">
                4Wheel
              </button>
              <button className="px-6 py-2 bg-gradient-to-l from-blue-500 to-indigo-600 text-white rounded-lg hover:bg-blue-600 transition-colors">
                3Wheel
              </button>
              <button className="px-6 py-2 bg-gradient-to-l from-blue-500 to-indigo-600 text-white rounded-lg hover:bg-blue-600 transition-colors">
                2Wheel
              </button>
            </div>
          </div>

          {stats && <StatsGrid stats={stats} />}
          <ParkingLayout spots={spots} /> 
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
