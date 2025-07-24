const cors = require('cors');
const express = require('express');
const app = express();
require("dotenv").config();
require('./config/db');

const routes = require('./routes/userRoutes');

app.use(express.json());
app.use(cors());

app.use('/users', routes);

app.listen(5000, () => {
    console.log("Server is starting");
})
