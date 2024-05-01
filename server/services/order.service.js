const httpStatus = require('http-status')
const Order=require('../models/Order')

const createUserOrder=async (userId,products,status)=>{
    try{

        const order=await Order.create({
            user: userId,
            productsBought: products,
            status:status,
        })

        console.log("Order created:",order)

        if(!order){
            throw new Error('Error in order creation')
        }

        return order;


    }catch(err){
        console.log("Error in create order service:",err)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success:false,
            error:err.message,
            message:"Internal Server Error",
        })
    }
}

module.exports={
    createUserOrder,
}