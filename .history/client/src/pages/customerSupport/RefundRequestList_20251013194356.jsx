// RefundDashboard.jsx
import React, { useState, useEffect } from "react";
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
  Bell,
  Settings,
  Sun,
  Moon,
  Trash,
} from "lucide-react";

const RefundDashboard = () => {
  const [refunds, setRefunds] = useState([]);
  const [filteredRefunds, setFilteredRefunds] = useState([]);
  const [lightMode, setLightMode] = useState(false);
  const [replyPopup, setReplyPopup] = useState({ open: false, refundId: null });
  const [replyMessage, setReplyMessage] = useState("");
  const [currentRefund, setCurrentRefund] = useState(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchRefunds();
  }, []);

  useEffect(() => {
    setFilteredRefunds(refunds);
  }, [refunds]);

  // Filter refunds
  const filterRefunds = (searchTerm) => {
    if (!searchTerm) return setFilteredRefunds(refunds);
    const filtered = refunds.filter((r) =>
      Object.values(r).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRefunds(filtered);
  };

  // Delete refund
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

  // Send reply
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

  // Export Excel
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

  // Export PDF
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
    <div className={`flex h-auto bg-gradient-to-b from-blue-900 to-blue-800 text-white ${lightMode ? "light text-black" : ""}`}>
      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search refund..."
                onChange={(e) => filterRefunds(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg text-black"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <button onClick={exportToExcel} className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 flex items-center gap-2">
              <FaFileExcel /> Excel
            </button>
            <button onClick={exportToPDF} className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 flex items-center gap-2">
              <FaFilePdf /> PDF
            </button>
          </div>
        </header>

        <h1 className="text-2xl font-bold mb-4">Refund Requests</h1>

        {/* Refund Table */}
        <div className="overflow-x-auto bg-blue-800 rounded-xl p-4">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b border-blue-500">
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Order ID</th>
                <th className="px-4 py-2 text-left">Amount</th>
                <th className="px-4 py-2 text-left">Reason</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRefunds.map((refund) => (
                <tr key={refund._id} className="border-b border-blue-500 hover:bg-blue-700">
                  <td className="px-4 py-2">RF{refund._id.slice(0, 3)}</td>
                  <td className="px-4 py-2">{refund.name}</td>
                  <td className="px-4 py-2">{refund.email}</td>
                  <td className="px-4 py-2">{refund.orderId}</td>
                  <td className="px-4 py-2">{refund.amount}</td>
                  <td className="px-4 py-2 max-w-xs">
                    {refund.reason.length > 50
                      ? refund.showFullReason
                        ? refund.reason
                        : `${refund.reason.slice(0, 50)}...`
                      : refund.reason}
                    {refund.reason.length > 50 && (
                      <button
                        onClick={() => {
                          setFilteredRefunds(prev =>
                            prev.map(r =>
                              r._id === refund._id ? { ...r, showFullReason: !r.showFullReason } : r
                            )
                          );
                        }}
                        className="ml-1 text-blue-300 underline hover:text-white"
                      >
                        {refund.showFullReason ? "Show less" : "Read more"}
                      </button>
                    )}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => {
                        setReplyPopup({ open: true, refundId: refund._id });
                        setCurrentRefund(refund);
                      }}
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-600 rounded"
                    >
                      Reply
                    </button>
                    <button
                      onClick={() => handleDelete(refund._id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Reply Popup */}
        {replyPopup.open && currentRefund && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-blue-900 p-6 rounded-lg w-96 shadow-lg">
              <h2 className="text-xl font-bold mb-3">Reply to Refund</h2>
              <div className="mb-3">
                <p><strong>Name:</strong> {currentRefund.name}</p>
                <p><strong>Email:</strong> {currentRefund.email}</p>
                <p><strong>Order ID:</strong> {currentRefund.orderId}</p>
              </div>
              <textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Type your reply here..."
                className="w-full h-28 p-3 rounded-md mb-4 text-black"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setReplyPopup({ open: false, refundId: null })}
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReplySend}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RefundDashboard;
