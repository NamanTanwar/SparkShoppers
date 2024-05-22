const httpStatus = require('http-status')
const Order=require('../models/Order')
const mongoose=require('mongoose');

const createUserOrder=async (userId,orderId,productsDetails,totalAmount,status)=>{
    try{
        // console.log('products in createUserOrder service:',products)
        // products=products.split(',')
        // for(let i=0;i<products.length;i++){
        //     products[i]=new mongoose.Types.ObjectId()
        // }
        const newOrder=await Order.create({
            user: userId,
            products: productsDetails,
            status: status,
            orderAmount: totalAmount,
            orderId: orderId
        })

        console.log("Order created:",newOrder)

        if(!newOrder){
            throw new Error('Error in order creation')
        }

        return newOrder;


    }catch(err){
        console.log("Error in create order service:",err)
        console.log('error message:',err.message)
        throw new Error(err.message)
}
}

const updateOrderStatus=async (orderId,status)=>{
    try{
        const order=await Order.findOne({orderId : orderId}).populate('user').populate('products.product')
        if(!order){
            throw new Error('Order not found')
        }
        order.status=status
        order.save()
        return order
    }catch(err){
        console.log('Error in updateOrderStatus service:',err)
        console.log('error message:',err.message)
        throw new Error(err.message)
    }
}

module.exports={
    createUserOrder,
    updateOrderStatus,
}