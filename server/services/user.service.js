const User=require('../models/User')
const ApiError=require('../utils/ApiError');
const bcrypt=require('bcrypt')
const Cart=require('../models/Cart')
const Wishlist=require('../models/Wishlist')
const httpStatus=require('http-status')

const createUser=async (body)=>{

    try{
      
        //Check if user email already taken
    if(await User.isEmailTaken(body.email))
    throw new ApiError(httpStatus.OK,'Email already taken')
    
    //Hashing user password
    const hashedPassword=await bcrypt.hash(body.password,10)

    //Creating new user in database
    const newUser=await User.create({...body,password: hashedPassword})

    console.log("User in createUser service:",newUser)

    return newUser
    
}catch(err){
        console.log("Error occured in user.service.js:",err)
    }
    
}

//Finding the user by email in database
const getUserByEmail=async (email)=>{
    try{
        
        const user=User.findOne({email})
        return user;

    }catch(err){
        console.log("Error in getUserByEmail:",err)
    }
}

const getUserById=async (userId)=>{
    try{
        const user=await User.findById(userId)
        return user
    }catch(err){
        console.log("Error in getUserById",err)
    }
}

const setAddress=async (user,address)=>{
    
    const updatedUser=await User.findByIdAndUpdate({_id:user._id},
        {$set: {address: address}},
        {new:true}
        )

        return updatedUser.address
}

const createCartForUser=async (userId)=>{
    try{

        const userCart=await Cart.create(
            {
                user: userId,
                products: [],
            },
            )

        console.log('User cart:',userCart)
        
        return userCart;
        
    }catch(err){
        console.log("Error in user service:",err)
    }
}

const createWishlistForUser=async (userId)=>{
    try{
        
        const userWishlist=await Wishlist.create({
            user: userId,
            products: [],
        })

        console.log("User wishlist created:",userWishlist)
        
        return userWishlist;
        
    }catch(err){
        console.log("Error in user Service:",err)
    }
}

const deleteCartForUser=async (userId)=>{
    
        const deletedCart=await Cart.findOneAndDelete({
            user: userId
        })
        
        return deletedCart
    
}

const deleteWishlistForUser=async (userId)=>{
    
    const deletedWishlist = await Wishlist.findOneAndDelete({
        user: userId
    })

    return deletedWishlist


}

const deleteUser=async (userId)=>{

    const deletedUser=await User.findByIdAndDelete(userId)

    return deletedUser

}

module.exports={createUser,
                getUserByEmail,
                getUserById,
                setAddress,
                createCartForUser,
                createWishlistForUser,
                deleteCartForUser,
                deleteWishlistForUser,
                deleteUser
                }  