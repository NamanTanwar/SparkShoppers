const Wishlist=require('../models/Wishlist')


const addToWishlist=async (userId,productId)=>{

    const newWishlist=await Wishlist.findOneAndUpdate(
        {user: userId},
        {
            $push: {products: productId}
        },
        {
            new: true,
        }
    )

    if(!newWishlist){
        throw new Error('User wishlist does not exist')
    }

    return newWishlist

}

const removeFromWishlist=async (userId,productId)=>{

    const updatedWishlist=await Wishlist.findOneAndUpdate(
        {user: userId},
        {
            $pull: {products: productId}
        },
        {new: true}
    )

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


module.exports={
    addToWishlist,
    removeFromWishlist,
    getAllItems,
}

