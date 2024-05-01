const httpStatus=require('http-status')
const wishlistService=require('../services/wishlist.service')

const addToWishlist=async (req,res)=>{
    try{
        //Fetching userId and productId from request
        const {userId,productId}=req.body

        const newWishlist=await wishlistService.addToWishlist(userId,productId)

        //Successfull response
        res.status(httpStatus.OK).json({
            success:true,
            message:"Product added to wishlist",
            data: newWishlist
        })

    }catch(err){
        const statusCode=httpStatus.INTERNAL_SERVER_ERROR
        const errorMessage="Internal Server Error"

        if(err.message==='User wishlist does not exist'){
            statusCode=httpStatus.BAD_REQUEST
            errorMessage=err.message
        }

        console.log("Error in wishlist controller:",err)
        res.status(statusCode).json({
            success:false,
            error:err.message,
            message: errorMessage
        })
    }
}

const removeFromWishlist=async (req,res)=>{
    try{
        const {userId,productId}=req.body

        const updatedWishlist=await wishlistService.removeFromWishlist(userId,productId)

        res.status(httpStatus.OK).json({
            success: true,
            message: "Item removed from wishlist successfully",
            data: updatedWishlist,
        })

    }catch(err){
        console.log("Error in wishlist controller:",err)
        let statusCode=httpStatus.INTERNAL_SERVER_ERROR
        let errorMessage="Internal Server Error"

        if(err.message==='User wishlist not found'){
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

const getUserWishlist=async (req,res)=>{
    
    try{

        const {userId}=req.params

        const products=await wishlistService.getAllItems(userId)

        res.status(httpStatus.OK).json({
            success: true,
            message: "Wishlist items fetched successfully",
            data: products
        })

    }catch(err){
        console.log(err)
        let statusCode=httpStatus.INTERNAL_SERVER_ERROR
        let errorMessage="Internal Server Error"

        if(err.message==="User Wishlist not found"){
            statusCode=httpStatus.BAD_REQUEST
            errorMessage=err.message
        }

        res.status(statusCode).json({
            success: false,
            error:err.message,
            message: errorMessage
        })

    }
}


module.exports={
    addToWishlist,
    removeFromWishlist,
    getUserWishlist,
}