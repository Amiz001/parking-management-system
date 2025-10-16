const cors = require('cors'); 
const express = require('express'); 
const app = express(); 
require("dotenv").config(); 
require('./config/db'); 

app.use(express.json()); 
app.use(cors());

const physicalBookingRoutes = require('./routes/PhysicalBookingRoutes');
const PaymentRoute = require("./routes/PaymentRoute");
const userRoutes = require('./routes/userRoutes');
const slotRoutes = require('./routes/slotRoutes');
const zoneRoutes = require('./routes/zoneRoutes');

const feedbackRoutes = require('./routes/feedbackRoutes'); 
const complaintRoutes = require('./routes/complaintRoutes'); 
const refundRoutes = require('./routes/refundRoutes'); 
const ticketRoutes = require('./routes/ticketRoutes'); 

const MembershipRoute = require("./routes/MembershipRoute");
const OnlinePayRoute = require('./routes/OnlinePayRoute');

app.use('/physicalbookings', physicalBookingRoutes);
app.use('/payment',PaymentRoute);
app.use('/users', userRoutes);
app.use('/slots', slotRoutes);
app.use('/zones', zoneRoutes);

 
app.use('/api/feedback', feedbackRoutes); 
app.use('/api/complaint', complaintRoutes); 
app.use('/api/refund', refundRoutes); 
app.use('/api/ticket', ticketRoutes); 

app.use('/plan', MembershipRoute);
app.use('/online-payment', OnlinePayRoute);

let feedbacks = [
  {
    _id: "1",
    name: "Alice Smith",
    email: "alice@example.com",
    message: "Great service!",
    createdAt: new Date(),
  },
  {
    _id: "2",
    name: "Bob Johnson",
    email: "bob@example.com",
    message: "Could be better.",
    createdAt: new Date(),
  },
];

// GET /api/feedback
app.get("/api/feedback", (req, res) => {
  res.json(feedbacks);
});

// DELETE /api/feedback/:id
app.delete("/api/feedback/:id", (req, res) => {
  const id = req.params.id;
  const initialLength = feedbacks.length;
  feedbacks = feedbacks.filter(fb => fb._id !== id);

  if (feedbacks.length === initialLength) {
    return res.status(404).json({ message: "Feedback not found" });
  }

  res.json({ message: "Deleted successfully" });
});

app.listen(5000, () => {
    console.log("Server is starting"); 
}); 
