import React, { useState, useEffect } from "react";
import Axios from "axios";

const  = () => {
  const [refunds, setRefunds] = useState([]); // Store fetched refund requests
  const [loading, setLoading] = useState(true); // Show loading indicator
  const [error, setError] = useState(""); // Store errors

  useEffect(() => {
    // Function to fetch refund requests
    const fetchRefunds = async () => {
      try {
        const response = await Axios.get("http://localhost:5000/api/refund"); // GET request to backend
        setRefunds(response.data); // Save data to state
        setLoading(false); // Stop loading
      } catch (err) {
        setError("Failed to fetch refund requests");
        setLoading(false);
        console.error(err);
      }
    };

    fetchRefunds(); // Call the fetch function
  }, []); // Empty dependency array = run once when component mounts

  if (loading) return <p>Loading refund requests...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Refund Requests</h1>
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Order ID</th>
            <th className="p-2 border">Amount</th>
            <th className="p-2 border">Reason</th>
          </tr>
        </thead>
        <tbody>
          {refunds.map((r) => (
            <tr key={r._id} className="text-center border-b">
              <td className="p-2 border">{r.name}</td>
              <td className="p-2 border">{r.email}</td>
              <td className="p-2 border">{r.orderId}</td>
              <td className="p-2 border">₹{r.amount}</td>
              <td className="p-2 border">{r.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ;
