const express = require('express');
const { registerController, loginController, listUserController } = require('../controllers/authControllers');

const router = express.Router();


// Router 
// REGISTER || POST 
router.post('/register' , registerController);

// LOGIN || POST
router.post('/login' , loginController);

// LIST || GET
router.get('/list' , listUserController);

module.exports = router;


