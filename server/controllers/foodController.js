const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");
const restaurantModel = require("../models/restaurantModel");

// CREATE FOOD || POST 
// api/auth/food/create
const createFoodController = async ( req , res ) => {
    try {
        // Vali
        const {
            title ,
            description ,
            price ,
            imageURL ,
            foodTags ,
            category ,
            code ,
            isAvailabe ,
            restaurant ,
            rating
        } = req.body;
        
        // Check data
        if ( !title || !description || !price || !restaurant )
            return res.status(404).send({
                success: false ,
                message: "Please Provide All Fields"
           });

        // Check ID Restaurant
        const checkRestaurant = await restaurantModel.findById({_id: restaurant});
        
        if ( !checkRestaurant )
            return res.status(404).send({
                success: false ,
                message: "ID Restaurant Not Found"
            })

        // Add Model 
        const newFood = new foodModel({
            title ,
            description ,
            price ,
            imageURL ,
            foodTags ,
            category ,
            code ,
            isAvailabe ,
            restaurant ,
            rating
        });
        
        // Add food In Database 
        await newFood.save();
        
        res.status(200).send({
            success: true ,
            message: "Create Food Successfully!" ,
            newFood
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false ,
            message: "Error Create Food" ,
            error
        });
    }
};

// GET ALL FOODS || GET
// api/auth/food/getAll
const getAllFoodController = async ( req , res ) => {
    try {
        // Get Foods In Database 
        const foods = await foodModel.find({});
        
        if ( !foods )
            return res.status(404).send({
                success: false ,
                message: "List Foods Null!"
            });

        res.status(200).send({
            success: true ,
            message: "Foods:" ,
            foodCount: foods.length ,
            foods 
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false ,
            message: "Error Get All Food" ,
            error
        });
    };
};

// GET FOOD ID || GET
// api/auth/food/getFood/:id
const getFoodIDController = async ( req , res ) => {
    try {
        // Find Food Id In Database 
        const foodID = await foodModel.findById({_id: req.params.id});

        if ( !foodID ) 
            return res.status(404).send({
                success: false ,
                message: "Food ID Not Found!"
            });

        res.status(200).send({
            success: true ,
            message: "Food Id is: ",
            foodID
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false ,
            message: "Error Get Food ID" ,
            error
        });
    };
};

// GET Restaurant || GET
// api/auth/food/getRestaurant/:id
const getRestaurantFoodController = async ( req , res ) => {
    try {
        // Find Food Id In Database 
        const RestaurantsID = await foodModel.find({restaurant: req.params.id});

        if ( RestaurantsID.length === 0 ) 
            return res.status(404).send({
                success: false ,
                message: "Restaurants ID Not Found!"
            });

        res.status(200).send({
            success: true ,
            message: "Restaurants ID is: ",
            RestaurantsID
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false ,
            message: "Error Get Restaurant Food" ,
            error
        });
    };
};

// UPDATE FOODS || PUT
// api/auth/food/update/:id
const updateFoodController = async ( req , res ) => {
    try {
        // Find Food Id In Datebase 
        const updateFood = await foodModel.findById({_id: req.params.id});
        if ( !updateFood )
            return res.status(404).send({
                success: false ,
                message: "Update Food ID Not Found!"
            });

        // Vali
        const {
            title ,
            description ,
            price ,
            imageURL ,
            foodTags ,
            category ,
            code ,
            isAvailabe ,
            restaurant ,
            rating
        } = req.body;

        // Check data
        if ( !title || !description || !price || !restaurant )
            return res.status(404).send({
                success: false ,
                message: "Please Provide All Fields"
           });

        // Check ID Restaurant
        const checkRestaurant = await restaurantModel.findById({_id: restaurant});
        
        if ( !checkRestaurant )
            return res.status(404).send({
                success: false ,
                message: "ID Restaurant Not Found"
            })

        // Add Model 
        if ( title ) updateFood.title = title;
        if ( description ) updateFood.description = description;
        if ( price ) updateFood.price = price;
        if ( imageURL ) updateFood.imageURL = imageURL;
        if ( foodTags ) updateFood.foodTags = foodTags;
        if ( category ) updateFood.category = category;
        if ( code ) updateFood.code = code;
        if ( !(updateFood.isAvailabe === isAvailabe) && isAvailabe !== undefined) updateFood.isAvailabe = isAvailabe;
        if ( restaurant ) updateFood.restaurant = restaurant;
        if ( rating ) updateFood.rating = rating;
        
        await updateFood.save();

        res.status(200).send({
            success: true ,
            message: "Update Food Successfully!" ,
            updateFood
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false ,
            message: "Error Update Food ID" ,
            error
        });
    };
};

