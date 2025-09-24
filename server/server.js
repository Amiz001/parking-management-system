const cors = require('cors');
const express = require('express');
const app = express();
require("dotenv").config();
require('./config/db');

// ✅ Correct route imports
const physicalBookingRoutes = require('./routes/PhysicalBookingRoutes');

app.use(express.json());
app.use(cors());


app.use('/physicalbookings', physicalBookingRoutes);


app.listen(5000, () => {
    console.log("Server is starting");
})
