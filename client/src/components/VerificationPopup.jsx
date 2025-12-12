import React, { useState } from "react";
import { X } from "lucide-react";
import Axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const VerificationPopup = ({ email, onClose }) => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await Axios.post("http://localhost:5000/users/verify", {
        email,
        code,
      });

      if (res.data.message === "Email verified successfully") {
        toast.success("Email verified successfully!");
        navigate("/login");
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <div className="relative w-full max-w-md p-6 rounded-3xl border border-white/10 bg-gray-900/20 backdrop-blur-xl shadow-[0_0_20px_rgba(0,255,255,0.25)]">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-300 hover:text-white transition"
        >
          <X size={22} />
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Verify Your Email
        </h2>
        <p className="text-sm text-gray-300 text-center mt-1">
          A verification code has been sent to <br />
          <span className="font-medium text-cyan-400">{email}</span>
        </p>

        {/* Input */}
        <form onSubmit={handleSubmit} className="mt-6">
          <input
            type="text"
            placeholder="Enter verification code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 
                       text-center text-lg tracking-widest text-white
                       focus:outline-none focus:ring-2 focus:ring-cyan-500/40 
                       placeholder-gray-400"
          />

          {/* Verify Button */}
          <button
            type="submit"
            className="w-full mt-5 py-3 rounded-xl font-semibold text-white
                       bg-gradient-to-r from-cyan-500 to-blue-600
                       hover:scale-[1.02] transition-all duration-200
                       shadow-[0_0_18px_rgba(0,200,255,0.4)] hover:shadow-[0_0_25px_rgba(0,200,255,0.6)]"
          >
            Verify
          </button>
        </form>

        {/* Resend Code */}
        <div className="text-center mt-4">
          <button
            className="text-sm text-cyan-400 hover:text-cyan-300 hover:underline transition"
          >
            Resend Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationPopup;
