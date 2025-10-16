import React, { useState } from "react";
import { X } from "lucide-react";
import Axios from "axios"
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"

const VerificationPopup = ({ email, onClose, onVerify, onResend }) => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{
        const res = await Axios.post("http://localhost:5000/users/verify", {email, code})

        if(res.data.message == "Email verified successfully"){
            toast.error("Email verified successfully!");
            navigate('/login');
        }
    } catch(err){
        console.log(err.message);
        toast.error("Something went wrong!");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose} 
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900 text-center">
          Verify Your Email
        </h2>
        <p className="text-sm text-gray-600 text-center mt-1">
          We’ve sent a verification code to <br />
          <span className="font-medium">{email}</span>
        </p>

        {/* Input */}
        <form onSubmit={handleSubmit} className="mt-6">
          <input
            type="text"
            placeholder="Enter verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-center text-lg tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Verify Button */}
          <button
            type="submit"
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Verify
          </button>
        </form>

        {/* Resend Code */}
        <div className="text-center mt-3">
          <button
            //onClick={}
            className="text-sm text-blue-600 hover:underline"
          >
            Resend Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationPopup;
