const Cart=require('../models/Cart')
const httpStatus=require('http-status')
const Product=require('../models/Product')
const cartService=require('../services/cart.service')


const addToCart=async (req,res)=>{
    
    try{
       
        //Fetching user and product
        const {userId,productId}=req.body

        const userCart=await cartService.addToCart(userId,productId)

        //If cart not found
        if(!userCart){
            return res.status(httpStatus.NOT_FOUND).json({
                success:false,
                message:"User cart not found"
            })
        }

        //Successfull Response
        res.status(httpStatus.OK).json({
            success:true,
            message:"Product Added To Cart",
            data: userCart,
        })

    }catch(err){

        let statusCode=httpStatus.INTERNAL_SERVER_ERROR
        let errorMessage="Internal Server Error"

        if(err.message==='Item quantity limit reached' || err.message==="Item out of stock"){
            statusCode=httpStatus.BAD_REQUEST,
            errorMessage=err.message
        }

        console.log("Error in addToCart route",err)
        res.status(statusCode).json({
            success:false,
            error:err.message,
            message:errorMessage
        })
    }
}

const removeFromCart=async (req,res)=>{
    
    try{
        //Fetching userId and productId
        const {userId,productId}=req.body

        const userCart=await cartService.removeFromCart(userId,productId)

        

        //Validating user cart
        if(!userCart.cart){
            return res.status(httpStatus.BAD_REQUEST).json({
                success:false,
                message: userCart.message
            })
        }

      
          //Successfull response
          return res.status(httpStatus.OK).json({
            success:true,
            message:"Item removed from cart",
            data: userCart.cart
          })

    
        }catch(err){
        console.log("Remove from cart error:",err)

        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success:false,
            error:err.message,
            message:"Internal Server Error"
        })
    }
}

const getAllItems=async (req,res)=>{
    try{
        //Fetching userId from request
        const {userId}=req.params

        const products=await cartService.getAllItems(userId)

        //Successfull response
        res.status(httpStatus.OK).json({
            success:true,
            message:"Cart Items fetched successfully",
            data:products
        })
        
    }catch(err){
        let statusCode=httpStatus.INTERNAL_SERVER_ERROR
        let errorMessage="Internal Server Error"

        if(err.message==='User cart does not exist'){
            statusCode=httpStatus.BAD_REQUEST
            errorMessage=err.message
        }

        res.status(statusCode).json({
            success:false,
            error:err.message,
            message:errorMessage
        })
    }
}

module.exports={
    addToCart,
    removeFromCart,
    getAllItems,
}