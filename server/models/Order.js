const mongoose=require('mongoose');

const orderSchema=new mongoose.Schema({
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      product:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        },
      status: {
        type: String,
        required: true,
      },
      createdAt:{
        type:Date,
        default:Date.now(),
      },
      orderAmount: {
        type: Number,
        required: true,
      }
})

module.exports=mongoose.model('Order',orderSchema);