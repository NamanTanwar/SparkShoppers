const express=require('express')
const router=express.Router()
const wishlistController=require('../../controllers/wishlist.controller')
const {validate}=require('../../middlewares/validate')
const auth=require('../../middlewares/auth')
const {userWishlistSchema,addToWishlistSchema,deleteFromWishlist}=require('../../validations/wishlist.validation')

router.post('/add-to-wishlist',auth,validate(addToWishlistSchema),wishlistController.addToWishlist)

router.get('/get-user-wishlist/:userId',auth,validate(userWishlistSchema),wishlistController.getUserWishlist)

router.delete('/delete-from-wishlist',auth,validate(deleteFromWishlist),wishlistController.removeFromWishlist)

module.exports=router