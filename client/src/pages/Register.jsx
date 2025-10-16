import { useState, useEffect } from "react";
import { Eye, EyeOff, DollarSign, Laptop, Diamond, Circle } from "lucide-react";
import Logo from "../assets/parkbay.png";
import { toast, ToastContainer } from "react-toastify";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import VerificationPopup from "../components/VerificationPopup "

export default function Login() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [current, setCurrent] = useState(0);

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
      console.log(err)
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

  const slides = [
    {
      id: 1,
      image: "/images/slide1.jpg",
      title: "Seamless Parking Experience",
      subTitle:
        "Find and reserve parking spots in seconds, saving time and avoiding hassle every day.",
    },
    {
      id: 2,
      image: "/images/slide2.jpg",
      title: "Smart Vehicle Management",
      subTitle:
        "Keep track of your vehicles and parking history effortlessly with our intuitive system.",
    },
    {
      id: 3,
      image: "/images/slide3.jpg",
      title: "Safe and Secure Parking",
      subTitle:
        "Enjoy peace of mind with our monitored parking spaces and real-time security updates.",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-blue-950 via-indigo-950 to-black p-4 flex items-center justify-center"
      style={{
        backgroundImage: `linear-gradient(rgba(20, 33, 61, 0.8), rgba(0,0,0, 0.7)), url(${slides[current].image})`,
        backgroundSize: "cover",
      }}
    >
      <ToastContainer
        containerId="login-toast"
        position="top-center"
        autoClose={3000}
        closeOnClick
        style={{
          top: "70px",
          left: "570px",
          height: "10px",
          width: "60px",
        }}
        theme="light"
      />

      <div className="w-full h-160 max-w-6xl bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[600px]">
          {/* Left Panel - Login Form */}
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            {/* Logo */}
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-2">
                {/* <img src={Logo} className="w-30"></img> */}
                <h1 className="text-3xl text-transparent bg-clip-text bg-gradient-to-bl from-blue-600 to-indigo-700 font-bold   ">
                  ParkBay
                </h1>
                <div className="w-2 h-2 bg-gradient-to-bl from-blue-500 to-indigo-600 rounded-full"></div>
              </div>
            </div>

            {/* Welcome Section */}
            <div className="mb-8 animate-fade-in">
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                Register Now!
              </h1>
              <p className="text-gray-600">
                Please enter following in details below
              </p>
            </div>

            {/* Login Form */}
            <div className="space-y-6">
              {/* Name Fields */}
              <div className="flex gap-20">
                <div
                  className="animate-slide-up"
                  style={{ animationDelay: "0.2s" }}
                >
                  <input
                    type="text"
                    placeholder="Enter first name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300 placeholder-gray-500"
                  />
                </div>
                <div
                  className="animate-slide-up"
                  style={{ animationDelay: "0.2s" }}
                >
                  <input
                    type="text"
                    placeholder="Enter last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300 placeholder-gray-500"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div
                className="animate-slide-up"
                style={{ animationDelay: "0.2s" }}
              >
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300 placeholder-gray-500"
                />
              </div>

              {/* Phone number Field */}
              <div
                className="animate-slide-up"
                style={{ animationDelay: "0.2s" }}
              >
                <input
                  type="email"
                  placeholder="Enter phone no"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300 placeholder-gray-500"
                />
              </div>

              {/* Password Field */}
              <div
                className="relative animate-slide-up"
                style={{ animationDelay: "0.3s" }}
              >
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300 placeholder-gray-500 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Sign In Button */}
              <div
                className="animate-slide-up"
                style={{ animationDelay: "0.5s" }}
              >
                <button
                  type="button"
                  onClick={() => handleSubmit()}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-2xl font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                >
                  Sign Up
                </button>
              </div>

              {/* Sign Up Link */}
              <div
                className="text-center mt-11 animate-fade-in"
                style={{ animationDelay: "0.8s" }}
              >
                <span className="text-gray-600">Don't have an account? </span>
                <button
                  onClick={() => navigate("/login")}
                  className="text-gray-900 font-medium hover:underline transition-all"
                >
                  Sign in
                </button>
              </div>
            </div>

            {/* Verification popup */}
            <div className="absolute min-h-screen flex items-center justify-center bg-gray-100">
              {showPopup && (
                <VerificationPopup
                  email= {email}
                  onClose={() => setShowPopup(false)}
                />
              )}
            </div>
          </div>

          {/* Right Panel - slider */}
          <div className="relative bg-gray-900 p-8 lg:p-12 h-full flex flex-col justify-center items-center overflow-hidden">
            <div className="relative mb-8 animate-float">
              <div
                className="relative w-80 h-80 rounded-3xl border border-blue-500/30 flex items-center justify-center"
                style={{
                  backgroundImage: `url(${slides[current].image})`,
                  backgroundSize: "cover",
                }}
              ></div>
            </div>

            <div
              className="text-center text-white animate-fade-in-up"
              style={{ animationDelay: "1s" }}
            >
              <h2 className="text-2xl font-bold mb-4">
                {slides[current].title}
              </h2>
              <p className="text-gray-300 mb-8 max-w-sm">
                {slides[current].subTitle}
              </p>

              {/* Progress Dots */}
              <div className="flex justify-center space-x-2">
                <div
                  className={`w-2 h-2 rounded-full ${
                    current == 0 ? "bg-white" : "bg-white/30"
                  }`}
                ></div>
                <div
                  className={`w-2 h-2 rounded-full ${
                    current == 1 ? "bg-white" : "bg-white/30"
                  }`}
                ></div>
                <div
                  className={`w-2 h-2 rounded-full ${
                    current == 2 ? "bg-white" : "bg-white/30"
                  }`}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
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

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes bounce-gentle {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
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

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 3s ease-in-out infinite;
          animation-delay: 0.5s;
        }
      `}</style>
    </div>
  );
}
