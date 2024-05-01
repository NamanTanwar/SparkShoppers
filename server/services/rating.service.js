const RatingAndReview=require('../models/RatingAndReview')
const Product=require('../models/Product')
const Order = require('../models/Order')

const addRating=async (reqBody)=>{

    const {userId,rating,review,productId}=reqBody


    //TODO->VERIFY USER PURCHASE
    const userOrder=await Order.findOne({
        user: userId,
        productsBought: {$in: [productId]}
    })

    if(!userOrder){
        throw new Error('User did not purchase the order')
    }

     //Creating new rating
     const newRatingAndReview=await RatingAndReview.create({
        user: userId,
        rating: rating,
        review: review,
        product: productId
    })

    const updatedProduct=await Product.findByIdAndUpdate(
        productId,
        {
            $push: {ratingAndReview: newRatingAndReview._id}
        },
        {new: true}
    )

    return {
        ratingAndReview: newRatingAndReview,
        product: updatedProduct
    }

}

const getProductRatings=async (productId)=>{

    const ratingAndReviews=await Product.findById(productId).popualate({
        path: 'ratingAndReviews',
        popualate: {
            path: 'user',
            select: 'firstName lastName'
        }
    })

    if(!ratingAndReviews){
        throw new Error('No ratings found for this product')
    }

    return ratingAndReviews
    

}

module.exports={
    addRating,
    getProductRatings
}