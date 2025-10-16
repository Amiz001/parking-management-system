// RefundDashboardFull.jsx
import React, { useState, useEffect } from "react";

const mockRefunds = [
  {
    _id: "1",
    name: "John Doe",
    email: "john@example.com",
    orderId: "ORD123",
    amount: "$50",
    reason: "Wrong item delivered",
    createdAt: new Date(),
    reply: "",
  },
  {
    _id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    orderId: "ORD456",
    amount: "$100",
    reason: "Item arrived damaged",
    createdAt: new Date(),
    reply: "We will refund within 3 days",
  },
];

const RefundDashboardFull = () => {
  const [refunds, setRefunds] = useState([]);
  const [filteredRefunds, setFilteredRefunds] = useState([]);
  const [replyPopup, setReplyPopup] = useState({ open: false, refund: null });
  const [replyMessage, setReplyMessage] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");

  useEffect(() => {
    // Simulate fetching refunds
    setRefunds(mockRefunds);
    setFilteredRefunds(mockRefunds);
  }, []);

  const filterRefunds = (term) => {
    if (!term) return setFilteredRefunds(refunds);
    const filtered = refunds.filter((r) =>
      Object.values(r).join(" ").toLowerCase().includes(term.toLowerCase())
    );
    setFilteredRefunds(filtered);
  };

  const openReply = (refund) => {
    setReplyPopup({ open: true, refund });
    setReplyMessage(refund.reply || "");
    setAdditionalNotes("");
  };

  const sendReply = () => {
    if (!replyMessage.trim()) return alert("Enter reply message!");
    alert(`Reply sent:\n${replyMessage}\nNotes: ${additionalNotes}`);
    setReplyPopup({ open: false, refund: null });
    setReplyMessage("");
    setAdditionalNotes("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Refund Requests</h1>

      <input
        type="text"
        placeholder="Search refunds..."
        onChange={(e) => filterRefunds(e.target.value)}
        className="mb-4 p-2 rounded w-full text-black"
      />

      <div className="overflow-x-auto bg-gradient-to-b from-gray-800 via-blue-800 to-gray-900 rounded-xl p-4 backdrop-blur-md">
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="border-b border-blue-500">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Reason</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRefunds.map((r) => (
              <tr key={r._id} className="border-b border-blue-700 hover:bg-blue-800">
                <td className="px-4 py-2">{r._id}</td>
                <td className="px-4 py-2">{r.name}</td>
                <td className="px-4 py-2">{r.email}</td>
                <td className="px-4 py-2">{r.orderId}</td>
                <td className="px-4 py-2">{r.amount}</td>
                <td className="px-4 py-2 max-w-xs">
                  {r.reason.length > 50 ? r.reason.slice(0, 50) + "..." : r.reason}
                </td>
                <td className="px-4 py-2">
                  <button
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded mr-2"
                    onClick={() => openReply(r)}
                  >
                    Reply
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Reply Popup */}
      {replyPopup.open && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-gray-900 p-6 rounded-2xl w-full max-w-lg shadow-lg text-white">
            <h2 className="text-2xl font-bold mb-4">Reply to Refund</h2>
            <p className="mb-2">
              <strong>Customer:</strong> {replyPopup.refund.name}
            </p>
            <p className="mb-2">
              <strong>Email:</strong> {replyPopup.refund.email}
            </p>
            <p className="mb-4">
              <strong>Reason:</strong> {replyPopup.refund.reason}
            </p>

            {replyPopup.refund.reply && (
              <div className="bg-gray-800 p-3 rounded-md mb-4">
                <strong>Previous Reply:</strong>
                <p>{replyPopup.refund.reply}</p>
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
                onClick={() => setReplyPopup({ open: false, refund: null })}
                className="px-4 py-2 bg-gray-600 rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={sendReply}
                className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700"
              >
                Send Reply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RefundDashboardFull;
