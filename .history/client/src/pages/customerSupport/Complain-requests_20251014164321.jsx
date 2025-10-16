import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../lib/api";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import AutoTable from "jspdf-autotable";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import { Search, Settings, Bell, Sun, Moon, LogOut } from "lucide-react";

const ComplaintDashboardWithReply = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [lightMode, setLightMode] = useState(false);
  const [replyPopup, setReplyPopup] = useState({ open: false, complaint: null });
  const [replyMessage, setReplyMessage] = useState("");
  const navigate = useNavigate();

  const sidebarItems = [
    { label: "Dashboard", link: "/admin/dashboard" },
    { label: "Refund Requests", link: "/refunds" },
    { label: "Complaint Requests", link: "/customersupport/complaints" },
  ];

  const bottomItems = [
    { icon: Settings, link: "/admin/settings", label: "Settings" },
    { icon: LogOut, link: "/", label: "Logout" },
  ];

  const fetchComplaints = async () => {
    try {
      const res = await api.get("/api/complaints");
      const mapped = res.data.map((c) => ({ ...c, showFullText: false }));
      setComplaints(mapped);
      setFilteredComplaints(mapped);
    } catch (err) {
      console.error("Error fetching complaints:", err);
      toast.error("Failed to fetch complaints");
      setComplaints([]);
      setFilteredComplaints([]);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const filterComplaints = (term) => {
    if (!term) return setFilteredComplaints(complaints);
    const t = term.toLowerCase();
    const filtered = complaints.filter((c) =>
      [c.name, c.email, c.subject, c.complaint, c.reply]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(t)
    );
    setFilteredComplaints(filtered);
  };

  const openReplyPopup = (complaint) => {
    setReplyPopup({ open: true, complaint });
    setReplyMessage(complaint.reply || "");
  };

  const handleReplySend = async () => {
    if (!replyMessage.trim()) return toast.error("Please enter a reply message");
    try {
      await api.put(/api/complaints/reply/${replyPopup.complaint._id}, {
        reply: replyMessage,
      });
      toast.success("Reply sent successfully!");
      setReplyPopup({ open: false, complaint: null });
      setReplyMessage("");
      fetchComplaints();
    } catch (err) {
      console.error("Error sending reply:", err);
      toast.error("Failed to send reply");
    }
  };

  const exportToExcel = () => {
    if (!filteredComplaints.length) return toast.error("No complaints to export");
    const worksheet = XLSX.utils.json_to_sheet(filteredComplaints);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Complaints");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "complaints.xlsx");
    toast.success("Excel file downloaded successfully!");
  };

  const exportToPDF = () => {
    if (!filteredComplaints.length) return toast.error("No complaints to export");
    const doc = new jsPDF();
    doc.text("Customer Complaint Report", 14, 10);
    AutoTable(doc, {
      startY: 20,
      head: [["Name", "Email", "Subject", "Complaint", "Created At"]],
      body: filteredComplaints.map((c) => [
        c.name,
        c.email,
        c.subject || "-",
        c.complaint || "-",
        c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "-",
      ]),
      theme: "striped",
      headStyles: { fillColor: [41, 128, 185] },
    });
    doc.save("complaints.pdf");
    toast.success("PDF file downloaded successfully!");
  };

  return (
    <div className={flex h-auto bg-gray-950 text-white ${lightMode ? "light bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-black" : ""}}>
      <div className="w-64 h-screen bg-[#151821] p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">⚙</span>
          </div>
          <span className="text-xl font-semibold">Admin</span>
        </div>
        <div className="mb-8">
          <nav className="space-y-2">
            {sidebarItems.map((item, i) => (
              <a key={i} onClick={() => navigate(item.link)} className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 cursor-pointer">
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="mt-auto space-y-2">
          {bottomItems.map((item, i) => (
            <a key={i} onClick={() => navigate(item.link)} className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 cursor-pointer">
              <item.icon size={20} />
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <header className="bg-gray-950 p-6 flex items-center justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search complaints..."
              onChange={(e) => filterComplaints(e.target.value)}
              className="pl-10 pr-4 py-2 bg-[#151821] border border-gray-900 rounded-lg text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-4">
            <Bell size={20} className="text-gray-400 cursor-pointer" />
            <Sun onClick={() => setLightMode(true)} size={20} className={cursor-pointer ${lightMode ? "text-yellow-500" : "text-gray-400"}} />
            <Moon onClick={() => setLightMode(false)} size={20} className={cursor-pointer ${!lightMode ? "text-yellow-500" : "text-gray-400"}} />
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold mb-2">Complaint Requests</h1>
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
                    <th className="py-3 px-4">Subject</th>
                    <th className="py-3 px-4">Complaint</th>
                    <th className="py-3 px-4">Submitted At</th>
                    <th className="py-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredComplaints.map((c) => (
                    <tr key={c._id} className="border-b border-gray-700 hover:bg-gray-700">
                      <td className="py-3 px-4">C{c._id.slice(0, 3)}</td>
                      <td className="py-3 px-4">{c.name}</td>
                      <td className="py-3 px-4">{c.email}</td>
                      <td className="py-3 px-4">{c.subject || "-"}</td>
                      <td className="py-3 px-4 max-w-xs">
                        {c.complaint && c.complaint.length > 50 ? (
                          <span>
                            {c.showFullText ? c.complaint : `${c.complaint.slice(0, 50)}... `}
                            <button
                              onClick={() => {
                                setFilteredComplaints((prev) =>
                                  prev.map((item) =>
                                    item._id === c._id ? { ...item, showFullText: !item.showFullText } : item
                                  )
                                );
                              }}
                              className="text-blue-400 hover:underline ml-1"
                            >
                              {c.showFullText ? "Show less" : "Read more"}
                            </button>
                          </span>
                        ) : c.complaint}
                      </td>
                      <td className="py-3 px-4">{new Date(c.createdAt).toLocaleDateString()}</td>
                      <td className="py-3 px-4">
                        <button onClick={() => openReplyPopup(c)} className="px-3 py-1 bg-blue-600 rounded-md hover:bg-blue-700 text-white">Reply</button>
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
              <h2 className="text-2xl font-bold mb-4">Reply to Complaint</h2>
              <p className="mb-2"><strong>Name:</strong> {replyPopup.complaint.name}</p>
              <p className="mb-2"><strong>Email:</strong> {replyPopup.complaint.email}</p>
              <p className="mb-4"><strong>Complaint:</strong> {replyPopup.complaint.complaint}</p>

              {replyPopup.complaint.reply && (
                <div className="bg-gray-800 p-3 rounded-md mb-4">
                  <strong>Previous Reply:</strong>
                  <p>{replyPopup.complaint.reply}</p>
                </div>
              )}

              <textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Enter your reply..."
                className="w-full h-24 p-3 mb-3 rounded-md bg-gray-800 text-white"
              />

              <div className="flex justify-end gap-3 mt-2">
                <button onClick={() => setReplyPopup({ open: false, complaint: null })} className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-700">Cancel</button>
                <button onClick={handleReplySend} className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700">Send Reply</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintDashboardWithReply