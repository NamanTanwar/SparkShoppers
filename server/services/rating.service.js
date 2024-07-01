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

const getRecentReviews=async (limitOption=6)=>{
    try{
        const reviews=await RatingAndReview.find({}).populate({path: 'user',select: 'firstname lastname'}).select('user rating review createdAt').sort({createdAt: -1}).limit(limitOption)

        if(!reviews){
            throw new Error('No reviews found')
        }

        return reviews

    }catch(err){
        console.log('Error occured in getRecentReviews in rating service:',err)
        throw err
    }
}

const getRatingComparisonData=async ()=>{
    try{
        const currentDate = new Date();
    const startOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const startOfPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    const endOfPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);

    // Aggregate ratings for the current month
    const currentMonthRating = await RatingAndReview.aggregate([
        {
            $match: {
                createdAt: { $gte: startOfCurrentMonth, $lte: currentDate }
            }
        },
        {
            $group: {
                _id: null,
                averageRating: { $avg: '$rating' }
            }
        }
    ]);

    // Aggregate ratings for the previous month
    const previousMonthRating = await RatingAndReview.aggregate([
        {
            $match: {
                createdAt: { $gte: startOfPreviousMonth, $lte: endOfPreviousMonth }
            }
        },
        {
            $group: {
                _id: null,
                averageRating: { $avg: '$rating' }
            }
        }
    ]);

    const currentMonthAverage = currentMonthRating[0] ? currentMonthRating[0].averageRating : 0;
    const previousMonthAverage = previousMonthRating[0] ? previousMonthRating[0].averageRating : 0;

    const percentageChange = previousMonthAverage
        ? ((currentMonthAverage - previousMonthAverage) / previousMonthAverage) * 100
        : currentMonthAverage * 100;

    return {
        currentMonthAverage,
        previousMonthAverage,
        percentageChange
    };
    }catch(err){
        console.log('Error occured in getRating Comparison data:',err)
        throw err
    }
}

module.exports={
    addRating,
    getProductRatings,
    getRecentReviews,
    getRatingComparisonData
}