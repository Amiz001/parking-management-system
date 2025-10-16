import { useState, useEffect } from "react";
import { Eye, EyeOff, DollarSign, Laptop, Diamond, Circle } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [current, setCurrent] = useState(0);
  const [page, setPage] = useState(0);
  const [user, setUser] = useState(null);
  const [code, setCode] = useState("");
  const [reEnteredPassword, setReEnteredPassword] = useState("");

  const navigate = useNavigate();

  //Page 1 - function
  const handleNext = async () => {
    if (!email) {
      toast.error("Please fill all fields!", { containerId: "login-toast" });
      return;
    }

    const isValidEmail = /\S+@\S+\.\S+/.test(email);

    if (!isValidEmail) {
      toast.error("Invalid inputs", { containerId: "login-toast" });
      return;
    }

    try {
      const response = await Axios.post(
        "http://localhost:5000/users/verify-email",
        {
          email,
        }
      );

      if (!response.data || !response.data.user) {
        toast.error("Invalid email address!", {
          containerId: "login-toast",
        });
        return;
      }

      toast.success("Password reset code sent to your email!", {
        containerId: "login-toast",
      });
      setPage(1);
      setUser(response.data.user);
    } catch (err) {
      if (
        err.response &&
        (err.response.status === 401 || err.response.status === 404)
      ) {
        toast.error("Invalid email address", {
          containerId: "login-toast",
        });
      } else {
        toast.error("Something went wrong!", { containerId: "login-toast" });
      }
    }
  };

  //Page 2 - function
  const handleVerify = async () => {
    if (!code) {
      toast.error("Please enter verification code!", {
        containerId: "login-toast",
      });
      return;
    }

    const isValidCode = /^\d{6}$/.test(code);

    if (!isValidCode) {
      toast.error("Invalid verification code format!", {
        containerId: "login-toast",
      });
      return;
    }

    try {
      const response = await Axios.post(
        "http://localhost:5000/users/verify-code",
        {
          email,
          code,
        }
      );

      if (!response.data.message === "Email verified successfully") {
        toast.error("Invalid verification code!", {
          containerId: "login-toast",
        });
        return;
      }

      toast.success("Verification successful!", { containerId: "login-toast" });
      setPage(2);
    } catch (err) {
      if (
        err.response &&
        (err.response.status === 401 || err.response.status === 404)
      ) {
        toast.error("Invalid email address", {
          containerId: "login-toast",
        });
      } else {
        toast.error("Something went wrong!", { containerId: "login-toast" });
      }
    }
  };

  //Page 3 - function
  const handleSubmit = async () => {
    if (!password || !reEnteredPassword) {
      toast.error("Please fill the given fields!", {
        containerId: "login-toast",
      });
      return;
    }

    const isValidPassword = /^(?=.*[0-9]).{5,}$/.test(password);
    const isValidReEnteredPassword = /^(?=.*[0-9]).{5,}$/.test(
      reEnteredPassword
    );

    if (!isValidPassword || !isValidReEnteredPassword) {
      toast.error("Invalid password format!", { containerId: "login-toast" });
      return;
    }

    if (password != reEnteredPassword) {
      toast.error("Passwords not matching!", { containerId: "login-toast" });
      return;
    }

    try {
      const response = await Axios.patch(
        `http://localhost:5000/users/reset-password/${user._id}`,
        {
          password,
        }
      );

      if (!response.data.message === "Password changed successfully") {
        toast.error("Failed to change password!", {
          containerId: "login-toast",
        });
        return;
      }

      toast.success("Password changed successfully!", {
        containerId: "login-toast",
      });
      
      navigate("/login");
    } catch (err) {
      if (
        err.response &&
        (err.response.status === 401 || err.response.status === 404)
      ) {
        toast.error("Failed to change password!", {
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
          top: "100px",
          left: "550px",
          height: "20px",
          width: "80px",
        }}
        theme="light"
      />

      <div className="w-full h-160 max-w-6xl bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[600px]">
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <div className="mb-12 mt-20">
              <div className="flex items-center space-x-2 mb-2">
                <h1 className="text-3xl text-transparent bg-clip-text bg-gradient-to-bl from-blue-600 to-indigo-700 font-bold">
                  ParkBay
                </h1>
                <div className="w-2 h-2 bg-gradient-to-bl from-blue-500 to-indigo-600 rounded-full"></div>
              </div>
            </div>

            {page == 0 && (
              <>
                <div className="mb-8 animate-fade-in">
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">
                    Reset password
                  </h1>
                  <p className="text-gray-600">
                    Please enter registered email below
                  </p>
                </div>
                <div className="space-y-6">
                  <div
                    className="animate-slide-up"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300 placeholder-gray-500"
                    />
                  </div>

                  <div
                    className="animate-slide-up"
                    style={{ animationDelay: "0.5s" }}
                  >
                    <button
                      type="button"
                      onClick={() => handleNext()}
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-2xl font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                    >
                      Next
                    </button>
                  </div>

                  <div
                    className="text-center mt-18 animate-fade-in mb-20"
                    style={{ animationDelay: "0.8s" }}
                  >
                    <span className="text-gray-600">Back to </span>
                    <button
                      onClick={() => navigate("/login")}
                      className="text-gray-900 font-medium hover:underline transition-all"
                    >
                      Login
                    </button>
                  </div>
                </div>{" "}
              </>
            )}

            {/* Page 2 */}

            {page == 1 && (
              <>
                <div className="mb-8 animate-fade-in">
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">
                    Verify
                  </h1>
                  <p className="text-gray-600">
                    We sent a password reset code to {user ? user.email : ""}
                  </p>
                </div>
                <div className="space-y-6">
                  <div
                    className="animate-slide-up"
                    style={{ animationDelay: "0.2s" }}
                  >
                    <input
                      type="text"
                      placeholder="Password reset code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="w-full px-4 py-4 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all duration-300 placeholder-gray-500"
                    />
                  </div>

                  <div
                    className="animate-slide-up"
                    style={{ animationDelay: "0.5s" }}
                  >
                    <button
                      type="button"
                      onClick={() => handleVerify()}
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-2xl font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                    >
                      Verify
                    </button>
                  </div>

                  <div
                    className="text-center mt-18 animate-fade-in mb-20"
                    style={{ animationDelay: "0.8s" }}
                  >
                    <span className="text-gray-600">Back to </span>
                    <button
                      onClick={() => navigate("/login")}
                      className="text-gray-900 font-medium hover:underline transition-all"
                    >
                      Login
                    </button>
                  </div>
                </div>{" "}
              </>
            )}

            {/* Page 3 */}

            {page == 2 && (
              <>
                <div className="mb-8 animate-fade-in">
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">
                    Reset password
                  </h1>
                  <p className="text-gray-600">Please fill below fields</p>
                </div>
                <div className="space-y-6">
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

                  <div
                    className="relative animate-slide-up"
                    style={{ animationDelay: "0.3s" }}
                  >
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Re-enter password"
                      value={reEnteredPassword}
                      onChange={(e) => setReEnteredPassword(e.target.value)}
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

                  <div
                    className="animate-slide-up"
                    style={{ animationDelay: "0.5s" }}
                  >
                    <button
                      type="button"
                      onClick={() => handleSubmit()}
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white py-4 rounded-2xl font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
                    >
                      Submit
                    </button>
                  </div>

                  <div
                    className="text-center mt-18 animate-fade-in mb-20"
                    style={{ animationDelay: "0.8s" }}
                  >
                    <span className="text-gray-600">Back to </span>
                    <button
                      onClick={() => navigate("/register")}
                      className="text-gray-900 font-medium hover:underline transition-all"
                    >
                      Login
                    </button>
                  </div>
                </div>{" "}
              </>
            )}
          </div>

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
