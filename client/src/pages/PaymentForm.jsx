import React, { useState } from 'react';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from '@stripe/react-stripe-js';
import axios from 'axios';
import { FaLock, FaCreditCard, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '14px',
      color: '#FFFFFF',
      fontFamily: 'Inter, system-ui, sans-serif',
      '::placeholder': { color: '#64748b' },
      padding: '10px 0',
    },
    invalid: { color: '#ef4444' },
  },
};

const PaymentForm = ({ clientSecret, paymentId, onBack, username, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate(); // Initialize navigate
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    const cardNumber = elements.getElement(CardNumberElement);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardNumber, billing_details: { name: username } },
      });

      if (error) {
        console.error(error);
        alert(error.message || 'Payment failed.');
        setLoading(false);
        return;
      }

      await axios.put(`http://localhost:5000/online-payment/${paymentId}`, {
        status: paymentIntent.status === 'succeeded' ? 'successful' : paymentIntent.status,
      });

      if (paymentIntent.status === 'succeeded') {
  setPaymentSuccess(true);

  setTimeout(() => {
    setPaymentSuccess(false);   // 🔥 hides the message from screen
    navigate('/membership-pack'); 
  }, 3000);
}
 else {
        alert(`Payment status: ${paymentIntent.status}`);
      }
    } catch (err) {
      console.error("Failed to update payment:", err.response ? err.response.data : err.message);
      alert('Something went wrong. Check console.');
    }

    setLoading(false);
  };

  if (paymentSuccess) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-2">
        <div className="max-w-md w-full">
          <div className="bg-slate-900 rounded-xl shadow-xl border border-slate-700 p-6 text-center animate-fadeIn">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-green-500/50">
              <FaCheckCircle className="text-white" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
            <p className="text-gray-400 mb-2 text-sm">Your subscription has been activated</p>
            <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700 mt-4">
              <p className="text-sm text-gray-400 mb-1">Amount Paid</p>
              <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                LKR {amount.toLocaleString()}
              </p>
            </div>
            <p className="text-xs text-gray-500 mt-4">Redirecting to Membership Packages...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-2">
      <div className="max-w-md w-full">
        {/* Back Button */}
        <button
          onClick={onBack}
          disabled={loading}
          className="flex items-center gap-1 text-gray-400 hover:text-white mb-3 text-xs"
        >
          <FaArrowLeft size={12} />
          <span>Back</span>
        </button>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 rounded-xl shadow-xl border border-slate-700 p-4 space-y-3"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-3 text-center rounded-lg">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-1 border border-white/30">
              <FaCreditCard className="text-white" size={24} />
            </div>
            <h2 className="text-xl font-bold text-white mb-0.5">Complete Payment</h2>
            <p className="text-blue-100 text-xs">Enter your card details securely</p>
          </div>

          {/* Amount */}
          <div className="bg-slate-800/50 rounded-lg p-3 border border-slate-700 text-xs text-center">
            <p className="text-xs text-gray-400 mb-1">Amount to Pay</p>
            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              LKR {amount.toLocaleString()}
            </p>
            <p className="text-xs text-gray-400 mt-1">for {username}</p>
          </div>

          {/* Card Info */}
          <div className="space-y-2">
            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-300">Card Number</label>
              <div className="bg-slate-800/50 border border-slate-600 rounded-lg px-2 py-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/20 transition-all">
                <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="block text-xs font-medium text-gray-300">Expiry Date</label>
                <div className="bg-slate-800/50 border border-slate-600 rounded-lg px-2 py-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/20 transition-all">
                  <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
                </div>
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-medium text-gray-300">CVC</label>
                <div className="bg-slate-800/50 border border-slate-600 rounded-lg px-2 py-2 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/20 transition-all">
                  <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-medium text-gray-300">Cardholder Name</label>
              <input
                type="text"
                defaultValue={username}
                className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-2 py-2 outline-none text-white placeholder-slate-500 text-sm"
                placeholder="Name on card"
              />
            </div>
          </div>

          {/* Security */}
          <div className="flex items-start gap-1 bg-slate-900/50 rounded-lg p-2 border border-slate-700 text-xs">
            <FaLock className="text-green-400 mt-0.5" size={12} />
            <p className="text-gray-400">Your payment info is encrypted and secure.</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold text-sm rounded hover:shadow-md flex items-center justify-center gap-1 disabled:opacity-50"
          >
            {loading ? <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : `Pay LKR ${amount.toLocaleString()}`}
          </button>
        </form>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity:0; transform: translateY(10px);} to {opacity:1; transform:translateY(0);} }
        .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
};

export default PaymentForm;
