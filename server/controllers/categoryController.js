const categoryModel = require('../models/categoryModel');

// Create Category || POST 
// api/auth/category/create
const createCategoryController = async ( req , res ) => {
    try {
        const {title , imageURL} = req.body;

        // Check data not found
        if ( !title )
            return res.status(404).send({
                success: false ,
                message: 'Please Provide All Fields'
            })
        
        const newCategory = new categoryModel({title , imageURL});

        // Add Category on Database 
        await newCategory.save();
        res.status(200).send({
            success: true ,
            message: "Create Category Successfully!" ,
            newCategory
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false , 
            message: 'Error Create Category ' , 
            error
        });
    }  
}; 


// Get All Category || GET
// api/auth/category/getAll
const getAllCategoryController = async ( req , res ) => {
    try {
        // Get List category in Database 
        const categorys = await categoryModel.find({});

        if ( !categorys ) 
            return res.status(404).send({
                success: false ,
                message: "Error List Category"
            })
        
        res.status(200).send({
            success: true ,
            message: "List Category is: " ,
            CategoryCount: categorys.length ,
            categorys
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false ,
            message: "Error Get All Category" ,
            error
        });
    }
};


// Delete Category || DELETE
// api/auth/category/delete/:id
const deleteCategoryController = async ( req , res ) => {
    try {
        // Find Category In Database 
        const deleteCategory = await categoryModel.findByIdAndDelete({_id: req.params.id});
        
        if(!deleteCategory)
            return res.status(404).send({
                success: false ,
                message: "Category Id Not found"
            });

        res.status(200).send({
            success: true ,
            message: "Delete Category Successfully!"
        });

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false ,
            message: "Error Delete Category" ,
            error
        });
    }
};

// Update Category || PUT 
// api/auth/category/update/:id
const updateCategoryController = async ( req , res ) => {
    try {
        // Val
        const { title , imageURL } = req.body;
        
        // Find Category In Database 
        const categoryID = await categoryModel.findById({_id: req.params.id});
        
        if ( !categoryID ) 
            return res.status(404).send({
                success: false ,
                message: "Category ID Not Found!"
            });
        
        // Update data
        if ( title ) categoryID.title = title; 
        if ( imageURL ) categoryID.imageURL = imageURL;
        
        await categoryID.save();
        
        res.status(200).send({
            success: true ,
            message: "Update Category Successfully!" ,
            categoryID
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false ,
            message: "Error Update Category" ,
            error
        });
    }
}


module.exports = { 
    createCategoryController ,
    getAllCategoryController ,
    deleteCategoryController ,
    updateCategoryController
};
