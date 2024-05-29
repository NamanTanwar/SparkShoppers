const express=require('express')

const {validate}=require('../../middlewares/validate')
const {getUserSchema,updateUserSchema,deleteUserSchema,addRatingAndReviewSchema,getRatingAndReviewsSchema}=require('../../validations/user.validation')
const {userController}=require( '../../controllers/index')
const auth=require("../../middlewares/auth")

const router=express.Router()

router.post('/add-rating-and-review',validate(addRatingAndReviewSchema),userController.addRatingAndReview)

router.post('/get-rating-and-review',validate(getRatingAndReviewsSchema),userController.getUserReviews)

router.get('/get-order-history',auth,userController.getOrderHistory)

//Get user by userId
router.get('/:userId',auth,validate(getUserSchema),userController.getUser)

//Update address for user
router.put('/:userId',auth,validate(updateUserSchema),userController.setAddress) 

router.delete('/delete-user/:userId',validate(deleteUserSchema),userController.deleteUser)






module.exports=router;      