// DELETE FOODS || DELETE
// api/auth/food/delete/:id
const deleteFoodController = async ( req , res ) => {
    try {
        // Delete Food 
        const deleteFood = await foodModel.findByIdAndDelete({_id: req.params.id});

        if ( !deleteFood )
            return res.status(404).send({
                success: false ,
                message: "Delete Food ID Not Found"
            });

        res.status(200).send({
            success: true ,
            message: "Delete Food Successfully!"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false ,
            message: "Error Delete Food ID" ,
            error
        });
    };
};


// Crete ORDER || POST 
// api/auth/food/order
const createOrderController = async ( req , res ) => {
    try {
        // Vali
        const { cart , countOrder } = req.body;

        if ( !cart ) 
            return res.status(404).send({
                success: false ,
                message: "Please food cart or payment method"
            });
            
        // Add price on total
        const checkIDFood = await foodModel.findById({_id: cart._id});
            if( !checkIDFood ) 
                return res.status(404).send({
                    success: false ,
                    message: "Food Not Found!"
                });

        const updateCount = await orderModel.find({foods: cart._id , buyer: req.body.id , status: "preparing"});

        if ( updateCount.length > 0 ) {

            let totalCount = 0;
            let totalPrice = 0;
            let IdUpdate = 0;

            updateCount.map ( (i) => {
                IdUpdate = i.id;
                totalCount = i.count;
                totalPrice = i.payment;
            })

            // Update Count And Payment 
            const updateOrder = await orderModel.findById({_id: IdUpdate });
            
            if ( !updateOrder )
                return res.status(404).send({
                    success: false ,
                    message: "Create Unsuccessfully!"
                });

            updateOrder.count = totalCount + countOrder ;
            updateOrder.payment = totalPrice + (countOrder * cart.price) ;

            await updateOrder.save();

            res.status(200).send({
                success: true ,
                message: "Created Order Successfully!" ,
                updateOrder
            })
        } else {
            // Add Model Order 
            const newOrder = new orderModel({
                foods: cart ,
                count: countOrder , 
                payment: cart.price * countOrder ,
                buyer: req.body.id
            }); 

            // Add Order In Database 
            await newOrder.save();

            res.status(200).send({
                success: true ,
                message: "Create Order Successfully!" ,
                newOrder
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false ,
            message: "Error Create Order" ,
            error
        });
    }
}

// GET ALL ORDER || GET 
// api/auth/food/order/getAll
const getAllOrderController = async ( req , res ) => {
    try {
        // Find User Order In Database 
        const listOrder = await orderModel.find({buyer: req.body.id});

        if ( !listOrder )
            return res.status(404).send({
                success: false ,
                message: "Order Not Found"
            });

        res.status(200).send({
            success: true ,
            message: "List User Order is: " ,
            listOrder
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false ,
            message: "Error Get All Order" ,
            error
        });
    }
}

// Delete ORDER || Delete 
// api/auth/food/order/delete/:id
const deleteOrderController = async ( req , res ) => {
    try {
        // Find Order In Database 
        const deleteOrder = await orderModel.findByIdAndDelete({_id: req.params.id});

        if ( !deleteOrder ) 
            return res.status(404).send({
                success: false ,
                message: "Order Id Not Found"
            });

        res.status(200).send({
            success: true ,
            message: "Delete Order Successfully!"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false ,
            message: "Error Delete Order" ,
            error
        });
    }
}

// ORDER STATUS || POST 
// api/auth/food/order/status/:id
const statusOrderController = async ( req , res ) => {
    try {
        const orderID = req.params.id;
        if( !orderID ) 
            return res.status(404).send({
                success: false ,
                message: "Please Provide Valid Order Id"
            });

        const { status } = req.body;
        const order = await orderModel.findByIdAndUpdate(orderID , {status} , {new:true});

        res.status(200).send({
            success: true ,
            message: "Order Status Update!" ,
            order
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false ,
            message: "Error Order Status" ,
            error
        });
    }
}

// Exports
module.exports = { 
    createFoodController ,
    getAllFoodController ,
    getFoodIDController ,
    getRestaurantFoodController ,
    updateFoodController ,
    deleteFoodController ,
    
    createOrderController ,
    getAllOrderController ,
    deleteOrderController ,
    statusOrderController
};
