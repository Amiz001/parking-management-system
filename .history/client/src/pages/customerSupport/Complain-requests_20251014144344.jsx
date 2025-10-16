import React, { useState, useEffect } from "react";
import Axios from "axios";
import { toast } from "react-toastify";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import jsPDF from "jspdf";
import AutoTable from "jspdf-autotable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Search, Settings, LogOut, Bell, Sun, Moon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ComplaintDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [replyPopup, setReplyPopup] = useState({ open: false, complaint: null });
  const [replyMessage, setReplyMessage] = useState("");
  const [lightMode, setLightMode] = useState(false);
  const navigate = useNavigate();

  const fetchComplaints = async () => {
    try {
      const res = await Axios.get("http://localhost:5000/api/complaint");
      if (res.data.message === "No complaints found") return setComplaints([]);
      const list = res.data.map(c => ({ ...c, showFull: false }));
      setComplaints(list);
      setFilteredComplaints(list);
    } catch (err) {
      console.error(err);
      toast.error("Error fetching complaints");
    }
  };

  useEffect(() => { fetchComplaints(); }, []);

  const filterComplaints = (term) => {
    if (!term) return setFilteredComplaints(complaints);
    const filtered = complaints.filter((c) =>
      Object.values(c).join(" ").toLowerCase().includes(term.toLowerCase())
    );
    setFilteredComplaints(filtered);
  };

  const handleReplySend = async () => {
    if (!replyMessage.trim()) return toast.error("Please enter a reply");
    try {
      await Axios.put(`http://localhost:5000/api/complaint/reply/${replyPopup.complaint._id}`, {
        reply: replyMessage
      });
      toast.success("Reply sent!");
      setReplyPopup({ open: false, complaint: null });
      setReplyMessage("");
      fetchComplaints();
    } catch (err) {
      toast.error("Failed to send reply");
    }
  };

  const exportExcel = () => {
    const sheet = XLSX.utils.json_to_sheet(filteredComplaints);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, "Complaints");
    const buf = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([buf]), "complaints.xlsx");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Complaint Report", 14, 10);
    AutoTable(doc, {
      startY: 20,
      head: [["Name", "Email", "Subject", "Complaint", "Reply", "Date"]],
      body: filteredComplaints.map(c => [
        c.name, c.email, c.subject, c.complaint, c.reply || "-", new Date(c.createdAt).toLocaleDateString()
      ])
    });
    doc.save("complaints.pdf");
  };

  return (
    <div className={`flex h-auto ${lightMode ? "bg-gray-50 text-black" : "bg-gray-950 text-white"}`}>
      {/* Sidebar */}
      <div className="w-64 h-screen bg-[#151821] p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">✦</div>
          <span className="text-xl font-semibold">Admin</span>
        </div>
        <nav className="space-y-2 mb-8">
          <a onClick={() => navigate("/admin/dashboard")} className="block px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700">Dashboard</a>
          <a onClick={() => navigate("/admin/complaints")} className="block px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700">Complaints</a>
        </nav>
        <div className="mt-auto space-y-2">
          <a onClick={() => navigate("/admin/settings")} className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-700"><Settings size={18}/>Settings</a>
          <a onClick={() => navigate("/")} className="flex items-center gap-3 px-3 py-2 text-gray-300 hover:bg-gray-700"><LogOut size={18}/>Logout</a>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <header className="p-6 flex justify-between bg-gray-900">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Search complaints..." onChange={(e) => filterComplaints(e.target.value)} className="pl-10 pr-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500"/>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="text-gray-400"/>
            <Sun onClick={() => setLightMode(true)} className={`cursor-pointer ${lightMode ? "text-yellow-500":"text-gray-400"}`}/>
            <Moon onClick={() => setLightMode(false)} className={`cursor-pointer ${!lightMode ? "text-yellow-500":"text-gray-400"}`}/>
          </div>
        </header>

        <main className="p-6">
          <div className="flex justify-between mb-6">
            <h1 className="text-3xl font-bold">Complaints</h1>
            <div className="flex gap-4">
              <button onClick={exportExcel} className="px-3 py-2 bg-green-600 rounded-lg text-white flex items-center gap-2"><FaFileExcel/> Excel</button>
              <button onClick={exportPDF} className="px-3 py-2 bg-red-600 rounded-lg text-white flex items-center gap-2"><FaFilePdf/> PDF</button>
            </div>
          </div>

          <div className="bg-[#151821] rounded-xl p-4 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="py-2 px-4">Name</th>
                  <th className="py-2 px-4">Email</th>
                  <th className="py-2 px-4">Subject</th>
                  <th className="py-2 px-4">Complaint</th>
                  <th className="py-2 px-4">Reply</th>
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.map(c => (
                  <tr key={c._id} className="border-b border-gray-700 hover:bg-gray-800">
                    <td className="py-2 px-4">{c.name}</td>
                    <td className="py-2 px-4">{c.email}</td>
                    <td className="py-2 px-4">{c.subject}</td>
                    <td className="py-2 px-4 max-w-xs truncate">{c.complaint}</td>
                    <td className="py-2 px-4">{c.reply || "-"}</td>
                    <td className="py-2 px-4">{new Date(c.createdAt).toLocaleDateString()}</td>
                    <td className="py-2 px-4">
                      <button onClick={() => setReplyPopup({ open: true, complaint: c })} className="px-3 py-1 bg-blue-600 rounded-md text-white hover:bg-blue-700">Reply</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {replyPopup.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-xl w-full max-w-lg text-white">
            <h2 className="text-xl font-bold mb-4">Reply to Complaint</h2>
            <p><strong>Name:</strong> {replyPopup.complaint.name}</p>
            <p><strong>Email:</strong> {replyPopup.complaint.email}</p>
            <p className="mb-4"><strong>Complaint:</strong> {replyPopup.complaint.complaint}</p>
            <textarea
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder="Enter your reply..."
              className="w-full p-3 mb-3 bg-gray-700 rounded-md"
            />
            <div className="flex justify-end gap-3">
              <button onClick={() => setReplyPopup({ open: false, complaint: null })} className="px-4 py-2 bg-gray-600 rounded-md">Cancel</button>
              <button onClick={handleReplySend} className="px-4 py-2 bg-blue-600 rounded-md">Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintDashboard;
