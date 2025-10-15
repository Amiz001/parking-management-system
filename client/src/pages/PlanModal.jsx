import React, { useState, useEffect } from 'react';
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
    const regex = /^(?=.*[A-Za-z])[A-Za-z0-9]+$/;

    if (!regex.test(username)){
      setUsernameError('Username cannot be numbers or symbols.');
      return;
    }
    setUsernameError('');
    setShowPaymentPortal(true);
  };

  const amount = basePrice + (quantity - 1) * pricePerAddOn;

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${
        showPaymentPortal ? 'bg-white' : 'backdrop-blur-xl bg-black/30'}`}>
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-4xl p-6 flex flex-col md:flex-row gap-4">
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
            {/* Left Side: User Input */}
            <div className="w-full md:w-1/2 space-y-4">
              <h2 className="text-xl font-bold mb-2">Plan: {selectedPlan.name}</h2>
              <div>
                <label className="block mb-1">Username</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={username}
                  onChange={(e) =>{
                    setUsername(e.target.value);
                    if (usernameError) setUsernameError('');
                }
                  } 
                />
                {usernameError && (
                    <p className = "text-red-600 text-sm mt-1">{usernameError}</p>
                )}
              </div>

              <div>
                <label className="block mb-1">Vehicle Type</label>
                <select
                  className="w-full border p-2 rounded"
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                >
                  <option>Two Wheel</option>
                  <option>Three Wheel</option>
                  <option>Four Wheel</option>
                </select>
              </div>
              <div className="flex items-center justify-between mt-4">
                <label className="block">Number of Vehicles</label>
                <div className="flex items-center gap-2">
                  <button className="bg-gray-300 px-2 rounded" onClick={() => handleQuantityChange(-1)}>-</button>
                  <span>{quantity}</span>
                  <button className="bg-gray-300 px-2 rounded" onClick={() => handleQuantityChange(1)}>+</button>
                </div>
              </div>

              {quantity > maxVehicles && (
                <p className="text-red-500 text-sm">
                  You can select up to {maxVehicles} vehicle(s)
                </p>
              )}
              <p className="mt-2 font-semibold">Total Payment: LKR {amount}</p>
            </div>

            {/* Right Side: Payment Summary */}
            <div className="w-full md:w-1/2 bg-gray-100 p-4 rounded">
              <h3 className="font-bold mb-4">Payment Summary</h3>
              <p><strong>Base Price:</strong> LKR {basePrice}</p>
              <p><strong>Extra Charges:</strong> LKR {(quantity - 1) * pricePerAddOn}</p>
              <hr className="my-2" />
              <p className="text-xl font-bold">Total: LKR {amount}</p>

              <button
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-800"
                onClick={handleProceedToPayment}
              >
                Proceed to Payment
              </button>


              <button
                className="mt-2 w-full bg-red-500 text-white py-2 rounded hover:bg-red-700"
                onClick={() => setShowCancelPopup(true)}>
                Cancel
              </button>
            </div>
          </>
        )}
      </div>

      {/* Cancel Confirmation Popup */}
      {showCancelPopup && (
        <div className="fixed inset-0 backdrop-blur-xl bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <h3 className="text-lg font-bold mb-4">Are you sure you want to cancel the plan?</h3>
            <div className="flex justify-between gap-4">
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-800 w-full"
                onClick={() => {
                  onClose();
                  setShowCancelPopup(false);
                }}
              >
                Yes
              </button>
              <button
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-500 w-full"
                onClick={() => setShowCancelPopup(false)}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default PlanModal;
