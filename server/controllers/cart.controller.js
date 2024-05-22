const Cart=require('../models/Cart')
const httpStatus=require('http-status')
const Product=require('../models/Product')
const cartService=require('../services/cart.service')
const { tokenService } = require('../services')


const addToCart=async (req,res)=>{
    
    try{
    
        //Fetching user and product
        const {productId,userToken}=req.body

        const userId=await tokenService.extractUserIdFromToken(userToken)

        const userCart=await cartService.addToCart(userId,productId)

        const totalPrice=await cartService.calculateTotal(userId)

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
            userCart: userCart,
            totalPrice: totalPrice,
        })

    }catch(err){

        let statusCode=httpStatus.INTERNAL_SERVER_ERROR
        let errorMessage="Internal Server Error"

        if(err.message==='Item quantity limit reached' || err.message==="Item out of stock"){
            statusCode=httpStatus.BAD_REQUEST,
            errorMessage=err.message
        }

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
        const {userToken,productId,removeItem}=req.body
        //extracting userId from userToken
        const userId=await tokenService.extractUserIdFromToken(userToken)
        //Removing item from cart
        const userCart=await cartService.removeFromCart(userId,productId,removeItem)

        const cartTotal=await cartService.calculateTotal(userId)

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
            userCart: userCart.cart,
            cartTotal: cartTotal,

          })

    
        }catch(err){
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

const calculateTotal=async (req,res)=>{

    const {cartItems}=req.body

    try{
        
        const totalAmount=await cartService.calculateTotal(cartItems)

        console.log('cart total amount:',totalAmount)

        if(totalAmount<=0){
            throw new Error('No items in the Cart')
        }

        res.status(httpStatus.OK).json({
            success: true,
            message: 'Total amount calculated successfully',
            total: totalAmount
        })

    }catch(err){
        console.log('Erro in calculate total controller:',err)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            error:err.message,
            message: "Internal Server Error"
        })
    }

}

module.exports={
    addToCart,
    removeFromCart,
    getAllItems,
    calculateTotal,
}