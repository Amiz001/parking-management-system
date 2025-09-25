const cors = require('cors');
const express = require('express');
const app = express();
require("dotenv").config();
require('./config/db');

<<<<<<< HEAD
const userRoutes = require('./routes/userRoutes');
=======
// ✅ Correct route imports
const physicalBookingRoutes = require('./routes/PhysicalBookingRoutes');
>>>>>>> 93448035b476797ed7d07721ff78f87e12e98669

app.use(express.json());
app.use(cors());

<<<<<<< HEAD
app.use('/users', userRoutes);
=======

app.use('/physicalbookings', physicalBookingRoutes);

>>>>>>> 93448035b476797ed7d07721ff78f87e12e98669

app.listen(5000, () => {
    console.log("Server is starting");
})
