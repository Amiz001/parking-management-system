import React, { useState, useEffect } from 'react';
import { FaUser, FaCar, FaPlus, FaMinus, FaExclamationTriangle, FaTimes, FaCheckCircle } from 'react-icons/fa';
import PaymentPortal from './PaymentPortal';

const PlanModal = ({ isOpen, onClose, selectedPlan }) => {
  const [username, setUsername] = useState('');
  const [vehicleType, setVehicleType] = useState('Two Wheel');
  const [quantity, setQuantity] = useState(1);
  const [showPaymentPortal, setShowPaymentPortal] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [showCancelPopup, setShowCancelPopup] = useState(false);

  useEffect(() => {
    if (isOpen && selectedPlan) {
      setUsername('');
      setVehicleType('Two Wheel');
      setQuantity(1);
      setShowPaymentPortal(false);
      setUsernameError('');
    }
  }, [isOpen, selectedPlan]);

  if (!isOpen) return null;

  const maxVehicles = parseInt(selectedPlan?.features.find(f => f.includes('Max'))?.match(/\d+/)?.[0] || 1);
  const pricePerAddOn = parseInt(selectedPlan?.features.find(f => f.includes('Add-on'))?.match(/\d+/)?.[0] || 0);
  const basePrice = parseInt(selectedPlan?.price.match(/\d+/)?.[0] || 0);

  const handleQuantityChange = (change) => {
    setQuantity(prev => {
      const updated = prev + change;
      return updated < 1 ? 1 : updated > maxVehicles ? maxVehicles : updated;
    });
  };

  const handleProceedToPayment = () => {
    if(!username.trim()){
      setUsernameError('Username is required.');
      return;
    }
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9]+$/;
    if (!regex.test(username)){
      setUsernameError('Username must contain both letters and numbers.');
      return;
    }
    setUsernameError('');
    setShowPaymentPortal(true);
  };

  const amount = basePrice + (quantity - 1) * pricePerAddOn;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur-md bg-black/50 animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col md:flex-row">

        {/* Close button */}
        <button
          onClick={() => setShowCancelPopup(true)}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors z-10"
        >
          <FaTimes size={24} />
        </button>

        {showPaymentPortal ? (
          <PaymentPortal
            amount={amount}
            username={username}
            vehicleType={vehicleType}
            quantity={quantity}
            onBack={() => setShowPaymentPortal(false)}
            onClose={onClose}
          />
        ) : (
          <>
            {/* Left Panel: User Info */}
            <div className="p-8 w-full md:w-1/2 space-y-6">
              <div className="mb-6">
                <div className="inline-block px-4 py-1 bg-blue-500/20 rounded-full border border-blue-500/30 mb-3">
                  <span className="text-blue-400 text-sm font-semibold">{selectedPlan?.name} Plan</span>
                </div>
                <h2 className="text-3xl font-bold text-white mb-2">Complete Your Subscription</h2>
                <p className="text-gray-400 text-sm">Enter your details to get started</p>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2 flex items-center gap-2">
                  <FaUser className="text-blue-400" size={14} />
                  User ID
                </label>
                <input
                  type="text"
                  placeholder="e.g., user123"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); if(usernameError) setUsernameError(''); }}
                  className={`w-full px-4 py-3 rounded-xl bg-slate-700/50 border ${
                    usernameError ? 'border-red-500' : 'border-slate-600'
                  } text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all`}
                />
                {usernameError && (
                  <p className="text-red-400 text-sm mt-2 flex items-center gap-1">
                    <FaExclamationTriangle size={12} /> {usernameError}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2 flex items-center gap-2">
                  <FaCar className="text-blue-400" size={14} />
                  Vehicle Type
                </label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600 text-white appearance-none cursor-pointer focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                >
                  <option>Two Wheel</option>
                  <option>Three Wheel</option>
                  <option>Four Wheel</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-300 mb-2">Number of Vehicles</label>
                <div className="flex items-center justify-between bg-slate-700/30 rounded-xl p-4 border border-slate-600">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-700 text-white hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  ><FaMinus size={14} /></button>
                  
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">{quantity}</div>
                    <div className="text-xs text-gray-400">Max: {maxVehicles}</div>
                  </div>

                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= maxVehicles}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-700 text-white hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  ><FaPlus size={14} /></button>
                </div>
                {quantity >= maxVehicles && (
                  <p className="text-amber-400 text-xs mt-2 flex items-center gap-1">
                    <FaExclamationTriangle size={10} /> Maximum vehicles reached
                  </p>
                )}
              </div>

              <p className="mt-2 font-semibold text-white">Total Payment: LKR {amount}</p>
            </div>

            {/* Right Panel: Payment Summary */}
            <div className="w-full md:w-1/2 bg-gradient-to-br from-slate-900 to-black p-8 flex flex-col border-l border-slate-700">
              <h3 className="text-xl font-bold text-white mb-6">Payment Summary</h3>
              <div className="space-y-4 flex-grow">
                <div className="flex justify-between items-center py-3 border-b border-slate-700">
                  <span className="text-gray-400">Base Price</span>
                  <span className="text-white font-semibold">LKR {basePrice}</span>
                </div>

                {quantity > 1 && (
                  <div className="flex justify-between items-center py-3 border-b border-slate-700">
                    <span className="text-gray-400">Extra Vehicles ({quantity - 1})</span>
                    <span className="text-white font-semibold">LKR {(quantity - 1) * pricePerAddOn}</span>
                  </div>
                )}

                <div className="flex justify-between items-center py-4 mt-4 bg-blue-500/10 rounded-xl px-4 border border-blue-500/30">
                  <span className="text-lg font-semibold text-white">Total Amount</span>
                  <span className="text-2xl font-bold text-blue-400">LKR {amount}</span>
                </div>

                <div className="mt-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700">
                  <p className="text-xs text-gray-400 mb-2">Included in your plan:</p>
                  <ul className="space-y-1">
                    {selectedPlan?.features.slice(0, 3).map((feature, i) => (
                      <li key={i} className="text-xs text-gray-300 flex items-center gap-2">
                        <FaCheckCircle className="text-green-400" size={10} /> {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-3 mt-6">
                <button
                  onClick={handleProceedToPayment}
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transform hover:-translate-y-0.5 transition-all"
                >
                  Proceed to Payment
                </button>
                <button
                  onClick={() => setShowCancelPopup(true)}
                  className="w-full py-4 bg-slate-700 text-gray-300 font-semibold rounded-xl hover:bg-slate-600 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Cancel Confirmation Popup */}
      {showCancelPopup && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/60 flex items-center justify-center z-50">
          <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl shadow-2xl w-full max-w-md text-center">
            <h3 className="text-2xl font-bold mb-3 text-white">Cancel Subscription?</h3>
            <p className="text-gray-400 mb-6">
              Are you sure you want to cancel this plan? Your details won't be saved.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelPopup(false)}
                className="flex-1 px-6 py-3 bg-slate-700 text-white font-semibold rounded-xl hover:bg-slate-600 transition-colors"
              >
                Keep Editing
              </button>
              <button
                onClick={() => { onClose(); setShowCancelPopup(false); }}
                className="flex-1 px-6 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
      `}</style>
    </div>
  );
};

export default PlanModal;
