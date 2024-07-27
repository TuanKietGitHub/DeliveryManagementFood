const mongoose = require('mongoose');

// Model
const ordersSchema = new mongoose.Schema({
    foods: {
        type: mongoose.Schema.Types.ObjectId ,
        ref: "Foods" 
    } ,
    count: {
        type: Number ,
        default: 1
    } , 
    payment: {} ,
    buyer: {
        type: mongoose.Schema.Types.ObjectId ,
        ref: "User"
    } ,
    status: {
        type: String ,
        enum: ["preparing" , "prepare" , "on the way" , "deliverd"] ,
        default: "preparing"
    } 
} , {timestamps: true});


// Exports
module.exports = mongoose.model("Orders" , ordersSchema);