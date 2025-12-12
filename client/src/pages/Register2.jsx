import { useState, useEffect } from "react";
import { Eye, EyeOff, Sparkles } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import VerificationPopup from "../components/VerificationPopup";

export default function Login() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!password || !email || !firstName || !lastName || !phone) {
      toast.error("Please fill all fields!", { containerId: "login-toast" });
      return;
    }

    const isValidFirstName = /^[A-Za-z]{2,}$/.test(firstName);
    const isValidLastName = /^[A-Za-z]{2,}$/.test(lastName);
    const isValidPhone = /^[0-9]{10}$/.test(phone);
    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    const isValidPassword = /^(?=.*[0-9]).{5,}$/.test(password);

    if (!isValidPassword) {
      toast.error("Invalid password format", { containerId: "login-toast" });
      return;
    }

    if (!isValidEmail) {
      toast.error("Invalid email address", { containerId: "login-toast" });
      return;
    }

    if (!isValidPhone) {
      toast.error("Invalid phone number", { containerId: "login-toast" });
      return;
    }

    if (!isValidFirstName) {
      toast.error("Invalid first name", { containerId: "login-toast" });
      return;
    }

    if (!isValidLastName) {
      toast.error("Invalid last name", { containerId: "login-toast" });
      return;
    }

    try {
      const response = await Axios.post(
        "http://localhost:5000/users/register",
        {
          firstName,
          lastName,
          phone,
          email,
          password,
        }
      );

      /*
      toast.success("Registration successful!", {
        containerId: "login-toast",
      }); */

      toast.success("Verification email has been sent!");
      setShowPopup(true);
    } catch (err) {
      console.log(err);
      if (
        err.response &&
        (err.response.status === 401 ||
          err.response.status === 404 ||
          err.response.status == 400)
      ) {
        toast.error("Registration failed!", {
          containerId: "login-toast",
        });
      } else {
        toast.error("Something went wrong!", { containerId: "login-toast" });
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background Gradient Blobs */}
      <div className="absolute inset-0 overflow-hidden opacity-50">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      {/* Toast Container */}
      <ToastContainer
        containerId="login-toast"
        position="top-right"
        autoClose={3000}
        closeOnClick
        theme="dark"
      />

      {/* Verification Popup */}
      {showPopup && user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <VerificationPopup
            email={user.email}
            onClose={() => setShowPopup(false)}
          />
        </div>
      )}

      {/* Main Login Container */}
      <div className="relative w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Login Form */}
          <div className="relative">
            {/* Glass Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 lg:p-12 shadow-2xl hover:border-cyan-500/30 transition-all duration-500 group">
              {/* Glow Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-blue-600/0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                {/* Logo 
                <div className="mb-10 animate-fade-in">
                  <div className="flex items-center space-x-2">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                      ParkBay
                    </h1>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">Smart Parking Management</p>
                </div>

                {/* Welcome Section */}
                <div
                  className="mb-8 animate-slide-up"
                  style={{ animationDelay: "0.1s" }}
                >
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Register Now
                  </h2>
                  <p className="text-gray-400">
                    Enter your details to continue
                  </p>
                </div>

                {/* Login Form */}
                <div className="space-y-5">
                  {/* Name Input */}
                  <div
                    className="animate-slide-up flex flex-col gap-4 sm:flex sm:flex-row sm:gap-7"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <div>
                      <label className="text-gray-300 text-sm font-medium mb-2 block">
                        First name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter first name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="w-full sm:w-half px-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/40 transition-all duration-300"
                      />
                    </div>

                    <div>
                      <label className="text-gray-300 text-sm font-medium mb-2 block">
                        Last name
                      </label>
                      <input
                        type="text"
                        placeholder="Enter last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="w-full sm:w-half px-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/40 transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div
                    className="animate-slide-up"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <label className="text-gray-300 text-sm font-medium mb-2 block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/40 transition-all duration-300"
                    />
                  </div>

                  {/* Email Input */}
                  <div
                    className="animate-slide-up"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <label className="text-gray-300 text-sm font-medium mb-2 block">
                      Phone No
                    </label>
                    <input
                      type="text"
                      placeholder="07X-XXX XXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/40 transition-all duration-300"
                    />
                  </div>

                  {/* Password Input */}
                  <div
                    className="animate-slide-up"
                    style={{ animationDelay: "0.3s" }}
                  >
                    <label className="text-gray-300 text-sm font-medium mb-2 block">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                        className="w-full px-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/40 transition-all duration-300 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Sign Up Button */}
                  <div
                    className="animate-slide-up"
                    style={{ animationDelay: "0.5s" }}
                  >
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-3.5 rounded-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/50 active:scale-[0.98]"
                    >
                      Sign Up
                    </button>
                  </div>

                  {/* Sign Up Link */}
                  <div
                    className="text-center animate-fade-in"
                    style={{ animationDelay: "0.7s" }}
                  >
                    <button
                      onClick={() => navigate("/login")}
                      className="text-cyan-400 hover:text-cyan-300 transition-all hover:underline"
                    >
                      Already have an account{" "}
                      <span className="font-bold ml-1">Sign in</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Video Container */}
          <div
            className="relative hidden lg:block animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="relative group">
              {/* Outer Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

              {/* Video Container */}
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                {/* Video */}
                <div className="relative h-[600px]">
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-20"
                  >
                    <source src="/videos/bg.mp4" type="video/mp4" />
                    {/* Fallback gradient background if video doesn't load */}
                  </video>

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>

                  {/* Content Overlay */}
                  <div className="absolute inset-0 flex flex-col justify-end p-10">
                    <div className="space-y-4 animate-fade-in-up">
                      <h3 className="text-4xl font-bold text-white leading-tight">
                        Smart Parking,
                        <br />
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                          Simplified
                        </span>
                      </h3>
                      <p className="text-gray-300 text-lg max-w-md">
                        Experience seamless parking management with real-time
                        availability, secure reservations, and intelligent space
                        optimization.
                      </p>

                      {/* Feature Pills */}
                      <div className="flex flex-wrap gap-2 pt-4">
                        <span className="px-4 py-2 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-cyan-300 text-sm font-medium backdrop-blur-sm">
                          Real-time Tracking
                        </span>
                        <span className="px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full text-blue-300 text-sm font-medium backdrop-blur-sm">
                          Secure Payments
                        </span>
                        <span className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full text-purple-300 text-sm font-medium backdrop-blur-sm">
                          24/7 Support
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Verification popup */}
          <div className="absolute min-h-screen flex items-center justify-center bg-gray-100">
            {showPopup && (
              <VerificationPopup
                email={email}
                onClose={() => setShowPopup(false)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blob {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -20px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(20px, 20px) scale(1.05);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-blob {
          animation: blob 12s ease-in-out infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
