const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/db");

const app = express();

app.use(express.json());
app.use(cors());

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


app.listen(5000, () => {
    console.log("Server is starting");
})