import React, { useState, useEffect } from "react";
import {
  Search, AlertTriangle, CalendarCheck, Settings, MoreHorizontal, Bell, Sun, Moon,
  ChartColumnBig, HeartHandshake, LogOut, Car, Wrench, LayoutGrid,
  Wallet,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const sidebarItems = [
  { icon: ChartColumnBig, label: "Dashboard", active: true, path: "/operator/dashboard" },
  { icon: CalendarCheck, label: "Booking", path: "/operator/physicalbooking" },
  { icon: Wallet, label: "Payment", path: "/operator/payment" },
];

const ParkingSpot = ({ spot }) => {
  const navigate = useNavigate();
  const baseClasses =
    "relative w-28 h-28 rounded-xl border-2 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center text-sm font-medium hover:scale-105 hover:shadow-lg";

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
            onClick={() =>
              navigate("/operator/bookingPhysicalform", {
                state: { slotId: spot.slotId, zone: spot.zone },
              })
            }
            className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-sm"
          >
            P
          </div>
        );
      case "emergency":
        return (
          <div
            onClick={() =>
              navigate("/operator/bookingPhysicalform", {
                state: { slotId: spot.slotId, zone: spot.zone },
              })
            }
          >
            <AlertTriangle className="w-6 h-6 text-amber-600 drop-shadow-sm"/>
          </div>
        );
      case "occupied":
        return <Car className="w-6 h-6" />;
      case "disabled":
        return <Wrench className="w-6 h-6" />;
      default:
        return null;
    }
  };

  return (
    <div className={getSpotClasses()}>
      <div className="flex flex-col items-center space-y-1">
        {getStatusIcon()}
        <span className="text-xs text-gray-500">{spot.slotId}</span>
        <span className="text-xs font-medium">{spot.status}</span>
        {spot.zone && <span className="text-xs font-medium">{spot.zone}</span>}
        {spot.type && <span className="text-xs font-medium">{spot.type}</span>}
      </div>
    </div>
  );
};

// Stats
const StatsCard = ({ title, value }) => (
  <div className="bg-gradient-to-b from-[#151821] to-[#242938] light:from-white light:to-white light:shadow-lg p-6 rounded-xl">
    <div className="flex items-center justify-between mb-4">
      <p className="text-gray-400 light:text-gray-600 text-sm">{title}</p>
      <MoreHorizontal size={20} className="text-gray-400 light:text-gray-600 cursor-pointer" />
    </div>
    <p className="text-3xl font-bold light:text-gray-600 leading-none">{value}</p>
  </div>
);

const StatsGrid = ({ stats }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <StatsCard title="Total Spots" value={stats.totalSpots} />
    <StatsCard title="Available" value={stats.availableSpots} />
    <StatsCard title="Occupied" value={stats.occupiedSpots} />
    <StatsCard title="Emergency" value={stats.emergencySpots} />
  </div>
);

