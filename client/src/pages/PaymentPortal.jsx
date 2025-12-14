// PaymentPortal.jsx
import React, { useState } from 'react';
import { FaUser, FaCar, FaShieldAlt, FaCreditCard, FaArrowLeft, FaLock } from 'react-icons/fa';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../pages/PaymentForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const PaymentPortal = ({ amount, username, vehicleType, quantity, onBack, onClose }) => {
  const [clientSecret, setClientSecret] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const [showCancelPopup, setShowCancelPopup] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayNow = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch('http://localhost:5000/online-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          vehicleType,
          quantity: Number(quantity),
          amount: Number(amount),
          paymentMethod: 'card',
        }),
      });
      const data = await res.json();
      setClientSecret(data.clientSecret);
      setPaymentId(data.paymentId);
    } catch (err) {
      console.error(err);
      alert('Error creating payment. Check console.');
    } finally {
      setIsProcessing(false);
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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      {/* Payment Card */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl shadow-xl border border-slate-700 w-full max-w-md p-4">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-gray-400 hover:text-white mb-2 text-xs"
        >
          <FaArrowLeft size={12} /> Back
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-3 text-center rounded-lg mb-3">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-1 border border-white/30">
            <FaCreditCard className="text-white" size={24} />
          </div>
          <h2 className="text-xl font-bold text-white mb-0.5">Payment Overview</h2>
          <p className="text-blue-100 text-xs">Review your subscription details</p>
        </div>

        {/* Order Details */}
        <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700 text-xs mb-3">
          <h3 className="font-semibold text-white mb-2 flex items-center gap-1">
            <FaShieldAlt className="text-blue-400" /> Order Details
          </h3>
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 bg-blue-500/20 rounded flex items-center justify-center">
                  <FaUser className="text-blue-400" size={12} />
                </div>
                <p className="text-white font-medium">{username}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 bg-purple-500/20 rounded flex items-center justify-center">
                  <FaCar className="text-purple-400" size={12} />
                </div>
                <p className="text-white font-medium">{vehicleType}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <div className="w-6 h-6 bg-green-500/20 rounded flex items-center justify-center">
                  <span className="text-green-400 font-bold text-sm">{quantity}</span>
                </div>
                <p className="text-white font-medium">{quantity} {quantity === 1 ? 'Vehicle' : 'Vehicles'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Amount */}
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg p-3 border border-blue-500/30 text-xs mb-3">
          <div className="flex items-center justify-between">
            <p className="text-white font-bold">LKR {amount.toLocaleString()}</p>
            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
              <FaCreditCard className="text-blue-400" size={18} />
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="flex items-start gap-1 bg-slate-900/50 rounded-lg p-2 border border-slate-700 text-xs mb-3">
          <FaLock className="text-green-400 mt-0.5" size={12} />
          <p className="text-gray-400">Your payment info is encrypted and secure.</p>
        </div>

        {/* Buttons */}
        <div className="space-y-1">
          <button
            onClick={handlePayNow}
            disabled={isProcessing}
            className="w-full py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold text-sm rounded hover:shadow-md flex items-center justify-center gap-1 disabled:opacity-50"
          >
            {isProcessing ? <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Proceed to Secure Payment'}
          </button>
          <button
            onClick={() => setShowCancelPopup(true)}
            disabled={isProcessing}
            className="w-full py-2 bg-slate-700 text-gray-300 font-semibold text-sm rounded hover:bg-slate-600"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Cancel Popup */}
      {showCancelPopup && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/60 flex items-center justify-center z-50 p-2">
          <div className="bg-slate-800 border border-slate-700 p-4 rounded-xl shadow-lg max-w-xs w-full text-center">
            <h3 className="text-sm font-bold mb-2 text-white">Cancel Payment?</h3>
            <p className="text-gray-400 mb-3">Are you sure? Your subscription won't activate.</p>
            <div className="flex gap-1">
              <button onClick={() => setShowCancelPopup(false)} className="flex-1 py-1 bg-slate-700 text-white text-xs rounded hover:bg-slate-600">Continue</button>
              <button onClick={() => { onClose(); setShowCancelPopup(false); }} className="flex-1 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600">Yes, Cancel</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
};

export default PaymentPortal;
