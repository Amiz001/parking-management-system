// ComplaintDashboard.jsx
import React, { useState, useEffect } from "react";
import Axios from "axios";
import { toast } from "react-toastify";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import AutoTable from "jspdf-autotable";
import { Search, Sun, Moon, Settings, LogOut, Home, Ticket, AlertCircle, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ComplaintDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [lightMode, setLightMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  // ✅ Sidebar with Dashboard added
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

  // Fetch all complaints
  const fetchComplaints = async () => {
    try {
      const res = await Axios.get("http://localhost:5000/api/complaints");
      setComplaints(res.data);
      setFilteredComplaints(res.data);
    } catch (err) {
      console.error("Error fetching complaints:", err);
      toast.error("Failed to fetch complaints");
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  useEffect(() => {
    if (!searchTerm) return setFilteredComplaints(complaints);
    const filtered = complaints.filter((c) =>
      Object.values(c).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredComplaints(filtered);
  }, [searchTerm, complaints]);

  // Export to Excel
  const exportToExcel = () => {
    if (!filteredComplaints.length) return toast.error("No complaints to export");
    const worksheet = XLSX.utils.json_to_sheet(filteredComplaints);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Complaints");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "complaints.xlsx");
    toast.success("Excel file downloaded!");
  };

  // Export to PDF
  const exportToPDF = () => {
    if (!filteredComplaints.length) return toast.error("No complaints to export");
    const doc = new jsPDF();
    doc.text("Complaint Report", 14, 10);
    AutoTable(doc, {
      startY: 20,
      head: [["Name", "Email", "Subject", "Description", "Status", "Created At"]],
      body: filteredComplaints.map((c) => [
        c.name,
        c.email,
        c.subject,
        c.description,
        c.status,
        c.createdAt ? new Date(c.createdAt).toLocaleDateString() : "-",
      ]),
      theme: "striped",
      headStyles: { fillColor: [231, 76, 60] },
    });
    doc.save("complaints.pdf");
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

        <div className="mb-8">
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
      <div className="flex-1 flex flex-col p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Complaint Requests</h1>
          <div className="flex gap-4 items-center">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search complaints..."
              className="px-3 py-1 rounded-lg text-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Sun onClick={() => setLightMode(true)} size={22} className="cursor-pointer" />
            <Moon onClick={() => setLightMode(false)} size={22} className="cursor-pointer" />
          </div>
        </header>

        <div className="flex gap-4 mb-4">
          <button onClick={exportToExcel} className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 flex items-center gap-2">
            <FaFileExcel size={16} /> Excel
          </button>
          <button onClick={exportToPDF} className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 flex items-center gap-2">
            <FaFilePdf size={16} /> PDF
          </button>
        </div>

        <div className="overflow-auto bg-gradient-to-b from-gray-800 to-gray-900 rounded-xl p-4">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-400">
                <th className="py-2 px-3">ID</th>
                <th className="py-2 px-3">Name</th>
                <th className="py-2 px-3">Email</th>
                <th className="py-2 px-3">Subject</th>
                <th className="py-2 px-3">Description</th>
                <th className="py-2 px-3">Status</th>
                <th className="py-2 px-3">Created At</th>
              </tr>
            </thead>
            <tbody>
              {filteredComplaints.map((c) => (
                <tr key={c._id} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="py-2 px-3">C{c._id.slice(0, 4)}</td>
                  <td className="py-2 px-3">{c.name}</td>
                  <td className="py-2 px-3">{c.email}</td>
                  <td className="py-2 px-3">{c.subject}</td>
                  <td className="py-2 px-3">{c.description}</td>
                  <td className="py-2 px-3">{c.status}</td>
                  <td className="py-2 px-3">{new Date(c.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDashboard;
