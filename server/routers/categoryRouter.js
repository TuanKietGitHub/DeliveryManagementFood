const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const { 
    createCategoryController ,
    getAllCategoryController ,
    deleteCategoryController ,
    updateCategoryController
} = require("../controllers/categoryController")

const router = express.Router();

// Router 
// CREATE CATEGORY || POST
router.post('/create' , authMiddleware , createCategoryController);

// GET ALL CATEGORY || GET
router.get('/getAll' , getAllCategoryController);

// DELETE CATEGORY || DELETE
router.delete('/delete/:id' , authMiddleware , deleteCategoryController);

// UPDATE CATEGORY || PUT 
router.put('/update/:id' , authMiddleware , updateCategoryController);

module.exports = router;

