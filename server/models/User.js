const mongoose=require('mongoose');
const config=require('../config/config');
const bcrypt = require('bcrypt');

const userSchema=mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
    },
    walletMoney: {
        type: Number,
        default: config.default_wallet_money,
    },
    address: {
        type: String,
        default: config.default_address,
    },
}   
    ,
    {
        timestamps: true,
    })
 
   //check through the model if email is already taken
   //using normal function as arrow functions do not have there
   //own this and are not recomended to use in this case
   userSchema.statics.isEmailTaken=async function(email){
    const user=await this.findOne({email});
    return !!user;
   }
   //Same for this function
   //Check for password match
   userSchema.methods.isPasswordMatch=async function (password){
    const user=this
    return  bcrypt.compare(password,user.password)
   }

   //Check if user has set address other than default address
   userSchema.methods.hasSetNonDefaultAdddress=async function(){
    const user=this;
    return user.address!==config.default_address
   }

module.exports=mongoose.model('User',userSchema);


