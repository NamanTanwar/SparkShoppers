const express=require('express')
const router=express.Router()
const cartController=require('../../controllers/cart.controller')
const auth=require('../../middlewares/auth')
const { addToCartSchema,getUserCartSchema,removeFromCartSchema } = require('../../validations/cart.validation')
const {validate}=require('../../middlewares/validate')



router.post('/add-to-cart',auth,validate(addToCartSchema),cartController.addToCart)

router.get('/get-user-cart/:userId',auth,validate(getUserCartSchema),cartController.getAllItems)

router.post('/remove-from-cart',auth,validate(removeFromCartSchema),cartController.removeFromCart)


module.exports=router;