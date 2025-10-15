// PaymentPortal.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../pages/PaymentForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentPortal = ({ amount, username, vehicleType, quantity, planName, onBack, onClose }) => {
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentId, setPaymentId] = useState(null);

   const [showCancelPopup, setShowCancelPopup] = useState(false);

  const handlePayNow = async () => {
    try {
      const res = await axios.post('http://localhost:5000/online-payment', {
        username,
        vehicleType,
        quantity:Number(quantity),
        amount:Number(amount),
        paymentMethod: 'card',
      },
      {
        headers: {'content-Type':'application/json'}
      }
    );

      setClientSecret(res.data.clientSecret);
      setPaymentId(res.data.paymentId);

    } catch (err) {
      console.error(err.response ? err.response.data : err.message);
      alert('Error creating payment. Check console.');
    }
  };

  const handleBack = () => {
    setClientSecret(null);
    setPaymentId(null);
  };

  if (clientSecret) {
    return (
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <PaymentForm
          clientSecret={clientSecret}
          paymentId={paymentId}
          onBack={handleBack}
          username={username}
          amount={amount}
        />
      </Elements>
    );
  }

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Payment Overview</h2>
      <p><strong>Username:</strong> {username}</p>
      <p><strong>Vehicle:</strong> {vehicleType}</p>
      
      <p><strong>Quantity:</strong> {quantity}</p>
      <p className="text-lg font-semibold">Total: LKR {amount}</p>
      <button
        onClick={handlePayNow}
        className="bg-green-600 text-white w-full py-2 rounded mt-4 hover:bg-green-800"
      >
        Pay Now
      </button>
      <button
        onClick={onBack}
        className="bg-gray-400 text-black w-full py-2 rounded mt-2 hover:bg-gray-600"
      >
        Back
      </button>
      <button
                className="mt-2 w-full bg-red-500 text-white py-2 rounded hover:bg-red-700"
                onClick={() => setShowCancelPopup(true)}>
                Cancel
              </button>
    
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

export default PaymentPortal;
