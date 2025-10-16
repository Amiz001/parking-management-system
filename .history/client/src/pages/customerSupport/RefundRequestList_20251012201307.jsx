import React, { useState, useEffect } from "react";
import Axios from "axios";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import AutoTable from "jspdf-autotable";
import { useNavigate } from "react-router-dom";
import { Sun, Moon, Search, Settings, Bell, Ellipsis, Trash, ChartColumnBig, SquareParking, HeartHandshake, BanknoteArrowDown, Megaphone, Users, Car, LogOut } from "lucide-react";
import { useClickOutside } from "../../hooks/useClickOutside";

// Combined Page: Refund Form + Refund Dashboard
const RefundPage = () => {
  const [lightMode, setLightMode] = useState(false);

  // Form States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [reason, setReason] = useState("");
  const [amount, setAmount] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Refund Dashboard States
  const [refunds, setRefunds] = useState([]);
  const [filteredRefunds, setFilteredRefunds] = useState([]);
  const [menuIndex, setMenuIndex] = useState(null);
  const menuRef = useClickOutside(() => setMenuIndex(null));
  const navigate = useNavigate();

  // Sidebar navigation
  const sidebarItems = [
    { icon: ChartColumnBig, label: "Dashboard", link: "/admin/dashboard" },
    { icon: SquareParking, label: "Slot Management", link: "/admin/slot-management" },
    { icon: HeartHandshake, label: "Membership plans", link: "/admin/membership-management" },
    { icon: BanknoteArrowDown, label: "Refund requests", link: "/customersupporth/refundrequestlist" },
    { icon: Megaphone, label: "Notifications", link: "/admin/notifications" },
  ];

  const userItems = [
    { icon: Users, label: "User Management", link: "/admin/users" },
    { icon: Car, label: "Vehicles", link: "/admin/vehicles" },
  ];

  const bottomItems = [
    { icon: Settings, link: "/admin/settings", label: "Settings" },
    { icon: LogOut, link: "/", label: "Logout" },
  ];

  // Fetch refunds from backend
  const fetchRefunds = async () => {
    try {
      const res = await Axios.get("http://localhost:5000/api/refund");
      if (res.data.message === "Not Found") setRefunds([]);
      else setRefunds(res.data);
    } catch (err) {
      console.error(err);
      setRefunds([]);
    }
  };

  useEffect(() => { fetchRefunds(); }, []);
  useEffect(() => { setFilteredRefunds(refunds); }, [refunds]);

  const filterRefunds = (searchTerm) => {
    if (!searchTerm) { setFilteredRefunds(refunds); return; }
    const filtered = refunds.filter((r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRefunds(filtered);
  };

  const handleDelete = async (refundId) => {
    try {
      await Axios.delete(`http://localhost:5000/api/refund/${refundId}`);
      toast.success("Refund deleted successfully!");
      fetchRefunds();
    } catch (err) { toast.error("Failed to delete refund"); console.error(err); }
  };

  const exportToExcel = () => {
    if (!filteredRefunds || filteredRefunds.length === 0) { toast.error("No refunds to export"); return; }
    const worksheet = XLSX.utils.json_to_sheet(filteredRefunds);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Refunds");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "refunds.xlsx");
    toast.success("Excel file downloaded successfully!");
  };

  const exportToPDF = () => {
    if (!filteredRefunds || filteredRefunds.length === 0) { toast.error("No refunds to export"); return; }
    const doc = new jsPDF();
    doc.text("Parkbay - Refund Report", 14, 10);
    AutoTable(doc, {
      startY: 20,
      head: [["Name", "Email", "Order ID", "Amount", "Reason", "Created At"]],
      body: filteredRefunds.map(r => [r.name, r.email, r.orderId, r.amount, r.reason, r.createdAt ? new Date(r.createdAt).toLocaleDateString() : "-"]),
      theme: "striped",
      headStyles: { fillColor: [41, 128, 185] },
    });
    doc.save("refunds.pdf");
    toast.success("PDF file downloaded successfully!");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !orderId || !reason || !amount) { setError("Please fill all fields."); return; }
    try {
      const response = await Axios.post("http://localhost:5000/api/refund", { name, email, orderId, reason, amount });
      if (response.status === 200 || response.status === 201) {
        setSubmitted(true); setName(""); setEmail(""); setOrderId(""); setReason(""); setAmount("");
        fetchRefunds(); // Refresh refund list immediately
      } else setError(response.data.message || "Failed to submit refund request.");
    } catch (err) { setError("Network error: Could not connect to server."); console.error(err); }
  };

  return (
    <div className={`flex h-auto ${lightMode ? "light" : "dark"}`}>
      {/* Sidebar */}
      <div className="w-64 h-screen bg-[#151821] p-6 flex flex-col light:bg-white light:shadow-lg light:backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">✦</span>
          </div>
          <span className="text-xl font-semibold">Admin</span>
        </div>

        <div className="mb-8">
          <p className="text-gray-400 light:text-black text-sm mb-4 uppercase tracking-wide">Main Menu</p>
          <nav className="space-y-2">
            {sidebarItems.map((item, index) => (
              <a key={index} onClick={() => navigate(item.link)} className="flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-gray-300 hover:bg-gray-700 light:text-black light:hover:bg-gray-100">
                <item.icon size={20} /><span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="mb-8">
          <p className="text-gray-400 light:text-black text-sm mb-4 uppercase tracking-wide">Users</p>
          <nav className="space-y-2">
            {userItems.map((item, index) => (
              <a key={index} onClick={() => navigate(item.link)} className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 light:text-black hover:bg-gray-700 light:hover:bg-gray-100 transition-colors">
                <item.icon size={20} /><span>{item.label}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-auto space-y-2">
          {bottomItems.map((item, index) => (
            <a key={index} onClick={() => navigate(item.link)} className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 light:text-black hover:bg-gray-700 light:hover:bg-gray-100 transition-colors">
              <item.icon size={20} /><span>{item.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Header */}
        <header className="bg-gray-950 p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input type="text" placeholder="Search by name or email..." onChange={e => filterRefunds(e.target.value)}
                className="pl-10 pr-4 py-2 bg-[#151821] light:bg-white border border-gray-900 light:border-gray-200 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Bell size={20} className="text-gray-400 cursor-pointer" />
            <Settings size={20} className="text-gray-400 cursor-pointer" />
            <Sun onClick={() => setLightMode(true)} size={20} className={`cursor-pointer ${lightMode ? "text-yellow-500 fill-yellow-500" : "text-gray-400"}`} />
            <Moon onClick={() => setLightMode(false)} size={20} className={`cursor-pointer ${!lightMode ? "text-yellow-500 fill-yellow-500" : "text-gray-400"}`} />
          </div>
        </header>

        <main className="flex-1 p-6">
          {/* Refund Form */}
          <div className="mb-8 max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-2 text-center">Refund Request Form</h1>
            {submitted && <div className="text-center text-green-500 font-semibold mb-4">✅ Refund request submitted!</div>}
            {error && <div className="text-center text-red-500 font-semibold mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2 rounded-lg border focus:outline-none"/>
              <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 rounded-lg border focus:outline-none"/>
              <input type="text" placeholder="Order ID" value={orderId} onChange={e => setOrderId(e.target.value)} className="w-full px-4 py-2 rounded-lg border focus:outline-none"/>
              <input type="number" placeholder="Refund Amount" value={amount} onChange={e => setAmount(e.target.value)} className="w-full px-4 py-2 rounded-lg border focus:outline-none"/>
              <textarea placeholder="Reason" value={reason} onChange={e => setReason(e.target.value)} className="w-full px-4 py-2 rounded-lg border focus:outline-none"/>
              <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">💳 Submit Refund</button>
            </form>
          </div>

          {/* Refund Dashboard */}
          <div className="bg-gradient-to-b from-[#151821] to-[#242938] rounded-xl p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-400">
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">ID</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Name</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Email</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Order ID</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Amount</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Reason</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Created At</th>
                    <th className="text-left py-3 px-4 text-gray-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRefunds.map((refund, index) => (
                    <tr key={refund._id} className="border-b border-gray-200 hover:bg-gray-700">
                      <td className="py-4 px-4 text-gray-300">RF{refund._id.slice(0,3)}</td>
                      <td className="py-4 px-4 text-gray-300">{refund.name}</td>
                      <td className="py-4 px-4 text-gray-300">{refund.email}</td>
                      <td className="py-4 px-4 text-gray-300">{refund.orderId}</td>
                      <td className="py-4 px-4 text-gray-300">{refund.amount}</td>
                      <td className="py-4 px-4 text-gray-300">{refund.reason}</td>
                      <td className="py-4 px-4 text-gray-300">{new Date(refund.createdAt).toLocaleDateString()}</td>
                      <td className="py-4 px-4 text-gray-300 relative">
                        <Ellipsis onClick={() => setMenuIndex(index)} />
                        {menuIndex === index && (
                          <div ref={menuRef} className="absolute right-0 w-26 bg-gray-900 text-white border border-gray-700 rounded-md shadow-lg z-20">
                            <ul className="divide-y divide-gray-700">
                              <li className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-red-600 cursor-pointer" onClick={() => handleDelete(refund._id)}>
                                <Trash size={16} /> Delete
                              </li>
                            </ul>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mt-4 flex gap-2">
                <button onClick={exportToExcel} className="px-4 py-2 bg-blue-600 text-white rounded-lg">📊 Export Excel</button>
                <button onClick={exportToPDF} className="px-4 py-2 bg-blue-600 text-white rounded-lg">📄 Export PDF</button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RefundPage;
