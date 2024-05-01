const productService=require('../services/')
const ratingService=require('../services/rating.service')
const httpStatus = require('http-status')


const addRating=async (req,res)=>{

    try{
        
        const result=await ratingService.addRating(req.body)

        const productRating=await productService.addRating(req.body)

        if(!result.ratingAndReview || !result.product || !productRating){
            return res.status(httpStatus.BAD_REQUEST).json({
                success:false,
                message: "Error in creating ratingAndReview"
            })
        }
 
        //Successfull Response
        res.status(httpStatus.OK).json({
            success:true,
            message:"Rating succesfully created",
            data: result,
        })


    }catch(err){
        console.log("Error in rating controller: ",err)
        let statusCode=httpStatus.INTERNAL_SERVER_ERROR
        let errorMessage='Internal Server Error'
        
        if(err.message==='User did not purchase the order'){
            statusCode=httpStatus.BAD_REQUEST
            errorMessage=err.message
        }

        res.satus(statusCode).json({
            success:false,
            message:errorMessage,
            error:err.message,

        })
        
    }
}

const getProductRatings=async (req,res)=>{
    try{

        const {productId}=req.body

        const ratingAndReviews=await ratingService.getProductRatings(productId)

        res.status(httpStatus.OK).json({
            success: true,
            message: "Rating and reviews fetched successfully",
            data: ratingAndReviews
        })        

    }catch(err){
        console.log("Error in getProductRating Controller:",err)

        let statusCode=httpStatus.INTERNAL_SERVER_ERROR
        let errorMessage='Internal Server Error'

        if(err.message==='No ratings found for this product'){
            statusCode=httpStatus.BAD_REQUEST
            errorMessage=err.message
        }

        res.status(statusCode).json({
            success:false,
            message:errorMessage,
            error:err.message
        })

    }
}

module.exports={
    addRating,
    getProductRatings
}