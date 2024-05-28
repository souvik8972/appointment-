const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoute=require("./routes/userRoutes")
const doctorRoute=require("./routes/doctorRoutes")
const appointmentRoute=require("./routes/appointmentRoutes")
const path=require("path")


const app = express();

// Connect to database
connectDB();


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, "public")))
// Routes
app.use(userRoute)
app.use(doctorRoute);
app.use(appointmentRoute)

// Start server
require("dotenv").config()
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));




