import React, { useState } from "react";
import { ChevronRight, Lock, Mail, Eye, EyeOff } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import VerificationPopup from "../components/VerificationPopup"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [current, setCurrent] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!password || !email) {
      toast.error("Please fill all fields!", { containerId: "login-toast" });
      return;
    }

    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    const isValidPassword = /^(?=.*[0-9]).{5,}$/.test(password);

    if (!isValidPassword || !isValidEmail) {
      toast.error("Invalid inputs", { containerId: "login-toast" });
      return;
    }

    try {
      const response = await Axios.post(
        "http://localhost:5000/users/validate",
        {
          email,
          password,
          rememberMe
        }
      );

      if (!response.data || !response.data.token) {
        toast.error("Login failed! No token received.", {
          containerId: "login-toast",
        });
        return;
      }

      if (!response.data.user.isVerified) {
        toast.error("Please verify your account before logged in!");
        setUser(response.data.user)
        setShowPopup(true);
        return;
      }

      localStorage.setItem("token", response.data.token);
      toast.success("Login successful!", { containerId: "login-toast" });
      navigate('/');

    } catch (err) {
      if (
        err.response &&
        (err.response.status === 401 || err.response.status === 404)
      ) {
        toast.error("Invalid email or password", {
          containerId: "login-toast",
        });
      } else {
        toast.error("Something went wrong!", { containerId: "login-toast" });
      }
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">

      <ToastContainer
        containerId="login-toast"
        position="top-center"
        autoClose={3000}
        closeOnClick
        style={{
          top: "100px",
          left: "550px",
          height: "20px",
          width: "80px",
        }}
        theme="light"
      />

      {/* Verification popup */}
      <div className="absolute z-10 min-h-screen flex items-center justify-center bg-gray-100">
        {showPopup && user && (
          <VerificationPopup
            email={user.email}
            onClose={() => setShowPopup(false)}
          />
        )}
      </div>

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
        style={{ filter: "blur(8px)" }}
      >
        <source src="videos/bg.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay with Gradient */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-black/80 via-gray-950/70 to-cyan-900/70"></div>

      {/* Login Card Container */}
      <div className="relative z-10 w-full max-w-md px-6 animate-fadeIn">
        {/* Glassmorphism Card */}
        <div className="backdrop-blur-md bg-white/5 rounded-2xl border border-white/10 shadow-2xl shadow-cyan-500/20 p-8 sm:p-10">
          <div className="absolute bottom-20 right-5 w-96 h-96 bg-gradient-to-br from-cyan-500/15 to-blue-500/15 rounded-full blur-3xl"></div>

          {/* Logo/Brand Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-300 text-sm">
              Sign in to access your parking dashboard
            </p>
          </div>

          {/* Login Form Container */}
          <div className="space-y-6">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-300"
                  placeholder="••••••••"
                />
                {password && (<button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {!showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>)}
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center text-gray-300 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="mr-2 w-4 h-4 rounded border-white/10 bg-white/5 text-cyan-500 focus:ring-cyan-500/50 focus:ring-2"
                />
                <span className="group-hover:text-white transition-colors">
                  Remember me
                </span>
              </label>
              <button
                type="button"
                onClick={() => navigate("/reset-password")}
                className="text-cyan-400 hover:text-cyan-300 transition-colors font-medium"
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="group w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-3.5 rounded-lg font-medium text-lg transition-all duration-300 inline-flex items-center justify-center space-x-2 shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-500/60 hover:scale-[1.02]"
            >
              <span>Sign In</span>
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Footer Text */}
        <p className="text-center text-gray-500 text-xs mt-6">
          By signing in, you agree to our{" "}
          <button
            type="button"
            onClick={() => console.log("Terms clicked")}
            className="text-gray-400 hover:text-gray-300 transition-colors"
          >
            Terms
          </button>{" "}
          and{" "}
          <button
            type="button"
            onClick={() => console.log("Privacy Policy clicked")}
            className="text-gray-400 hover:text-gray-300 transition-colors"
          >
            Privacy Policy
          </button>
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
