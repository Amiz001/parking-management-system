const cors = require('cors');
const express = require('express');
const app = express();
require("dotenv").config();
require('./config/db');

<<<<<<< HEAD
=======

// ✅ Correct route imports
const physicalBookingRoutes = require('./routes/PhysicalBookingRoutes');
const PaymentRoute = require("./routes/PaymentRoute");
>>>>>>> d01adaf6e2068ee44084d21d35bc93902436922f
const userRoutes = require('./routes/userRoutes');
const physicalBookingRoutes = require('./routes/PhysicalBookingRoutes');
const slotRoutes = require('./routes/slotRoutes');
const zoneRoutes = require('./routes/zoneRoutes');
<<<<<<< HEAD
=======

>>>>>>> d01adaf6e2068ee44084d21d35bc93902436922f

app.use(express.json());
app.use(cors());

<<<<<<< HEAD
app.use('/users', userRoutes);
app.use('/physicalbookings', physicalBookingRoutes);
app.use('/users', userRoutes);
app.use('/slots', slotRoutes);
app.use('/zones', zoneRoutes);
=======
app.use('/physicalbookings', physicalBookingRoutes);
app.use('/payment',PaymentRoute);
app.use('/users', userRoutes);
app.use('/slots', slotRoutes);
app.use('/zones', zoneRoutes);


>>>>>>> d01adaf6e2068ee44084d21d35bc93902436922f

app.listen(5000, () => {
    console.log("Server is starting");
})
