// Importing React and hooks
import React, { useState, useEffect } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";
import Axios from "axios";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import AutoTable from "jspdf-autotable";
import { useNavigate } from "react-router-dom";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import {
  Search,
  Settings,
  Bell,
  Sun,
  Moon,
  BanknoteArrowDown,
  LogOut,
  Trash,
  ChartColumnBig,
  SquareParking,
  HeartHandshake,
  Megaphone,
  Users,
  Car,
} from "lucide-react";

const RefundDashboard = () => {
  const [refunds, setRefunds] = useState([]);
  const [filteredRefunds, setFilteredRefunds] = useState([]);
  const [lightMode, setLightMode] = useState(false);
  const [replyPopup, setReplyPopup] = useState({ open: false, refundId: null });
  const [replyMessage, setReplyMessage] = useState("");
  const navigate = useNavigate();

  const sidebarItems = [
    { icon: ChartColumnBig, label: "Dashboard", link: "/admin/dashboard" },
    { icon: SquareParking, label: "Slot Management", link: "/admin/slot-management" },
    { icon: HeartHandshake, label: "Membership plans", link: "/admin/membership-management" },
    { icon: BanknoteArrowDown, label: "Refund requests", link: "/customersupport/refundrequestlist" },
    { icon: Megaphone, label: "Notifications", link: "/admin/notifications" },
  ];

  const userItems = [
    { icon: Users, label: "User Management", link: "/admin/users" },
    { icon: Car, label: "Vehicles", link: "/admin/vehicles" },
  ];

  const bottomItems = [
    { icon: Settings, link: "/admin/settings", label: "Settings" },
    { icon: LogOut, link: "/", label: "Logout" },
  ];

  const fetchRefunds = async () => {
    try {
      const res = await Axios.get("http://localhost:5000/api/refund");
      if (res.data.message === "Not Found") return setRefunds([]);
      // Initialize showFullReason for each refund
      const refundsWithFlag = res.data.map(r => ({ ...r, showFullReason: false }));
      setRefunds(refundsWithFlag);
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

  const filterRefunds = (searchTerm) => {
    if (!searchTerm) return setFilteredRefunds(refunds);
    const filtered = refunds.filter((r) =>
      Object.values(r).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRefunds(filtered);
  };

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

  const handleReplySend = async () => {
    if (!replyMessage.trim()) return toast.error("Please enter a reply message");
    try {
      await Axios.put(`http://localhost:5000/api/refund/reply/${replyPopup.refundId}`, {
        reply: replyMessage,
      });
      toast.success("Reply sent successfully!");
      setReplyPopup({ open: false, refundId: null });
      setReplyMessage("");
      fetchRefunds();
    } catch (err) {
      console.error("Error sending reply:", err);
      toast.error("Failed to send reply");
    }
  };

  const exportToExcel = () => {
    if (!filteredRefunds.length) return toast.error("No refunds to export");
    const worksheet = XLSX.utils.json_to_sheet(filteredRefunds);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Refunds");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "refunds.xlsx");
    toast.success("Excel file downloaded successfully!");
  };

  const exportToPDF = () => {
    if (!filteredRefunds.length) return toast.error("No refunds to export");
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
    toast.success("PDF file downloaded successfully!");
  };

  return (
    <div className={`flex h-auto bg-gray-950 text-white ${lightMode ? "light bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-black" : ""}`}>
      {/* Sidebar */}
      <div className="w-64 h-screen bg-[#151821] p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">✦</span>
          </div>
          <span className="text-xl font-semibold">Admin</span>
        </div>

        <div className="mb-8">
          <p className="text-gray-400 text-sm mb-4 uppercase tracking-wide">Main Menu</p>
          <nav className="space-y-2">
            {sidebarItems.map((item, i) => (
              <a key={i} onClick={() => navigate(item.link)} className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${item.label === "Refund requests" ? "bg-gradient-to-l from-blue-500 to-indigo-600 text-white" : "text-gray-300 hover:bg-gray-700"}`}>
                <item.icon size={20} />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="mb-8">
          <p className="text-gray-400 text-sm mb-4 uppercase tracking-wide">Users</p>
          <nav className="space-y-2">
            {userItems.map((item, i) => (
              <a key={i} onClick={() => navigate(item.link)} className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors">
                <item.icon size={20} />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-auto space-y-2">
          {bottomItems.map((item, i) => (
            <a key={i} onClick={() => navigate(item.link)} className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors">
              <item.icon size={20} />
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-gray-950 p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input type="text" id="searchInput" placeholder="Search refund..." onChange={(e) => filterRefunds(e.target.value)} className="pl-10 pr-4 py-2 bg-[#151821] border border-gray-900 rounded-lg text-white focus:ring-2 focus:ring-blue-500" />
              </div>
              <button onClick={() => filterRefunds(document.getElementById("searchInput").value)} className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <Search size={16} /> Search
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Bell size={20} className="text-gray-400 cursor-pointer" />
            <Settings size={20} className="text-gray-400 cursor-pointer" />
            <Sun onClick={() => setLightMode(true)} size={20} className={`cursor-pointer ${lightMode ? "text-yellow-500" : "text-gray-400"}`} />
            <Moon onClick={() => setLightMode(false)} size={20} className={`cursor-pointer ${!lightMode ? "text-yellow-500" : "text-gray-400"}`} />
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold mb-2">Refund Request</h1>
            <div className="flex items-center gap-4">
              <button onClick={exportToExcel} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
                <FaFileExcel size={16} /> Export Excel
              </button>
              <button onClick={exportToPDF} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2">
                <FaFilePdf size={16} /> Export PDF
              </button>
            </div>
          </div>

          {/* Refund Table */}
          <div className="bg-gradient-to-b from-[#151821] to-[#242938] rounded-xl p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-400">
                    <th className="py-3 px-4 text-left">ID</th>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Email</th>
                    <th className="py-3 px-4 text-left">Order ID</th>
                    <th className="py-3 px-4 text-left">Amount</th>
                    <th className="py-3 px-4 text-left">Reason</th>
                    <th className="py-3 px-4 text-left">Created At</th>
                    <th className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRefunds.map((refund) => (
                    <tr key={refund._id} className="border-b border-gray-700 hover:bg-gray-700">
                      <td className="py-3 px-4">RF{refund._id.slice(0, 3)}</td>
                      <td className="py-3 px-4">{refund.name}</td>
                      <td className="py-3 px-4">{refund.email}</td>
                      <td className="py-3 px-4">{refund.orderId}</td>
                      <td className="py-3 px-4">{refund.amount}</td>
                      <td className="py-3 px-4 max-w-xs">
                        {refund.reason.length > 50 ? (
                          <span>
                            {refund.showFullReason ? refund.reason : `${refund.reason.slice(0, 50)}... `}
                            <button
                              onClick={() => {
                                setFilteredRefunds(prev =>
                                  prev.map(r =>
                                    r._id === refund._id ? { ...r, showFullReason: !r.showFullReason } : r
                                  )
                                );
                              }}
                              className="text-blue-400 hover:underline ml-1"
                            >
                              {refund.showFullReason ? "Show less" : "Read more"}
                            </button>
                          </span>
                        ) : (
                          refund.reason
                        )}
                      </td>
                      <td className="py-3 px-4">{new Date(refund.createdAt).toLocaleDateString()}</td>
                      <td className="py-3 px-4 flex gap-2">
                        <button onClick={() => setReplyPopup({ open: true, refundId: refund._id })} className="px-3 py-1 bg-blue-600 rounded-md hover:bg-blue-700 text-white">Reply</button>
                        <button onClick={() => handleDelete(refund._id)} className="px-3 py-1 bg-red-600 rounded-md hover:bg-red-700 text-white">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {/* Reply Popup */}
        {replyPopup.open && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-6 rounded-lg w-96">
              <h2 className="text-xl mb-4">Send Reply</h2>
              <textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Enter your reply..."
                className="w-full h-28 p-3 bg-gray-800 text-white rounded-md mb-4"
              />
              <div className="flex justify-end gap-3">
                <button onClick={() => setReplyPopup({ open: false, refundId: null })} className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-700">Cancel</button>
                <button onClick={handleReplySend} className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700">Send Reply</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RefundDashboard;
