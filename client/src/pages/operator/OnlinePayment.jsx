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
  CalendarCheck,
  Car,
  Megaphone,
  BanknoteArrowDown,
  HeartHandshake,
  LogOut,
} from 'lucide-react';

const PhysicalPayment = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Monthly');
  const [lightMode, setLightMode] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState('All Segment');

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [paymentToDelete, setPaymentToDelete] = useState(null);
  const [editingBooking, setEditingBooking] = useState(null);
   const [online_payments, setPayments] = useState([]); 

  const sidebarItems = [
    { icon: ChartColumnBig, label: 'Dashboard', path: "/dashboard" },
    { icon: CalendarCheck , label: 'Physical Booking', path: "/physicalbooking" },
    { icon: CalendarCheck, label: 'Online Booking', active: true, path: "/onlinebooking"},
    { icon: HeartHandshake, label: 'Membership', path: "/membershipplan"},
  ];

  const userItems = [
    { icon: SquareParking, label: 'Slot Management' },
    { icon: Users, label: 'User Management' },
  ];

  const bottomItems = [
    { icon: Settings, label: 'Settings' },
    { icon: LogOut, label: 'Logout' },
  ];

  const URL = "http://localhost:5000/online-payment"; 

  const fetchHandler = async () => {
  const res = await axios.get(URL);
  return res.data;
};


  useEffect(() => {
    fetchHandler()
      .then((data) => setPayments(data.payments || []))
      .catch((err) => console.error(err));
  }, []);


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
            <span className="text-sm font-semibold">GM</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium light:text-gray-950">Gate Operator</p>
            <p className="text-xs text-gray-400 light:text-gray-700">gateoperator@mail.com</p>
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
            <Sun onClick={() => setLightMode(true)} size={20} className={`text-gray-400 ${lightMode ? "light:text-yellow-500 fill-yellow-500":""} cursor-pointer light:cursor-default hover:text-white light:hover:text-yellow-500`} />
            <Moon onClick={() => setLightMode(false)} size={20} className={`${!lightMode ? "text-yellow-500 fill-yellow-500":""} light:text-gray-700 light:cursor-pointer hover:text-yellow-500 light:hover:text-gray-500`} />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Dashboard Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Online Bookings</h1>
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

          {/* Table */}
          <div className="bg-gradient-to-b from-[#151821] to-[#242938] light:bg-gradient-to-b light:from-white light:to-white light:shadow-lg light:backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Online Payment</h3>
              <select className="px-3 py-1 bg-gray-700 border border-gray-700 light:bg-gray-50 light:border-gray-200 rounded text-sm">
                <option>All Categories</option>
                <option>4Wheel</option>
                <option>3Wheel</option>
                <option>2Wheel</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-400">
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium"> ID</th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Username</th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Vehicle Type</th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Quantity</th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Amount</th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Payment Method</th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Date</th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Stripe Pay ID</th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {online_payments.map((online_payment, index) => (
                    <tr key={online_payment._id} className="border-b border-gray-200 hover:bg-gray-700 light:hover:bg-gray-100">
                      <td className="py-4 px-4 text-gray-300 light:text-gray-600">{index + 1}</td>
                      <td className="py-4 px-4">{online_payment.username}</td>
                      <td className="py-4 px-4">{online_payment.vehicleType}</td>
                      <td className="py-4 px-4">{online_payment.quantity}</td>
                      <td className="py-4 px-4">{online_payment.amount}</td>
                      <td className="py-4 px-4">{online_payment.paymentMethod}</td>
                      <td className="py-4 px-4">{online_payment.date}</td>
                      <td className="py-4 px-4">{online_payment.stripePaymentId}</td>
                      <td className="py-4 px-4">{online_payment.status}</td>
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

export default PhysicalPayment;
