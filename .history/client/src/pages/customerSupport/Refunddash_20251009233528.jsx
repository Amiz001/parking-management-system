import React, { useState, useEffect } from "react";
import {toast} from 'react-toastify';

import {
  Search,
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
  Plus,
  Edit,
  Trash2,
  Truck,
  Bike,
  Download,
  BarChart3,
  Activity,
  Wrench,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const URL = "http://localhost:5000/slots";

/*const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
}*/

const ZoneSelection = ({ parkType, selectedZone, setSelectedZone }) => {
  const [zones, setZones] = useState([]);
  const navigate = useNavigate();

  const mapParkType = (park) => {
    if (park === "4-Wheeler Park") return "4wheel";
    if (park === "3-Wheeler Park") return "3wheel";
    if (park === "2-Wheeler Park") return "2wheel";
    return null;
  };

  useEffect(() => {
    fetchZones();
  }, [parkType]);

  const fetchZones = async () => {
    try {
      const res = await axios.get("http://localhost:5000/zones");

      const filtered = res.data.zones.filter((z) => z.parkType === mapParkType(parkType));
      setZones(filtered);

      if (filtered.length > 0 && !selectedZone) {
        setSelectedZone(filtered[0].zoneId);
      }
    } catch (err) {
      console.error("Error fetching zones:", err);
    }
  };

  return (
    <div className="bg-[#151821] light:bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-gray-900 light:border-white/50 shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
            <BarChart3 className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-white light:text-gray-800">
            Zone Selection ({parkType})
          </h2>
        </div>

        <button
          onClick={() => navigate("/admin/zone-management")}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <Wrench className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      <div className="flex gap-4 flex-wrap">
        {zones.length > 0 ? (
          zones.map((zone) => (
            <button
              key={zone._id}
              onClick={() => setSelectedZone(zone.zoneName)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${selectedZone === zone.zoneName
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg transform scale-105"
                : "bg-gray-400 light:bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              {zone.zoneName}
            </button>
          ))
        ) : (
          <p className="text-gray-400">No zones available for this park</p>
        )}
      </div>
    </div>
  );
};



const SlotManagement = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly");
  const [lightMode, setLightMode] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState("All Segment");

  const [selectedPark, setSelectedPark] = useState("4-Wheeler Park");
  const [selectedZone, setSelectedZone] = useState("Zone A");
  const [showAddSlotModal, setShowAddSlotModal] = useState(false);
  const [showEditSlotModal, setShowEditSlotModal] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [slots, setSlots] = useState([]);
  const [currentSlots, setCurrentSlots] = useState([]);

  // this is for side bars and navigate part also include like link option
  const sidebarItems = [
    { icon: ChartColumnBig, link:"/admin/dashboard", label: 'Dashboard', active: true },
        { icon: SquareParking , link:"/admin/slot-management", label: 'Slot Management' },
        { icon: HeartHandshake, link:"/admin/membership-management", label: 'Membership plans' },
        { icon: BanknoteArrowDown,link:"/customerSupport/", label: 'Refund requests' },
        { icon: Megaphone, link:"/admin/slot-management", label: 'Notifications' },
       // { icon: FileText, label: 'Report' },
  ];
// this is also for side bars
  const userItems = [
    { icon: Users, label: "User Management" },
    { icon: Car, label: "Vehicles" },
  ];
// this is also for side bars

  const bottomItems = [
      { icon: Settings, link:"/", label: "Settings" },
      // { icon: HelpCircle, label: 'Help & Support' },
      { icon: LogOut, link:"/", label: "Logout" },
    ];


  const navigate = useNavigate();

  // stats cards in appear in page view
  const statsCards = [
    {
      title: "Available Slots",
      value: currentSlots.filter((slot) => slot.status === "available").length,
      /*change: "+5% from last week",*/
      positive: true,
    },
    {
      title: "Occupied Slots",
      value: currentSlots.filter((slot) => slot.status === "occupied").length,
      /*change: "-3% from last week",*/
      positive: false,
    },
    {
      title: "Disabled Slots",
      value: currentSlots.filter((slot) => slot.status === "disabled").length,
      /*change: "0% (no change)",*/
      positive: true,
    },
    {
      title: "Emergency Slots",
      value: currentSlots.filter((slot) => slot.status === "emergency").length,
      /*change: "+2% from last week",*/
      positive: false,
    },
  ];
// this is for page uis like 4 wheeler park
  const parks = [
    {
      name: "4-Wheeler Park",
      icon: Car,
      color: "from-blue-500 to-blue-600",
    },
    {
      name: "3-Wheeler Park",
      icon: Truck,
      color: "from-purple-500 to-purple-600",
    },
    {
      name: "2-Wheeler Park",
      icon: Bike,
      color: "from-green-500 to-green-600",
    },
  ];
// finsh UI part
  const getSlotIcon = (type) => {
    switch (type) {
      case "4wheel":
        return <Car className="w-5 h-5" />;
      case "3wheel":
        return <Truck className="w-5 h-5" />;
      case "2wheel":
        return <Bike className="w-5 h-5" />;
      default:
        return <Car className="w-5 h-5" />;
    }
  };

  const getSlotColor = (status) => {
    switch (status) {
      case "available":
        return "bg-gradient-to-br from-emerald-100 to-green-200 border-emerald-300 text-emerald-800 shadow-emerald-200";
      case "occupied":
        return "bg-gradient-to-br from-red-100 to-rose-200 border-red-300 text-red-800 shadow-red-200";
      case "disabled":
        return "bg-gradient-to-br from-gray-100 to-slate-200 border-gray-300 text-gray-600 shadow-gray-200";
      case "emergency":
        return "bg-gradient-to-br from-amber-100 to-yellow-200 border-yellow-300 text-yellow-800 shadow-yellow-200";
      default:
        return "bg-gradient-to-br from-gray-100 to-slate-200 border-gray-300 text-gray-600 shadow-gray-200";
    }
  };

  const getSlotSize = (type) => {
    switch (type) {
      case "4wheel":
        return "w-28 h-24";
      case "3wheel":
        return "w-28 h-24";
      case "2wheel":
        return "w-28 h-24";
      default:
        return "w-28 h-24";
    }
  };


  //----------------------fetch part---------------------------

  //slot fetch
  useEffect(() => {
    const fetchSlotsFromServer = async () => {
      try {
        const res = await axios.get('http://localhost:5000/slots'); // or '/slots' if proxy set
        const data = Array.isArray(res.data) ? res.data : (res.data.slots || res.data);

        const formatted = data.map(s => ({
          _id: s._id,
          id: s.slotId || s._id,
          type: s.type,
          status: s.status,
          zone: s.zone,
          park: s.park,
          notice: s.notice
        }));

        setSlots(formatted);
      } catch (err) {
        console.error('Failed to fetch slots:', err);
      }
    };

    fetchSlotsFromServer();
  }, []);

  /*slot filter
  const filterSlots = () => {
    const selectedSlots = slots.filter(
      (slot) => slot.park === selectedPark && slot.zone === selectedZone
    );

    setCurrentSlots(selectedSlots);
  }*/

  // slot filter
  useEffect(() => {
    if (!slots || slots.length === 0) {
      setCurrentSlots([]);
      return;
    }

    const selectedSlots = slots.filter(
      (slot) => slot.park === selectedPark && slot.zone === selectedZone
    );

    setCurrentSlots(selectedSlots);
  }, [slots, selectedPark, selectedZone]);


  const [newSlot, setNewSlot] = useState({ quantity: 1, bulkAdd: false });

  //no need
  const getVehicleTypeFromPark = (park) => {
    if (park === "4-Wheeler Park") return "4wheel";
    if (park === "3-Wheeler Park") return "3wheel";
    if (park === "2-Wheeler Park") return "2wheel";
    return "4wheel";
  };
  const currentVehicleType = getVehicleTypeFromPark(selectedPark);

  //search function
  const filteredSlots = currentSlots.filter((slot) => {
    const matchesSearch = slot.id
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || slot.status === filterStatus;
    return matchesSearch && matchesStatus;
  });



  //----------------------add part---------------------------//

  const createSlotOnServer = async (slotObj) => {
    const payload = {
      slotId: slotObj.id,
      type: slotObj.type,
      status: slotObj.status,
      zone: slotObj.zone,
      park: slotObj.park,
      notice: slotObj.notice
    };

    const res = await axios.post(URL, payload);
    return res.data.slots || res.data;
  };



  // to map selectedPark to backend parkType
  const normalizeParkType = (park) => {
    if (!park) return "";
    if (park.toLowerCase().includes("4")) return "4wheel";
    if (park.toLowerCase().includes("3")) return "3wheel";
    if (park.toLowerCase().includes("2")) return "2wheel";
    return park;
  };

  // fetching zone total slots capacity from backend
  const getZoneTotalSlots = async (parkKey, zoneIdentifier) => {
    try {
      const res = await axios.get("http://localhost:5000/zones");
      const raw = res.data;

      let zones = [];
      if (Array.isArray(raw)) zones = raw;
      else if (Array.isArray(raw.zones)) zones = raw.zones;
      else if (Array.isArray(raw.zone)) zones = raw.zone;

      const normalizedPark = normalizeParkType(parkKey);

      const z = zones.find(z =>
        normalizeParkType(z.parkType) === normalizedPark &&
        (z.zoneId === zoneIdentifier ||
          z.zoneName === zoneIdentifier ||
          z.name === zoneIdentifier ||
          z._id === zoneIdentifier)
      );

      console.log("Zone check:", { selectedPark: parkKey, selectedZone: zoneIdentifier, foundZone: z });

      if (!z) return null;
      return z.totalSlots || z.slots || 0;
    } catch (err) {
      console.error("Failed to fetch zones for validation", err);
      return null;
    }
  };

  const handleAddSlot = async () => {
    const baseId = currentVehicleType === "4wheel" ? "4W"
      : currentVehicleType === "3wheel" ? "3W" : "2W";

    const existingNumbers = slots
      .filter(s => s.type === currentVehicleType && s.park === selectedPark && s.zone === selectedZone)
      .map(s => parseInt(((s.slotId || s.id || "")).slice(2)))
      .filter(n => !isNaN(n));

    const currentCount = existingNumbers.length;
    const nextNumber = currentCount > 0 ? Math.max(...existingNumbers) + 1 : 1;
    const quantity = newSlot.bulkAdd ? 20 : Math.max(1, newSlot.quantity);

    //check zone capacity
    const totalAllowed = await getZoneTotalSlots(selectedPark, selectedZone);

    if (totalAllowed !== null) {
      const remaining = totalAllowed - currentCount;

      if (remaining <= 0) {
        alert(`Zone full! Allowed: ${totalAllowed}, already has: ${currentCount}`);
        return;
      }

      if (quantity > remaining) {
        alert(`Cannot add ${quantity} slots. Only ${remaining} slot(s) remaining in this zone.`);
        return;
      }
    }

    // proceed with adding slots
    const newSlots = [];
    for (let i = 0; i < quantity; i++) {
      newSlots.push({
        id: `${baseId}${String(nextNumber + i).padStart(3, "0")}`,
        type: getVehicleTypeFromPark(selectedPark),
        status: "available",
        zone: selectedZone,
        park: selectedPark,
        notice: "",
      });
    }

    try {
      const results = await Promise.allSettled(newSlots.map(n => createSlotOnServer(n)));
      const succeeded = results.filter(r => r.status === "fulfilled").map(r => r.value);

      const mapped = succeeded.map(c => {
        const slot = c.slots || c;
        return {
          _id: slot._id,
          slotId: slot.slotId || slot.id || slot._id,
          id: slot.slotId || slot.id || slot._id,
          type: slot.type,
          status: slot.status,
          zone: slot.zone,
          park: slot.park,
          notice: slot.notice || "",
        };
      });

      if (mapped.length > 0) setSlots(prev => [...prev, ...mapped]);

      await fetchSlotsFromServer();

      setShowAddSlotModal(false);
      setNewSlot({ quantity: 1, bulkAdd: false });

      const failedCount = results.filter(r => r.status === "rejected").length;
      if (failedCount > 0) console.warn(`${failedCount} slots failed to add.`);
    } catch (err) {
      console.error("Failed to add slots:", err);
    } finally {
      setShowAddSlotModal(false);
      setNewSlot({ quantity: 1, bulkAdd: false });
    }
  };



  //----------------------edit part---------------------------//

  const handleEditSlot = (slot) => {
    setEditingSlot({ ...slot });
    setShowEditSlotModal(true);
  };

  const updateSlotOnServer = async (slot) => {
    const payload = {
      slotId: slot.id,
      type: slot.type,
      status: slot.status,
      zone: slot.zone,
      park: slot.park,
      notice: slot.notice
    };
    const res = await axios.put(`http://localhost:5000/slots/${slot._id}`, payload);
    return res.data;
  };

  const handleUpdateSlot = async () => {
    try {
      const updated = await updateSlotOnServer(editingSlot);
      setSlots(prev => prev.map(s => (s._id === updated._id ? {
        _id: updated._id,
        id: updated.slotId || updated._id,
        type: updated.type,
        status: updated.status,
        zone: updated.zone,
        park: updated.park,
        notice: updated.notice
      } : s)));
      setShowEditSlotModal(false);
      setEditingSlot(null);
    } catch (err) {
      console.error('Failed to update slot:', err);
    }

  };


  //----------------------delete part---------------------------//

  const handleDeleteSlot = async (slot) => {
    if (!window.confirm('Are you sure you want to delete this slot?')) return;
    try {
      await axios.delete(`http://localhost:5000/slots/${slot._id}`);
      setSlots(prev => prev.filter(s => s._id !== slot._id));
    } catch (err) {
      console.error('Delete failed', err);
    }
  };


  //----------------------exporting part---------------------------//

  const exportData = () => {
    if (filteredSlots.length === 0) return;
    const csvData = filteredSlots.map((slot) => ({
      ID: slot.id,
      Type: slot.type,
      Status: slot.status,
      Zone: slot.zone,
      Park: slot.park,
      Notice: slot.notice,
    }));
    const csv = [
      Object.keys(csvData[0]).join(","),
      ...csvData.map((row) => Object.values(row).join(",")),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `slots_${selectedPark}_${selectedZone}.csv`;
    a.click();
  };

  //idk
  const selectedParkData = parks.find((p) => p.name === selectedPark);

  return (
    <div
      className={`flex h-auto bg-gray-950 text-white light:text-black light:bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ${lightMode ? "light" : "dark"
        }`}
    >
      {/* Sidebar */}
      <div className="w-64 h-screen sticky top-0 bg-[#151821] p-6 flex flex-col light:bg-white light:shadow-lg light:backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">✦</span>
          </div>
          <span className="text-xl font-semibold">Admin</span>
        </div>

        {/* Main Menu */}
        <div className="mb-8">
          <p className="text-gray-400 light:text-black text-sm mb-4 uppercase tracking-wide">
            Main Menu
          </p>
          <nav className="space-y-2">
            {sidebarItems.map((item, index) => (
              <a
                key={index}
                onClick={()=> navigate(item.link)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${item.active
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

        {/* Users */}
        <div className="mb-8">
          <p className="text-gray-400 light:text-black text-sm mb-4 uppercase tracking-wide">
            Users
          </p>
          <nav className="space-y-2">
            {userItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 light:text-black hover:bg-gray-700 light:hover:bg-gray-100 transition-colors"
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
              onClick={() => navigate(item.link)}
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
            <span className="text-sm font-semibold">AM</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium light:text-gray-950">
              Austin Martin
            </p>
            <p className="text-xs text-gray-400 light:text-gray-700">
              austinm@mail.com
            </p>
          </div>
          <MoreHorizontal
            size={16}
            className="text-gray-400 light:text-gray-950"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gray-950 light:bg-transparent p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">

          </div>

          <div className="flex items-center gap-4">
            <Bell
              size={20}
              className="text-gray-400 light:text-gray-700 cursor-pointer hover:text-white light:hover:text-gray-500"
            />
            <Settings
              size={20}
              className="text-gray-400 light:text-gray-700 cursor-pointer hover:text-white light:hover:text-gray-500"
            />
            <Sun
              onClick={() => setLightMode(true)}
              size={20}
              className={`text-gray-400 ${lightMode ? "light:text-yellow-500 fill-yellow-500" : ""
                } cursor-pointer light:cursor-default hover:text-white light:hover:text-yellow-500`}
            />
            <Moon
              onClick={() => setLightMode(false)}
              size={20}
              className={`${!lightMode ? "text-yellow-500 fill-yellow-500" : ""
                } light:text-gray-700 light:cursor-pointer hover:text-yellow-500 light:hover:text-gray-500`}
            />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Dashboard Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Refund Request</h1>
              <p className="text-gray-400 light:text-gray-600">
                Here is the summary of Refund Requests of users
              </p>
            </div>
            <div className="flex items-center gap-4 ml-auto">
              <button
                onClick={exportData}
                className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Download className="w-5 h-5" />
                Export Data
              </button>
            </div>
          </div>




          <div className="min-h-screen bg-gray-950 light:bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <div className="max-w-7xl mx-auto px-6 py-8">

              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statsCards.map((card, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-b from-[#151821] to-[#242938] 
                              light:bg-gradient-to-b light:from-white light:to-white 
                              light:shadow-lg light:backdrop-blur-sm p-6 rounded-xl"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-gray-400 light:text-gray-600 text-sm">
                        {card.title}
                      </h3>
                      <MoreHorizontal size={20} className="text-gray-400 light:text-gray-600 cursor-pointer" />
                    </div>
                    <div className="mb-2">
                      <span className="text-3xl font-bold">{card.value}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-sm font-medium ${card.positive
                          ? "text-green-400 light:text-green-600"
                          : "text-red-400 light:text-red-600"
                          }`}
                      >
                        {card.change}
                      </span>
                    </div>
                  </div>
                ))}
              </div>


              {/* Park Selection Cards */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {parks.map((park) => {
                  const IconComponent = park.icon;
                  const isActive = selectedPark === park.name;

                  // Calculate total slots for each park
                  const totalSlotsInPark = slots.filter(slot => slot.park === park.name).length;

                  return (
                    <div
                      key={park.name}
                      onClick={() => setSelectedPark(park.name)}
                      className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 transform hover:scale-105 ${isActive ? "ring-4 ring-blue-500/50 shadow-2xl" : "hover:shadow-xl opacity-50"
                        }`}
                    >
                      <div
                        className={`bg-gradient-to-r ${park.color} p-6 text-white relative`}
                      >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                        <div className="relative">
                          <div className="flex items-center justify-between mb-4">
                            <IconComponent className="w-8 h-8" />
                            <div className="text-right">
                              <div className="text-2xl font-bold">{totalSlotsInPark}</div>
                              <div className="text-sm opacity-90">Total Slots</div>
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold">{park.name}</h3>

                          {/* Reserve space for status */}
                          <div className="mt-2 flex items-center gap-2 min-h-[20px]">
                            {isActive && (
                              <>
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                <span className="text-sm opacity-90">Active</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Zone Selection */}
              <ZoneSelection
                parkType={selectedPark}
                selectedZone={selectedZone}
                setSelectedZone={setSelectedZone}
              />


              {/* Controls */}
              <div className="bg-[#151821] light:bg-white/80 backdrop-blur-sm rounded-2xl p-6 space-y-6 mb-8 border border-gray-900 light:border-white/50 shadow-lg">
                <div className="flex flex-wrap items-center justify-between gap-4">

                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Search className="w-5 h-5 absolute z-10 left-3 top-1/2 transform -translate-y-1/2 text-gray-200 light:text-gray-900" />
                      <input
                        type="text"
                        placeholder="Search slots..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-3 border border-gray-900 light:border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-950 light:bg-white/70 backdrop-blur-sm"
                      />
                    </div>

                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="px-4 py-3 border  border-gray-900 light:border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-950 light:bg-white/70 backdrop-blur-sm"
                    >
                      <option value="all">All Status</option>
                      <option value="available">Available</option>
                      <option value="occupied">Occupied</option>
                      <option value="disabled">Disabled</option>
                      <option value="emergency">Emergency</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setShowAddSlotModal(true)}
                      className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <Plus className="w-5 h-5" />
                      Add Slots
                    </button>


                   
                  </div>
                </div>



                {/* Slots Grid */}
                <div className="bg-gray-950 light:bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-900 light:border-white/50 shadow-lg">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 bg-gradient-to-r ${selectedParkData?.color} rounded-xl`}
                      >
                        {selectedParkData &&
                          React.createElement(selectedParkData.icon, {
                            className: "w-6 h-6 text-white",
                          })}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white light:text-gray-800">
                          {selectedPark} - {selectedZone}
                        </h3>
                        <p className="text-gray-400">
                          {filteredSlots.length} slots available
                        </p>
                      </div>
                    </div>

                    {/* Status Legend */}
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gradient-to-br from-emerald-100 to-green-200 border border-emerald-300 rounded"></div>
                        <span className="text-gray-600">Available</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gradient-to-br from-red-100 to-rose-200 border border-red-300 rounded"></div>
                        <span className="text-gray-600">Occupied</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gradient-to-br from-amber-100 to-yellow-200 border border-yellow-300 rounded"></div>
                        <span className="text-gray-600">Emergency</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-gradient-to-br from-gray-100 to-slate-200 border border-gray-300 rounded"></div>
                        <span className="text-gray-600">Disabled</span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="grid gap-6"
                    style={{
                      gridTemplateColumns:
                        "repeat(auto-fill, minmax(100px, 1fr))",
                    }}
                  >
                    {filteredSlots.map((slot, index) => (
                      <div
                        key={slot.id}
                        className={`${getSlotColor(slot.status)} ${getSlotSize(
                          slot.type
                        )} border-2 rounded-2xl p-4 relative group hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col items-center justify-center animate-fade-in`}
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <div className="opacity-0 group-hover:opacity-100 absolute top-2 right-2 flex gap-1 transition-all duration-200">
                          <button
                            onClick={() => handleEditSlot(slot)}
                            className="p-2 hover:bg-white/80 rounded-lg backdrop-blur-sm transition-all duration-200 hover:scale-110"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSlot(slot)}
                            className="p-2 hover:bg-white/80 rounded-lg text-red-600 backdrop-blur-sm transition-all duration-200 hover:scale-110"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-center">
                          <div className="text-lg font-bold mb-2">{slot.id}</div>
                          <div className="opacity-80 transform group-hover:scale-110 transition-transform duration-200">
                            {getSlotIcon(slot.type)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredSlots.length === 0 && (
                    <div className="text-center py-16 text-gray-500">
                      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8" />
                      </div>
                      <p className="text-lg">
                        No slots found matching your criteria
                      </p>
                      <p className="text-sm mt-2">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Add Slot Modal */}
              {showAddSlotModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                  <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl border border-white/50">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                        <Plus className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        Add New Slots
                      </h2>
                    </div>

                    <div className="space-y-6">
                      <div className="p-4 bg-gray-50 rounded-xl">
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>
                            <span className="font-medium">Park:</span>{" "}
                            {selectedPark}
                          </p>
                          <p>
                            <span className="font-medium">Zone:</span>{" "}
                            {selectedZone}
                          </p>
                          <p>
                            <span className="font-medium">Type:</span>{" "}
                            {currentVehicleType}
                          </p>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Quantity
                        </label>
                        <input
                          type="number"
                          value={newSlot.quantity}
                          onChange={(e) =>
                            setNewSlot({
                              ...newSlot,
                              quantity: e.target.value,
                            })
                          }
                          className="w-full border border-gray-200 px-4 py-3 rounded-xl light:text-gray-600 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"

                        />
                      </div>

                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="bulkAdd"
                          checked={newSlot.bulkAdd}
                          onChange={(e) =>
                            setNewSlot({
                              ...newSlot,
                              bulkAdd: e.target.checked,
                            })
                          }
                          className="w-5 h-5 text-blue-600 rounded"
                        />
                        <label htmlFor="bulkAdd" className="text-gray-700">
                          Bulk add (20 slots)
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-8">
                      <button
                        onClick={() => setShowAddSlotModal(false)}
                        className="px-6 py-3 text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleAddSlot}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg"
                      >
                        Add Slots
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Edit Slot Modal */}
              {showEditSlotModal && editingSlot && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                  <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl border border-white/50">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                        <Edit className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        Edit Slot {editingSlot.id}
                      </h2>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Status
                        </label>
                        <select
                          value={editingSlot.status}
                          onChange={(e) =>
                            setEditingSlot({
                              ...editingSlot,
                              status: e.target.value,
                            })
                          }
                          className="w-full border border-gray-200 px-4 py-3 rounded-xl light:text-gray-600 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="available">Available</option>
                          <option value="occupied">Occupied</option>
                          <option value="disabled">Disabled</option>
                          <option value="emergency">Emergency</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Notice
                        </label>
                        <textarea
                          value={editingSlot.notice}
                          onChange={(e) =>
                            setEditingSlot({
                              ...editingSlot,
                              notice: e.target.value,
                            })
                          }
                          className="w-full border border-gray-200 px-4 py-3 rounded-xl light:text-gray-600 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows="3"
                          placeholder="Add any additional notes..."
                        />
                      </div>

                      <div className="p-4 bg-gray-50 rounded-xl">
                        <div className="text-sm  text-gray-600 space-y-1">
                          <p>
                            <span className="font-medium">Type:</span>{" "}
                            {editingSlot.type}
                          </p>
                          <p>
                            <span className="font-medium">Location:</span>{" "}
                            {editingSlot.park} - {editingSlot.zone}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-8">
                      <button
                        onClick={() => setShowEditSlotModal(false)}
                        className="px-6 py-3 text-gray-600 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleUpdateSlot}
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 shadow-lg"
                      >
                        Update Slot
                      </button>
                    </div>
                  </div>
                </div>
              )}


              {/* Add custom CSS for animations */}
              <style jsx>{`
                @keyframes fade-in {
                  from {
                    opacity: 0;
                    transform: translateY(20px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }

                .animate-fade-in {
                  animation: fade-in 0.6s ease-out forwards;
                }
              `}</style>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default SlotManagement;
