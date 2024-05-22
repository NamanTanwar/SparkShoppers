const express=require('express')
const router=express.Router()
const paymentController=require('../../controllers/payment.controller')
const auth=require('../../middlewares/auth')
const {validate}=require('../../middlewares/validate')
const {capturePaymentSchema,verifyPaymentSchema}=require('../../validations/payment.validation')

//Controller to capture payment
router.post('/capturePayment',auth,validate(capturePaymentSchema),paymentController.capturePayment)

router.post('/verify-payment',paymentController.verifyPayment)

module.exports=router; 

//buyNow->