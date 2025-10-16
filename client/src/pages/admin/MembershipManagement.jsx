import React, { useState, useEffect } from 'react';

import axios from "axios";
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
  Download,
  BanknoteArrowDown,
  HeartHandshake,
  LogOut,
} from 'lucide-react';

const MembershipManagement = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Monthly');
  const [lightMode, setLightMode] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState('All Segment');

  const [membershipPlans, setMembershipPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showInsertModal, setShowInsertModal] = useState(false);
  const [insertForm, setInsertForm] = useState({
    name: '',
    price: '',
    description: '',
    features: ''
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [planToDelete, setPlanToDelete] = useState(null);

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [planToUpdate, setPlanToUpdate] = useState(null);
  const [updateForm, setUpdateForm] = useState({
    name: '',
    price: '',
    description: '',
    features: ''
  });

  const [userMemberships, setUserMemberships] = useState([]);
  const [loadingUserMemberships, setLoadingUserMemberships] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');



  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get('http://localhost:5000/plan');
        setMembershipPlans(response.data.plans); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching membership plans: ', error);
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);


  useEffect(()=>{
    const fetchUserMemberships = async () => {
      try {
        const response = await axios.get('http://localhost:5000/user-membership');
        setUserMemberships(response.data);
        setLoadingUserMemberships(false);
      }catch(error){
        console.error('Error fetching user memberships: ',error);
        setLoadingUserMemberships(false);
      }
    };
    fetchUserMemberships();
  },[]);

  const sidebarItems = [
    { icon: ChartColumnBig, label: 'Dashboard' },
    { icon: SquareParking , label: 'Slot Management' },
    { icon: HeartHandshake, label: 'Membership plans', active: true },
    { icon: BanknoteArrowDown, label: 'Refund requests' },
    { icon: Megaphone, label: 'Notifications' },
   // { icon: FileText, label: 'Report' },
  ];

  const userItems = [
    { icon: Users, label: 'User Management' },
    { icon: Car, label: 'Vehicles' },
  ];

  const bottomItems = [
    { icon: Settings, label: 'Settings' },
   // { icon: HelpCircle, label: 'Help & Support' },
    { icon: LogOut, label: 'Logout' },
  ];

  const today = new Date();
const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(today.getDate() - 7);

const totalMembers = userMemberships.length;

const activePlans = membershipPlans.length;

const totalRevenue = userMemberships.reduce((sum, u) => {
  return sum + Number(u.price || 0); // assuming `price` is stored in user_membership table
}, 0);


const newSubscriptions = userMemberships.filter(u => {
  const startDate = new Date(u.startDate);
  return startDate >= sevenDaysAgo && startDate <= today;
}).length;

// Create stats cards array dynamically
const dynamicStatsCards = [
  { title: 'Total Members', value: totalMembers },
  { title: 'Active Plans', value: activePlans },
  { title: 'Revenue (This month)', value: `LKR ${totalRevenue}` },
  { title: 'New Subscriptions (This Week)', value: newSubscriptions },
];

  
  const handleUpdate = (id) => {
  
  console.log("Update plan with ID:", id);
  
};

const handleDeleteClick = (id)=>{
  setPlanToDelete(id);
  setShowDeleteModal(true);
};


const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/plan/${planToDelete}`);
      setMembershipPlans(prev => prev.filter(plan => plan._id !== planToDelete));
      setShowDeleteModal(false);
      setPlanToDelete(null);
    } catch (error) {
      console.error("Error deleting plan:", error);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setPlanToDelete(null);
  };


  const handleUpdateClick = (plan) => {
  console.log("Plan clicked for update:", plan); 

  setPlanToUpdate(plan._id);
  setUpdateForm({
    name: plan.name || '',
    price: plan.price || '',
    description: plan.description || '',
    features: Array.isArray(plan.features) 
      ? plan.features.join(', ') 
      : plan.features || ''
  });
  setShowUpdateModal(true);
};

  const handleUpdateFormChange = (e) => {
    const { name, value } = e.target;
    setUpdateForm(prev => ({ ...prev, [name]: value }));
  };
  const confirmUpdate = async () => {
    try {
      const updatedPlan = {
        ...updateForm,
        features: updateForm.features.split(',').map(f => f.trim())
      };
      const response = await axios.put(`http://localhost:5000/plan/${planToUpdate}`, updatedPlan);

      setMembershipPlans(prev => prev.map(plan => 
        plan._id === planToUpdate ? response.data.plan : plan
      ));

      setShowUpdateModal(false);
      setPlanToUpdate(null);
    } catch (error) {
      console.error("Error updating plan:", error);
    }
  };
  const cancelUpdate = () => {
    setShowUpdateModal(false);
    setPlanToUpdate(null);
  };

  const handleInsertFormChange = (e) => {
    const { name, value } = e.target;
    setInsertForm(prev => ({ ...prev, [name]: value }));
  };

  const confirmInsert = async () => {
    if (!insertForm.name || !insertForm.price || !insertForm.description || !insertForm.features) {
    alert("All fields are required!");
    return;
  }

  if (isNaN(insertForm.price)) {
    alert("Price must be a number!");
    return;
  }
    try {
      const newPlan = {
        ...insertForm,
        features: insertForm.features.split(',').map(f => f.trim())
      };
      const response = await axios.post('http://localhost:5000/plan', newPlan);

      setMembershipPlans(prev => [...prev, response.data.plan]); 
      setShowInsertModal(false);
      setInsertForm({ name: '', price: '', description: '', features: '' });
    } catch (error) {
      console.error("Error adding plan:", error);
    }
  };

  const cancelInsert = () => {
    setShowInsertModal(false);
    setInsertForm({ name: '', price: '', description: '', features: '' });
  };

  const [showLimitModal, setShowLimitModal] = useState(false);

