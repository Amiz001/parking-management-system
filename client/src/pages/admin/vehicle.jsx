import React, { useState, useEffect } from "react";
import PopupForm from "../../components/PopupForm";
import { useClickOutside } from "../../hooks/useClickOutside";
import Axios from "axios";
import { toast } from "react-toastify";
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
  Ellipsis,
} from "lucide-react";

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Monthly");
  const [lightMode, setLightMode] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState("All Segment");
  const [users, setUsers] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("Add");
  const [selectedUser, setSelectedUser] = useState(null);
  const [menuIndex, setMenuIndex] = useState(null);
  const menuRef = useClickOutside(() => setMenuIndex(null));

  const fetchUsers = async () => {
    try {
      const users = await Axios.get("http://localhost:5000/users");

      if (users.data.message === "Not Found") {
        setUsers([]);
        return;
      } 

      setUsers(users.data);
    } catch (err) {
      console.log("Error while fetching data:", err);
      setUsers([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const sidebarItems = [
    { icon: ChartColumnBig, label: "Dashboard" },
    { icon: SquareParking, label: "Slot Management" },
    { icon: HeartHandshake, label: "Membership plans" },
    { icon: BanknoteArrowDown, label: "Refund requests" },
    { icon: Megaphone, label: "Notifications" },
    // { icon: FileText, label: 'Report' },
  ];

  const userItems = [
    { icon: Users, label: "User Management"},
    { icon: Car, label: "Vehicles", active: true},
  ];

  const bottomItems = [
    { icon: Settings, label: "Settings" },
    // { icon: HelpCircle, label: 'Help & Support' },
    { icon: LogOut, label: "Logout" },
  ];

  const handleAdd = () => {
    setMode("Add");
    setSelectedUser(null);
    setIsOpen(true);
  };

  const handleEdit = (user) => {
    setMode("Update");
    setSelectedUser(user);
    setIsOpen(true);
  };

  const handleDelete = async (userId) => {
    try {
      const response = await Axios.delete(
        `http://localhost:5000/users/${userId}`
      );
      toast.success("Successfully deleted!");
    } catch (err) {
      console.log(err.message);
    }

    fetchUsers();
  };

  return (
    <div
      className={`flex h-auto bg-gray-950 text-white light:text-black light:bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ${
        lightMode ? "light" : "dark"
      }`}
    >
      {/* Sidebar */}
      <div className="w-64 bg-[#151821] p-6 flex flex-col light:bg-white light:shadow-lg light:backdrop-blur-sm">
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
                href="#"
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
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
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 light:text-black hover:bg-gray-700 light:hover:bg-gray-100 transition-colors ${
                  item.active
                    ? "bg-gradient-to-l from-blue-500 to-indigo-600 text-white light:text-white"
                    : "text-gray-300 hover:bg-gray-700 light:text-black light:hover:bg-gray-100"
                }`}
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
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 light:text-black hover:bg-gray-700 light:hover:bg-gray-100 transition-colors ${
                item.active
                  ? "bg-gradient-to-l from-blue-500 to-indigo-600 text-white"
                  : "text-gray-300 hover:bg-gray-700 light:text-black light:hover:bg-gray-100"
              }`}
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
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
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
              className={`text-gray-400 ${
                lightMode ? "light:text-yellow-500 fill-yellow-500" : ""
              } cursor-pointer light:cursor-default hover:text-white light:hover:text-yellow-500`}
            />
            <Moon
              onClick={() => setLightMode(false)}
              size={20}
              className={`${
                !lightMode ? "text-yellow-500 fill-yellow-500" : ""
              } light:text-gray-700 light:cursor-pointer hover:text-yellow-500 light:hover:text-gray-500`}
            />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Dashboard Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Vehicle management</h1>
              <p className="text-gray-400 light:text-gray-600">
                Here is vehicle details of the system
              </p>
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

          {/* Table */}
          <div className="bg-gradient-to-b from-[#151821] to-[#242938]  light:bg-gradient-to-b light:from-white light:to-white light:shadow-lg light:backdrop-blur-sm rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Vehicles</h3>
              <div>
                <select className="px-3 py-1 bg-gray-700 border border-gray-700 light:bg-gray-50 light:border-gray-200 rounded text-sm">
                  <option>All vehicles</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
                <button
                  className="bg-indigo-600 text-white rounded-sm px-3 py-[3px] ml-4 cursor-pointer"
                  onClick={handleAdd}
                >
                  Add Vehicle
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-400">
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">
                      ID
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700   font-medium">
                      Name
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">
                      Email
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">
                      Phone
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">
                      membership
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">
                      role
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">
                      Joined-on
                    </th>
                    <th className="text-left py-3 px-4 text-gray-400 light:text-gray-700 font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={user._id}
                      className="border-b border-gray-200 hover:bg-gray-700 light:hover:bg-gray-100"
                    >
                      <td className="py-4 px-4 text-gray-300  light:text-gray-600">
                        US{user._id.slice(0, 3)}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-500 light:text-white rounded-full flex items-center justify-center">
                            <span className="text-xs font-semibold">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </span>
                          </div>
                          <span className="font-medium">{user.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-300 light:text-gray-600">
                        {user.email}
                      </td>
                      <td className="py-4 px-4 text-gray-300 light:text-gray-600">
                        {user.phone}
                      </td>
                      <td className="py-4 px-4 text-gray-300 light:text-gray-600">
                        {user.membership}
                      </td>
                      <td className="py-4 px-4 text-gray-300 light:text-gray-600">
                        {user.role}
                      </td>
                      <td className="py-4 px-4">
                        <span className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 ${
                              user.status == "active"
                                ? "bg-green-400  light:bg-green-600"
                                : "bg-red-400  light:bg-red-600"
                            } rounded-full`}
                          ></div>
                          <span
                            className={`${
                              user.status == "active"
                                ? "text-green-400 light:text-green-600"
                                : "text-red-400 light:text-red-600"
                            }`}
                          >
                            {user.status}
                          </span>
                        </span>
                      </td>
                      <td className="py-4 px-4 text-gray-300 light:text-gray-600">
                        {user.createdAt}
                      </td>
                      <td className="py-4 px-4 text-gray-300 light:text-gray-600">
                        <Ellipsis onClick={() => setMenuIndex(index)} />

                        {menuIndex == index && (
                          <div
                            className=" absolute z-10 w-22 h-auto bg-gray-600 text-white rounded-sm"
                            ref={menuRef}
                          >
                            <ul>
                              <li
                                className="px-3 py-1 hover:bg-gray-700 border-gray-700 border-2 cursor-pointer"
                                onClick={() => handleEdit(user)}
                              >
                                Edit
                              </li>
                              <li
                                className="px-3 py-1 hover:bg-gray-700 cursor-pointer"
                                onClick={() => handleDelete(user._id)}
                              >
                                Delete
                              </li>
                            </ul>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add/Update user popup */}

          <PopupForm
            status={isOpen}
            mode={mode}
            selectedUser={selectedUser}
            onClose={() => setIsOpen(false)}
            refresh={() => fetchUsers()}
          />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
