const cors = require('cors'); 
const express = require('express'); 
const helmet = require('helmet');
const app = express(); 
require("dotenv").config(); 
require('./config/db'); 

//middleware
app.use(express.json()); 
app.use(cors());

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
const User_MembershipRoute = require('./routes/User_MembershipRoute');

app.use('/physicalbookings', physicalBookingRoutes);
app.use('/payment',PaymentRoute);
app.use('/users', userRoutes);
app.use('/slots', slotRoutes);
app.use('/zones', zoneRoutes);



app.listen(5000, () => {
    console.log("Server is starting");
})
