const mongoose=require('mongoose');

const otpSchema=mongoose.Schema({
    email:{
        type:String,
        required: true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:60*5,
    }//This document will automatically delete after 5 minutes of its creation
})


//TODO->add a pre save function to create otp and send it upon signup initiation

module.exports=mongoose.model('Otp',otpSchema);