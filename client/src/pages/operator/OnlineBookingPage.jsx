import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  Car,
  Ban,
  AlertTriangle,
  ArrowLeft,
  MapPin,
} from "lucide-react";
import bgPic from "../../images/backgroundpic.jpg"; 

const ParkingSpot = ({ spot }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (spot.status === "available") {
      navigate("/operator/bookingOnlineform", { state: { slotId: spot.slotId, zone: spot.zone, type: spot.type } });
    }
  };

  const baseClasses =
    "relative w-28 h-32 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center text-sm font-medium backdrop-blur-sm";

  const getSpotClasses = () => {
    switch (spot.status) {
      case "available":
        return `${baseClasses} bg-gradient-to-br from-emerald-50/90 to-green-100/90 border-emerald-400 text-emerald-800 hover:scale-110 hover:shadow-2xl hover:from-emerald-100 hover:to-green-200 hover:border-emerald-500`;
      case "occupied":
        return `${baseClasses} bg-gradient-to-br from-rose-50/90 to-red-100/90 border-rose-400 text-rose-800 hover:scale-105 hover:shadow-xl cursor-not-allowed opacity-75`;
      case "disabled":
        return `${baseClasses} bg-gradient-to-br from-slate-50/90 to-gray-100/90 border-slate-400 text-slate-800 hover:scale-105 hover:shadow-xl cursor-not-allowed opacity-60`;
      case "emergency":
        return `${baseClasses} bg-gradient-to-br from-amber-50/90 to-yellow-100/90 border-amber-400 text-amber-800 hover:scale-105 hover:shadow-xl cursor-not-allowed`;
      default:
        return baseClasses;
    }
  };

  const getStatusIcon = () => {
    switch (spot.status) {
      case "available":
        return <CheckCircle className="w-6 h-6 text-emerald-600 drop-shadow-sm" />;
      case "occupied":
        return <Car className="w-6 h-6 text-rose-600 drop-shadow-sm" />;
      case "disabled":
        return <Ban className="w-6 h-6 text-slate-600 drop-shadow-sm" />;
      case "emergency":
        return <AlertTriangle className="w-6 h-6 text-amber-600 drop-shadow-sm" />;
      default:
        return null;
    }
  };

  return (
    <div className={getSpotClasses()} onClick={handleClick}>
      <div className="flex flex-col items-center space-y-1.5 p-2">
        {getStatusIcon()}
        <span className="text-lg font-bold">{spot.slotId}</span>
        <span className="text-[10px] uppercase tracking-wide font-semibold opacity-80">{spot.status}</span>
        {spot.zone && <span className="text-[10px] px-2 py-0.5 bg-white/50 rounded-full">{spot.zone}</span>}
        {spot.type && <span className="text-[10px] font-medium opacity-75">{spot.type}</span>}
      </div>
    </div>
  );
};

const ParkingLayout = ({ spots }) => {
  return (
    <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
      {spots.length === 0 ? (
        <p className="text-center text-white/70 text-lg">No slots available</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
          {spots.map((spot) => (
            <ParkingSpot key={spot._id} spot={spot} />
          ))}
        </div>
      )}
    </div>
  );
};

const OnlineBookingPage = () => {
  const [spots, setSpots] = useState([]);
  const [stats, setStats] = useState(null);

  const [selectedWheel, setSelectedWheel] = useState("all");
  const [selectedZone, setSelectedZone] = useState("all");

  const fetchSpots = async () => {
    try {
      const response = await fetch("http://localhost:5000/slots");
      const data = await response.json();
      const slotArray = data.slots || data;

      setSpots(slotArray);
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

  const filteredSpots = spots.filter((spot) => {
    const vehicleType = spot.type?.toLowerCase();
    const zone = spot.zone?.toLowerCase();

    return (
      (selectedWheel === "all" || vehicleType === selectedWheel) &&
      (selectedZone === "all" || zone === selectedZone)
    );
  });

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgPic})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMC41IiBvcGFjaXR5PSIwLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>

      <div className="relative z-10 py-10 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
                Smart Parking
              </h1>
              <p className="text-white/70 text-lg flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Find your perfect spot
              </p>
            </div>
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-white/20 backdrop-blur-xl text-white rounded-2xl hover:bg-white/30 transition-all duration-300 flex items-center gap-2 border border-white/30 shadow-xl hover:scale-105"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-8">
            <select
              value={selectedWheel}
              onChange={(e) => setSelectedWheel(e.target.value)}
              className="px-4 py-2 bg-gradient-to-l from-blue-500 to-indigo-600 rounded-lg border-gray-300 text-black"
            >
              <option value="all" className="text-gray-900">All Wheels</option>
              <option value="2wheel" className="text-gray-900">2 Wheel</option>
              <option value="3wheel" className="text-gray-900">3 Wheel</option>
              <option value="4wheel" className="text-gray-900">4 Wheel</option>
            </select>

            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="px-4 py-2 bg-gradient-to-l from-blue-500 to-indigo-600 rounded-lg border-gray-300 text-black"
            >
              <option value="all" className="text-gray-900">All Zones</option>
              <option value="zone a" className="text-gray-900">Zone A</option>
              <option value="zone b" className="text-gray-900">Zone B</option>
            </select>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap items-center gap-6 mb-8 p-6 bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-emerald-400" />
              <span className="text-sm font-semibold text-white">Available</span>
            </div>
            <div className="flex items-center space-x-3">
              <Car className="w-6 h-6 text-rose-400" />
              <span className="text-sm font-semibold text-white">Occupied</span>
            </div>
            <div className="flex items-center space-x-3">
              <Ban className="w-6 h-6 text-slate-400" />
              <span className="text-sm font-semibold text-white">Disabled</span>
            </div>
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              <span className="text-sm font-semibold text-white">Emergency</span>
            </div>
          </div>

          {/* Parking Layout */}
          <ParkingLayout spots={filteredSpots} />
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default OnlineBookingPage;