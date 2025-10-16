// FeedbackDashboard.jsx
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { toast } from "react-toastify";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import AutoTable from "jspdf-autotable";
import {
  Search,
  Sun,
  Moon,
  Settings,
  LogOut,
  Home,
  Ticket,
  AlertCircle,
  MessageSquare,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const FeedbackDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [lightMode, setLightMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const sidebarItems = [
    { icon: Home, label: "Dashboard", link: "/customersupport/dashboard" },
    { icon: Ticket, label: "Ticket Request", link: "/customersupport/teckset" },
    { icon: AlertCircle, label: "Complaint Request", link: "/customersupport/comreq" },
    { icon: MessageSquare, label: "Feedback Request", link: "/customersupport/feedback-requests" },
  ];

  const bottomItems = [
    { icon: Settings, label: "Settings", link: "/customersupport/setting" },
    { icon: LogOut, label: "Logout", link: "/" },
  ];

  const fetchFeedbacks = async () => {
    try {
      const res = await Axios.get("http://localhost:5000/feedbacks");
      setFeedbacks(res.data);
      setFilteredFeedbacks(res.data);
    } catch (err) {
      console.error("Error fetching feedback:", err);
      toast.error("Failed to fetch feedback");
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  useEffect(() => {
    if (!searchTerm) return setFilteredFeedbacks(feedbacks);
    const filtered = feedbacks.filter((f) =>
      Object.values(f).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFeedbacks(filtered);
  }, [searchTerm, feedbacks]);

  const exportToExcel = () => {
    if (!filteredFeedbacks.length) return toast.error("No feedbacks to export");
    const worksheet = XLSX.utils.json_to_sheet(filteredFeedbacks);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Feedbacks");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "feedbacks.xlsx");
    toast.success("Excel file downloaded!");
  };

  const exportToPDF = () => {
    if (!filteredFeedbacks.length) return toast.error("No feedbacks to export");
    const doc = new jsPDF();
    doc.text("Feedback Report", 14, 10);
    AutoTable(doc, {
      startY: 20,
      head: [["Name", "Email", "Message", "Rating", "Created At"]],
      body: filteredFeedbacks.map((f) => [
        f.name || "-",
        f.email || "-",
        f.message || "-",
        f.rating || "-",
        f.createdAt ? new Date(f.createdAt).toLocaleDateString() : "-",
      ]),
      theme: "striped",
      headStyles: { fillColor: [52, 152, 219] },
    });
    doc.save("feedbacks.pdf");
    toast.success("PDF file downloaded!");
  };

  const handleDelete = async (feedbackId) => {
    try {
      await Axios.delete(`http://localhost:5000/feedbacks/${refundId}`);
      toast.success("feedbacks deleted successfully!");
      fetchFeedbacks();
    } catch (err) {
      toast.error("Failed to delete feedbacks");
      console.error(err);
    }
  };

  const handleReplySend = async () => {
    if (!replyMessage.trim()) return toast.error("Please enter a reply message");
    try {
      await Axios.put(`http://localhost:5000/feedbacks/reply/${replyPopup.refundId}`, {
        reply: replyMessage,
        additionalNotes
      });
      toast.success("Reply sent successfully!");
      setReplyPopup({ open: false, feedbackId: null });
      setReplyMessage("");
      setAdditionalNotes("");
      fetchFeedbacks();
    } catch (err) {
      console.error(err);
      toast.error("Failed to send reply");
    }
  };
  

  return (
    <div
      className={`flex min-h-screen ${
        lightMode ? "bg-gray-100 text-black" : "bg-gray-950 text-white"
      }`}
    >
      {/* Sidebar */}
      <div className="w-64 h-screen bg-[#151821] p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">✦</span>
          </div>
          <span className="font-semibold">Customer Support</span>
        </div>

        <div className="mb-8">
          <p className="text-gray-400 text-sm mb-4 uppercase tracking-wide">Main Menu</p>
          <nav className="space-y-2">
            {sidebarItems.map((item, i) => (
              <a
                key={i}
                onClick={() => navigate(item.link)}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gradient-to-r from-blue-500 to-indigo-600 cursor-pointer"
              >
                <item.icon size={20} />
                <span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-auto space-y-2">
          {bottomItems.map((item, i) => (
            <a
              key={i}
              onClick={() => navigate(item.link)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 cursor-pointer"
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gray-950 p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2"> </div>
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
                
              />
              <input type="text" id="searchInput" placeholder="Search feedback..." onChange={(e) => filteredFeedbacks(e.target.value)} className="pl-10 pr-4 py-2 bg-[#151821] border border-gray-900 rounded-lg text-white focus:ring-2 focus:ring-blue-500" />
            </div>
             <button onClick={() => filterFeedbacks(document.getElementById("searchInput").value)} className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                            <Search size={16} /> Search
                          </button>
          </div>
          <div className="flex items-center gap-4">

             <Bell size={20} className="text-gray-400 cursor-pointer" />
            <Settings size={20} className="text-gray-400 cursor-pointer" />
            <Sun
              onClick={() => setLightMode(true)}
              size={20}
              className={`cursor-pointer ${
                lightMode ? "text-yellow-500" : "text-gray-400"
              }`}
            />
            <Moon
              onClick={() => setLightMode(false)}
              size={20}
              className={`cursor-pointer ${
                !lightMode ? "text-yellow-500" : "text-gray-400"
              }`}
            />
          </div>
        </header>

        {/* Main Section */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">Feedback Requests</h1>
              <p className="text-gray-400">Feedbacks are available here</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={exportToExcel}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                <FaFileExcel size={16} /> Export Excel
              </button>
              <button
                onClick={exportToPDF}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
              >
                <FaFilePdf size={16} /> Export PDF
              </button>
            </div>
          </div>

          {/* Feedback Table */}
          <div className="overflow-auto bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-4">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-400">
                  <th className="py-2 px-3">ID</th>
                  <th className="py-2 px-3">Name</th>
                  <th className="py-2 px-3">Email</th>
                  <th className="py-2 px-3">Message</th>
                  <th className="py-2 px-3">Rating</th>
                  <th className="py-2 px-3">Created At</th>
                </tr>
              </thead>
              <tbody>
                {filteredFeedbacks.map((f) => (
                  <tr
                    key={f._id}
                    className="border-b border-gray-700 hover:bg-gray-700"
                  >
                    <td className="py-2 px-3">F{f._id?.slice(0, 4) || "----"}</td>
                    <td className="py-2 px-3">{f.name || "-"}</td>
                    <td className="py-2 px-3">{f.email || "-"}</td>
                    <td className="py-2 px-3 max-w-xs">
                      {f.message
                        ? f.message.length > 50
                          ? `${f.message.slice(0, 50)}...`
                          : f.message
                        : "-"}
                    </td>
                    <td className="py-2 px-3">{f.rating || "-"}</td>
                    <td className="py-2 px-3">
                      {f.createdAt
                        ? new Date(f.createdAt).toLocaleDateString()
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  );
};

export default FeedbackDashboard;
