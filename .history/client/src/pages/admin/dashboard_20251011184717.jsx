import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
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
} from 'lucide-react';

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Monthly');
  const [lightMode, setLightMode] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState('All Segment');
  const navigate = useNavigate();

  const sidebarItems = [
    { icon: ChartColumnBig, link:"/admin/dashboard", label: 'Dashboard', active: true },
    { icon: SquareParking , link:"/admin/slot-management", label: 'Slot Management' },
    { icon: HeartHandshake, link:"/admin/membership-management", label: 'Membership plans' },
    { icon: BanknoteArrowDown, link:"/admin/refund-requests", label: 'Refund requests' },
    { icon: Megaphone, link:"/admin/notifications", label: 'Notifications' },
   // { icon: FileText, label: 'Report' },
  ];

  const userItems = [
    { icon: Users, link:"/admin/users", label: 'User Management' },
    { icon: Car, link:"/admin/vehicles", label: 'Vehicles' },
  ];

  const bottomItems = [
    { icon: Settings, link:"/admin/settings", label: 'Settings' },
   // { icon: HelpCircle, label: 'Help & Support' },
    { icon: LogOut, link:"/", label: 'Logout' },
  ];

  const statsCards = [
    {
      title: 'Total Employees',
      value: '12600',
      change: '+2% from last quarter',
      positive: true
    },
    {
      title: 'Job Application',
      value: '1186',
      change: '+15% from last quarter',
      positive: true
    },
    {
      title: 'New Employees',
      value: '22',
      change: '-2% from last quarter',
      positive: false
    },
    {
      title: 'Satisfaction Rate',
      value: '89.9%',
      change: '+5% from last quarter',
      positive: true
    }
  ];

  const performanceData = [
    { date: '1 June', value: 45 },
    { date: '2 June', value: 55 },
    { date: '3 June', value: 48 },
    { date: '4 June', value: 52 },
    { date: '5 June', value: 75 },
    { date: '6 June', value: 58 },
    { date: '7 June', value: 62 }
  ];

  const employees = [
    {
      id: '#ZY9653',
      name: 'Artene McCoy',
      role: 'UX Engineer',
      contract: 'Fill Time',
      team: 'Team Alpha',
      workspace: 'Remote',
      status: 'Active',
      attendance: 83
    },
    {
      id: '#ZY9652',
      name: 'Darlene Robertson',
      role: 'Sales Manager',
      contract: 'Part-time',
      team: 'Team Phinix',
      workspace: 'On-site',
      status: 'Active',
      attendance: 96
    }
  ];

  return (
    <div className={`flex h-auto bg-gray-950 text-white light:text-black light:bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ${lightMode ? "light" : "dark"}`}>
      {/* Sidebar */}
      <div className="w-64 h-screen bg-[#151821] p-6 flex flex-col light:bg-white light:shadow-lg light:backdrop-blur-sm">
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
                onClick={() => navigate(item.link)}
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
                onClick={() => navigate(item.link)}
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

        {/* User Profile *
        <div className="mt-6 flex items-center gap-3 p-3 bg-[#222735] light:bg-gray-100 light:shadow-lg light:backdrop-blur-sm border-gray-400 rounded-lg ">
          <div className="w-10 h-10 bg-blue-500 light:text-white rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold">AM</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium light:text-gray-950">Austin Martin</p>
            <p className="text-xs text-gray-400 light:text-gray-700">austinm@mail.com</p>
          </div>
          <MoreHorizontal size={16} className="text-gray-400 light:text-gray-950" />
        </div>*/}
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
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-gray-400 light:text-gray-600">Here is today's report and performances</p>
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
            {statsCards.map((card, index) => (
              <div key={index} className="bg-gradient-to-b from-[#151821] to-[#242938] light:bg-gradient-to-b light:from-white light:to-white light:shadow-lg light:backdrop-blur-sm p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400 light:text-gray-600 text-sm">{card.title}</h3>
                  <MoreHorizontal size={20} className="text-gray-400 light:text-gray-600 cursor-pointer" />
                </div>
                <div className="mb-2">
                  <span className="text-3xl font-bold">{card.value}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm light:text-bold ${card.positive ? 'text-green-400 light:text-green-600' : 'text-red-400 light:text-red-600'}`}>
                    {card.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Table */}
          <div className="bg-gradient-to-b from-[#151821] to-[#242938]  light:bg-gradient-to-b light:from-white light:to-white light:shadow-lg light:backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Users</h3>
              <select className="px-3 py-1 bg-gray-700 border border-gray-700 light:bg-gray-50 light:border-gray-200 rounded text-sm">
                <option>All Users</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-400">
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">ID</th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700   font-medium">Employee Name</th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Role</th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Contract</th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Team</th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Workspace</th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">Attendance Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-700 light:hover:bg-gray-100">
                      <td className="py-4 px-4 text-gray-300  light:text-gray-600">{employee.id}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-500 light:text-white rounded-full flex items-center justify-center">
                            <span className="text-xs font-semibold">
                              {employee.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="font-medium">{employee.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-300 light:text-gray-600">{employee.role}</td>
                      <td className="py-4 px-4 text-gray-300 light:text-gray-600">{employee.contract}</td>
                      <td className="py-4 px-4 text-gray-300 light:text-gray-600">{employee.team}</td>
                      <td className="py-4 px-4 text-gray-300 light:text-gray-600">{employee.workspace}</td>
                      <td className="py-4 px-4">
                        <span className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-green-400 light:text-green-600">{employee.status}</span>
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-gray-700 light:bg-gray-300 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full" 
                              style={{ width: `${employee.attendance}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{employee.attendance}%</span>
                          <MoreHorizontal size={16} className="text-gray-400 light:text-gray-600 cursor-pointer" />
                        </div>
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