const express=require('express');
const {signupSchema,loginSchema,otpSchema}=require("../../validations/auth.validation")
const {validate}=require('../../middlewares/validate');
const authController=require('../../controllers/auth.controller')

const router=express.Router();

//Send otp to user for verification
router.post('/send-otp',validate(signupSchema),authController.sendOtp)

//routes for signup and login
router.post('/signup',validate(otpSchema),authController.signup);
router.post("/login",validate(loginSchema),authController.login);

//Refresh token route
router.post('/refresh-token',authController.refreshToken) 

router.post('/logout',authController.logout)


module.exports=router;