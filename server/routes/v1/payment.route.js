const express=require('express')
const router=express.Router()
const paymentController=require('../../controllers/payment.controller')
const auth=require('../../middlewares/auth')
const {validate}=require('../../middlewares/validate')
const {capturePaymentSchema}=require('../../validations/payment.validation')

//Controller to capture payment
router.post('/capturePayment',auth,validate(capturePaymentSchema),paymentController.capturePayment)



module.exports=router; 

//buyNow->