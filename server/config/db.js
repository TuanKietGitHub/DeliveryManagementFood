const mongoose = require('mongoose');
const colors = require('colors');

// function connection database 
const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@restaurant.kbdz7dx.mongodb.net/?retryWrites=true&w=majority&appName=restaurant`);
        console.log(`Connected on database => ${mongoose.connection.host}` .blue );
    } catch (error) {
        console.log("Database error" ,error , colors.red);
    }
}

module.exports = connectDB;








