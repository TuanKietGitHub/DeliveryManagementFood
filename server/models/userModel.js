const mongoose = require('mongoose');

// Schema 
const userSchema = new mongoose.Schema({
    username: {
        type: String , 
        required: [true , "username is required"]
    } ,
    email: {
        type: String , 
        required: [true , "email is required"] , 
        unique: true
    } ,
    password: {
        type: String , 
        required: [true , "password is required"]
    } , 
    address: {
        type: String
    } , 
    phone: {
        type: String ,
        required: [true , "phone is required"]
    } , 
    usertype: {
        type: String ,
        required: [true , "usertype is required"] ,
        default: 'clinet' ,
        enum: ['clinet' , 'admin' , 'vendor' , 'driver']
    } , 
    profile: {
        type: String ,
        default: 'https://t4.ftcdn.net/jpg/02/29/75/83/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg'
    } ,
    answer: {
        type: String ,
        required: [true , "Aswer id required"]
    }
     
} , {timestamps:true})

// export
module.exports = mongoose.model('User' , userSchema) 

