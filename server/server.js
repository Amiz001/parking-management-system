const cors = require('cors'); 
const express = require('express'); 
const app = express(); 
require("dotenv").config(); 
require('./config/db'); 

app.use(express.json()); 
app.use(cors());

const MembershipRoute = require("./routes/MembershipRoute");
const OnlinePayRoute = require('./routes/OnlinePayRoute');

const bookingRoutes = require("./routes/bookingRoutes");
//const PhysicalBookingRoutes = require("./routes/PhysicalBookingRoutes");
const userRoutes = require("./routes/userRoutes");
const slotRoutes = require("./routes/slotRoutes");
const zoneRoutes = require("./routes/zoneRoutes");

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

