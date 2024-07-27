
const express = require('express');
const colors = require('colors');
const cors = require('cors');
const morgan = require('morgan');

// URL DATABASE
const connectDB = require('./config/db');

// Dotenv config
require('dotenv').config();

// Middlewares
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// DB connectiton
connectDB();

// Router User 
app.use('/api/auth' , require("./routers/authRouter"));
app.use('/api/auth' , require("./routers/userRouter"));

// Router Restaurant
app.use('/api/auth/restaurant' , require("./routers/restaurantRouter"));

// Router Category (Danh Muc)
app.use('/api/auth/category' , require("./routers/categoryRouter"));

// Router Foods 
app.use('/api/auth/food' , require("./routers/foodRouter"));

// Port
const PORT = process.env.PORT || 5000;

// Listen
app.listen(PORT , () => {
    console.log(`Server running on ${PORT}!` .bgGreen);
})








