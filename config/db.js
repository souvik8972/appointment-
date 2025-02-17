const mongoose = require('mongoose');
require("dotenv").config()
const URI=process.env.URI

const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message,"err");
        
    }
};


module.exports = connectDB;
