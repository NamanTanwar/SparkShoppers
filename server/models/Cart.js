const mongoose=require('mongoose');
const config=require('../config/config')

const cartSchema=mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        products: [
            {
                _id: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:'Product'
                },
                quantity: {
                     type: Number,
                     required: true,
                }
            }
        ],
        paymentOption: {
            type:String,
            default: config.default_payment_option
        }
    },
    {
        timestamps:true,
    }
)

module.exports=mongoose.model('Cart',cartSchema)