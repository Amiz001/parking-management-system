import React, { useState } from 'react';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import axios from 'axios';

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

      // Update DB payment status
      await axios.post('http://localhost:5000/online-payment', {
        paymentId,
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

  const inputStyle = {
    style: {
      base: { fontSize: '16px', color: '#32325d', '::placeholder': { color: '#a0aec0' } },
      invalid: { color: '#fa5a5a' },
    },
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-2xl shadow-lg max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold mb-2">Enter Card Details</h2>

      <div>
        <label className="block mb-1 font-medium">Card Number</label>
        <CardNumberElement options={inputStyle} className="p-3 border rounded w-full" />
      </div>

      <div className="flex gap-2">
        <div className="flex-1">
          <label className="block mb-1 font-medium">Expiry</label>
          <CardExpiryElement options={inputStyle} className="p-3 border rounded w-full" />
        </div>
        <div className="flex-1">
          <label className="block mb-1 font-medium">CVC</label>
          <CardCvcElement options={inputStyle} className="p-3 border rounded w-full" />
        </div>
      </div>

      <button type="submit" disabled={loading} className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-800">
        {loading ? 'Processing...' : `Pay LKR ${amount}`}
      </button>
      <button type="button" onClick={onBack} className="w-full py-2 mt-2 bg-gray-400 text-black rounded hover:bg-gray-600">
        Back
      </button>
    </form>
  );
};

export default PaymentForm;
