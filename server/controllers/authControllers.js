const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

// List user || GET
const listUserController = async (req , res) => {
    try {
        const listUser = await userModel.find()
        // .select('-password');
        return res.status(201).send({
            success: true ,
            listUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false , 
            message: 'Error in Register API' , 
            error
        });
    }
}

// Register user || POST
const registerController = async (req , res) => {
    try {
        const {username , email , password , phone , address , answer} = req.body;

        // Validation
        if(!username || !email || !password || !address || !phone || !answer) {
            return res.status(500).send({
                success: false , 
                message: 'Please Provide All Fields'
            });
        }

        // Check Email 
        const checkEmail = await userModel.findOne({email})
        if(checkEmail)
            return res.status(500).send({
                success: false , 
                message: 'Email already Register please Login'
            });

        // Check username
        const checkUsername = await userModel.findOne({username})
        if(checkUsername)
            return res.status(500).send({
                success: false , 
                message: 'Username already!'
            });

        // Check phone
        const checkPhone = await userModel.findOne({phone})
        if(checkPhone)
            return res.status(500).send({
                success: false , 
                message: 'Phone already!'
            });
        
        // Hashcode Password
        var salt = bcrypt.genSaltSync(12);   // So vong lap de tao ra chuoi ma hoa (4-30 chuoi) 
        const hashedPassword = await bcrypt.hash(password , salt); 
        
        // Check new User 
        const userNew = await userModel.create({
            username ,
            email ,
            password: hashedPassword ,
            address ,
            phone , 
            answer
        });
        res.status(201).send({
            success: true ,
            message: "Successfully Register" ,
            userNew
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


// Login user || POST
const loginController = async ( req , res ) => {
    try {
        const { email , password } = req.body; 
        
        // Validation
        if(!email || !password) {
            return res.status(500).send({
                success: false , 
                message: 'Please Provide All Fields'
            });
        }

        // Check username & password
        const checkLogin = await userModel.findOne({email})
        if(!checkLogin)
            return res.status(500).send({
                success: false , 
                message: 'Login information is incorrect!'
            });

        // Hash check password
        const passwordHash = await bcrypt.compare(password , checkLogin.password);
        if (!passwordHash) 
            return res.status(500).send({
                success: false , 
                message: 'Login information is incorrect!'
            });

        // Jsonwebtoken
        const accessToken = JWT.sign({ id : checkLogin._id } , process.env.JWT_SECRET , {
            expiresIn: "2d",
        })

        return res.status(201).send({
            success: true ,
            message: 'Login successfully' ,
            accessToken
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false , 
            message: 'Error in Register API' , 
            error
        });
    }
}


module.exports = {registerController , loginController , listUserController};

