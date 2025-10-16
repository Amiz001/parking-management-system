import React, { useState } from 'react';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from '@stripe/react-stripe-js';
import axios from 'axios';
import { FaLock, FaCreditCard } from 'react-icons/fa';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      fontSize: '16px',
      color: '#1a202c',
      fontFamily: 'sans-serif',
      '::placeholder': { color: '#a0aec0' },
      padding: '10px 12px',
    },
    invalid: { color: '#fa5a5a' },
  },
};

const PaymentForm = ({ clientSecret, paymentId, onBack, username, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

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
        alert('✅ Payment successful!');
        onBack();
      } else {
        alert(`Payment status: ${paymentIntent.status}`);
      }
    } catch (err) {
      console.error("Failed to update payment:", err.response ? err.response.data : err.message);
      alert('Something went wrong. Check console.');
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md text-center px-6 space-y-6"
      >
        {/* Header */}
        <div>
          <FaCreditCard className="mx-auto text-blue-600 text-4xl mb-3" />
          <h2 className="text-2xl font-bold text-gray-800">Secure Payment</h2>
          <p className="text-gray-500 text-sm mt-1">
            Complete your payment for{' '}
            <span className="font-semibold text-blue-600">LKR {amount}</span>
          </p>
        </div>

        {/* Card Number */}
        <div className="text-left space-y-2">
          <label className="block text-sm font-medium text-gray-700">Card Number</label>
          <div className="border border-gray-300 rounded-lg px-3 py-2 focus-within:border-blue-500">
            <CardNumberElement options={CARD_ELEMENT_OPTIONS} />
          </div>
        </div>

        {/* Expiry and CVC */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 text-left space-y-2">
            <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
            <div className="border border-gray-300 rounded-lg px-3 py-2 focus-within:border-blue-500">
              <CardExpiryElement options={CARD_ELEMENT_OPTIONS} />
            </div>
          </div>

          <div className="flex-1 text-left space-y-2">
            <label className="block text-sm font-medium text-gray-700">CVC</label>
            <div className="border border-gray-300 rounded-lg px-3 py-2 focus-within:border-blue-500">
              <CardCvcElement options={CARD_ELEMENT_OPTIONS} />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-4 space-y-3">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300 ${
              loading
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            <FaLock className="text-sm" />
            {loading ? 'Processing...' : `Pay LKR ${amount}`}
          </button>

          <button
            type="button"
            onClick={onBack}
            className="w-full py-3 rounded-lg bg-gray-100 text-gray-800 font-semibold hover:bg-gray-200 transition-all duration-300"
          >
            Back
          </button>
        </div>

        <p className="text-xs text-gray-500 text-center pt-3">
          Your card information is securely processed by Stripe.
        </p>
      </form>
    </div>
  );
};

export default PaymentForm;
