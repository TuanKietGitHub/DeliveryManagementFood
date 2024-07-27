const restaurantModel = require("../models/restaurantModel");

// Creat Restaurant 
// POST 
// api/auth/restaurant/create
const createRestaurantController = async ( req , res ) => {
    try {
        // Take Data
        const {
            title ,
            imageURL ,
            foods ,
            time ,
            pickup ,
            delivery ,
            isOpen ,
            logoURL ,
            rating ,
            ratingCount ,
            code ,
            coords

        } = req.body;

        // Check Title 
        if (!title || !coords)
            return res.status(500).send({
                success: false ,
                message: "Please Privide All Fields"
            }) 
           
        // Add Restaurant on Data
        const newRestaurant = new restaurantModel({
            title ,
            imageURL ,
            foods ,
            time ,
            pickup ,
            delivery ,
            isOpen ,
            logoURL ,
            rating ,
            ratingCount ,
            code ,
            coords
        });

        await newRestaurant.save();

        res.status(201).send({
            success: true ,
            message: "New Restaurant Created Successfully!",
            newRestaurant
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false , 
            message: 'Error Create Restaurant ' , 
            error
        });
    }
}


// GET ALL RESTAURANT 
// api/auth/restaurant/getAll
const getAllRestaurantController = async ( req , res ) => {
    try {
        const restaurants = await restaurantModel.find({});
        if (!restaurants)
            return res.status(404).send({
                success: false ,
                message: "No Restaurant Availible"
            });

        res.status(200).send({
            success: true ,
            totalCount: restaurants.length ,
            restaurants
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false , 
            message: 'Error Get List Restaurant' , 
            error
        });
    }
}

// GET RESTAURANT BY ID 
// api/auth/restaurant/get/:id
const getByID = async ( req , res ) => {
    try {
        
        // Find ID 
        const restaurant = await restaurantModel.findById({_id: req.params.id});
        
        if( !restaurant )
            return res.status(404).send({
                success: false ,
                message: 'Restaurant Not found'
            });

        res.status(200).send({
            success: true ,
            message: "Restaurant is: " ,
            restaurant
        })


    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false , 
            message: 'Error Get Restaurant By ID' , 
            error
        });
    }
}

// DELETE RESTAURANT || DELETE
// api/auth/restaurant/delete/:id
const deleteRestaurantController = async ( req , res ) => {
    try {
        // delete restaurant 
        const deleteRestaurant = await restaurantModel.findByIdAndDelete({_id: req.params.id});
        
        if( !deleteRestaurant ) 
            return res.status(404).send({
                success: false ,
                message: 'Delete Restaurant UnsuccessFully!'
            });

        res.status(200).send({
            success: true ,
            message: 'Delete Restaurant Successfully!' ,
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false , 
            message: 'Error Delete Restaurant By ID' , 
            error
        });
    }
}

// Update Restaurant || PUT
// api/auth/restaurant/update/:id
const updateRestaurantController = async ( req , res ) => {
    try {
        // Find ID Restaurant 
        const restaurantID = await restaurantModel.findById({_id: req.params.id});
        if ( !restaurantID ) 
            return res.status(404).send({
                success: false ,
                message: 'Restaurant By ID Not Found'
            })

        const {
            title ,
            imageURL ,
            foods ,
            time ,
            pickup ,
            delivery ,
            isOpen ,
            logoURL ,
            rating ,
            ratingCount ,
            code ,
            coords
        } = req.body;

        // Check null title & coords 
        if (title) restaurantID.title = title;
        if (imageURL) restaurantID.imageURL = imageURL;
        if (foods) restaurantID.foods = foods;
        if (time) restaurantID.time = time;
        if ( !(restaurantID.pickup === pickup) && pickup !== undefined) restaurantID.pickup = pickup;
        if (!(restaurantID.delivery === delivery) && delivery !== undefined) restaurantID.delivery = delivery;
        if (!(restaurantID.isOpen === isOpen) && isOpen !== undefined) restaurantID.isOpen = isOpen;
        if (logoURL) restaurantID.logoURL = logoURL;
        if (rating) restaurantID.rating = rating;
        if (ratingCount) restaurantID.ratingCount = ratingCount;
        if (code) restaurantID.code = code;
        if (coords) restaurantID.coords = coords;
        
        // Update Restaurant
        await restaurantID.save();
        res.status(200).send({
            success: true , 
            message: 'Update Restaurant Successfully!' ,
            restaurantID
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false , 
            message: 'Error Update Restaurant By ID' , 
            error
        });
    }
}

module.exports = { 
    createRestaurantController , 
    getAllRestaurantController ,
    getByID ,
    deleteRestaurantController ,
    updateRestaurantController
};
