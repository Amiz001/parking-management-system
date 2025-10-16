import React, { useState, useEffect } from "react";
import Axios from "axios";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import AutoTable from "jspdf-autotable";
import { Search, Trash, Ellipsis } from "lucide-react";
import { useClickOutside } from "../../hooks/useClickOutside";

const FeedbackRequest = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [menuIndex, setMenuIndex] = useState(null);
  const menuRef = useClickOutside(() => setMenuIndex(null));

  // Fetch feedback data
  const fetchFeedbacks = async () => {
    try {
      const res = await Axios.get("http://localhost:5000/api/feedback");
      if (res.data.message === "Not Found") return setFeedbacks ([]);
      const feedbacksWithFlag = res.data.map(r => ({ ...r, showFullReason: false }));
      setFeedbacks(feedbacksWithFlag);
    } catch (err) {
      console.error(err);
      setFeedbacks([]);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  useEffect(() => {
    setFilteredFeedbacks(feedbacks);
  }, [feedbacks]);

  // Filter by search
  const filterFeedbacks = (searchTerm) => {
    if (!searchTerm) {
      setFilteredFeedbacks(feedbacks);
      return;
    }
    const filtered = feedbacks.filter((f) =>
      Object.values(f).join(" ").toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFeedbacks(filtered);
  };

  // Delete a feedback entry
  const handleDelete = async (id) => {
    try {
      await Axios.delete(`http://localhost:5000/api/feedback/${id}`);
      toast.success("Feedback deleted successfully!");
      fetchFeedbacks();
    } catch (err) {
      toast.error("Failed to delete feedback");
    }
  };

  // Export to Excel
  const exportToExcel = () => {
    if (filteredFeedbacks.length === 0) {
      toast.error("No feedback to export");
      return;
    }
    const worksheet = XLSX.utils.json_to_sheet(filteredFeedbacks);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Feedbacks");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "feedbacks.xlsx");
    toast.success("Excel downloaded");
  };

  // Export to PDF
  const exportToPDF = () => {
    if (filteredFeedbacks.length === 0) {
      toast.error("No feedback to export");
      return;
    }
    const doc = new jsPDF();
    doc.text("Parkbay - Feedback Report", 14, 10);
    AutoTable(doc, {
      startY: 20,
      head: [["Name", "Email", "Message", "Date"]],
      body: filteredFeedbacks.map((f) => [
        f.name,
        f.email,
        f.message,
        f.createdAt ? new Date(f.createdAt).toLocaleDateString() : "-",
      ]),
      theme: "striped",
      headStyles: { fillColor: [41, 128, 185] },
    });
    doc.save("feedbacks.pdf");
    toast.success("PDF downloaded");
  };

  return (
    <div className="p-6 bg-gray-950 min-h-screen text-white">
      <header className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Feedback Requests</h1>
          <p className="text-gray-400">Manage all customer feedback</p>
        </div>
        <div className="flex gap-3">
          <button onClick={exportToExcel} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
            📊 Excel
          </button>
          <button onClick={exportToPDF} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
            📄 PDF
          </button>
        </div>
      </header>

      <div className="mb-4 flex items-center gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            onChange={(e) => filterFeedbacks(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#151821] border border-gray-700 rounded text-white focus:outline-none"
            placeholder="Search feedback..."
          />
        </div>
      </div>

      <div className="bg-[#1f1f2e] rounded-lg p-4 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-600">
              <th className="py-2 px-4">#</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Message</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFeedbacks.length > 0 ? (
              filteredFeedbacks.map((f, index) => (
                <tr key={f._id} className="border-b border-gray-700 hover:bg-gray-800">
                  <td className="py-2 px-4">FB{index + 1}</td>
                  <td className="py-2 px-4">{f.name}</td>
                  <td className="py-2 px-4">{f.email}</td>
                  <td className="py-2 px-4">{f.message}</td>
                  <td className="py-2 px-4">
                    {f.createdAt ? new Date(f.createdAt).toLocaleDateString() : "-"}
                  </td>
                  <td className="py-2 px-4 relative">
                    <Ellipsis onClick={() => setMenuIndex(index)} className="cursor-pointer" />
                    {menuIndex === index && (
                      <div
                        ref={menuRef}
                        className="absolute right-0 z-10 mt-1 w-28 bg-gray-800 border border-gray-700 rounded shadow-md"
                      >
                        <ul>
                          <li
                            className="flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-600 hover:text-white cursor-pointer"
                            onClick={() => handleDelete(f._id)}
                          >
                            <Trash size={16} /> Delete
                          </li>
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-4 text-gray-400">
                  No feedbacks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackRequest;
