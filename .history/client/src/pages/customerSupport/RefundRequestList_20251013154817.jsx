// Importing React and its hooks for managing state and lifecycle
import React, { useState, useEffect } from "react";

// Custom hook to detect clicks outside an element (used for closing menus)
import { useClickOutside } from "../../hooks/useClickOutside";

// Axios for making HTTP requests to the backend
import Axios from "axios";

// Toast for showing popup notifications
import { toast } from "react-toastify";

// XLSX for exporting data to Excel format
import * as XLSX from "xlsx";

// File-saver helps download files (used for Excel export)
import { saveAs } from "file-saver";

// jsPDF and AutoTable used for creating and exporting PDF reports
import jsPDF from "jspdf";
import AutoTable from "jspdf-autotable";

// useNavigate from react-router-dom to navigate between pages
import { useNavigate } from "react-router-dom";

// Importing icons used in dashboard
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import {
  Search,
  Settings,
  Bell,
  Sun,
  Moon,
  BanknoteArrowDown,
  LogOut,
  Ellipsis,
  Trash,
  ChartColumnBig,
  SquareParking,
  HeartHandshake,
  Megaphone,
  Users,
  Car,
} from "lucide-react";

// Main component for Refund Dashboard
const RefundDashboard = () => {
  // State to store all refund data
  const [refunds, setRefunds] = useState([]);

  // State to store filtered refund data after searching
  const [filteredRefunds, setFilteredRefunds] = useState([]);

  // State to track which row menu (delete popup) is open
  const [menuIndex, setMenuIndex] = useState(null);

  // Light/Dark mode toggle state
  const [lightMode, setLightMode] = useState(false);

  // Custom hook to detect outside click and close menu
  const menuRef = useClickOutside(() => setMenuIndex(null));

  // Used to navigate to other admin routes
  const navigate = useNavigate();

  // Sidebar navigation menu items (upper section)
  const sidebarItems = [
    { icon: ChartColumnBig, label: "Dashboard", link: "/admin/dashboard" },
    { icon: SquareParking, label: "Slot Management", link: "/admin/slot-management" },
    { icon: HeartHandshake, label: "Membership plans", link: "/admin/membership-management" },
    { icon: BanknoteArrowDown, label: "Refund requests", link: "/customersupport/refundrequestlist" },
    { icon: Megaphone, label: "Notifications", link: "/admin/notifications" },
  ];

  // Sidebar "Users" section
  const userItems = [
    { icon: Users, label: "User Management", link: "/admin/users" },
    { icon: Car, label: "Vehicles", link: "/admin/vehicles" },
  ];

  // Sidebar bottom section (Settings + Logout)
  const bottomItems = [
    { icon: Settings, link: "/admin/settings", label: "Settings" },
    { icon: LogOut, link: "/", label: "Logout" },
  ];

  // Debugging helper function (prints info to console)
  const testExport = () => {
    console.log("=== EXPORT DEBUG INFO ===");
    console.log("Total refunds:", refunds.length);
    console.log("Filtered refunds:", filteredRefunds.length);
    console.log("Sample refund data:", filteredRefunds[0]);
    console.log("XLSX available:", typeof XLSX !== "undefined");
    console.log("jsPDF available:", typeof jsPDF !== "undefined");
    console.log("saveAs available:", typeof saveAs !== "undefined");
    console.log("=========================");
  };

  // Make testExport available globally in browser console
  window.testExport = testExport;

  // Function to fetch refund data from backend API
  const fetchRefunds = async () => {
    try {
      const res = await Axios.get("http://localhost:5000/api/refund"); // GET API call
      if (res.data.message === "Not Found") {
        setRefunds([]); // If no data found
        return;
      }
      setRefunds(res.data); // Store API data in state
    } catch (err) {
      console.error("Error fetching refund data:", err);
      setRefunds([]); // Clear data on error
    }
  };

  // useEffect runs once on component load to fetch refund data
  useEffect(() => {
    fetchRefunds();
  }, []);

  // Whenever refunds state changes, update filteredRefunds
  useEffect(() => {
    setFilteredRefunds(refunds);
  }, [refunds]);

  // Search filter function
  const filterRefunds = (searchTerm) => {
    if (!searchTerm) {
      setFilteredRefunds(refunds); // If empty search, show all
      return;
    }
    // Filter refund list by any matching value
    const filtered = refunds.filter((r) =>
      Object.values(r)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredRefunds(filtered);
  };

  // Delete refund by ID
  const handleDelete = async (refundId) => {
    try {
      await Axios.delete(`http://localhost:5000/api/refund/${refundId}`); // API delete call
      toast.success("Refund deleted successfully!"); // Success message
      fetchRefunds(); // Refresh list after deletion
    } catch (err) {
      toast.error("Failed to delete refund");
      console.error(err);
    }
  };

  // Export refund data to Excel file
  const exportToExcel = () => {
    try {
      console.log("Exporting to Excel...", filteredRefunds);

      // If no data found, stop
      if (!filteredRefunds || filteredRefunds.length === 0) {
        toast.error("No refunds to export");
        return;
      }

      // Convert JSON data to Excel worksheet
      const worksheet = XLSX.utils.json_to_sheet(filteredRefunds);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Refunds");

      // Write to buffer and save as .xlsx file
      const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
      const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
      saveAs(blob, "refunds.xlsx");

      toast.success("Excel file downloaded successfully!");
    } catch (error) {
      console.error("Excel export error:", error);
      toast.error("Failed to export Excel file");
    }
  };

  // Export refund data to PDF file
  const exportToPDF = () => {
    try {
      console.log("Exporting to PDF...", filteredRefunds);

      // If no data found, stop
      if (!filteredRefunds || filteredRefunds.length === 0) {
        toast.error("No refunds to export");
        return;
      }

      // Create PDF document
      const doc = new jsPDF();
      doc.text("Parkbay - Refund Report", 14, 10); // Title text

      // Add table using AutoTable plugin
      AutoTable(doc, {
        startY: 20,
        head: [["Name", "Email", "Order ID", "Amount", "Reason", "Created At"]],
        body: filteredRefunds.map((r) => [
          r.name,
          r.email,
          r.orderId,
          r.amount,
          r.reason,
          r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "-",
        ]),
        theme: "striped",
        headStyles: { fillColor: [41, 128, 185] },
      });

      // Download PDF
      doc.save("refunds.pdf");
      toast.success("PDF file downloaded successfully!");
    } catch (error) {
      console.error("PDF export error:", error);
      toast.error("Failed to export PDF file");
    }
  };

  // JSX returned by the component
  return (
    <div
      className={`flex h-auto bg-gray-950 text-white light:text-black light:bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ${
        lightMode ? "light" : "dark"
      }`}
    >
      {/* Sidebar Section */}
      <div className="w-64 h-screen bg-[#151821] p-6 flex flex-col light:bg-white light:shadow-lg light:backdrop-blur-sm">
        {/* Admin Logo + Title */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">✦</span>
          </div>
          <span className="text-xl font-semibold">Admin</span>
        </div>

        {/* Sidebar Main Menu */}
        <div className="mb-8">
          <p className="text-gray-400 light:text-black text-sm mb-4 uppercase tracking-wide">Main Menu</p>
          <nav className="space-y-2">
            {sidebarItems.map((item, index) => (
              <a
                key={index}
                onClick={() => navigate(item.link)} // Navigate to page
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  item.label === "Refund requests"
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

        {/* Sidebar Users Section */}
        <div className="mb-8">
          <p className="text-gray-400 light:text-black text-sm mb-4 uppercase tracking-wide">Users</p>
          <nav className="space-y-2">
            {userItems.map((item, index) => (
              <a
                key={index}
                onClick={() => navigate(item.link)} // Navigate on click
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 light:text-black hover:bg-gray-700 light:hover:bg-gray-100 transition-colors"
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>

        {/* Sidebar Bottom Items (Settings / Logout) */}
        <div className="mt-auto space-y-2">
          {bottomItems.map((item, index) => (
            <a
              key={index}
              onClick={() => navigate(item.link)} // Go to page
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 light:text-black hover:bg-gray-700 light:hover:bg-gray-100 transition-colors"
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Right Section (Main Content) */}
      <div className="flex-1 flex flex-col">
        {/* Header with search and icons */}
        <header className="bg-gray-950 p-6 flex items-center justify-between">
          {/* Search Box */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search refund..."
                onChange={(e) => filterRefunds(e.target.value)} // Filter list on typing
                className="pl-10 pr-4 py-2 bg-[#151821] light:bg-white border border-gray-900 light:border-gray-200 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Search
            </button>
          </div>

          {/* Header icons (Notifications, Settings, Mode toggle) */}
          <div className="flex items-center gap-4">
            <Bell size={20} className="text-gray-400 cursor-pointer" />
            <Settings size={20} className="text-gray-400 cursor-pointer" />
            <Sun
              onClick={() => setLightMode(true)} // Set to light mode
              size={20}
              className={`cursor-pointer ${
                lightMode ? "text-yellow-500 fill-yellow-500" : "text-gray-400"
              }`}
            />
            <Moon
              onClick={() => setLightMode(false)} // Set to dark mode
              size={20}
              className={`cursor-pointer ${
                !lightMode ? "text-yellow-500 fill-yellow-500" : "text-gray-400"
              }`}
            />
          </div>
        </header>

        {/* Main refund content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* Page title and export buttons */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Refund Request</h1>
              <p className="text-gray-400 light:text-gray-600">
                Manage all refund requests here
              </p>
            </div>

            {/* Export buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={exportToExcel}
                className="flex gap-2 items-center px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700"
              >
                📊 Export Excel
              </button>
              <button
                onClick={exportToPDF}
                className="flex gap-2 items-center px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700"
              >
                📄 Export PDF
              </button>
            </div>
          </div>

          {/* Refund Table */}
          <div className="bg-gradient-to-b from-[#151821] to-[#242938] rounded-xl p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* Table Header */}
                <thead>
                  <tr className="border-b border-gray-400">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">ID</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Name</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Email</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Order ID</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Amount</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Reason</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Created At</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>

                {/* Table Body */}
                <tbody>
                  {filteredRefunds.map((refund, index) => (
                    <tr key={refund._id} className="border-b border-gray-200 hover:bg-gray-700">
                      <td className="py-4 px-4 text-gray-300">RF{refund._id.slice(0, 3)}</td>
                      <td className="py-4 px-4 text-gray-300">{refund.name}</td>
                      <td className="py-4 px-4 text-gray-300">{refund.email}</td>
                      <td className="py-4 px-4 text-gray-300">{refund.orderId}</td>
                      <td className="py-4 px-4 text-gray-300">{refund.amount}</td>
                      <td className="py-4 px-4 text-gray-300">{refund.reason}</td>
                      <td className="py-4 px-4 text-gray-300">
                        {new Date(refund.createdAt).toLocaleDateString()}
                      </td>

                      {/* Action Menu */}
                      <td className="py-4 px-4 text-gray-300 relative">
                        <Ellipsis onClick={() => setMenuIndex(index)} /> {/* Open menu */}
                        {menuIndex === index && (
                          <div
                            ref={menuRef}
                            className="absolute right-[2%] w-26 bg-gray-900 text-white border border-gray-700 rounded-md shadow-lg z-20"
                          >
                            <ul className="divide-y divide-gray-700">
                              <li
                                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-red-600 cursor-pointer"
                                onClick={() => handleDelete(refund._id)} // Delete refund
                              >
                                <Trash size={16} /> Delete
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
        </main>
      </div>
    </div>
  );
};

// Export the component for use in other files
export default RefundDashboard;
