// CustomerSupportPage.jsx
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

const CustomerSupportPage = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [lightMode, setLightMode] = useState(false);
  const [replyPopup, setReplyPopup] = useState({ open: false, request: null });
  const [replyMessage, setReplyMessage] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const navigate = useNavigate();

  const sidebarItems = [
    
    { icon: Ticket, label: "Ticket Request", link: "/customersupport/ticket-requests" },
    { icon: AlertCircle, label: "Complain Request", link: "/customersupport/complain-requests" },
    { icon: MessageSquare, label: "Feedback Request", link: "/customersupport/feedback-requests" },
  ];

  const bottomItems = [
    { icon: Settings, link: "/customersupport/settings", label: "Settings" },
    { icon: LogOut, link: "/", label: "Logout" },
  ];

  const fetchRequests = async () => {
    try {
      const res = await Axios.get("http://localhost:5000/api/refund");
      if (res.data.message === "Not Found") return setRequests([]);
      const requestsWithFlag = res.data.map(r => ({ ...r, showFullReason: false }));
      setRequests(requestsWithFlag);
    } catch (err) {
      console.error("Error fetching data:", err);
      setRequests([]);
    }
  };

  useEffect(() => { fetchRequests(); }, []);
  useEffect(() => { setFilteredRequests(requests); }, [requests]);

  const filterRequests = (searchTerm) => {
    if (!searchTerm) return setFilteredRequests(requests);
    const filtered = requests.filter((r) =>
      Object.values(r).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRequests(filtered);
  };

  const openReplyPopup = (request) => {
    setReplyPopup({ open: true, request });
    setReplyMessage(request.reply || "");
    setAdditionalNotes("");
  };

  const handleReplySend = async () => {
    if (!replyMessage.trim()) return toast.error("Please enter a reply message");
    try {
      await Axios.put(`http://localhost:5000/api/refund/reply/${replyPopup.request._id}`, {
        reply: replyMessage,
        notes: additionalNotes,
      });
      toast.success("Reply sent successfully!");
      setReplyPopup({ open: false, request: null });
      setReplyMessage("");
      setAdditionalNotes("");
      fetchRequests();
    } catch (err) {
      console.error("Error sending reply:", err);
      toast.error("Failed to send reply");
    }
  };

  const handleDelete = async (requestId) => {
    try {
      await Axios.delete(`http://localhost:5000/api/refund/${requestId}`);
      toast.success("Request deleted successfully!");
      fetchRequests();
    } catch (err) {
      toast.error("Failed to delete request");
      console.error(err);
    }
  };

  const exportToExcel = () => {
    if (!filteredRequests.length) return toast.error("No requests to export");
    const worksheet = XLSX.utils.json_to_sheet(filteredRequests);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Requests");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "requests.xlsx");
    toast.success("Excel file downloaded successfully!");
  };

  const exportToPDF = () => {
    if (!filteredRequests.length) return toast.error("No requests to export");
    const doc = new jsPDF();
    doc.text("Customer Support - Request Report", 14, 10);
    AutoTable(doc, {
      startY: 20,
      head: [["Name", "Email", "Order ID", "Amount", "Reason", "Created At"]],
      body: filteredRequests.map((r) => [
        r.name, r.email, r.orderId, r.amount, r.reason, r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "-",
      ]),
      theme: "striped",
      headStyles: { fillColor: [41, 128, 185] },
    });
    doc.save("requests.pdf");
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
          <span className="font-semibold">Customer Support</span>
        </div>

        <div className="mb-8">
          <p className="text-gray-400 text-sm mb-4 uppercase tracking-wide">Main  Menu</p>
          <nav className="space-y-2">
            {sidebarItems.map((item, i) => (
              <a key={i} onClick={() => navigate(item.link)} className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gradient-to-r from-blue-500 to-indigo-600 cursor-pointer">
                <item.icon size={20} />
                <span>{item.label}</span>
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="bg-gray-950 p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input type="text" id="searchInput" placeholder="Search requests..." onChange={(e) => filterRequests(e.target.value)} className="pl-10 pr-4 py-2 bg-[#151821] border border-gray-900 rounded-lg text-white focus:ring-2 focus:ring-blue-500" />
            </div>
            <button onClick={() => filterRequests(document.getElementById("searchInput").value)} className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
              <Search size={16} /> Search
            </button>
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
            <h1 className="text-3xl font-bold mb-2">Customer Requests</h1>
            <div className="flex items-center gap-4">
              <button onClick={exportToExcel} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
                <FaFileExcel size={16} /> Export Excel
              </button>
              <button onClick={exportToPDF} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2">
                <FaFilePdf size={16} /> Export PDF
              </button>
            </div>
          </div>

          {/* Requests Table */}
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
                  {filteredRequests.map((request) => (
                    <tr key={request._id} className="border-b border-gray-700 hover:bg-gray-700">
                      <td className="py-3 px-4">CS{request._id.slice(0, 3)}</td>
                      <td className="py-3 px-4">{request.name}</td>
                      <td className="py-3 px-4">{request.email}</td>
                      <td className="py-3 px-4">{request.orderId}</td>
                      <td className="py-3 px-4">{request.amount}</td>
                      <td className="py-3 px-4 max-w-xs">
                        {request.reason.length > 50 ? (
                          <span>
                            {request.showFullReason ? request.reason : `${request.reason.slice(0, 50)}... `}
                            <button
                              onClick={() => {
                                setFilteredRequests(prev =>
                                  prev.map(r =>
                                    r._id === request._id ? { ...r, showFullReason: !r.showFullReason } : r
                                  )
                                );
                              }}
                              className="text-blue-400 hover:underline ml-1"
                            >
                              {request.showFullReason ? "Show less" : "Read more"}
                            </button>
                          </span>
                        ) : request.reason}
                      </td>
                      <td className="py-3 px-4">{new Date(request.createdAt).toLocaleDateString()}</td>
                      <td className="py-3 px-4 flex gap-2">
                        <button onClick={() => openReplyPopup(request)} className="px-3 py-1 bg-blue-600 rounded-md hover:bg-blue-700 text-white">Reply</button>
                        <button onClick={() => handleDelete(request._id)} className="px-3 py-1 bg-red-600 rounded-md hover:bg-red-700 text-white">Delete</button>
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
            <div className="bg-gradient-to-br from-purple-700 via-pink-500 to-orange-400 p-6 rounded-2xl w-full max-w-lg shadow-lg text-white">
              <h2 className="text-2xl font-bold mb-4">Reply to Request</h2>
              <p className="mb-2"><strong>Customer Name:</strong> {replyPopup.request.name}</p>
              <p className="mb-2"><strong>Email:</strong> {replyPopup.request.email}</p>
              <p className="mb-4"><strong>Reason:</strong> {replyPopup.request.reason}</p>

              {replyPopup.request.reply && (
                <div className="bg-gray-800 p-3 rounded-md mb-4">
                  <strong>Previous Reply:</strong>
                  <p>{replyPopup.request.reply}</p>
                </div>
              )}

              <textarea
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                placeholder="Enter your reply..."
                className="w-full h-24 p-3 mb-3 rounded-md bg-gray-800 text-white"
              />

              <textarea
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="Additional notes (optional)..."
                className="w-full h-20 p-3 mb-3 rounded-md bg-gray-800 text-white"
              />

              <div className="flex justify-end gap-3 mt-2">
                <button
                  onClick={() => setReplyPopup({ open: false, request: null })}
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

export default CustomerSupportPage;
