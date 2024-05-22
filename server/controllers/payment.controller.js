const httpStatus=require('http-status')
const cartService=require('../services/cart.service')
const paymentService=require('../services/payment.service')
const orderService=require('../services/order.service')
const tokenService=require('../services/token.service')
const razorpay=require('../config/payment')
const userService=require('../services/user.service')
const crypto = require('crypto');
require('dotenv').config()

const capturePayment=async (req,res)=>{
    try{

        const {formData,userToken}=req.body

        const userId=await tokenService.extractUserIdFromToken(userToken)

        if(!userId){
            return res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                message: 'Invalid user'
            })
        }
       
        const products=await cartService.getAllItems(userId)

        console.log('Cart items:',products)

        console.log('form Data received:',formData)
        console.log('userToken received:',userToken)

        const user=await userService.updateAddress(formData,userId)

        if(!user){
            throw new Error('Error in updated user address')
        }

        if(!products || !products.length){
            return res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                message: "User products not found"
            })
        }

        let totalAmount=0
        let productsId=[]
        let productsDetails=[]

        for(let i=0;i<products.length;i++){
            let currProduct=products[i]
            let productObj={}
            productObj.product=currProduct._id._id
            productObj.quantity=currProduct.quantity
            productObj.cost=currProduct.quantity*currProduct._id.cost
            totalAmount+=(currProduct._id.cost*currProduct.quantity)
            productsDetails.push(productObj)
            productsId.push(currProduct._id._id.toString())
        }
        
        const orderOptions={
            amount: totalAmount*100,
            currency: 'INR',
            receipt: `receipt_${Date.now()}`,
            notes: {
                userId:userId.toString(),
                productsId: productsId.join(',')
            },
        }

        const order=await razorpay.orders.create(orderOptions)
        console.log('order:',order)

        const userOrder=await orderService.createUserOrder(userId,order.id,productsDetails,totalAmount,order.status)
        console.log('user created order:',userOrder)



        res.status(httpStatus.OK).json({
            success: true,
            message:'Order created successfully',
            orderId: order.id,
            amount: order.amount,
            currency: order.currency
        })
       
    }catch(err){
        console.log('Error in capturing payment:',err)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success:false,
            error:err.message,
            message:"Internal Server Error",
        })

    }
}

const verifyPayment=async (req,res)=>{

   // console.log('Request body is:',req.body)

    try{
        
        const secret=process.env.RAZORPAY_WEBHOOK_SECRET
        //creating a HMAC this can be used to hash 
        const shasum=crypto.createHmac('sha256',secret)
        //hashing the payload using HMAC
        shasum.update(JSON.stringify(req.body))
        //this is the hashed value of the request body using the secret key
        const digest=shasum.digest('hex')

    //comparing generated hash with the razorpay signature
    if(digest===req.headers['x-razorpay-signature']){

        const event=req.body.event
        //successfull payment
        if(event==='payment.captured'){
            const paymentEntity = req.body.payload.payment.entity
            const orderId = paymentEntity.order_id
            //updating backend 
            const userOrder=await orderService.updateOrderStatus(orderId,'paid')
            if(!userOrder){
                throw new Error('error in payment verification')
            }
            console.log('userOrder in verify-payment controller:',userOrder)
            //sending success mail to user
            const info=await paymentService.sendPaymentSuccessEmail(userOrder.user.firstname,userOrder.user.lastname,userOrder.user.email,userOrder.orderAmount,userOrder.products)

            console.log('info:',info)
            res.status(httpStatus.OK).json({status: 'ok'})
        }else{
            const userOrder=await orderService.updateOrderStatus(razorpay_order_id,'failed')
            if(!userOrder){
                throw new Error('error in userOrder')
            }
            res.status(httpStatus.OK).json({status: 'ok'})
        }
        // res.status(httpStatus.OK).json({
        //     success: true,
        //     message: 'Payment successfully verified',
        // })
    }
    else{
        
        res.status(httpStatus.BAD_REQUEST).json({
            status: 'error',
            message:'Invalid signature'
        }) 
    }
    }catch(err){
        console.log('Error occured in verify-payment controller:',err)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success:false,
            error:err.message,
            message:'Internal Server Error'
        })
    }
}

module.exports={
    capturePayment,
    verifyPayment,
}