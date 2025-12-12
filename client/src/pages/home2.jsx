import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
  Car,
  MapPin,
  Clock,
  Shield,
  Users,
  CreditCard,
  SquareParking,
  ChevronRight,
  ChevronDown,
  Star,
  Menu,
  X,
} from "lucide-react";
import Logo from "../assets/parkbay.png";
import { useNavigate } from "react-router-dom";
import { useClickOutside } from "../hooks/useClickOutside";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ParkingLandingPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useClickOutside(() => setShowPopup(false));
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const logos = [
    "/images/logo1.png",
    "/images/logo2.png",
    "/images/logo3.png",
    "/images/logo4.png",
    "/images/logo5.png",
    "/images/logo6.png",
    "/images/logo8.png",
  ];

  const faqs = [
    {
      question: "Can I modify my parking reservation?",
      answer:
        "Yes, you can modify your parking reservation up to 2 hours before your scheduled time through our app or website.",
    },
    {
      question: "Is there an education discount?",
      answer:
        "We offer special rates for students and educational institutions. Contact our support team for more details.",
    },
    {
      question: "Can we add users later?",
      answer:
        "Absolutely! You can add or remove users from your account at any time through the admin dashboard.",
    },
    {
      question: "How are payments processed?",
      answer:
        "We use secure payment processing with multiple options including credit cards, digital wallets, and monthly billing.",
    },
    {
      question: "How do I get support?",
      answer:
        "Our support team is available 24/7 through live chat, email, or phone. Premium users get priority support.",
    },
    {
      question: "Do I need to upgrade?",
      answer:
        "You can start with our free plan and upgrade as your parking needs grow. We'll recommend the best plan for your usage.",
    },
  ];

  const isLogged = () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const decoded = jwtDecode(token);
    setUser(decoded);
  };

  useEffect(() => {
    isLogged();
  }, []);

  const redirectUser = (role) => {
    switch (role) {
      case "user":
        navigate("/");
        break;
      case "admin":
        navigate("/admin/dashboard");
        break;
      case "operator":
        navigate("/operator/dashboard");
        break;
      case "customer support":
        navigate("/customersupport/dashboard");
        break;
      default:
        navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [isLoggedIn]);

  useEffect(() => {
    const elements = gsap.utils.toArray(".reveal-section");

    elements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0.2, y: 30, scale: 0.9, filter: "blur(8spx)" },
        {
          opacity: 1,
          y: 24,
          scale: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div className="bg-black min-h-screen">
      {/* ============================================
          GLASSMORPHISM NAVIGATION BAR - FIXED TOP
          ============================================ */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/25 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 lg:py-1">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img src={Logo} alt="ParkBay Logo" className="h-10 w-auto" />
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
                className="text-gray-300 hover:text-cyan-400 transition-all duration-300 cursor-pointer font-medium"
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
                  className="text-gray-300 hover:text-cyan-400 transition-colors cursor-pointer"
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

      {/* ============================================
          HERO SECTION - FULLSCREEN VIDEO BACKGROUND
          ============================================ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover animate-blur"
        >
          <source src="videos/bg2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 sm:bg-gradient-to-l from-cyan-500/15  to-black/5"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-black/90 animate-fadeOut"></div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content - Fade in animation */}
            <div className="text-white animate-fadeIn">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
                Redefining How{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  Parking
                </span>{" "}
                Gets Done
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Efficient parking allocations and hassle-free slot booking to
                keep your operations smooth, organized, and customer-friendly.
              </p>
              <button
                onClick={() => navigate("/register")}
                className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 px-8 py-4 rounded-lg font-medium text-lg transition-all duration-300 inline-flex items-center space-x-2 shadow-2xl shadow-cyan-500/40 hover:shadow-cyan-500/60 hover:scale-105"
              >
                <span>Get Started</span>
                <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          STATS SECTION - DARK THEME
          ============================================ */}
      <section className="py-20 bg-gradient-to-b from-black to-blue-500/10">
        <div className="reveal-section  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h2 className="text-4xl font-bold mb-6">
                25,000+ Trusted Parking Spaces Built on Results
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Trusted by over 25,000 of the world's most successful
                businesses, our smart parking management solutions help drive
                business results.
              </p>
              {/* <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50">
                View Case Studies
              </button> */}
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-purple-900/40 to-purple-800/10 rounded-xl border border-purple-500/10 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold text-purple-400 mb-2">
                  24k+
                </div>
                <div className="text-gray-300">Daily Reservations</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-blue-900/40 to-blue-800/10 rounded-xl border border-blue-500/10 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold text-blue-400 mb-2">
                  390+
                </div>
                <div className="text-gray-300">Parking Locations</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-900/40 to-green-800/10 rounded-xl border border-green-500/10 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold text-green-400 mb-2">
                  90%
                </div>
                <div className="text-gray-300">Occupancy Rate</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-cyan-500/90 to-cyan-500/10 rounded-xl border border-cyan-500/5 backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                <div className="text-4xl font-bold text-cyan-400 mb-2">99%</div>
                <div className="text-gray-300">System Uptime</div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden relative z-1 w-full mt-30 mb-8">
            {/* Left shadow */}
            <div className="absolute z-2 left-0 top-0 h-full w-30 bg-gradient-to-r from-black/80 to-transparent pointer-events-none"></div>

            {/* Right shadow */}
            <div className="absolute z-2 right-0 top-0 h-full w-30 bg-gradient-to-l from-black/80 to-transparent pointer-events-none"></div>

            <div className="flex animate-marquee gap-8 brightness-0 invert">
              {[...logos, ...logos].map((logo, index) => (
                <img
                  key={index}
                  src={logo}
                  alt="logo"
                  className="h-14 sm:h-20 sm:mx-2 w-auto"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          SERVICES SECTION
          ============================================ */}
      <section className="py-20 bg-gradient-to-b from-blue-500/10 to-bg-black">
        <div className="reveal-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="text-white">
              <h2 className="text-4xl font-bold mb-6">
                Driving Growth Through Simplicity and Efficiency
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                We provide a streamlined parking management system that ensures
                smooth parking allocations and hassle-free operations. With our
                advanced slot-booking feature, users can reserve their space
                before arrival—reducing congestion and improving overall
                convenience for businesses and customers alike.
              </p>
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 shadow-lg shadow-cyan-500/30">
                Learn More
              </button>
            </div>

            {/* Service Items */}
            <div className="space-y-4">
              <div className="bg-gray-900/50 rounded-lg border border-cyan-500/20 overflow-hidden hover:border-cyan-500/40 transition-all duration-300">
                <div className="flex items-center justify-between p-4 cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <SquareParking className="h-6 w-6 text-cyan-400" />
                    <span className="font-medium text-cyan-400">
                      Reserve Before You Arrive
                    </span>
                  </div>
                </div>
                <div className="px-4 pb-4 pl-14">
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Users can book a parking slot in advance, ensuring
                    guaranteed space and a smooth, stress-free parking
                    experience.
                  </p>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-lg border border-cyan-500/20 overflow-hidden hover:border-cyan-500/40 transition-all duration-300">
                <div className="flex items-center justify-between p-4 cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <CreditCard className="h-6 w-6 text-cyan-400" />
                    <span className="font-medium text-cyan-400">
                      Park Smarter, Save More
                    </span>
                  </div>
                </div>
                <div className="px-4 pb-4 pl-14">
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Offer monthly or yearly membership packages that give users
                    priority access, discounted rates, and improved convenience.
                  </p>
                </div>
              </div>

              <div className="bg-gray-900/50 rounded-lg border border-cyan-500/20 overflow-hidden hover:border-cyan-500/40 transition-all duration-300">
                <div className="flex items-center justify-between p-4 cursor-pointer">
                  <div className="flex items-center space-x-4">
                    <Users className="h-6 w-6 text-cyan-400" />
                    <span className="font-medium text-cyan-400">
                      Always Here to Assist You
                    </span>
                  </div>
                </div>
                <div className="px-4 pb-4 pl-14">
                  <p className="text-gray-400 text-sm leading-relaxed">
                    A dedicated support team helps users with inquiries, booking
                    issues, and on-site assistance to ensure a seamless
                    experience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          TESTIMONIALS SECTION
          ============================================ */}
      <section className="py-20 bg-gradient-to-b from-blue-900/12 via-blue-500/10 to-black">
        <div className="reveal-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <span className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                Why Satisfied Customers
              </span>
              <h2 className="text-4xl font-bold mb-8">
                Hear From Those We've Helped Grow
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Discover how our solutions have helped businesses streamline
                their parking operations, reduce costs, and improve customer
                satisfaction.
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded"></div>
            </div>

            {/* Testimonial Cards */}
            <div className="space-y-6">
              {[
                {
                  name: "Sarah Chen",
                  role: "Operations Manager",
                  company: "Downtown Mall",
                  content:
                    "ParkSmart reduced our parking management costs by 40% while improving customer satisfaction. The real-time availability feature is a game-changer.",
                },
                {
                  name: "Mike Rodriguez",
                  role: "Facility Director",
                  company: "TechCorp HQ",
                  content:
                    "Implementation was seamless and the support team was incredibly helpful. Our employees love the mobile app reservation system.",
                },
                {
                  name: "Lisa Park",
                  role: "Property Manager",
                  company: "Metro Apartments",
                  content:
                    "The analytics dashboard gives us insights we never had before. We can now optimize our parking allocation based on real usage data.",
                },
              ].map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 hover:border-cyan-500/30 transition-all duration-300 backdrop-blur-sm"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-bold text-white">
                          {testimonial.name}
                        </h4>
                        <span className="text-cyan-400">•</span>
                        <span className="text-gray-400 text-sm">
                          {testimonial.role}
                        </span>
                      </div>
                      <p className="text-gray-300 mb-3 leading-relaxed">
                        {testimonial.content}
                      </p>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          FAQ SECTION
          ============================================ */}
      <section className="py-20 bg-black" id="about">
        <div className="reveal-section max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden hover:border-cyan-500/30 transition-all duration-300"
              >
                <button
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-900/80 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-medium text-white">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 text-cyan-400 transform transition-transform duration-300 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4 animate-fadeIn">
                    <p className="text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          FOOTER CTA & LINKS
          ============================================ */}
      <footer className="reveal-section bg-gradient-to-b from-blue-900/20 to-black text-white py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-4">
                Innovate.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  Deliver
                </span>
                . Grow.
              </h2>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Transform your parking operations with our smart management
                system. Join thousands of businesses already growing with our
                solution.
              </p>
            </div>

            {/* Footer Links */}
            <div className="grid grid-cols-2 gap-8 text-sm">
              <div>
                <h4 className="font-bold mb-4 text-cyan-400">Pages</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a
                      href="#"
                      className="hover:text-cyan-400 transition-colors"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      href="#about"
                      className="hover:text-cyan-400 transition-colors"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-cyan-400 transition-colors"
                    >
                      Solutions
                    </a>
                  </li>
                  <li>
                    <a
                      onClick={() => navigate("/membership-pack")}
                      className="hover:text-cyan-400 transition-colors cursor-pointer"
                    >
                      Pricing
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-4 text-cyan-400">Other Pages</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <a
                      href="#"
                      className="hover:text-cyan-400 transition-colors"
                    >
                      Terms and Conditions
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-cyan-400 transition-colors"
                    >
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-cyan-400 transition-colors"
                    >
                      Support
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-cyan-400 transition-colors"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500">
              © 2024 ParkSmart. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* ============================================
          CUSTOM ANIMATIONS - CSS
          ============================================ */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
            filter: blur(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0px);
          }
        }

        @keyframes fadeOut {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }

        @keyframes blur {
          from {
            filter: blur(10px);
          }
          to {
            filter: blur(0px);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-marquee {
          animation: marquee 18s linear infinite;
        }

        .animate-marquee:hover {
          animation-play-state: paused;
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-fadeOut {
          animation: fadeOut 2s ease-in-out forwards;
        }

        .animate-blur {
          animation: blur 3s ease-in-out forwards;
        }

        .animate-slideInRight {
          animation: slideInRight 1s ease-out;
        }
      `}</style>
    </div>
  );
}
