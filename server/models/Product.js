 const mongoose=require('mongoose');

const productSchema=mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true,
        },
        category:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Category',
            required: true
        },
        cost: {
            type:Number,
            required:true,
            trim:true,
        },
        ratingAndReviews:[ 
            {
                type:mongoose.Schema.Types.ObjectId,
                ref: 'RatingAndReview'
                    }
        ],
        images:[
            {
                type: String,
            }
        ],
        quantity: {
            type:Number,
            required:true,
        },
        description: {
            type: String,
            trim: true,
        },
        superCategory: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'SuperCategory'
        },
        brand: {
            type: String, 
            required: true,
        },
        productOptions: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ProductOptions'
            },
        productEmbedding: {
            type: [Number],
            required: true,
        }
    },
    {
        timestamps:true,
    }
)

module.exports=mongoose.model('Product',productSchema);