const cors = require('cors');
const express = require('express');
const app = express();
require("dotenv").config();
require('./config/db');

const feedbackRoutes = require('./routes/feedbackRoutes');// 
const complaintRoutes = require('./routes/complaintRoutes');// 
const refund = require('./routes/refund');// 


// middleware 
app.use(express.json());
app.use(cors());

app.use('/api/feedback', feedbackRoutes);//
app.use('/api/complaint', complaintRoutes);//


app.listen(5000, () => {
    console.log("Server is starting");
})