const handleAddPlanClick = () => {
  if (membershipPlans.length >= 4) {
    setShowLimitModal(true);
    return;
  }
  setShowInsertModal(true);
};



const filteredUserMemberships = userMemberships.filter(m => 
  (m.userId?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
  (m.userId?.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
  (m.membershipId?._id || '').toString().toLowerCase().includes(searchTerm.toLowerCase()) || 
  (m.membershipId?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
  (m.vehicle_num || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
  (m.status || '').toLowerCase().includes(searchTerm.toLowerCase())
);


const exportData = () => {
  if ((!membershipPlans || membershipPlans.length === 0) &&
      (!userMemberships || userMemberships.length === 0)) {
    alert("No data to export!");
    return;
  }

  let csv = "";

  // Export Membership Plans
  if (membershipPlans.length > 0) {
    csv += "Membership Plans\n";
    const membershipData = membershipPlans.map(plan => ({
      ID: plan._id,
      Name: plan.name,
      Price: plan.price,
      Description: plan.description,
      Features: Array.isArray(plan.features) ? plan.features.join(", ") : plan.features
    }));
    csv += Object.keys(membershipData[0]).join(",") + "\n"; // headers
    csv += membershipData.map(row => Object.values(row).join(",")).join("\n");
    csv += "\n\n"; // space between tables
  }


const formatDate = (date) => {
  if (!date) return "-";
  const d = new Date(date);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`; // 2025-10-08
};




  // Export User Memberships
  if (userMemberships.length > 0) {
    csv += "User Memberships\n";
    const userData = userMemberships.map(u => ({
      ID: u._id,
      User: u.userId?.name + " (" + u.userId?.email + ")",
      Membership: u.membershipId?.name + " - LKR " + u.membershipId?.price,
      Vehicle: u.vehicle_num,
      StartDate: `"${formatDate(u.startDate)}"`, 
      EndDate: `"${formatDate(u.endDate)}"`,
      Status: u.status
    }));
    csv += Object.keys(userData[0]).join(",") + "\n"; // headers
    csv += userData.map(row => Object.values(row).join(",")).join("\n");
  }

  // Download CSV
  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "membership_export.csv";
  a.click();
  window.URL.revokeObjectURL(url);
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
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
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
            <Sun onClick={() => setLightMode(true)} size={20} className={`text-gray-400 ${lightMode ? "light:text-yellow-500 fill-yellow-500":""} cursor-pointer light:cursor-default hover:text-white light:hover:text-yellow-500`} />
            <Moon onClick={() => setLightMode(false)} size={20} className={`${!lightMode ? "text-yellow-500 fill-yellow-500":""} light:text-gray-700 light:cursor-pointer hover:text-yellow-500 light:hover:text-gray-500`} />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Dashboard Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Membership Plans</h1>
              <p className="text-gray-400 light:text-gray-600">Manage and track all membership plans and subscribers here.</p>
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

          {/* Stats Cards */}
<div className="grid grid-cols-4 gap-6 mb-8">
  {dynamicStatsCards.map((card, index) => (
    <div
      key={index}
      className="bg-gradient-to-b from-[#151821] to-[#242938] light:bg-gradient-to-b light:from-white light:to-white light:shadow-lg light:backdrop-blur-sm p-6 rounded-xl"
    >
      <h3 className="text-gray-400 light:text-gray-600 text-sm mb-2">{card.title}</h3>
      <span className="text-3xl font-bold">{card.value}</span>

      <div className="mt-2">
        <div className="flex items-center gap-2">
          <span
            className={`text-sm font-bold ${
              card.positive
                ? 'text-green-400 light:text-green-600'
                : 'text-red-400 light:text-red-600'
            }`}
          >
            {card.change}
          </span>
        </div>
      </div>
    </div>
  ))}
</div>


          {/* Table */}
          {/* Membership Table */}
          
          <div className="bg-gradient-to-b from-[#151821] to-[#242938] light:bg-gradient-to-b light:from-white light:to-white light:shadow-lg light:backdrop-blur-sm rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Membership Plans</h3>
            <div className="flex items-center gap-4 ml-auto">
            <button 
                onClick={handleAddPlanClick} 
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-800 transition-colors"
              >
                + Add Plan
              </button>
              
              <button
                onClick={exportData}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:bg-blue-600  text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Download className="w-5 h-5" />
                Export Data
              </button>
            </div>
            
            {loading ? (
              <p>Loading membership plans...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-400">
                      <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">ID</th>
                      <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Name</th>
                      <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Price</th>
                      <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Description</th>
                      <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Features</th>
                      <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {membershipPlans.map((plan, index) => (
                      <tr key={plan._id} className="border-b border-gray-200 hover:bg-gray-700 light:hover:bg-gray-100">
                        <td className="py-4 px-4 text-gray-300 light:text-gray-600">{index + 1}</td>
                        <td className="py-4 px-4">{plan.name}</td>
                        <td className="py-4 px-4">{plan.price}</td>
                        <td className="py-4 px-4">{plan.description}</td>
                        <td className="py-4 px-4">{plan.features?.join(', ')}</td>
                        <td className="py-4 px-4 flex gap-2">
                        <button
                          onClick={() => handleUpdateClick(plan)}
                          className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                        >
                         Update
                        </button>
                        <button
                          onClick={() => handleDeleteClick(plan._id)}
                          className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                         Delete
                        </button>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
          <div className="bg-gradient-to-b from-[#151821] to-[#242938] light:bg-gradient-to-b light:from-white light:to-white light:shadow-lg light:backdrop-blur-sm rounded-xl p-6 mt-8">
  <h3 className="text-xl font-semibold mb-4">User Memberships</h3>

  {loadingUserMemberships ? (
    <p>Loading user memberships...</p>
  ) : (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-400">
            <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">ID</th>
            <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">User</th>
            <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Membership Plan</th>
            <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Vehicle Number</th>
            <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Start Date</th>
            <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">End Date</th>
            <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Status</th>
            <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
  {filteredUserMemberships.map((membership, index) => (
    <tr key={membership._id} className="border-b border-gray-200 hover:bg-gray-700 light:hover:bg-gray-100">
      <td className="py-4 px-4 text-gray-300 light:text-gray-600">{index + 1}</td>
      <td className="py-4 px-4">{membership.userId?.name || '-'} ({membership.userId?.email || '-'})</td>
      <td className="py-4 px-4">{membership.membershipId?.name || '-'} - LKR {membership.membershipId?.price || '-'}</td>
      <td className="py-4 px-4">{membership.vehicle_num || '-'}</td>
      <td className="py-4 px-4">{membership.startDate ? new Date(membership.startDate).toLocaleDateString() : '-'}</td>
      <td className="py-4 px-4">{membership.endDate ? new Date(membership.endDate).toLocaleDateString() : '-'}</td>
      <td className="py-4 px-4">{membership.status || '-'}</td>
      <td className="py-4 px-4 flex gap-2">
        <button
          onClick={() => handleDeleteClick(membership._id)}
          className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
         Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  )}
</div>


            {/* Insert Modal */}
{showInsertModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Add New Membership Plan
      </h3>

      <input
        type="text"
        name="name"
        placeholder="Name"
        value={insertForm.name}
        onChange={handleInsertFormChange}
        className="w-full mb-2 px-3 py-2 text-gray-700 border rounded"
      />
      <input
        type="text"
        name="price"
        placeholder="Price"
        value={insertForm.price}
        onChange={handleInsertFormChange}
        className="w-full mb-2 px-3 py-2 text-gray-700 border rounded"
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={insertForm.description}
        onChange={handleInsertFormChange}
        className="w-full mb-2 px-3 py-2 text-gray-700 border rounded"
      />
      <input
        type="text"
        name="features"
        placeholder="Features (comma separated)"
        value={insertForm.features}
        onChange={handleInsertFormChange}
        className="w-full mb-4 px-3 py-2 text-gray-700 border rounded"
      />

      <div className="flex justify-end gap-4">
        <button 
          onClick={cancelInsert} 
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Cancel
        </button>
        <button 
          onClick={confirmInsert} 
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add
        </button>
      </div>
    </div>
  </div>
)}


{showLimitModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Limit Reached
      </h3>
      <p className="mb-6 text-gray-700 dark:text-gray-300">
        You can only add up to 4 membership plans.
      </p>
      <div className="flex justify-end">
        <button 
          onClick={() => setShowLimitModal(false)} 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          OK
        </button>
      </div>
    </div>
  </div>
)}



          {/* Delete Confirmation Modal */}
          {showDeleteModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Confirm Deletion</h3>
                <p className="mb-6 text-gray-700 dark:text-gray-300">
                  Are you sure you want to delete this membership plan?
                </p>
                <div className="flex justify-end gap-4">
                  <button 
                    onClick={cancelDelete} 
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmDelete} 
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Update Modal */}
          {showUpdateModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray">Update Membership Plan</h3>
                
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={updateForm.name}
                  onChange={handleUpdateFormChange}
                  className="w-full mb-2 px-3 py-2 text-gray-700 border rounded"
                />
                <input
                  type="text"
                  name="price"
                  placeholder="Price"
                  value={updateForm.price}
                  onChange={handleUpdateFormChange}
                  className="w-full mb-2 px-3 py-2 text-gray-700 border rounded"
                />
                <input
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={updateForm.description}
                  onChange={handleUpdateFormChange}
                  className="w-full mb-2 px-3 py-2 text-gray-700 border rounded"
                />
                <input
                  type="text"
                  name="features"
                  placeholder="Features (comma separated)"
                  value={updateForm.features}
                  onChange={handleUpdateFormChange}
                  className="w-full mb-4 px-3 py-2 text-gray-700 border rounded"
                />

                <div className="flex justify-end gap-4">
                  <button 
                    onClick={cancelUpdate} 
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmUpdate} 
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          )}

          
        </main>
      </div>
    </div>
  );
};

export default MembershipManagement;
