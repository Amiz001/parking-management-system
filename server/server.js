const cors = require('cors'); 
const express = require('express'); 
const app = express(); 
require("dotenv").config(); 
require('./config/db'); 

app.use(express.json()); 
app.use(cors());

<<<<<<< HEAD
const MembershipRoute = require("./routes/MembershipRoute");
const OnlinePayRoute = require('./routes/OnlinePayRoute');

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

app.use("/bookings", bookingRoutes);
//app.use("/bookings", PhysicalBookingRoutes);
app.use("/users", userRoutes);
app.use("/slots", slotRoutes);
app.use("/zones", zoneRoutes);

app.use('/plan', MembershipRoute);
app.use('/online-payment', OnlinePayRoute);


app.listen(5000, () => {
    console.log("Server is starting");
})

