// FeedbackRequestsPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { toast } from "react-toastify";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import AutoTable from "jspdf-autotable";
import { Search, Settings, Bell, Sun, Moon, LogOut } from "lucide-react";

const FeedbackRequestsPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [lightMode, setLightMode] = useState(false);
  const navigate = useNavigate();

  const fetchFeedbacks = async () => {
    try {
      const res = await Axios.get("http://localhost:5000/api/feedback");
      if (res.data.message === "Not Found") return setFeedbacks([]);
      setFeedbacks(res.data);
    } catch (err) {
      console.error("Error fetching feedback:", err);
      setFeedbacks([]);
    }
  };

  useEffect(() => { fetchFeedbacks(); }, []);
  useEffect(() => { setFilteredFeedbacks(feedbacks); }, [feedbacks]);

  const filterFeedbacks = (searchTerm) => {
    if (!searchTerm) return setFilteredFeedbacks(feedbacks);
    const filtered = feedbacks.filter(f =>
      Object.values(f).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFeedbacks(filtered);
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
      head: [["Name", "Email", "Feedback", "Submitted At"]],
      body: filteredFeedbacks.map(f => [
        f.name, f.email, f.message, f.createdAt ? new Date(f.createdAt).toLocaleDateString() : "-"
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
          <span className="text-L font-semibold">Customer Support</span>
        </div>

        <div className="mb-8">
          <p className="text-gray-400 text-sm mb-4 uppercase tracking-wide">Menu</p>
          <nav className="space-y-2">
            <a onClick={() => navigate("/customersupport/ticket-requests")} className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gradient-to-r from-blue-500 to-indigo-600 transition-colors">Tickets</a>
            <a onClick={() => navigate("/customersupport/complain-requests")} className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gradient-to-r from-blue-500 to-indigo-600 transition-colors">Complains</a>
            <a onClick={() => navigate("/customersupport/feedback-requests")} className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gradient-to-r from-blue-500 to-indigo-600 transition-colors">Feedbacks</a>
          </nav>
        </div>

        <div className="mt-auto space-y-2">
          <Settings size={20} className="text-gray-400 cursor-pointer" />
          <LogOut size={20} className="text-gray-400 cursor-pointer" onClick={() => navigate("/")} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-gray-950 p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input type="text" id="searchInput" placeholder="Search feedback..." onChange={(e) => filterFeedbacks(e.target.value)} className="pl-10 pr-4 py-2 bg-[#151821] border border-gray-900 rounded-lg text-white focus:ring-2 focus:ring-blue-500" />
            </div>
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
                <FaFileExcel size={16} /> Export Excel
              </button>
              <button onClick={exportToPDF} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2">
                <FaFilePdf size={16} /> Export PDF
              </button>
            </div>
          </div>

          {/* Feedback Table */}
          <div className="bg-gradient-to-b from-[#151821] to-[#242938] rounded-xl p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-400">
                    <th className="py-3 px-4 text-left">ID</th>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Email</th>
                    <th className="py-3 px-4 text-left">Feedback</th>
                    <th className="py-3 px-4 text-left">Submitted At</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFeedbacks.map(f => (
                    <tr key={f._id} className="border-b border-gray-700 hover:bg-gray-700">
                      <td className="py-3 px-4">FB{f._id.slice(0,3)}</td>
                      <td className="py-3 px-4">{f.name}</td>
                      <td className="py-3 px-4">{f.email}</td>
                      <td className="py-3 px-4 max-w-xs">{f.message}</td>
                      <td className="py-3 px-4">{new Date(f.createdAt).toLocaleDateString()}</td>
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

export default FeedbackRequestsPage;
