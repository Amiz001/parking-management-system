import React, { useState } from 'react';
import { 
  Search, 
  Calendar, 
  Users, 
  Activity, 
  MessageSquare, 
  FileText, 
  CreditCard, 
  Receipt, 
  Phone, 
  Settings, 
  UserCheck, 
  HelpCircle,
  MoreHorizontal,
  ChevronDown,
  Bell,
  RefreshCw,
  Maximize2,
  Sun,
  Moon
} from 'lucide-react';

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('Monthly');
  const [selectedSegment, setSelectedSegment] = useState('All Segment');

  const sidebarItems = [
    { icon: Users, label: 'Dashboard', active: true },
    { icon: Calendar, label: 'Calendar' },
    { icon: Users, label: 'Teams' },
    { icon: Activity, label: 'Activity' },
    { icon: MessageSquare, label: 'Message' },
    { icon: FileText, label: 'Report' },
  ];

  const paymentItems = [
    { icon: CreditCard, label: 'Payroll' },
    { icon: Receipt, label: 'Billing' },
    { icon: Phone, label: 'Contact' },
  ];

  const bottomItems = [
    { icon: Settings, label: 'Settings' },
    { icon: UserCheck, label: 'User Management' },
    { icon: HelpCircle, label: 'Help & Support' },
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
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-6 flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">✦</span>
          </div>
          <span className="text-xl font-semibold">HR Manager</span>
        </div>

        {/* Main Menu */}
        <div className="mb-8">
          <p className="text-gray-400 text-sm mb-4 uppercase tracking-wide">Main Menu</p>
          <nav className="space-y-2">
            {sidebarItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  item.active 
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Payments */}
        <div className="mb-8">
          <p className="text-gray-400 text-sm mb-4 uppercase tracking-wide">Payments</p>
          <nav className="space-y-2">
            {paymentItems.map((item, index) => (
              <a
                key={index}
                href="#"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
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
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </a>
          ))}
        </div>

        {/* User Profile */}
        <div className="mt-6 flex items-center gap-3 p-3 bg-gray-700 rounded-lg">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold">AM</span>
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Austin Martin</p>
            <p className="text-xs text-gray-400">austinm@mail.com</p>
          </div>
          <MoreHorizontal size={16} className="text-gray-400" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gray-800 p-6 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search something..."
                className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
            </div>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Search
            </button>
          </div>

          <div className="flex items-center gap-4">
            <RefreshCw size={20} className="text-gray-400 cursor-pointer hover:text-white" />
            <Bell size={20} className="text-gray-400 cursor-pointer hover:text-white" />
            <Settings size={20} className="text-gray-400 cursor-pointer hover:text-white" />
            <Sun size={20} className="text-gray-400 cursor-pointer hover:text-white" />
            <Moon size={20} className="text-gray-400 cursor-pointer hover:text-white" />
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Dashboard Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
              <p className="text-gray-400">Here is today's report and performances</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg">
                <Calendar size={16} />
                <span>Jun 1 - Jun 30</span>
              </div>
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option>Monthly</option>
                <option>Weekly</option>
                <option>Daily</option>
              </select>
              <select 
                value={selectedSegment}
                onChange={(e) => setSelectedSegment(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              >
                <option>All Segment</option>
                <option>HR</option>
                <option>Engineering</option>
              </select>
              <button className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                AI Assistant
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {statsCards.map((card, index) => (
              <div key={index} className="bg-gray-800 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-gray-400 text-sm">{card.title}</h3>
                  <MoreHorizontal size={20} className="text-gray-400 cursor-pointer" />
                </div>
                <div className="mb-2">
                  <span className="text-3xl font-bold">{card.value}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-sm ${card.positive ? 'text-green-400' : 'text-red-400'}`}>
                    {card.change}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            {/* Performance Chart */}
            <div className="bg-gray-800 p-6 rounded-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Employees Performance</h3>
                <select className="px-3 py-1 bg-gray-700 border border-gray-600 rounded text-sm">
                  <option>Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>
              
              {/* Simple Bar Chart */}
              <div className="h-64 flex items-end justify-between gap-2">
                {performanceData.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-purple-600 rounded-t transition-all duration-300 hover:bg-purple-500"
                      style={{ height: `${(item.value / 75) * 100}%` }}
                    ></div>
                    <span className="text-xs text-gray-400 mt-2">{item.date}</span>
                  </div>
                ))}
              </div>

              {/* Performance Details */}
              <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                <div className="text-sm text-gray-300 mb-2">June 6, 2024</div>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>UI/UX Team</span>
                    <span>58%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Mobile Design</span>
                    <span>65%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Marketing Team</span>
                    <span>49%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Attendance Chart */}
            <div className="bg-gray-800 p-6 rounded-xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold">Employee Attendance</h3>
                <div className="px-3 py-1 bg-gray-700 border border-gray-600 rounded text-sm">
                  4 June 2024
                </div>
              </div>

              {/* Donut Chart Placeholder */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative w-48 h-48">
                  <div className="absolute inset-0 rounded-full border-8 border-purple-600"></div>
                  <div className="absolute inset-4 rounded-full border-8 border-yellow-400"></div>
                  <div className="absolute inset-8 rounded-full border-8 border-green-400"></div>
                  <div className="absolute inset-12 rounded-full border-8 border-gray-600"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold">12600</div>
                      <div className="text-sm text-gray-400">Total Employee</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Attendance Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
                  <div>
                    <div className="text-sm text-gray-400">Present</div>
                    <div className="font-semibold">12562</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div>
                    <div className="text-sm text-gray-400">On Leave</div>
                    <div className="font-semibold">10</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div>
                    <div className="text-sm text-gray-400">On Holiday</div>
                    <div className="font-semibold">25</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                  <div>
                    <div className="text-sm text-gray-400">Absent</div>
                    <div className="font-semibold">4</div>
                  </div>
                </div>
              </div>

              <button className="w-full mt-6 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                View Full Details
              </button>
            </div>
          </div>

          {/* Employees Table */}
          <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Employees</h3>
              <select className="px-3 py-1 bg-gray-700 border border-gray-600 rounded text-sm">
                <option>All employee</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">ID</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Employee Name</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Role</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Contract</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Team</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Workspace</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Attendance Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((employee, index) => (
                    <tr key={index} className="border-b border-gray-700 hover:bg-gray-700">
                      <td className="py-4 px-4 text-gray-300">{employee.id}</td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-xs font-semibold">
                              {employee.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="font-medium">{employee.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-300">{employee.role}</td>
                      <td className="py-4 px-4 text-gray-300">{employee.contract}</td>
                      <td className="py-4 px-4 text-gray-300">{employee.team}</td>
                      <td className="py-4 px-4 text-gray-300">{employee.workspace}</td>
                      <td className="py-4 px-4">
                        <span className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-green-400">{employee.status}</span>
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-purple-600 h-2 rounded-full" 
                              style={{ width: `${employee.attendance}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium">{employee.attendance}%</span>
                          <MoreHorizontal size={16} className="text-gray-400 cursor-pointer" />
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