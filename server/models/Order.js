const mongoose=require('mongoose');

const orderSchema=new mongoose.Schema({
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
      },
      products:[
        {
           product: {type:mongoose.Schema.Types.ObjectId,
            required: true,
            ref:'Product'
           },
           quantity: {
            type: Number,
            required: true, 
           },
           cost: {
            type: Number,
            required: true
           }
        }],
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
      },
      orderId: {
        type: String,
        required:true,
      }
})

module.exports=mongoose.model('Order',orderSchema);