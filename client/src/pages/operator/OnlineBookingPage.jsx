import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  Car,
  Ban,
  AlertTriangle,
} from "lucide-react";

const ParkingSpot = ({ spot }) => {
  const navigate = useNavigate();

  const baseClasses =
    "relative w-24 h-28 rounded-xl border-2 cursor-pointer transition-all duration-300 flex flex-col items-center justify-center text-sm font-medium hover:scale-105 hover:shadow-lg";

  const getSpotClasses = () => {
    switch (spot.status) {
      case "available":
        return `${baseClasses} bg-green-50 border-green-300 text-green-700 hover:bg-green-100 hover:border-green-400`;
      case "occupied":
        return `${baseClasses} bg-red-50 border-red-300 text-red-700 hover:bg-red-100 hover:border-red-400 cursor-not-allowed`;
      case "disabled":
        return `${baseClasses} bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400 cursor-not-allowed`;
      case "emergency":
        return `${baseClasses} bg-yellow-50 border-yellow-300 text-yellow-700 hover:bg-yellow-100 hover:border-yellow-400 cursor-not-allowed`;
      default:
        return baseClasses;
    }
  };

  const getStatusIcon = () => {
    switch (spot.status) {
      case "available":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "occupied":
        return <Car className="w-5 h-5 text-red-600" />;
      case "disabled":
        return <Ban className="w-5 h-5 text-gray-600" />;
      case "emergency":
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      default:
        return null;
    }
  };

  const getStatusLabel = () => {
    switch (spot.status) {
      case "available":
        return <span className="text-xs font-semibold text-green-700">Available</span>;
      case "occupied":
        return <span className="text-xs font-semibold text-red-700">Occupied</span>;
      case "disabled":
        return <span className="text-xs font-semibold text-gray-700">Disabled</span>;
      case "emergency":
        return <span className="text-xs font-semibold text-yellow-700">Emergency</span>;
      default:
        return null;
    }
  };

  return (
    <div
      className={getSpotClasses()}
      onClick={() =>
        spot.status === "available" &&
        navigate(`/operator/bookingOnline`)
      }
    >
      <div className="flex flex-col items-center space-y-1">
        {/* Status Icon */}
        {getStatusIcon()}
        {/* Status Label */}
        {getStatusLabel()}

        {/* Spot Details */}
        <span className="text-base font-bold">{spot.name || spot.slotId}</span>
        <span className="text-xs">{spot.vehicleType}</span>
      </div>
    </div>
  );
};

const OnlineBookingPage = () => {
  const [spots, setSpots] = useState([]);
  const [vehicleType, setVehicleType] = useState("all");
  const [zoneType, setZoneType] = useState("all");

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const res = await fetch("http://localhost:5000/slots");
        const data = await res.json();
        setSpots(data.slots || []);
      } catch (error) {
        console.error("Error fetching slots:", error);
      }
    };
    fetchSpots();
  }, []);

  // Apply both filters (vehicle type + zone)
  const filteredSpots = spots.filter((spot) => {
    const matchesVehicle =
      vehicleType === "all" || spot.vehicleType === vehicleType;
    const matchesZone = zoneType === "all" || spot.zone === zoneType;
    return matchesVehicle && matchesZone;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-bold text-gray-800">
            Online Parking Booking
          </h1>
          <button
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-gradient-to-l from-blue-500 to-indigo-600 text-white rounded-lg hover:opacity-90 transition"
          >
            Back
          </button>
        </div>

        {/* Vehicle Type Filter */}
        <div className="flex items-center gap-4 mb-6">
          {["all", "4wheel", "3wheel", "2wheel"].map((type) => (
            <button
              key={type}
              onClick={() => setVehicleType(type)}
              className={`px-4 py-2 rounded-lg border transition ${
                vehicleType === type
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {type === "all"
                ? "All Vehicles"
                : type === "4wheel"
                ? "4-Wheel"
                : type === "3wheel"
                ? "3-Wheel"
                : "2-Wheel"}
            </button>
          ))}
        </div>

        {/* Zone Filter */}
        <div className="flex items-center gap-4 mb-8">
          {["all", "A", "B"].map((zone) => (
            <button
              key={zone}
              onClick={() => setZoneType(zone)}
              className={`px-4 py-2 rounded-lg border transition ${
                zoneType === zone
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {zone === "all" ? "All Zones" : `Zone ${zone}`}
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-6 mb-8 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-sm font-medium text-gray-700">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <Car className="w-5 h-5 text-red-600" />
            <span className="text-sm font-medium text-gray-700">Occupied</span>
          </div>
          <div className="flex items-center space-x-2">
            <Ban className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Disabled</span>
          </div>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <span className="text-sm font-medium text-gray-700">Emergency</span>
          </div>
        </div>

        {/* Parking Layout */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {filteredSpots.length === 0 ? (
            <p className="text-center text-gray-500">No slots available</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
              {filteredSpots.map((spot) => (
                <ParkingSpot key={spot._id} spot={spot} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnlineBookingPage;
