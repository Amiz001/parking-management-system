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
import { Ticket, AlertCircle, MessageSquare } from "lucide-react";

const RefundDashboardWithReplySimplified = () => {
  const [refunds, setRefunds] = useState([]);
  const [filteredRefunds, setFilteredRefunds] = useState([]);
  const [lightMode, setLightMode] = useState(false);
  const [replyPopup, setReplyPopup] = useState({ open: false, refund: null });
  const [replyMessage, setReplyMessage] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const navigate = useNavigate();

  // Sidebar with icons
  const sidebarItems = [
    { icon: Ticket, label: "Ticket Request", link: "/admin/ticket-requests" },
    { icon: AlertCircle, label: "Complain Request", link: "/admin/complain-requests" },
    { icon: MessageSquare, label: "Feedback Request", link: "/admin/feedback-requests" },
  ];

  const bottomItems = [
    { icon: Settings, link: "/admin/settings", label: "Settings" },
    { icon: LogOut, link: "/", label: "Logout" },
  ];

  // Fetch refunds
  const fetchRefunds = async () => {
    try {
      const res = await Axios.get("http://localhost:5000/api/refund");
      if (res.data.message === "Not Found") return setRefunds([]);
      const refundsWithFlag = res.data.map(r => ({ ...r, showFullReason: false }));
      setRefunds(refundsWithFlag);
    } catch (err) {
      console.error("Error fetching refund data:", err);
      setRefunds([]);
    }
  };

  useEffect(() => { fetchRefunds(); }, []);
  useEffect(() => { setFilteredRefunds(refunds); }, [refunds]);

  const filterRefunds = (searchTerm) => {
    if (!searchTerm) return setFilteredRefunds(refunds);
    const filtered = refunds.filter((r) =>
      Object.values(r).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRefunds(filtered);
  };

  const openReplyPopup = (refund) => {
    setReplyPopup({ open: true, refund });
    setReplyMessage(refund.reply || "");
    setAdditionalNotes("");
  };

  const handleReplySend = async () => {
    if (!replyMessage.trim()) return toast.error("Please enter a reply message");
    try {
      await Axios.put(`http://localhost:5000/api/refund/reply/${replyPopup.refund._id}`, {
        reply: replyMessage,
        notes: additionalNotes,
      });
      toast.success("Reply sent successfully!");
      setReplyPopup({ open: false, refund: null });
      setReplyMessage("");
      setAdditionalNotes("");
      fetchRefunds();
    } catch (err) {
      console.error("Error sending reply:", err);
      toast.error("Failed to send reply");
    }
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
    doc.text("Refund Report", 14, 10);
    AutoTable(doc, {
      startY: 20,
      head: [["Name", "Email", "Order ID", "Amount", "Reason", "Created At"]],
      body: filteredRefunds.map((r) => [
        r.name, r.email, r.orderId, r.amount, r.reason, r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "-",
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
          <p className="text-gray-400 text-sm mb-4 uppercase tracking-wide">Menu</p>
          <nav className="space-y-2">
            {sidebarItems.map((item, i) => (
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
      {/* ... same as previous for header, table, reply popup ... */}
    </div>
  );
};

export default RefundDashboardWithReplySimplified;
