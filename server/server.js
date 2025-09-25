const cors = require('cors');
const express = require('express');
const app = express();
require("dotenv").config();
require('./config/db');

<<<<<<< HEAD
<<<<<<< HEAD
const userRoutes = require('./routes/userRoutes');
=======
// ✅ Correct route imports
const physicalBookingRoutes = require('./routes/PhysicalBookingRoutes');
>>>>>>> 93448035b476797ed7d07721ff78f87e12e98669
=======
const userRoutes = require('./routes/userRoutes');
const slotRoutes = require('./routes/slotRoutes');
const zoneRoutes = require('./routes/zoneRoutes');
>>>>>>> 42ac412b1a2656f44cb2574d7a5a4b1f1e758197

app.use(express.json());
app.use(cors());

<<<<<<< HEAD
<<<<<<< HEAD
app.use('/users', userRoutes);
=======

app.use('/physicalbookings', physicalBookingRoutes);

>>>>>>> 93448035b476797ed7d07721ff78f87e12e98669
=======
app.use('/users', userRoutes);
app.use('/slots', slotRoutes);
app.use('/zones', zoneRoutes);

>>>>>>> 42ac412b1a2656f44cb2574d7a5a4b1f1e758197

app.listen(5000, () => {
    console.log("Server is starting");
})
