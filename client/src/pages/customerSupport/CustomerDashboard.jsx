// ===================== IMPORTS =====================
import React, { useState } from "react"; 
// React: main library for building UI
// useState: React hook to manage component state

import {
  ChartColumnBig,
  HeartHandshake,
  BanknoteArrowDown,
  Megaphone,
  Users,
  Car,
  Settings,
  LogOut,
  Bell,
  Sun,
  Moon,
  MessageSquare,
  Ticket,
  RefreshCw,
  CreditCard,
  Mail,
} from "lucide-react"; 
// Lucide icons for sidebar, buttons, and actions

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts"; 
// Recharts library for charts (bar chart and pie chart components)

import { motion } from "framer-motion"; 
// Framer Motion for smooth animations

// ===================== COMPONENT =====================
const CustomerDashboard = () => {
  // ----------------- STATES -----------------
  const [lightMode, setLightMode] = useState(false); 
  // Boolean state for theme: false = dark, true = light

  const [activeSection, setActiveSection] = useState("feedback"); 
  // Tracks which sidebar section is active

  // ----------------- MOCK DATA -----------------
  const feedbackData = [
    { id: 1, message: "Great service!", date: "2025-09-15", rating: 5 },
    { id: 2, message: "Fast refund process.", date: "2025-09-18", rating: 4 },
    { id: 3, message: "App crash sometimes.", date: "2025-09-20", rating: 2 },
  ]; 
  // Feedback messages and ratings

  const complaintData = [
    { id: 1, message: "Slot was full.", status: "Open" },
    { id: 2, message: "App crash issue.", status: "Resolved" },
    { id: 3, message: "Payment failed.", status: "Pending" },
  ]; 
  // Complaints with status

  const ticketData = [
    { id: 1, issue: "Payment failed", status: "Pending" },
    { id: 2, issue: "App login error", status: "Resolved" },
  ]; 
  // Support tickets

  const refundData = [
    { id: 1, amount: "$25", status: "Processed" },
    { id: 2, amount: "$15", status: "Pending" },
    { id: 3, amount: "$10", status: "Processed" },
  ]; 
  // Refund requests

  const notificationData = [
    { id: 1, title: "Payment Successful", message: "Your payment of $50 was successful.", date: "2025-09-20" },
    { id: 2, title: "Slot Available", message: "A parking slot is now available near you.", date: "2025-09-21" },
    { id: 3, title: "App Update", message: "Version 2.1 is now available. Please update.", date: "2025-09-22" },
  ]; 
  // Notifications

  const COLORS = ["#4f46e5", "#10b981", "#f59e0b", "#ef4444"];
  // Colors for charts

  const sidebarItems = [
    { icon: MessageSquare, label: "Feedback", key: "feedback" },
    { icon: Megaphone, label: "Complaints", key: "complaints" },
    { icon: Ticket, label: "Tickets", key: "tickets" },
    { icon: RefreshCw, label: "Refunds", key: "refunds" },
    { icon: Mail, label: "Notifications", key: "notifications" },
    { icon: Car, label: "My Vehicles", key: "vehicles" },
    { icon: CreditCard, label: "Billing & Plans", key: "billing" },
  ]; 
  // Sidebar items with icon, label, and key

  // ----------------- ANIMATION -----------------
  const sectionVariants = {
    hidden: { opacity: 0, x: -20 }, // start hidden and left
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }, // fade in
    exit: { opacity: 0, x: 20, transition: { duration: 0.3 } }, // fade out
  };

  // ----------------- SECTION RENDER -----------------
  const renderSection = () => {
    switch (activeSection) {
      // --------- Feedback ---------
      case "feedback":
        return (
          <motion.div
            key="feedback"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold">Customer Feedback</h2>

            {/* Bar chart */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold mb-2">Feedback Ratings</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={feedbackData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="rating" fill="#4f46e5" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Feedback list */}
            <div className="space-y-2">
              {feedbackData.map((f) => (
                <div key={f.id} className="p-3 rounded-lg bg-indigo-600 text-white flex justify-between items-center">
                  <span>{f.message}</span>
                  <span>Rating: {f.rating}</span>
                </div>
              ))}
            </div>
          </motion.div>
        );

      // --------- Complaints ---------
      case "complaints":
        const complaintSummary = complaintData.reduce((acc, curr) => {
          acc[curr.status] = (acc[curr.status] || 0) + 1;
          return acc;
        }, {});
        const complaintChartData = Object.keys(complaintSummary).map((key) => ({ name: key, value: complaintSummary[key] }));

        return (
          <motion.div key="complaints" variants={sectionVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
            <h2 className="text-2xl font-bold">Customer Complaints</h2>
            {/* Pie chart */}
            <div className="bg-white p-4 rounded-lg shadow w-full h-64">
              <h3 className="font-semibold mb-2">Complaint Status</h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={complaintChartData} dataKey="value" nameKey="name" outerRadius={80} label>
                    {complaintChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* List */}
            <div className="space-y-2">
              {complaintData.map((c) => (
                <div key={c.id} className="p-3 rounded-lg bg-red-600 text-white flex justify-between items-center">
                  <span>{c.message}</span>
                  <span>{c.status}</span>
                </div>
              ))}
            </div>
          </motion.div>
        );

      // --------- Tickets ---------
      case "tickets":
        const ticketSummary = ticketData.reduce((acc, curr) => {
          acc[curr.status] = (acc[curr.status] || 0) + 1;
          return acc;
        }, {});
        const ticketChartData = Object.keys(ticketSummary).map((key) => ({ name: key, value: ticketSummary[key] }));

        return (
          <motion.div key="tickets" variants={sectionVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
            <h2 className="text-2xl font-bold">Support Tickets</h2>
            <div className="bg-white p-4 rounded-lg shadow w-full h-64">
              <h3 className="font-semibold mb-2">Ticket Status</h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={ticketChartData} dataKey="value" nameKey="name" outerRadius={80} label>
                    {ticketChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {ticketData.map((t) => (
                <div key={t.id} className="p-3 rounded-lg bg-green-600 text-white flex justify-between items-center">
                  <span>{t.issue}</span>
                  <span>{t.status}</span>
                </div>
              ))}
            </div>
          </motion.div>
        );

      // --------- Refunds ---------
      case "refunds":
        const refundSummary = refundData.reduce((acc, curr) => {
          acc[curr.status] = (acc[curr.status] || 0) + 1;
          return acc;
        }, {});
        const refundChartData = Object.keys(refundSummary).map((key) => ({ name: key, value: refundSummary[key] }));

        return (
          <motion.div key="refunds" variants={sectionVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
            <h2 className="text-2xl font-bold">Refund Requests</h2>
            <div className="bg-white p-4 rounded-lg shadow w-full h-64">
              <h3 className="font-semibold mb-2">Refund Status</h3>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={refundChartData} dataKey="value" nameKey="name" outerRadius={80} label>
                    {refundChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-2">
              {refundData.map((r) => (
                <div key={r.id} className="p-3 rounded-lg bg-yellow-500 text-black flex justify-between items-center">
                  <span>Amount: {r.amount}</span>
                  <span>{r.status}</span>
                </div>
              ))}
            </div>
          </motion.div>
        );

      // --------- Notifications ---------
      case "notifications":
        return (
          <motion.div key="notifications" variants={sectionVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
            <h2 className="text-2xl font-bold">Notifications</h2>
            <div className="space-y-2">
              {notificationData.map((n) => (
                <div key={n.id} className="p-3 rounded-lg bg-blue-500 text-white flex flex-col gap-1">
                  <span className="font-semibold">{n.title}</span>
                  <span className="text-sm">{n.message}</span>
                  <span className="text-xs text-gray-200">{n.date}</span>
                </div>
              ))}
            </div>
          </motion.div>
        );

      // --------- Vehicles ---------
      case "vehicles":
        return (
          <motion.div key="vehicles" variants={sectionVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
            <h2 className="text-2xl font-bold">My Vehicles</h2>
            <p>2 registered vehicles</p>
          </motion.div>
        );

      // --------- Billing ---------
      case "billing":
        return (
          <motion.div key="billing" variants={sectionVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
            <h2 className="text-2xl font-bold">Billing & Membership</h2>
            <p>Premium Plan – Renews on 22 Oct 2025</p>
          </motion.div>
        );

      default:
        return <p>Select a section from the sidebar.</p>;
    }
  };

  // ===================== RETURN JSX =====================
  return (
    <div className={`flex h-screen ${lightMode ? "bg-gray-100 text-black" : "bg-gray-950 text-white"}`}>
      {/* ----------------- SIDEBAR ----------------- */}
      <aside className={`w-64 p-6 flex flex-col ${lightMode ? "bg-white shadow-lg" : "bg-gray-900"}`}>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">✦</span>
          </div>
          <span className="text-L font-semibold">Customer Dashboard</span>
        </div>

        <nav className="space-y-2 flex-1">
          {sidebarItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeSection === item.key
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                  : "text-gray-300 hover:bg-gray-700 light:text-black light:hover:bg-gray-100"
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-2">
          <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors" onClick={() => setLightMode(!lightMode)}>
            {lightMode ? <Moon size={20} /> : <Sun size={20} />}
            {lightMode ? "Dark Mode" : "Light Mode"}
          </button>
          <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* ----------------- MAIN CONTENT ----------------- */}
      <main className="flex-1 p-6 overflow-y-auto">{renderSection()}</main>
    </div>
  );
};

// Export component
export default CustomerDashboard;
