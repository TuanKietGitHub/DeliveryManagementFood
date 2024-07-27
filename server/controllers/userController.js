const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

// CONTROLLER
// GET USER || GET
const getUserController = async (req , res) => {
    try {
        const getUser = await userModel.findById({_id:req.body.id}).select("-password");
        return res.status(201).send({
            success: true ,
            getUser
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false , 
            message: 'Error in Register API' , 
            error
        });
    }
};

// UPDATE USER || PUT
const updateUserController = async (req , res) => {
    try {
        // Search Id user update
        const user = await userModel.findById({_id:req.body.id});
        if(!user) {
            return res.status(404).send({
                success: false , 
                message: 'User not found'
            });
        }

        const {username , address , phone , profile } = req.body;

        // Check data update user 
        if(username) user.username = username;
        if(address) user.address = address;
        if(phone) user.phone = phone;
        if(profile) user.profile = profile;
 
        // Update user 
        await user.save();
        res.status(200).send({
            success: true ,
            message: "User update successfully!" ,
            user
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false , 
            message: 'User not found' , 
            error
        });
    }
};


// RESET PASSWORD
const resetPasswordController = async (req , res) => {
    try {
        const { password  , NewPassword , id} = req.body;
        if(!NewPassword || !password ) {
            return res.status(500).send({
                success: false ,
                message: "Please Privide All Fields"
            });
        };

        if(password === NewPassword) {
            return res.status(500).send({
                success: false ,
                message: "you are entering the old password"
            });
        };

        // Search user id 
        const user = await userModel.findById({_id: id});
        if(!user) {
            return res.status(404).send({
                success: false , 
                message: 'User not found'
            });
        }

        // Hash check password
        const passwordHash = await bcrypt.compare(password , user.password);
        if (!passwordHash) 
            return res.status(500).send({
                success: false , 
                message: 'Password not found!'
            });
        
        // Hash Password Update
        var salt = bcrypt.genSaltSync(12);
        const hashPassword = await bcrypt.hash(NewPassword , salt);
        
        // Update password 
        user.password = hashPassword;
        await user.save();
        res.status(200).send({
            success: true ,
            message: "Password Reset Successfully!"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false , 
            message: 'User not found' , 
            error
        });
    }
};


// DELETE USER || DELETE
const deleteUserController = async (req , res) => {
    try {
        
        if(req.body.id !== req.params.id)   {
            return res.status(500).send({
                success: false ,
                message: "Error ID USER!"
            });
        }
        
        // Check User In Database 
        const checkUser = await userModel.findById({_id:req.params.id});
        if(!checkUser)
            return res.status(500).send({
                success: false , 
                message: "User Not found!"
            })

        // Delete In Database 
        await userModel.findByIdAndDelete(req.params.id);
        return res.status(200).send({
            success: true ,
            message: "Delete User Successfully!"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false , 
            message: 'Error In Delete Profile API' , 
            error
        });
    }
}

module.exports = { 
    getUserController , 
    updateUserController ,
    resetPasswordController ,
    deleteUserController
};

