// FeedbackDashboardWithReply.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import AutoTable from "jspdf-autotable";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import { Search, Settings, Bell, Sun, Moon, LogOut } from "lucide-react";

const FeedbackDashboardWithReply = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [lightMode, setLightMode] = useState(false);
  const [replyPopup, setReplyPopup] = useState({ open: false, feedback: null });
  const [replyMessage, setReplyMessage] = useState("");
  const navigate = useNavigate();

  const sidebarItems = [
    { label: "Dashboard", link: "/admin/dashboard" },
    { label: "Feedback Requests", link: "/customersupport/feedback" },
  ];

  const bottomItems = [
    { icon: Settings, link: "/admin/settings", label: "Settings" },
    { icon: LogOut, link: "/", label: "Logout" },
  ];

  // Fetch feedback from backend
  const fetchFeedbacks = async () => {
    try {
      const res = await Axios.get("http://localhost:5000/api/feedback");
      if (res.data.message === "Not Found") return setFeedbacks([]);
      const feedbacksWithFlag = res.data.map(f => ({ ...f, showFullFeedback: false }));
      setFeedbacks(feedbacksWithFlag);
      setFilteredFeedbacks(feedbacksWithFlag);
    } catch (err) {
      console.error("Error fetching feedback:", err);
      toast.error("Failed to fetch feedback");
      setFeedbacks([]);
    }
  };

  useEffect(() => { fetchFeedbacks(); }, []);

  const filterFeedbacks = (searchTerm) => {
    if (!searchTerm) return setFilteredFeedbacks(feedbacks);
    const filtered = feedbacks.filter((f) =>
      Object.values(f).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFeedbacks(filtered);
  };

  const openReplyPopup = (feedback) => {
    setReplyPopup({ open: true, feedback });
    setReplyMessage(feedback.reply || "");
  };

  const handleReplySend = async () => {
    if (!replyMessage.trim()) return toast.error("Please enter a reply message");
    try {
      await Axios.put(`http://localhost:5000/api/feedback/reply/${replyPopup.feedback._id}`, {
        reply: replyMessage,
      });
      toast.success("Reply sent successfully!");
      setReplyPopup({ open: false, feedback: null });
      setReplyMessage("");
      fetchFeedbacks();
    } catch (err) {
      console.error("Error sending reply:", err);
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
    toast.success("Excel file downloaded successfully!");
  };

  const exportToPDF = () => {
    if (!filteredFeedbacks.length) return toast.error("No feedbacks to export");
    const doc = new jsPDF();
    doc.text("Customer Feedback Report", 14, 10);
    AutoTable(doc, {
      startY: 20,
      head: [["Name", "Email", "Category", "Feedback", "Rating", "Created At"]],
      body: filteredFeedbacks.map((f) => [
        f.name,
        f.email,
        f.category || "-",
        f.feedback || "-",
        f.rating || "-",
        f.createdAt ? new Date(f.createdAt).toLocaleDateString() : "-",
      ]),
      theme: "striped",
      headStyles: { fillColor: [41, 128, 185] },
    });
    doc.save("feedbacks.pdf");
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
          <nav className="space-y-2">
            {sidebarItems.map((item, i) => (
              <a key={i} onClick={() => navigate(item.link)} className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700">{item.label}</a>
            ))}
          </nav>
        </div>
        <div className="mt-auto space-y-2">
          {bottomItems.map((item, i) => (
            <a key={i} onClick={() => navigate(item.link)} className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700">
              <item.icon size={20} />
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-gray-950 p-6 flex items-center justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Search feedback..." onChange={(e) => filterFeedbacks(e.target.value)} className="pl-10 pr-4 py-2 bg-[#151821] border border-gray-900 rounded-lg text-white focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex items-center gap-4">
            <Bell size={20} className="text-gray-400 cursor-pointer" />
            <Sun onClick={() => setLightMode(true)} size={20} className={`cursor-pointer ${lightMode ? "text-yellow-500" : "text-gray-400"}`} />
            <Moon onClick={() => setLightMode(false)} size={20} className={`cursor-pointer ${!lightMode ? "text-yellow-500" : "text-gray-400"}`} />
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold mb-2">Feedback Requests</h1>
            <div className="flex items-center gap-4">
              <button onClick={exportToExcel} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
                <FaFileExcel size={16} /> Excel
              </button>
              <button onClick={exportToPDF} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2">
                <FaFilePdf size={16} /> PDF
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-b from-[#151821] to-[#242938] rounded-xl p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-400">
                    <th className="py-3 px-4">ID</th>
                    <th className="py-3 px-4">Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Feedback</th>
                    <th className="py-3 px-4">Rating</th>
                    <th className="py-3 px-4">Submitted At</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFeedbacks.map((f) => (
                    <tr key={f._id} className="border-b border-gray-700 hover:bg-gray-700">
                      <td className="py-3 px-4">FB{f._id.slice(0, 3)}</td>
                      <td className="py-3 px-4">{f.name}</td>
                      <td className="py-3 px-4">{f.email}</td>
                      <td className="py-3 px-4">{f.category || "-"}</td>
                      <td className="py-3 px-4 max-w-xs">
                        {f.feedback.length > 50 ? (
                          <span>
                            {f.showFullFeedback ? f.feedback : `${f.feedback.slice(0, 50)}... `}
                            <button
                              onClick={() => {
                                setFilteredFeedbacks(prev =>
                                  prev.map(item =>
                                    item._id === f._id ? { ...item, showFullFeedback: !item.showFullFeedback } : item
                                  )
                                );
                              }}
                              className="text-blue-400 hover:underline ml-1"
                            >
                              {f.showFullFeedback ? "Show less" : "Read more"}
                            </button>
                          </span>
                        ) : f.feedback}
                      </td>
                      <td className="py-3 px-4">{f.rating || "-"}</td>
                      <td className="py-3 px-4">{new Date(f.createdAt).toLocaleDateString()}</td>
                      <td className="py-3 px-4">
                        <button onClick={() => openReplyPopup(f)} className="px-3 py-1 bg-blue-600 rounded-md hover:bg-blue-700 text-white">Reply</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {replyPopup.open && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gradient-to-br from-purple-700 via-pink-500 to-orange-400 p-6 rounded-2xl w-full max-w-lg shadow-lg text-white">
              <h2 className="text-2xl font-bold mb-4">Reply to Feedback</h2>
              <p className="mb-2"><strong>Name:</strong> {replyPopup.feedback.name}</p>
              <p className="mb-2"><strong>Email:</strong> {replyPopup.feedback.email}</p>
              <p className="mb-4"><strong>Feedback:</strong> {replyPopup.feedback.feedback}</p>

              {replyPopup.feedback.reply && (
                <div className="bg-gray-800 p-3 rounded-md mb-4">
                  <strong>Previous Reply:</strong>
                  <p>{replyPopup.feedback.reply}</p>
                </div>
              )}

              <textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Enter your reply..."
                className="w-full h-24 p-3 mb-3 rounded-md bg-gray-800 text-white"
              />

              <div className="flex justify-end gap-3 mt-2">
                <button
                  onClick={() => setReplyPopup({ open: false, feedback: null })}
                  className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReplySend}
                  className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Send Reply
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default FeedbackDashboardWithReply;
