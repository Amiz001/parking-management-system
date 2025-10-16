const cors = require('cors'); 
const express = require('express'); 
const helmet = require('helmet');
const app = express(); 
require("dotenv").config(); 
require('./config/db'); 

//middleware
app.use(express.json()); 
app.use(cors());

<<<<<<< HEAD
<<<<<<< HEAD
=======
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "default-src": ["'self'"],
      "script-src": [
        "'self'",
        "https://js.stripe.com",
        "https://m.stripe.network",
        "'unsafe-inline'",
      ],
      "frame-src": ["'self'", "https://js.stripe.com"],
      "connect-src": [
        "'self'",
        "https://api.stripe.com",
        "wss://api.stripe.com",
        "https://m.stripe.network",
        "ws://localhost:5173",
      ],
      "img-src": ["'self'", "data:", "https://q.stripe.com"],
      "style-src": ["'self'", "'unsafe-inline'"],
    },
  })
);



const onlineBookPayRoutes = require('./routes/onlineBookPayRoutes.js');


const bookingRoutes = require('./routes/bookingRoutes');
const paymentRoutes = require('./routes/PaymentRoute');
const userRoutes = require('./routes/userRoutes');
const slotRoutes = require('./routes/slotRoutes');
const zoneRoutes = require('./routes/zoneRoutes');

const feedbackRoutes = require('./routes/feedbackRoutes'); 
const complaintRoutes = require('./routes/complaintRoutes'); 
const refundRoutes = require('./routes/refundRoutes'); 
const ticketRoutes = require('./routes/ticketRoutes'); 

>>>>>>> origin/feature/membership-payment
const MembershipRoute = require("./routes/MembershipRoute");
const OnlinePayRoute = require('./routes/OnlinePayRoute');
const User_MembershipRoute = require('./routes/User_MembershipRoute');

<<<<<<< HEAD
const bookingRoutes = require("./routes/bookingRoutes");
//const PhysicalBookingRoutes = require("./routes/PhysicalBookingRoutes");
const userRoutes = require("./routes/userRoutes");
const slotRoutes = require("./routes/slotRoutes");
const zoneRoutes = require("./routes/zoneRoutes");
=======
const physicalBookingRoutes = require('./routes/PhysicalBookingRoutes');
const PaymentRoute = require("./routes/PaymentRoute");
const userRoutes = require('./routes/userRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
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
app.use('/vehicles', vehicleRoutes);
>>>>>>> origin/feature/user-management

<<<<<<< HEAD
app.use("/bookings", bookingRoutes);
//app.use("/bookings", PhysicalBookingRoutes);
app.use("/users", userRoutes);
app.use("/slots", slotRoutes);
app.use("/zones", zoneRoutes);
=======
 
app.use('/feedbacks', feedbackRoutes); 
app.use('/complaints', complaintRoutes); 
app.use('/refunds', refundRoutes); 
app.use('/tickets', ticketRoutes); 
>>>>>>> origin/feature/refund-feedback
=======
app.use('/onlineBookPay',onlineBookPayRoutes);
app.use('/bookings', bookingRoutes);
app.use('/payment',paymentRoutes);
app.use('/users', userRoutes);
app.use('/slots', slotRoutes);
app.use('/zones', zoneRoutes);

>>>>>>> origin/feature/membership-payment

app.use('/api/feedback', feedbackRoutes);
app.use('/api/complaint', complaintRoutes);
app.use('/api/refund', refundRoutes);
app.use('/api/ticket', ticketRoutes);

app.use('/plan', MembershipRoute)
app.use('/online-payment', OnlinePayRoute);
app.use('/user-membership', User_MembershipRoute);




app.listen(5000, () => {
    console.log("Server is starting");
})
<<<<<<< HEAD

=======
>>>>>>> origin/feature/membership-payment
