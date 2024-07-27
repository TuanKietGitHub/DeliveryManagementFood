const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
    {
        title: {
            type: String ,
            required: [ true , "Category title is required" ]
        } ,
        imageURL: {
            type: String ,
            default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fsimilarpng.com%2Fgood-food-logo-design-on-transparent-background-png%2F&psig=AOvVaw0MIUsHsAMR7PFl9H7Q6IzC&ust=1720936455062000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCPjY_4Gqo4cDFQAAAAAdAAAAABAE"
        }
    } ,
    { timestamps: true }
);


module.exports = mongoose.model("Category" , categorySchema);



