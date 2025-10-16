import React from "react";

const SideBar = () => {

    const sidebarItems = [
        { icon: ChartColumnBig, label: "Dashboard" },
        { icon: SquareParking, label: "Slot Management" },
        { icon: HeartHandshake, label: "Membership plans" },
        { icon: BanknoteArrowDown, label: "Refund requests" },
        { icon: Megaphone, label: "Notifications" },
      ];
    
      const userItems = [
        { icon: Users, label: "User Management", active: true },
        { icon: Car, label: "Vehicles" },
      ];
    
      const bottomItems = [
        { icon: Settings, link:"/", label: "Settings" },
        // { icon: HelpCircle, label: 'Help & Support' },
        { icon: LogOut, link:"/", label: "Logout" },
      ];

  return (
    <div className="sticky top-0  h-screen w-64 bg-[#151821] p-6 flex flex-col light:bg-white light:shadow-lg light:backdrop-blur-sm">
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
            onClick={() => navigate(item.link)}
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
  );
};
