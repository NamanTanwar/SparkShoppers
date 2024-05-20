const Wishlist=require('../models/Wishlist')
const { getUserByEmail } = require('./user.service')


const addToWishlist=async (userId,productId)=>{

    

    const newWishlist=await Wishlist.findOneAndUpdate(
        {user: userId},
        {
            $addToSet: {products: productId}
        },
        {
            new: true,
        }
    ).populate({
        path: 'products',
        select: '_id name brand price images ratingAndReviews'
    })

    if(!newWishlist){
        throw new Error('User wishlist does not exist')
    }

    return newWishlist

}
//_id,images,name,brand,price,ratingAndReviews
const removeFromWishlist=async (userId,productId)=>{

    const updatedWishlist=await Wishlist.findOneAndUpdate(
        {user: userId},
        {
            $pull: {products: productId}
        },
        {new: true}
    ).populate({
        path: 'products',
        select: '_id name brand price images ratingAndReviews'
    })

    if(!updatedWishlist){
        throw new Error('User wishlist not found')
    }

    return updatedWishlist


}

const getAllItems=async (userId)=>{

    let wishlistItems=[]

    const wishlist=await Wishlist.findOne({user: userId}).populate('products')

    if(!wishlist){
        throw new Error("User Wishlist not found")
    }

    wishlistItems=wishlist.products

    return wishlistItems
}

const getUserWishlist=async (userEmail)=>{
    try{
        const user=await getUserByEmail(userEmail)
        const wishlist=await Wishlist.findOne({user: user._id}).populate({
            path: 'products',
            select: '_id name brand price images ratingAndReviews'
        })
        return wishlist.products
    }catch(err){
        console.log("Error in getUserWishlist service:",err)
    }
}


module.exports={
    addToWishlist,
    removeFromWishlist,
    getAllItems,
    getUserWishlist
}

