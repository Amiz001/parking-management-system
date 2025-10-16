import React, { useState, useEffect } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import Axios from "axios";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import AutoTable from "jspdf-autotable";
import { useNavigate } from "react-router-dom";

// Icons
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
  Download,
  Trash,
} from "lucide-react";

const RefundDashboard = () => {
  const [refunds, setRefunds] = useState([]);
  const [filteredRefunds, setFilteredRefunds] = useState([]);
  const [menuIndex, setMenuIndex] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightMode, setLightMode] = useState(false);

  const menuRef = useClickOutside(() => setMenuIndex(null));
  const downloadMenuRef = useClickOutside(() => setMenuOpen(false));
  const navigate = useNavigate();

  // Fetch refund data
  const fetchRefunds = async () => {
    try {
      const res = await Axios.get("http://localhost:5000/api/refund");
      if (res.data.message === "Not Found") {
        setRefunds([]);
        return;
      }
      setRefunds(res.data);
    } catch (err) {
      console.error("Error fetching refund data:", err);
      setRefunds([]);
    }
  };

  useEffect(() => {
    fetchRefunds();
  }, []);

  useEffect(() => {
    setFilteredRefunds(refunds);
  }, [refunds]);

  // Search filter
  const filterRefunds = (searchTerm) => {
    if (!searchTerm) {
      setFilteredRefunds(refunds);
      return;
    }
    const filtered = refunds.filter((r) =>
      Object.values(r)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setFilteredRefunds(filtered);
  };

  // Delete functionality

  const handleDelete = async (refundId) => {
    try {
      await Axios.delete(`http://localhost:5000/api/refund/${refundId}`);
      toast.success("Refund deleted successfully!");
      fetchRefunds();
    } catch (err) {
      toast.error("Failed to delete refund");
      console.error(err);
    }
  };

  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredRefunds);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Refunds");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "refunds.xlsx");
  };

  // Export to PDF
  const exportToPDF = () => {
    if (!filteredRefunds || filteredRefunds.length === 0) {
      toast.error("No refunds to export");
      return;
    }
    const doc = new jsPDF();
    doc.text("Parkbay - Refund Report", 14, 10);
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
    doc.save("refunds.pdf");
  };

  return (
    <div
      className={`flex h-auto bg-gray-950 text-white light:text-black light:bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 ${
        lightMode ? "light" : "dark"
      }`}
    >
      {/* Sidebar */}
      <div className="sticky top-0 h-screen w-64 bg-[#151821] p-6 flex flex-col light:bg-white">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">✦</span>
          </div>
          <span className="text-xl font-semibold">Admin</span>
        </div>

        <nav className="space-y-2 mb-8">
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-gradient-to-l from-blue-500 to-indigo-600 text-white"
          >
            <BanknoteArrowDown size={20} />
            <span>Refund Management</span>
          </a>
          <a
            onClick={() => navigate("/")}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 cursor-pointer"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gray-950 p-6 flex items-center justify-between">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search refund..."
              onChange={(e) => filterRefunds(e.target.value)}
              className="pl-10 pr-4 py-2 bg-[#151821] light:bg-white border border-gray-900 light:border-gray-200 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-4">
            <Bell size={20} className="text-gray-400 cursor-pointer" />
            <Settings size={20} className="text-gray-400 cursor-pointer" />
            <Sun
              onClick={() => setLightMode(true)}
              size={20}
              className={`cursor-pointer ${
                lightMode ? "text-yellow-500 fill-yellow-500" : "text-gray-400"
              }`}
            />
            <Moon
              onClick={() => setLightMode(false)}
              size={20}
              className={`cursor-pointer ${
                !lightMode ? "text-yellow-500 fill-yellow-500" : "text-gray-400"
              }`}
            />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Refund Management</h1>
              <p className="text-gray-400 light:text-gray-600">
                Manage all refund requests here
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                ref={downloadMenuRef}
                className="flex gap-3 items-center px-4 py-2 bg-gradient-to-l from-blue-500 to-indigo-600 text-white rounded-lg cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                Export Data <Download size={18} />
              </button>
              {menuOpen && (
                <div className="absolute right-[1%] top-44 flex gap-2">
                  <button
                    onClick={exportToPDF}
                    className="flex items-center gap-2 px-2 py-1 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition"
                  >
                    <FaFilePdf size={20} />
                    <span>PDF</span>
                  </button>
                  <button
                    onClick={exportToExcel}
                    className="flex items-center gap-2 px-2 py-1 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
                  >
                    <FaFileExcel size={20} />
                    <span>Excel</span>
                  </button>
                </div>
              )}

            </div>
          </div>

          {/* Refund Table */}
          <div className="bg-gradient-to-b from-[#151821] to-[#242938] rounded-xl p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
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
                      <td className="py-4 px-4 text-gray-300">
                        <Ellipsis onClick={() => setMenuIndex(index)} />
                        {menuIndex === index && (
                          <div
                            ref={menuRef}
                            className="absolute right-[2%] w-26 bg-gray-900 text-white border border-gray-700 rounded-md shadow-lg z-20"
                          >
                            <ul className="divide-y divide-gray-700">
                              <li
                                className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-red-600 cursor-pointer"
                                onClick={() => handleDelete(refund._id)}
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

export default RefundDashboard;
