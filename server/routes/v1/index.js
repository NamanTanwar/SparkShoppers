const express=require('express')
const authRoute=require('./auth.route')
const userRoute=require('./user.route')
const productRoute=require('./product.route')
const categoryRoute=require('./category.route')
const cartRoute=require('./cart.route')
const wishlistRoute=require('./wishlist.route')
const paymentRoute=require('./payment.route')

const router=express.Router()
 

router.use('/auth',authRoute)
router.use('/user',userRoute)
router.use('/product',productRoute)
router.use('/category',categoryRoute)
router.use('/cart',cartRoute)
router.use('/wishlist',wishlistRoute)
router.use('/payment',paymentRoute)



module.exports=router;