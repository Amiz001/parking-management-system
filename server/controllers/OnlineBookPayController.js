require('dotenv').config();
const OnlineBookPay = require('../models/OnlineBookPay');
const stripe = require('stripe')(process.env.VITE_STRIPE_SECRET_KEY);

// Add online booking payment
const addOnlineBookPay = async (req, res) => {
  try {
    const { 
      userId, 
      types, 
      slotId, 
      zone, 
      vehicleNum, 
      date, 
      entryTime, 
      exitTime, 
      amount, 
      stripePaymentId 
    } = req.body;

    const newPayment = new OnlineBookPay({
      userId,
      types,
      slotId,
      zone,
      vehicleNum,
      date,
      entryTime,
      exitTime,
      amount,
      stripePaymentId,
    });

    await newPayment.save();
    res.status(201).json({ 
      message: "Online booking payment added successfully", 
      payment: newPayment 
    });
  } catch (error) {
    res.status(500).json({ 
      message: "Error adding online booking payment", 
      error: error.message 
    });
  }
};


// Create Stripe payment intent
const createPaymentIntent = async (req, res) => {
  try {
    const { amount, ...bookingData } = req.body;
    console.log("🔹 Received amount:", amount);
    console.log("🔹 Stripe key loaded:", !!process.env.STRIPE_SECRET_KEY);

    // Stripe requires amount in smallest currency unit (cents)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(Number(amount) * 100),
      currency: "usd", // ✅ use 'usd' for testing; change to 'lkr' only if your account supports it
      automatic_payment_methods: { enabled: true },
    });

    // Temporarily save booking details (optional)
    const newPayment = new OnlineBookPay({
      ...bookingData,
      amount,
      stripePaymentId: paymentIntent.id,
    });
    await newPayment.save();

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
      paymentId: newPayment._id,
    });
  } catch (error) {
    console.error("❌ Error creating payment intent:", error);
    res
      .status(500)
      .json({ message: "Error creating payment intent", error: error.message });
  }
};

// Get all online booking payments
const getAllOnlineBookPays = async (req, res) => {
  try {
    const payments = await OnlineBookPay.find().sort({ paymentDate: -1 });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching online booking payments",
      error: error.message,
    });
  }
};

module.exports = { createPaymentIntent, addOnlineBookPay, getAllOnlineBookPays };
