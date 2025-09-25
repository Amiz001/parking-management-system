const cors = require('cors'); 
const express = require('express'); 
const app = express(); 
require("dotenv").config(); 
require('./config/db'); 

app.use(express.json()); 
app.use(cors()); 

const feedbackRoutes = require('./routes/feedbackRoutes'); 
const complaintRoutes = require('./routes/complaintRoutes'); 
const refundRoutes = require('./routes/refundRoutes'); 
const ticketRoutes = require('./routes/ticketRoutes'); 

app.use('/physicalbookings', physicalBookingRoutes);
app.use('/payment',PaymentRoute);
app.use('/users', userRoutes);
app.use('/slots', slotRoutes);
app.use('/zones', zoneRoutes);


app.use('/api/feedback', feedbackRoutes); 
app.use('/api/complaint', complaintRoutes); 
app.use('/api/refund', refundRoutes); 
app.use('/api/ticket', ticketRoutes); 

app.listen(5000, () => {
    console.log("Server is starting"); 
}); 
