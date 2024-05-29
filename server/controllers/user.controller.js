const httpStatus = require("http-status")
const {userService, tokenService}=require('../services/index')


const getUser=async (req,res)=>{
    try{
        //Fetching user by userId
        let user=await userService.getUserById(req.params.userId)

        
        if(!user){
            throw new ApiError(httpStatus.NOT_FOUND,"User not found")
        }
        //Successfull response
        res.status(httpStatus.OK).json({
            success:true,
            user
        })

    }catch(err){
        console.log("user controller error:",err)
        res.status(httpStatus[500]).json({
            success:false,
            error:err.message,
            message:"Internal Server Error"
        })
    }
}

const setAddress=async (req,res)=>{
 
    try{
        //Checking if user present
        const user=await userService.getUserById(req.params.userId)
        if(!user){
            throw new ApiError(httpStatus.NOT_FOUND,"User not found")
        }
        //Updating address
        const address=await userService.setAddress(user,req.body.address)
    
        //Successfull response
        res.status(httpStatus.CREATED).json({
            success:true,
            message:"Address has been updated successfully",
            address
        })

    }catch(err){
         res.status(httpStatus.INTERNAL_SERVER_ERROR).json(
            {
                success:false,
                error:err.message,
                message:"Internal Server Error"
            }
         )
    }

}

const sendOtp=async (req,res)=>{
    try{

        const otp=otpService.createOtp(req.body.email)


    }catch(err){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success:false,
            error:err.message,
            message:"Internal Server Error"
        })
    }
}

const deleteUser=async (req,res)=>{
    const {userId}=req.params

    try{

        const userCart=await userService.deleteCartForUser(userId)

        const userWishlist=await userService.deleteWishlistForUser(userId)

        const result=await userService.deleteUser(userId) 

        if(!result || !userCart || !userWishlist){
            return res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                message:"Error in deleting the User",
            })
        }

        res.status(httpStatus.OK).json({
            success: true,
            message: "User deleted successfully",
        })

    }catch(err){
        console.log("Error in delete User controller:",err)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: err.message,
            message: "Internal Server Error"
        })
    }
}

const getOrderHistory=async (req,res)=>{

    try{
        const token=req.headers.authorization.split(' ')[1]
        const userId=await tokenService.extractUserIdFromToken(token)
        const orderDetails=await userService.getOrderHistory(userId)
    
        if(!orderDetails){
            return res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                message:"Error in getting the Order History",
            })
        }

        console.log('order details:',orderDetails)

        res.status(httpStatus.OK).json({
            success:true,
            message: "Order History fetched successfully",
            orderDetails 
        })
    
    }catch(err){
        console.log('error in getOrderHistory service:',err)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            error: err.message,
            message: 'Internal Server Error'
        })
    }
}

const addRatingAndReview=async (req,res)=>{
    const {productId,userToken,rating,review}=req.body
    try{
        const userId=await tokenService.extractUserIdFromToken(userToken)
        const ratingAndReview=await userService.addRatingAndReview(userId,rating,review,productId)
        console.log('Rating and review:',ratingAndReview)
    if(!ratingAndReview){
            throw new Error('Error occured in fetching rating and review')
        }
        res.status(httpStatus.OK).json({
            success: true,
            message: 'Review added successfully',
            ratingAndReview,
        })
    }catch(err){
        console.log('Error in add rating and review:',err)
        if(err.message==='Product already reviewed'){
            res.status(httpStatus.BAD_REQUEST).json({
                success: false, 
                error:err.message,
                message:err.message
            })
        }
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            error:err.message,
            message: "Internal Server Error"
        })
    }
}

const getUserReviews=async (req,res)=>{
    const {userToken}=req.body

    try{
        const userId=await tokenService.extractUserIdFromToken(userToken)
        const reviews=await userService.getUserReviews(userId)
        if(!reviews){
            throw new Error('Reviews not found')
        }

        res.status(httpStatus.OK).json({
            success: true,
            message: 'Reviews fethed successfully',
            reviews
        })

    }catch(err){
        console.log('Error occured in getUserReviews controller:',err)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            error:err.message,
            message:'Internal Server Error'
        })
    }
   
    

}

module.exports={
    getUser,
    setAddress,
    sendOtp,
    deleteUser,
    getOrderHistory,
    addRatingAndReview,
    getUserReviews
}

//signup->sendOtp