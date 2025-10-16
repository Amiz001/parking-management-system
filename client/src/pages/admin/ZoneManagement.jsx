import React, { useEffect, useState } from 'react';
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
  Plus, Edit3, Trash2, Bike, Truck, Power, PowerOff,
} from 'lucide-react';
import axios from 'axios';
import {toast} from 'react-toastify';

const URL = "http://localhost:5000/zones";

const ZoneManagement = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Monthly');
  const [lightMode, setLightMode] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState('All Segment');

  const sidebarItems = [
    { icon: ChartColumnBig, label: 'Dashboard', active: true },
    { icon: SquareParking, label: 'Slot Management' },
    { icon: HeartHandshake, label: 'Membership plans' },
    { icon: BanknoteArrowDown, label: 'Refund requests' },
    { icon: Megaphone, label: 'Notifications' },
  ];

  const userItems = [
    { icon: Users, label: 'User Management' },
    { icon: Car, label: 'Vehicles' },
  ];

  const bottomItems = [
    { icon: Settings, label: 'Settings' },
    { icon: LogOut, label: 'Logout' },
  ];

  
  const [parks, setParks] = useState({ '4wheel': [], '3wheel': [], '2wheel': [] });
  const [showModal, setShowModal] = useState(false);
  const [selectedPark, setSelectedPark] = useState('4wheel');
  const [editingZone, setEditingZone] = useState(null);
  const [formData, setFormData] = useState({ zoneId: '', name: '', slots: 30, parkType: '4wheel', status: 'active' });
  const [errors, setErrors] = useState({});

  const parkTypes = [
    { value: '4wheel', label: '4-Wheeler Park', icon: Car, color: 'from-blue-500 to-blue-600', bgColor: 'bg-[#5f779c90] light:bg-blue-50', textColor: 'text-[fffff] light:text-blue-700' },
    { value: '3wheel', label: '3-Wheeler Park', icon: Truck, color: 'from-purple-500 to-purple-600', bgColor: 'bg-[#4c4361] light:bg-purple-50', textColor: 'text-[fffff] light:text-purple-700' },
    { value: '2wheel', label: '2-Wheeler Park', icon: Bike, color: 'from-green-500 to-green-600', bgColor: 'bg-[#347540] light:bg-green-50', textColor: 'text-[fffff] light:text-green-700' }
  ];

  const normalizeResponseArray = (payload) => {
    if (Array.isArray(payload)) return payload;
    if (payload == null) return [];
    if (Array.isArray(payload.zones)) return payload.zones;
    if (Array.isArray(payload.zone)) return payload.zone;
  
    if (payload.zones && !Array.isArray(payload.zones)) return [payload.zones];
    return [];
  };

  const generateZoneId = (parkKey) => {
    const prefix = parkKey === '4wheel' ? '4W' : parkKey === '3wheel' ? '3W' : '2W';
    const existing = parks[parkKey] || [];
    // pick next letter (A, B, C...) based on count of existing zones
    const letter = String.fromCharCode(65 + existing.length);
    return `${prefix}${letter}`; // e.g. 4WA
  };


  useEffect(() => {
    const fetchZonesFromServer = async () => {
      try {
        const res = await axios.get(URL);
        const raw = res.data;
        const data = normalizeResponseArray(raw);

        // grouping to parkType 
        const grouped = { '4wheel': [], '3wheel': [], '2wheel': [] };
        data.forEach(z => {
          const key = z.parkType;
          if (!grouped[key]) grouped[key] = [];

          grouped[key].push({
            id: z._id || z.id || z.zoneId || String(Math.random()),
            zoneId: z.zoneId || z.zoneId || '',
            name: z.zoneName || z.name || 'Unnamed',
            slots: z.totalSlots || z.slots || 0,
            status: z.status || 'active'
          });
        });

        setParks(grouped);
      } catch (err) {
        console.error('Failed to fetch zones:', err);
      }
    };

    fetchZonesFromServer();
  }, []);


  const validateForm = () => {
    const newErrors = {};
    if (!formData.name || !formData.name.trim()) newErrors.name = 'Zone name is required';
    else if (formData.name.length < 2) newErrors.name = 'Zone name must be at least 2 characters';

    if (!formData.slots || formData.slots < 1) newErrors.slots = 'Minimum 1 slot required';
    else if (formData.slots > 30) newErrors.slots = 'Maximum 30 slots allowed per zone';

    // checking duplicate names in the park
    const exists = (parks[selectedPark] || []).find(z => z.name.toLowerCase() === formData.name.toLowerCase() && (!editingZone || z.id !== editingZone.id));
    if (exists) newErrors.name = 'Zone name already exists in this park';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  //handle the creaate and update part
  const handleSubmit = async () => {
    const newErrors = {};
    if (!formData.slots || formData.slots < 1) newErrors.slots = 'Minimum 1 slot required';
    else if (formData.slots > 30) newErrors.slots = 'Maximum 30 slots allowed per zone';
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    try {
      const payload = {
        totalSlots: formData.slots,
        parkType: selectedPark 
      };

      let res;
      if (editingZone) {
        res = await axios.put(`${URL}/${editingZone.id}`, payload);
      } else {
        res = await axios.post(URL, payload);
      }

      const createdOrUpdated = res.data.zone || res.data;

      setParks(prev => ({
        ...prev,
        [selectedPark]: editingZone
          ? prev[selectedPark].map(z => z.id === editingZone.id ? {
            id: createdOrUpdated._id || editingZone.id,
            zoneId: createdOrUpdated.zoneId,
            name: createdOrUpdated.zoneName,
            slots: createdOrUpdated.totalSlots,
            status: createdOrUpdated.status
          } : z)
          : [...(prev[selectedPark] || []), {
            id: createdOrUpdated._id || createdOrUpdated.zoneId,
            zoneId: createdOrUpdated.zoneId,
            name: createdOrUpdated.zoneName,
            slots: createdOrUpdated.totalSlots,
            status: createdOrUpdated.status
          }]
      }));

      resetForm();
    } catch (err) {
      console.error('Failed to save zone:', err);
    }
  };

  const resetForm = () => {
    setFormData({ zoneId: '', name: '', slots: 30, parkType: selectedPark, status: 'active' });
    setEditingZone(null);
    setShowModal(false);
    setErrors({});
  };

  const handleOpenModal = async (parkType) => {
    setSelectedPark(parkType);

    try {
      const res = await axios.get(`http://localhost:5000/zones/next/${parkType}`);
      const { zoneId, zoneName } = res.data;

      setFormData({
        zoneId,
        name: zoneName,
        slots: 30,
        parkType,
        status: "active"
      });
    } catch (err) {
      console.error("Error fetching next zone:", err);
    }

    setShowModal(true);
  };


  const handleEdit = (zone, parkType) => {
    setSelectedPark(parkType);
    setEditingZone(zone);
    setFormData({ zoneId: zone.zoneId || '', name: zone.name, slots: zone.slots, parkType, status: zone.status });
    setShowModal(true);
    toast.success("Slot updated successfully!");
  };

  const handleDelete = async (zoneId, parkType) => {
    if (!window.confirm('Are you sure you want to delete this zone?')) return;
    try {
      await axios.delete(`${URL}/${zoneId}`);
      setParks(prev => ({ ...prev, [parkType]: prev[parkType].filter(z => z.id !== zoneId) }));
      toast.success("Slot deleted successfully!");
    } catch (err) {
      console.error('Failed to delete zone:', err);
    }
  };

  const toggleZoneStatus = async (zoneId, parkType) => {
    try {
      const zone = (parks[parkType] || []).find(z => z.id === zoneId);
      if (!zone) return;
      const newStatus = zone.status === 'active' ? 'disabled' : 'active';

      const payload = {
        zoneId: zone.zoneId || generateZoneId(parkType),
        zoneName: zone.name,
        totalSlots: zone.slots,
        parkType,
        status: newStatus
      };

      const res = await axios.put(`${URL}/${zoneId}`, payload);
      const updated = res.data.zone || res.data;

      setParks(prev => ({
        ...prev,
        [parkType]: prev[parkType].map(z => z.id === zoneId ? { ...z, status: updated.status || newStatus } : z)
      }));
    } catch (err) {
      console.error('Failed to toggle status:', err);
    }
  };

  const getStatusBadge = (status) => {
    return status === 'active'
      ? <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">Active</span>
      : <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">Disabled</span>;
  };

  return (
    <div className={`flex h-auto bg-gray-950 text-white light:text-black light:bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ${lightMode ? "light" : "dark"}`}>
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
          <p className="text-gray-400 light:text-black text-sm mb-4 uppercase tracking-wide">Main Menu</p>
          <nav className="space-y-2">
            {sidebarItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${item.active
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

        {/* Users */}
        <div className="mb-8">
          <p className="text-gray-400 light:text-black text-sm mb-4 uppercase tracking-wide">Users</p>
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
            <span className="text-sm font-semibold">AM</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium light:text-gray-950">Austin Martin</p>
            <p className="text-xs text-gray-400 light:text-gray-700">austinm@mail.com</p>
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
            <Sun onClick={() => setLightMode(true)} size={20} className={`text-gray-400 ${lightMode ? "light:text-yellow-500 fill-yellow-500" : ""} cursor-pointer light:cursor-default hover:text-white light:hover:text-yellow-500`} />
            <Moon onClick={() => setLightMode(false)} size={20} className={`${!lightMode ? "text-yellow-500 fill-yellow-500" : ""} light:text-gray-700 light:cursor-pointer hover:text-yellow-500 light:hover:text-gray-500`} />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Dashboard Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Zone Management</h1>
              <p className="text-gray-400 light:text-gray-600">Here is today's report and performances</p>
            </div>
            <div className="flex items-center gap-4">
             
              <button className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105">
                Export Data
              </button>
            </div>
          </div>


        
          <div className="min-h-screen bg-transparent-50 p-6">
            <div className="max-w-7xl mx-auto">


              {/* Parks Grid */}
              <div className="space-y-8">
                {parkTypes.map(parkType => {
                  const IconComponent = parkType.icon;
                  const parkZones = parks[parkType.value] || [];

                  return (
                    <div key={parkType.value} className=" bg-[#151821] light:bg-white rounded-xl shadow-sm border p-6 border-gray-900 light:border-white">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-lg bg-gradient-to-r ${parkType.color} bg-opacity-10`}>
                            <IconComponent className={`bg-gradient-to-r ${parkType.color.replace('bg-', 'text-')} text-opacity-80`} size={28} />
                          </div>
                          <div>
                            <h2 className="text-xl font-semibold text-w-900">{parkType.label}</h2>
                            <p className="text-gray-500">{parkZones.length} zones configured</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleOpenModal(parkType.value)}
                          className={`bg-gradient-to-r ${parkType.color} hover:opacity-90 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-md`}
                        >
                          <Plus size={20} />
                          Add Zone
                        </button>

                      </div>

                      {parkZones.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                          {parkZones.map(zone => (
                            <div key={zone.id} className={`bg-gradient-to-r ${parkType.bgColor} border-2 border-transparent hover:border-gray-200 rounded-lg p-4 transition-all`}>
                              <div className="flex items-center justify-between mb-3">
                                <h3 className={`font-semibold ${parkType.textColor} text-lg`}>{zone.name}</h3>
                                {getStatusBadge(zone.status)}
                              </div>

                              <div className="mb-4">
                                <p className="text-gray-900 font-bold light:text-gray-600 text-sm">Total Slots</p>
                                <p className={`${parkType.textColor} font-bold text-xl`}>{zone.slots}</p>
                              </div>

                              <div className="flex gap-2">
                                <button
                                  onClick={() => handleEdit(zone, parkType.value)}
                                  className="flex-1 bg-gray-200 light:bg-green-100 hover:bg-green-100 text-gray-700 px-3 py-2 rounded-md flex items-center justify-center gap-2 transition-colors border-1 border-green-200"
                                >
                                  <Edit3 size={14} />
                                  Edit
                                </button>
                                <button
                                  onClick={() => toggleZoneStatus(zone.id, parkType.value)}
                                  className={`flex-1 px-3 py-2 rounded-md flex items-center justify-center gap-2 transition-colors border ${zone.status === 'active'
                                    ? 'bg-red-50 hover:bg-red-100 text-red-700 border-red-200'
                                    : 'bg-green-50 hover:bg-green-100 text-green-700 border-green-200'
                                    }`}
                                >
                                  {zone.status === 'active' ? <PowerOff size={14} /> : <Power size={14} />}
                                  {zone.status === 'active' ? 'Disable' : 'Enable'}
                                </button>
                                <button
                                  onClick={() => handleDelete(zone.id, parkType.value)}
                                  className="bg-red-50 light:bg-red-50 hover:bg-red-100 text-red-700 px-3 py-2 rounded-md flex items-center justify-center transition-colors border border-red-300"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className={`${parkType.bgColor} rounded-lg p-8 text-center`}>
                          <IconComponent className={`${parkType.textColor} opacity-50 mx-auto mb-3`} size={48} />
                          <h3 className={`${parkType.textColor} font-medium mb-2`}>No zones configured</h3>
                          <p className="text-gray-500 text-sm mb-4">Start by adding your first zone for this parking type</p>
                          <button
                            onClick={() => handleOpenModal(parkType.value)}
                            className={`${parkType.color} hover:opacity-90 text-white px-4 py-2 rounded-lg inline-flex items-center gap-2 transition-colors`}
                          >
                            <Plus size={18} />
                            Add First Zone
                          </button>

                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal */}
            {showModal && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white rounded-xl max-w-md w-full p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {editingZone ? 'Edit Zone' : `Add Zone to ${parkTypes.find(p => p.value === selectedPark)?.label}`}
                    </h2>
                    <button
                      onClick={resetForm}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      ×
                    </button>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Zone ID
                    </label>
                    <input
                      type="text"
                      value={formData.zoneId}
                      readOnly
                      className="w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-700"
                    />

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Zone Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      readOnly
                      className="w-full px-3 py-2 border rounded-lg bg-gray-100 text-gray-700"
                    />



                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Slots * (Max: 30)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        required 
                        value={formData.slots}
                        onChange={(e) =>
                          setFormData({ ...formData, slots: e.target.value === '' ? '' : parseInt(e.target.value) })
                        }
                        className={`w-full px-3 py-2 text-gray-700 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${(!formData.slots || formData.slots > 30) ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Enter number of slots"
                      />
                      {(!formData.slots) && <p className="text-red-500 text-sm mt-1">Minimum 1 slot required</p>}
                      {( formData.slots > 30) && <p className="text-red-500 text-sm mt-1">Maximum 30 slots allowed per zone</p>}
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={resetForm}
                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSubmit}
                        className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        {editingZone ? 'Update Zone' : 'Create Zone'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </main>
      </div>
    </div>
  );
};

export default ZoneManagement;
