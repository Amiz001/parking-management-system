import { useState, useEffect } from "react";
import { Check, X, ArrowLeft, FileText, Clock } from "lucide-react";
import Axios from "axios";
import { toast } from "react-toastify";
import { formatDate } from "../utils/formatDate";

export default function DeleteRequests({ status, onClose }) {
  // this is a DELETE REQUEST, not a user
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [deleteRequests, setDeleteRequests] = useState([]);

  // ================= FETCH =================
  const fetchDeleteRequests = async () => {
    try {
      const res = await Axios.get(
        "http://localhost:5000/users/delete-req"
      );

      if (res.data?.message === "No delete requests found") {
        setDeleteRequests([]);
        return;
      }

      setDeleteRequests(res.data);
    } catch (err) {
      console.error("Error fetching delete requests:", err);
      toast.error("Failed to fetch delete requests");
    }
  };

  // ================= UPDATE STATUS =================
  const updateStatus = async (requestId, newStatus) => {
    try {
      const res = await Axios.patch(
        `http://localhost:5000/users/${requestId}`,
        { status: newStatus }
      );

      if (res.status === 200 || res.status === 202) {
        toast.success(`Request ${newStatus}`);
        fetchDeleteRequests(); // refresh list
      } else {
        toast.error("Failed to update status");
      }
    } catch (err) {
      console.error("Status update error:", err);
      toast.error("Error updating status");
    }
  };

  useEffect(() => {
    fetchDeleteRequests();
  }, []);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/80 z-50 ${
        status ? "visible" : "hidden"
      }`}
    >
      <div className="bg-[#151821] text-white rounded-2xl shadow-2xl w-[600px] p-6 border border-gray-800">

        {/* ================= LIST VIEW ================= */}
        {!selectedRequest ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-blue-500">
                Profile Delete Requests
              </h2>
              <X
                size={22}
                className="cursor-pointer hover:text-gray-300"
                onClick={onClose}
              />
            </div>

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {deleteRequests.map((req) => (
                <div
                  key={req._id}
                  className="flex items-center justify-between bg-[#242938] p-4 rounded-lg hover:bg-gray-700 transition"
                >
                  <div>
                    <p className="font-medium text-lg flex items-center gap-2">
                      <FileText size={18} className="text-indigo-500" />
                      {req.userId?.fname} {req.userId?.lname}
                    </p>

                    <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                      <Clock size={14} />
                      {formatDate(req.createdAt)}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedRequest(req)}
                    className="px-4 py-2 rounded-md bg-gradient-to-l from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 transition text-sm"
                  >
                    Review
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* ================= REVIEW VIEW ================= */}
            <button
              onClick={() => setSelectedRequest(null)}
              className="flex items-center gap-1 text-sm text-gray-400 mb-5 hover:text-gray-200 transition"
            >
              <ArrowLeft size={16} /> Back
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-blue-500">
              Review Request
            </h2>

            <div className="bg-[#242938] p-5 rounded-lg space-y-3 border border-gray-700">
              <p className="text-lg font-medium">
                <span className="text-gray-400">Name:</span>{" "}
                {selectedRequest.userId?.fname}{" "}
                {selectedRequest.userId?.lname}
              </p>

              <p>
                <span className="text-gray-400">Email:</span>{" "}
                {selectedRequest.userId?.email}
              </p>

              <p>
                <span className="text-gray-400">Request Date:</span>{" "}
                {formatDate(selectedRequest.createdAt)}
              </p>

              <p className="italic text-gray-300">
                <span className="text-gray-400 not-italic">Reason:</span>{" "}
                {selectedRequest.reason}
              </p>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => {
                  updateStatus(selectedRequest._id, "accepted");
                  setSelectedRequest(null);
                }}
                className="flex items-center gap-2 px-5 py-2 rounded-md bg-blue-500 hover:bg-blue-400 transition"
              >
                <Check size={18} /> Accept
              </button>

              <button
                onClick={() => {
                  updateStatus(selectedRequest._id, "declined");
                  setSelectedRequest(null);
                }}
                className="flex items-center gap-2 px-5 py-2 rounded-md bg-red-600 hover:bg-red-500 transition"
              >
                <X size={18} /> Decline
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
