const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    title: {
        type: String ,
        required: [true , "Food title is required"]
    } ,
    description: {
        type: String ,
        required: [true , "Food description is required"]
    } ,
    price: {
        type: Number ,
        required: [true , "Food price is required"]
    } ,
    imageURL: {
        type: String ,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fsimilarpng.com%2Fgood-food-logo-design-on-transparent-background-png%2F&psig=AOvVaw0MIUsHsAMR7PFl9H7Q6IzC&ust=1720936455062000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPjY_4Gqo4cDFQAAAAAdAAAAABAE"
    } ,
    foodTags: {
        type: String
    } ,
    category: {
        type: String
    } ,
    code: {
        type: String
    } ,
    isAvailabe: {
        type: Boolean ,
        default: true
    } ,
    restaurant: {
        type: mongoose.Schema.Types.ObjectId ,
        ref: "Restaurant"
    } ,
    rating: {
        type: Number ,
        default: 5 ,
        min: 1 ,
        max: 5
    } ,
    ratingCount: {
        type: String
    },
} , { timestamps: true }
);

module.exports = mongoose.model('Foods' , foodSchema);
