const cors = require('cors');
const express = require('express');
const app = express();
require("dotenv").config();
require('./config/db');

const userRoutes = require('./routes/userRoutes');
const slotRoutes = require('./routes/slotRoutes');
const zoneRoutes = require('./routes/zoneRoutes');

app.use(express.json());
app.use(cors());

app.use('/users', userRoutes);
app.use('/slots', slotRoutes);
app.use('/zones', zoneRoutes);


app.listen(5000, () => {
    console.log("Server is starting");
})
