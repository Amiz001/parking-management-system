// parkingLandingPageData.js
import { Car, MapPin, Clock, Shield, Users, ChevronRight, ChevronDown, Star } from 'lucide-react';
import Logo from '../assets/parkbay.png';

export const parkingLandingPageData = {
  logo: Logo,
  navLinks: [
    { label: "Booking", path: "/operator/onlinebookingPage" },
    { label: "Pricing", path: "/membership-pack" },
    { label: "Feedback", path: "/customersupport/feedback" },
    { label: "About", path: "#" },
  ],
  ctaButtons: {
    login: { label: "Log In", path: "/login" },
    getStarted: { label: "Get Started", path: "/register" },
  },
  hero: {
    title: "Redefining How Parking Gets Done",
    highlight: "Parking",
    description: "AI-Powered Smart Parking with Real-Time Availability, Making Your Business Operations Faster And More Efficient.",
    image: "/images/car2.png",
    cta: { label: "Get Started", path: "/register" },
  },
  stats: [
    { value: "24k+", label: "Daily Reservations", color: "indigo" },
    { value: "390+", label: "Parking Locations", color: "blue" },
    { value: "90%", label: "Occupancy Rate", color: "green" },
    { value: "99%", label: "System Uptime", color: "orange" },
  ],
  services: [
    { icon: MapPin, title: "Smart Sensor Installation" },
    { icon: Shield, title: "API Integration", description: "Seamless integration with your existing systems through our comprehensive API, enabling real-time data sync and automated operations." },
    { icon: Users, title: "Mobile App Development" },
    { icon: Clock, title: "Custom Analytics Dashboard" },
  ],
  testimonials: [
    {
      name: "Sarah Chen",
      role: "Operations Manager",
      company: "Downtown Mall",
      content: "ParkSmart reduced our parking management costs by 40% while improving customer satisfaction. The real-time availability feature is a game-changer.",
    },
    {
      name: "Mike Rodriguez",
      role: "Facility Director",
      company: "TechCorp HQ",
      content: "Implementation was seamless and the support team was incredibly helpful. Our employees love the mobile app reservation system.",
    },
    {
      name: "Lisa Park",
      role: "Property Manager",
      company: "Metro Apartments",
      content: "The analytics dashboard gives us insights we never had before. We can now optimize our parking allocation based on real usage data.",
    },
  ],
  faqs: [
    { question: "Can I modify my parking reservation?", answer: "Yes, you can modify your parking reservation up to 2 hours before your scheduled time through our app or website." },
    { question: "Is there an education discount?", answer: "We offer special rates for students and educational institutions. Contact our support team for more details." },
    { question: "Can we add users later?", answer: "Absolutely! You can add or remove users from your account at any time through the admin dashboard." },
    { question: "How are payments processed?", answer: "We use secure payment processing with multiple options including credit cards, digital wallets, and monthly billing." },
    { question: "How do I get support?", answer: "Our support team is available 24/7 through live chat, email, or phone. Premium users get priority support." },
    { question: "Do I need to upgrade?", answer: "You can start with our free plan and upgrade as your parking needs grow. We'll recommend the best plan for your usage." },
  ],
  footer: {
    pages: ["Home", "About", "Solutions", "Pricing"],
    otherPages: ["Terms and Conditions", "Privacy Policy", "Support", "Contact"],
    copyright: "© 2024 ParkSmart. All rights reserved.",
    cta: {
      title: "Innovate. Deliver. Grow.",
      description: "Transform your parking operations with our smart management system. Join thousands of businesses already growing with our solution."
    }
  }
};
