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
  Bell,
  Trash2,
  Mail,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const FeedbackDashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [lightMode, setLightMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [replyPopup, setReplyPopup] = useState({ open: false, feedbackId: null });
  const [replyMessage, setReplyMessage] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const navigate = useNavigate();

  const sidebarItems = [
    { icon: Home, label: "Dashboard", link: "/customersupport/dashboard" },
    { icon: Ticket, label: "Ticket Request", link: "/customersupport/teckset" },
    { icon: AlertCircle, label: "Complaint Request", link: "/customersupport/comfetch" },
    { icon: MessageSquare, label: "Feedback Request", link: "/customersupport/feedback-requests" },
  ];

  const bottomItems = [
    { icon: Settings, label: "Settings", link: "/customersupport/setting" },
    { icon: LogOut, label: "Logout", link: "/" },
  ];

  const fetchFeedbacks = async () => {
    try {
      const res = await Axios.get("http://localhost:5000/feedbacks");
      setFeedbacks(res.data || []);
      setFilteredFeedbacks(res.data || []);
    } catch (err) {
      console.error("Error fetching feedback:", err);
      toast.error("Failed to fetch feedback");
      setFeedbacks([]);
      setFilteredFeedbacks([]);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleSearch = () => {
    if (!searchTerm) return setFilteredFeedbacks(feedbacks);
    const filtered = feedbacks.filter((f) =>
      Object.values(f).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFeedbacks(filtered);
  };

  useEffect(() => {
    if (!searchTerm) return setFilteredFeedbacks(feedbacks);
  }, [feedbacks]);

  const handleDelete = async (feedbackId) => {
    try {
      await Axios.delete(`http://localhost:5000/feedbacks/${feedbackId}`);
      toast.success("Feedback deleted successfully!");
      fetchFeedbacks();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete feedback");
    }
  };

  const handleReplySend = async () => {
    if (!replyMessage.trim()) return toast.error("Please enter a reply message");
    try {
      await Axios.put(`http://localhost:5000/feedbacks/reply/${replyPopup.feedbackId}`, {
        reply: replyMessage,
        additionalNotes,
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

  return (
    <div className={`flex min-h-screen ${lightMode ? "bg-gray-100 text-black" : "bg-gray-950 text-white"}`}>
      {/* Sidebar */}
      <div className="w-64 h-screen bg-[#151821] p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">✦</span>
          </div>
          <span className="font-semibold">Customer Support</span>
        </div>

        <p className="text-gray-400 text-sm mb-4 uppercase tracking-wide">Main Menu</p>
        <nav className="mb-8 space-y-2">
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
            <div className="relative flex items-center">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search feedback..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-[#151821] border border-gray-900 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSearch}
                className="ml-2 px-3 py-2 bg-blue-600 rounded hover:bg-blue-700 text-white flex items-center gap-1"
              >
                <Search size={16} /> Search
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Bell size={20} className="text-gray-400 cursor-pointer" />
            <Settings size={20} className="text-gray-400 cursor-pointer" />
            <Sun
              onClick={() => setLightMode(true)}
              size={20}
              className={`cursor-pointer ${lightMode ? "text-yellow-500" : "text-gray-400"}`}
            />
            <Moon
              onClick={() => setLightMode(false)}
              size={20}
              className={`cursor-pointer ${!lightMode ? "text-yellow-500" : "text-gray-400"}`}
            />
          </div>
        </header>

        {/* Table Section */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-1">Feedback Requests</h1>
              <p className="text-gray-400">All user feedback is displayed here</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={exportToExcel}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
              >
                <FaFileExcel size={16} /> Excel
              </button>
              <button
                onClick={exportToPDF}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2"
              >
                <FaFilePdf size={16} /> PDF
              </button>
            </div>
          </div>

          <div className="overflow-auto bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-4">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-400">
                  <th className="py-2 px-3">Name</th>
                  <th className="py-2 px-3">Email</th>
                  <th className="py-2 px-3">Category</th>
                  <th className="py-2 px-3">Feedback</th>
                  <th className="py-2 px-3">Rating</th>
                  <th className="py-2 px-3">Created At</th>
                  <th className="py-2 px-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFeedbacks.map((f) => (
                  <tr key={f._id} className="border-b border-gray-700 hover:bg-gray-700">
                    <td className="py-2 px-3">{f.name || "-"}</td>
                    <td className="py-2 px-3">{f.email || "-"}</td>
                    <td className="py-2 px-3">{f.category || "-"}</td>
                    <td className="py-2 px-3 max-w-xs">
                      <td className="py-2 px-3">{f.feedback || "-"}</td>

                      {f.feedback?.length > 50 ? `${f.feedback.slice(0, 50)}...` : f.message}
                    </td>
                    <td className="py-2 px-3">{f.rating || "-"}</td>
                    <td className="py-2 px-3">
                      {f.createdAt ? new Date(f.createdAt).toLocaleDateString() : "-"}
                    </td>
                    <td className="py-2 px-3 flex gap-2">
                      <button
                        onClick={() => setReplyPopup({ open: true, feedbackId: f._id })}
                        className="flex items-center gap-1 px-2 py-1 bg-blue-600 rounded hover:bg-blue-700 text-white text-sm"
                      >
                        <Mail size={16} /> Reply
                      </button>
                      <button
                        onClick={() => handleDelete(f._id)}
                        className="flex items-center gap-1 px-2 py-1 bg-red-600 rounded hover:bg-red-700 text-white text-sm"
                      >
                        <Trash2 size={16} /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Reply Popup */}
      {replyPopup.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-xl w-96">
            <h2 className="text-xl font-bold mb-4">Send Reply</h2>
            <textarea
              className="w-full p-2 rounded bg-gray-800 text-white mb-4"
              rows="4"
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder="Enter your reply..."
            />
            <textarea
              className="w-full p-2 rounded bg-gray-800 text-white mb-4"
              rows="3"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              placeholder="Additional notes (optional)..."
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-700"
                onClick={() => setReplyPopup({ open: false, feedbackId: null })}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={handleReplySend}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackDashboard;
