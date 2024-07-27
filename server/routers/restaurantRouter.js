const express = require('express');

const authMiddleware = require("../middlewares/authMiddleware");
const { 
    createRestaurantController ,
    getAllRestaurantController,
    getByID ,
    deleteRestaurantController ,
    updateRestaurantController
} = require('../controllers/restaurantController');

const router = express.Router();

// Router 
// Create RESTAURANT || POST 
router.post('/create' , authMiddleware , createRestaurantController);

// GetAll RESTAURANT || GET
router.get('/getAll' , getAllRestaurantController);

// Get RESTAURANT BY ID || GET
router.get('/get/:id' , getByID);

// Delete RESTAURANT BY ID || DELETE
router.delete('/delete/:id' , authMiddleware , deleteRestaurantController);

// Update RESTAURANT BY ID || PUT
router.put('/update/:id' , authMiddleware , updateRestaurantController);

module.exports = router;




