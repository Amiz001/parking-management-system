// src/components/MembershipPackage.jsx
import React, { useState, useEffect } from 'react';
import axios from "axios";
import PlanModal from '../pages/PlanModal';
import { FaStar, FaCrown, FaGem, FaCheck, FaInfoCircle } from 'react-icons/fa';

const MembershipPackage = () => {
  const [membershipPlans, setPlans] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/plan")
      .then((res) => {
        const filteredPlans = (res.data.plans || res.data).filter(
          plan => plan.name.toLowerCase() !== "free"
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
        return { bg: 'from-gray-400 to-gray-600', border: 'border-gray-400', text: 'text-gray-400' };
      case "gold":
        return { bg: 'from-yellow-400 to-yellow-600', border: 'border-yellow-400', text: 'text-yellow-400' };
      case "platinum":
        return { bg: 'from-purple-400 to-purple-600', border: 'border-purple-400', text: 'text-purple-400' };
      default:
        return { bg: 'from-blue-400 to-blue-600', border: 'border-blue-400', text: 'text-blue-400' };
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header & Description */}
      <div className="pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-4">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            ParkBay
          </span>
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-2">
          Choose the perfect parking plan for your lifestyle
        </p>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Whether you're an occasional visitor or daily commuter, we've got flexible packages with guaranteed access and reliable support.
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
                    ? 'transform hover:scale-105 shadow-2xl shadow-blue-500/20' 
                    : 'hover:scale-102'
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
                      ? 'bg-slate-800/80 border-2 border-blue-500'
                      : 'bg-slate-800/50 border border-slate-700 hover:border-slate-600'
                  }`}
                >
                  {/* Icon & Name */}
                  <div className="flex items-center justify-center mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${colors.bg}`}>
                      <IconComponent className="text-white" size={32} />
                    </div>
                  </div>
                  <h3 className={`text-3xl font-bold text-center mb-2 ${colors.text}`}>
                    {plan.name}
                  </h3>
                  <p className="text-gray-400 text-center text-sm mb-6 min-h-[40px]">{plan.description}</p>

                  {/* Price */}
                  <div className="text-center mb-8">
                    <div className="text-5xl font-extrabold text-white mb-1">
                      {plan.price.split('/')[0]}
                    </div>
                    <div className="text-gray-400 text-sm">
                      per {plan.price.split('/')[1]}
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8 min-h-[280px]">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start text-gray-300">
                        <FaCheck className={`${colors.text} mt-1 mr-3 flex-shrink-0`} size={16} />
                        <span className="text-sm leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button
                    onClick={() => handleChoosePlan(plan)}
                    className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                      isHighlighted
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-0.5'
                        : 'bg-slate-700 text-white hover:bg-slate-600'
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
            <p className="text-sm">All plans include 24/7 access and easy cancellation</p>
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
