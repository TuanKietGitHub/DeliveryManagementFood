const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const { 
    getUserController , 
    updateUserController, 
    resetPasswordController, 
    deleteUserController
} = require('../controllers/userController');

const router = express.Router();


// Router 
// GET USER || GET 
router.get("/getUser" , authMiddleware , getUserController);


// UPDATE USER || PUT 
router.put("/updateUser" , authMiddleware  , updateUserController);

// RESET PASSWORD || POST
router.post("/resetPassword" , authMiddleware , resetPasswordController);

// DELETE USER || DELETE
router.delete("/deleteUser/:id" , authMiddleware , deleteUserController);

module.exports = router; 






