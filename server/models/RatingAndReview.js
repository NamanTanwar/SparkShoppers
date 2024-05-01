const mongoose=require('mongoose');

const ratingAndReviewSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    rating:{
        type:Number,
        required:true, 
    },
    review:{
        type:String,
    },
    product:{
        type:mongoose.SchemaTypes.ObjectId,
        required:true,
        ref:'Product'
    },
    createdAt:{
        type:Date,
        default:Date.now(),
      },
})

module.exports=mongoose.model('RatingAndReview',ratingAndReviewSchema);