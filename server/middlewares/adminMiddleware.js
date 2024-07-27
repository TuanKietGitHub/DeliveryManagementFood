const userModel = require("../models/userModel");

module.exports = async (req , res , next ) => {
    try {
        // Find Admin
        console.log(req.body.id)
        const user = await userModel.findById(req.body.id);
        
        if (user.usertype !== "admin") {
            return res.status(404).send({
                success: false ,
                message: "Only Admin Access"
            });
        } else {
            next();
        } 
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false , 
            message: 'Un-Autherized Access' , 
            error
        });
    }
}




