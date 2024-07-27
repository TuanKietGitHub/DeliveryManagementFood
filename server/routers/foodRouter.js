const express = require('express');

const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');

const { 
    createFoodController, 
    getAllFoodController ,
    getFoodIDController ,
    getRestaurantFoodController ,
    updateFoodController ,
    deleteFoodController,
    createOrderController,
    getAllOrderController,
    deleteOrderController,
    statusOrderController
} = require('../controllers/foodController');

const router = express.Router();

// Router 
// Create Foods 
router.post('/create' , authMiddleware , createFoodController);

// GET ALL Foods 
router.get('/getAll' , getAllFoodController);

// GET FoodID 
router.get('/getFood/:id' , getFoodIDController);

// GET Restaurant Food 
router.get('/getRestaurant/:id' , getRestaurantFoodController);

// Update Foods 
router.put('/update/:id' , authMiddleware , updateFoodController);

// Create Foods 
router.delete('/delete/:id' , authMiddleware , deleteFoodController);

// Create Order 
router.post('/order' , authMiddleware , createOrderController);

// Get All Order 
router.get('/order/getAll' , authMiddleware , getAllOrderController);

// Delete Order 
router.delete('/order/delete/:id' , authMiddleware , deleteOrderController);

// Status Order 
router.post('/order/status/:id' , authMiddleware , adminMiddleware , statusOrderController);


// Exports
module.exports = router;
