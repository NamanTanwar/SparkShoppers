const express=require('express')
const router=express.Router()
const ratingController=require('../../controllers/rating.controller')

router.post('/add-rating',ratingController.addRating)
//TODO->
//get all rating for a specific product

router.post('/get-product-rating',ratingController.getProductRatings)

module.exports=router