const express=require('express')

const {validate}=require('../../middlewares/validate')
const {getUserSchema,updateUserSchema,deleteUserSchema}=require('../../validations/user.validation')
const {userController}=require( '../../controllers/index')
const auth=require("../../middlewares/auth")

const router=express.Router()
//Get user by userId
router.get('/:userId',auth,validate(getUserSchema),userController.getUser)

//Update address for user
router.put('/:userId',auth,validate(updateUserSchema),userController.setAddress) 

router.delete('/delete-user/:userId',validate(deleteUserSchema),userController.deleteUser)

module.exports=router;      