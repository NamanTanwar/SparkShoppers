const httpStatus=require('http-status')
const cartService=require('../services/cart.service')
const paymentService=require('../services/payment.service')
const orderService=require('../services/order.service')


const capturePayment=async (req,res)=>{
    try{

        const {userId}=req.body
       
        const products=await cartService.getAllItems(userId)

        if(!products || !products.length){
            return res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                message: "User products not found"
            })
        }

        let totalAmount=0

        let productsId=[]

        for(let i=0;i<products.length;i++){
            let currProduct=products[i]
            totalAmount+=(currProduct._id.cost*currProduct._id.quantity)
            productsId.push(currProduct._id._id)
        }

        const paymentResponse=await paymentService.createOrder(totalAmount)

       /* if(!paymentResponse){
            return res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                message:"User order not created"
            })
        }*/

       // console.log("Payment Response:",paymentResponse)

        const userOrder=await orderService.createUserOrder(userId,productsId,'created')

        
        console.log('Payment Response from instace:',paymentResponse)

        console.log('Order created:',userOrder)

        res.status(httpStatus.OK).json({
            success:true,
            message:"Order created successfully",
            data:{
                paymentResponse,
                userOrder,
            }
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

module.exports={
    capturePayment,
}