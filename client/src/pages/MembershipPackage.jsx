// src/components/MembershipPackage.jsx
import React, { useState, useEffect } from 'react';
import axios from "axios";
import PlanModal from '../pages/PlanModal';
import { FaStar, FaCrown, FaGem } from 'react-icons/fa';

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

  return (
    <div>
      {/* Header & Description */}
      <div className="py-10 px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-blue-200 to-blue-500 mb-2">
            ParkBay
          </h1>
          <p className="text-gray-600 max-w-3xl mx-auto text-left">
            Select the parking plan that fits your lifestyle. Whether you're an occasional visitor or a daily commuter, we offer flexible packages designed just for you — with reliable customer support and easy access guaranteed.
          </p>
        </div>
      </div>

      {/* Membership Plans Container */}
      <div className="rounded-lg min-h-auto py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {membershipPlans.map((plan, index) => {
            const IconComponent = getIconForPlan(plan.name);

            return (
              <div
                key={plan._id || index}
                className={`rounded-2xl shadow-lg p-6 bg-white border-2 transition-transform duration-300 hover:scale-105 ${
                  plan.highlight ? 'border-blue-500' : 'border-gray-300'
                }`}
              >
                <h3 className="text-2xl font-bold text-center mb-4 text-black">
                  {IconComponent && <IconComponent className="mr-2 text-blue-500" size={30} />}
                  {plan.name}
                </h3>
                <p className="text-center text-sm text-gray-500">{plan.description}</p>
                <p className="text-center text-2xl font-semibold text-blue-500">{plan.price}</p>
                <ul className="mt-6 space-y-2 flex-grow min-h-40">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="text-gray-600 text-left">
                      - {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`mt-6 w-full py-2 text-lg rounded-xl font-semibold ${
                    plan.highlight
                      ? 'bg-blue-500 text-white hover:bg-blue-800'
                      : 'bg-gray-400 text-gray-800 hover:bg-gray-200'
                  }`}
                  onClick={() => handleChoosePlan(plan)}
                >
                  Choose Plan
                </button>
              </div>
            );
          })}
        </div>

        {/* Plan Modal */}
        <PlanModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedPlan={selectedPlan}
        />

        
      </div>
    </div>
  );
};

export default MembershipPackage;
