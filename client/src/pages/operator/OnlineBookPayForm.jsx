import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import axios from "axios";

const OnlineBookPayForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const location = useLocation();
  const { bookingData, amount } = location.state || {};

  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  if (!amount || !bookingData) return;

  const createPaymentIntent = async () => {
    try {
      console.log("Sending booking data to backend:", { amount, ...bookingData }); 
      const res = await axios.post("http://localhost:5000/onlineBookPay/create-intent", {
        amount,
        ...bookingData,
      });
      setClientSecret(res.data.clientSecret);
    } catch (err) {
      console.error("Error creating payment intent:", err.response?.data || err);
      alert("Failed to initiate payment. Try again.");
      navigate(-1);
    }
  };
  createPaymentIntent();
}, [amount, bookingData, navigate]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);
    const cardElement = elements.getElement(CardNumberElement);

    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: { name: bookingData.userId },
        },
      });

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }

      
      await axios.post("http://localhost:5000/onlineBookPay/add", {
        ...bookingData,
        amount,
        stripePaymentId: paymentIntent.id,
      });

      alert("✅ Payment successful!");
      navigate("/operator/dashboard");
    } catch (err) {
      console.error(err);
      alert("Something went wrong during payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <form onSubmit={handleSubmit} className="w-full max-w-md text-center px-6 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Secure Payment</h2>
        <p className="text-gray-500 text-sm">Pay LKR {amount}</p>

        <div className="border p-2 rounded"><CardNumberElement /></div>
        <div className="flex gap-4">
          <div className="flex-1 border p-2 rounded"><CardExpiryElement /></div>
          <div className="flex-1 border p-2 rounded"><CardCvcElement /></div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white ${loading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? "Processing..." : `Pay LKR ${amount}`}
        </button>

        <button type="button" onClick={() => navigate(-1)} className="w-full py-3 rounded-lg bg-gray-100 hover:bg-gray-200">
          Back
        </button>
      </form>
    </div>
  );
};

export default OnlineBookPayForm;


