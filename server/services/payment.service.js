const {instance}=require('../config/payment')
const httpStatus=require('http-status')

const createOrder=async (totalAmount)=>{
    try{

        const currency='INR'

        const options={
            amount: totalAmount*100,
            currency,
            receipt: Math.random(Date.now()).toString()
        }

        const paymentResponse=await instance.orders.create(options)

        if(!paymentResponse){
            throw new Error('Error while creating order')
        }

        return paymentResponse


    }catch(err){
        console.log("Error in payment layer",err)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success:false,
            error:err.message,
            message:"Internal Server Error"
        })
    }
}

module.exports={
    createOrder,
}