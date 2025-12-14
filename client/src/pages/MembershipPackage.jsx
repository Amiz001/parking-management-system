// src/components/MembershipPackage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import PlanModal from "../pages/PlanModal";
import { FaStar, FaCrown, FaGem, FaCheck, FaInfoCircle } from "react-icons/fa";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MembershipPackage = () => {
  const [membershipPlans, setPlans] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/plan")
      .then((res) => {
        const filteredPlans = (res.data.plans || res.data).filter(
          (plan) => plan.name.toLowerCase() !== "free"
        );
        setPlans(filteredPlans);
      })
      .catch((err) => {
        console.error("Error fetching plans: ", err);
      });
  }, []);

  const handleChoosePlan = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const getIconForPlan = (planName) => {
    switch (planName.toLowerCase()) {
      case "silver":
        return FaStar;
      case "gold":
        return FaCrown;
      case "platinum":
        return FaGem;
      default:
        return FaStar;
    }
  };

  const getPlanColor = (planName) => {
    switch (planName.toLowerCase()) {
      case "silver":
        return {
          bg: "from-gray-400 to-gray-600",
          border: "border-gray-400",
          text: "text-gray-400",
        };
      case "gold":
        return {
          bg: "from-yellow-400 to-yellow-600",
          border: "border-yellow-400",
          text: "text-yellow-400",
        };
      case "platinum":
        return {
          bg: "from-purple-400 to-purple-600",
          border: "border-purple-400",
          text: "text-purple-400",
        };
      default:
        return {
          bg: "from-blue-400 to-blue-600",
          border: "border-blue-400",
          text: "text-blue-400",
        };
    }
  };

  const isLogged = () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const decoded = jwtDecode(token);
    setUser(decoded);
  };

  useEffect(() => {
    isLogged();
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/25 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:py-1">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img
                src="/images/parkbay.png"
                alt="ParkBay Logo"
                className="h-10 w-auto"
                onClick={() => {
                  navigate("/");
                }}
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                onClick={() => navigate("/operator/onlinebookingPage")}
                className="text-gray-300 hover:text-cyan-400 transition-all duration-300 cursor-pointer font-medium"
              >
                Booking
              </a>
              <a
                onClick={() => navigate("/membership-pack")}
                className="text-gray-300 border-b-2 border-cyan-400 transition-all duration-300 cursor-pointer font-medium"
              >
                Pricing
              </a>
              <a
                onClick={() => navigate("/customersupport/feedback")}
                className="text-gray-300 hover:text-cyan-400 transition-all duration-300 cursor-pointer font-medium"
              >
                Feedback
              </a>
              <a
                href="#about"
                className="text-gray-300 hover:text-cyan-400 transition-all duration-300 cursor-pointer font-medium"
              >
                About
              </a>
            </div>

            {/* User Profile or Auth Buttons */}
            <div className="flex items-center">
              {user ? (
                <div className="relative" ref={popupRef}>
                  <div
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 overflow-hidden cursor-pointer border-2 border-cyan-400 hover:scale-110 transition-transform duration-200 shadow-lg shadow-cyan-500/50"
                    onClick={() => setShowPopup(!showPopup)}
                  >
                    <img
                      src={user?.profilePhoto || "/uploads/default.webp"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {showPopup && (
                    <div className="absolute right-0 mt-3 w-48 bg-gray-900 rounded-xl shadow-2xl border border-gray-700 overflow-hidden z-50 backdrop-blur-md">
                      <ul className="text-gray-200 text-sm">
                        {user && user.role !== "user" && (
                          <li
                            onClick={() => redirectUser(user.role)}
                            className="px-4 py-3 hover:bg-cyan-500/20 cursor-pointer transition-colors"
                          >
                            Dashboard
                          </li>
                        )}
                        <li
                          onClick={() => navigate("/profile")}
                          className="px-4 py-3 hover:bg-cyan-500/20 cursor-pointer transition-colors"
                        >
                          Profile
                        </li>
                        <li
                          onClick={handleLogout}
                          className="px-4 py-3 text-red-400 hover:bg-red-500/20 cursor-pointer font-medium transition-colors"
                        >
                          Logout
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-4">
                  <button
                    className="text-gray-300 hover:text-cyan-400 transition-colors font-medium"
                    onClick={() => navigate("/login")}
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => navigate("/register")}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50"
                  >
                    Get Started
                  </button>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-gray-300 ml-4"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-700">
              <div className="flex flex-col space-y-4">
                <a
                  onClick={() => {
                    navigate("/operator/onlinebookingPage");
                    setMobileMenuOpen(false);
                  }}
                  className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Booking
                </a>
                <a
                  onClick={() => {
                    navigate("/membership-pack");
                    setMobileMenuOpen(false);
                  }}
                  className="text-cyan-400 transition-colors cursor-pointer"
                >
                  Pricing
                </a>
                <a
                  onClick={() => {
                    navigate("/customersupport/feedback");
                    setMobileMenuOpen(false);
                  }}
                  className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer"
                >
                  Feedback
                </a>
                <a
                  href="#about"
                  className="text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  About
                </a>
                {!user && (
                  <>
                    <button
                      className="text-gray-300 hover:text-cyan-400 transition-colors text-left"
                      onClick={() => {
                        navigate("/login");
                        setMobileMenuOpen(false);
                      }}
                    >
                      Log In
                    </button>
                    <button
                      onClick={() => {
                        navigate("/register");
                        setMobileMenuOpen(false);
                      }}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2 rounded-lg font-medium transition-all"
                    >
                      Get Started
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
      s{/* Header & Description */}
      <div className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-2">
          Choose the perfect parking plan for your lifestyle
        </p>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Whether you're an occasional visitor or daily commuter, we've got
          flexible packages with guaranteed access and reliable support.
        </p>
      </div>
      {/* Membership Plans */}
      <div className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {membershipPlans.map((plan, index) => {
            const IconComponent = getIconForPlan(plan.name);
            const colors = getPlanColor(plan.name);
            const isHighlighted = plan.highlight || plan.popular;

            return (
              <div
                key={plan._id || index}
                className={`relative rounded-2xl transition-all duration-300 ${
                  isHighlighted
                    ? "transform hover:scale-105 shadow-2xl shadow-blue-500/20"
                    : "hover:scale-102"
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Card */}
                <div
                  className={`h-full rounded-2xl p-8 backdrop-blur-sm ${
                    isHighlighted
                      ? "bg-slate-800/80 border-2 border-blue-500"
                      : "bg-slate-800/50 border border-slate-700 hover:border-slate-600"
                  }`}
                >
                  {/* Icon & Name */}
                  <div className="flex items-center justify-center mb-4">
                    <div
                      className={`p-3 rounded-xl bg-gradient-to-br ${colors.bg}`}
                    >
                      <IconComponent className="text-white" size={32} />
                    </div>
                  </div>
                  <h3
                    className={`text-3xl font-bold text-center mb-2 ${colors.text}`}
                  >
                    {plan.name}
                  </h3>
                  <p className="text-gray-400 text-center text-sm mb-6 min-h-[40px]">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="text-center mb-8">
                    <div className="text-5xl font-extrabold text-white mb-1">
                      {plan.price.split("/")[0]}
                    </div>
                    <div className="text-gray-400 text-sm">
                      per {plan.price.split("/")[1]}
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8 min-h-[280px]">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-gray-300">
                        <FaCheck
                          className={`${colors.text} mt-1 mr-3 flex-shrink-0`}
                          size={16}
                        />
                        <span className="text-sm leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleChoosePlan(plan)}
                    className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                      isHighlighted
                        ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-0.5"
                        : "bg-slate-700 text-white hover:bg-slate-600"
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust Section */}
        <div className="mt-16 text-center">
          <div className="flex items-center justify-center gap-2 text-gray-400 mb-4">
            <FaInfoCircle />
            <p className="text-sm">
              All plans include 24/7 access and easy cancellation
            </p>
          </div>
          <p className="text-gray-500 text-xs">
            Prices exclude applicable taxes. Cancel anytime with no fees.
          </p>
        </div>
      </div>
      {/* Plan Modal */}
      <PlanModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedPlan={selectedPlan}
      />
    </div>
  );
};

export default MembershipPackage;