// Parking Layout
const ParkingLayout = ({ spots }) => (
  <div className="bg-gradient-to-b from-[#151821] to-[#242938] light:from-white light:to-white light:shadow-lg rounded-xl p-6">
    <div className="flex items-center space-x-3 mb-6">
      <LayoutGrid className="w-5 h-5 text-white-600" />
      <h2 className="text-2xl font-bold">Parking Layout</h2>
    </div>

    {/* Legend */}
    <div className="flex flex-wrap items-center gap-6 mb-8 p-4 bg-gray-50 rounded-xl border border-gray-100">
      {["Available", "Occupied", "Disabled", "Emergency"].map((label, i) => (
        <div key={i} className="flex items-center space-x-3">
          <div
            className={`w-4 h-4 rounded-full ${
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

    {/* Slots */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 gap-4">
      {spots.map((spot) => (
        <ParkingSpot key={spot._id || spot.slotId} spot={spot} />
      ))}
    </div>
  </div>
);

// Main Dashboard
const Dashboard = () => {
  const [lightMode, setLightMode] = useState(false);
  const [spots, setSpots] = useState([]);
  const [stats, setStats] = useState(null);
  const [zones, setZones] = useState([]);

  const [searchVehicle, setSearchVehicle] = useState("");
  const [searchResult, setSearchResult] = useState("");

  const [selectedWheel, setSelectedWheel] = useState("all");
  const [selectedZone, setSelectedZone] = useState("all");

  // Fetch slots from backend
  const fetchSpots = async () => {
    try {
      const response = await fetch("http://localhost:5000/slots");
      const data = await response.json();
      const slotArray = data.slots || data;

      setSpots(slotArray);

      // Extract unique zones dynamically
      const uniqueZones = [...new Set(slotArray.map((s) => s.zone?.toLowerCase()))];
      setZones(uniqueZones.filter(Boolean));

      setStats({
        totalSpots: slotArray.length,
        availableSpots: slotArray.filter((s) => s.status === "available").length,
        occupiedSpots: slotArray.filter((s) => s.status === "occupied").length,
        emergencySpots: slotArray.filter((s) => s.status === "emergency").length,
      });
    } catch (error) {
      console.error("Error fetching spots:", error);
    }
  };

  useEffect(() => {
    fetchSpots();
  }, []);

  // Filtered spots
  const filteredSpots = spots.filter((spot) => {
    const vehicleType = spot.type?.toLowerCase();
    const zone = spot.zone?.toLowerCase();

    return (
      (selectedWheel === "all" || vehicleType === selectedWheel) &&
      (selectedZone === "all" || zone === selectedZone)
    );
  });

  // Search Function
  const handleSearch = async () => {
  if (!searchVehicle.trim()) {
    setSearchResult("Please enter a vehicle number.");
    return;
  }

  try {
    const [bookingRes, memberRes] = await Promise.all([
      fetch("http://localhost:5000/bookings"),
      fetch("http://localhost:5000/user_memberships"),
    ]);

    // Check if responses are OK
    if (!bookingRes.ok || !memberRes.ok) {
      throw new Error("Network response was not ok");
    }

    // Parse JSON responses
    const [bookingData, memberData] = await Promise.all([
      bookingRes.json(),
      memberRes.json(),
    ]);

    // Normalize data shape
    const bookings = bookingData.bookings || bookingData;
    const memberships = memberData.memberships || memberData;

    const vehicle = searchVehicle.trim().toLowerCase();

    const hasBooking = bookings.some(
      (b) => b.vehicleNumber?.toLowerCase() === vehicle
    );
    const hasMembership = memberships.some(
      (m) => m.vehicleNumber?.toLowerCase() === vehicle
    );

    if (hasBooking && hasMembership) {
      setSearchResult(`Vehicle ${searchVehicle} has a booking and membership.`);
    } else if (hasBooking) {
      setSearchResult(`Vehicle ${searchVehicle} has a booking.`);
    } else if (hasMembership) {
      setSearchResult(`Vehicle ${searchVehicle} has a membership plan.`);
    } else {
      setSearchResult(`No record found for vehicle ${searchVehicle}.`);
    }
  } catch (error) {
    console.error("Search error:", error);
    setSearchResult("Error fetching data. Please try again.");
  }
};

  return (
    <div
      className={`flex h-auto bg-gray-950 text-white light:text-black light:bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ${
        lightMode ? "light" : "dark"
      }`}
    >
      {/* Sidebar */}
      <div className="w-64 h-screen sticky top-0 bg-[#151821] p-6 flex flex-col light:bg-white light:shadow-lg">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">✦</span>
          </div>
          <span className="text-xl font-semibold">Gate Operator</span>
        </div>
        <nav className="space-y-2 mb-8">
          {sidebarItems.map((item, index) => (
            <a
              key={index}
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg ${
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

        <div className="mt-auto space-y-2">
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 light:text-black hover:bg-gray-700 light:hover:bg-gray-100"
          >
            <LogOut size={20} /> <span>Logout</span>
          </a>
        </div>

        <div className="mt-6 flex items-center gap-3 p-3 bg-[#222735] light:bg-gray-100 rounded-lg">
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
        <header className="bg-gray-950 light:bg-transparent p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Enter vehicle number..."
                value={searchVehicle}
                onChange={(e) => setSearchVehicle(e.target.value)}
                className="pl-10 pr-4 py-2 bg-[#151821] light:bg-white border border-gray-900 light:border-gray-200 rounded-lg text-white light:text-black"
              />
            </div>
            <button
              type="button"
              onClick={handleSearch}
              className="px-4 py-2 bg-gradient-to-l from-blue-500 to-indigo-600 text-white rounded-lg"
            >
            Search
            </button>
            <p className="px-6 text-sm text-white light:text-black mb-2">{searchResult}</p>
          </div>

          <div className="flex items-center gap-4">
            <Bell size={20} className="text-gray-400" />
            <Settings size={20} className="text-gray-400" />
            <Sun onClick={() => setLightMode(true)} size={20} className={`text-gray-400 ${lightMode ? "light:text-yellow-500 fill-yellow-500":""} cursor-pointer light:cursor-default hover:text-white light:hover:text-yellow-500`} />
            <Moon onClick={() => setLightMode(false)} size={20} className={`${!lightMode ? "text-yellow-500 fill-yellow-500":""} light:text-gray-700 light:cursor-pointer hover:text-yellow-500 light:hover:text-gray-500`} />
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

            {/* Filters */}
            <div className="flex gap-4 mb-6">
              <select
                value={selectedWheel}
                onChange={(e) => setSelectedWheel(e.target.value)}
                className="px-4 py-2 bg-gradient-to-l from-blue-500 to-indigo-600 rounded-lg text-black"
              >
                <option value="all">All Wheels</option>
                <option value="2wheel">2 Wheel</option>
                <option value="3wheel">3 Wheel</option>
                <option value="4wheel">4 Wheel</option>
              </select>

              <select
                value={selectedZone}
                onChange={(e) => setSelectedZone(e.target.value)}
                className="px-4 py-2 bg-gradient-to-l from-blue-500 to-indigo-600 rounded-lg text-black"
              >
                <option value="all">All Zones</option>
                {zones.map((zone, idx) => (
                  <option key={idx} value={zone}>
                    {zone.charAt(0).toUpperCase() + zone.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {stats && <StatsGrid stats={stats} />}
          {filteredSpots.length > 0 ? (
            <ParkingLayout spots={filteredSpots} />
          ) : (
            <div className="text-gray-400">No matching slots.</div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
