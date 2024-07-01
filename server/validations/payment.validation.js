const Joi=require('joi')
const {objectId}=require('../validations/custom.validation')


const getOrderDetailsSchema={
    body: Joi.object().keys({
        orderId: Joi.string().required()
    })
}

const capturePaymentSchema={

    body: Joi.object().keys({
        //userId: Joi.string().required().custom(objectId)
        userToken: Joi.string().required(),
        formData: Joi.object().keys({
            firstName: Joi.string().required(),
            streetName: Joi.string().required(),
            apartmentFloor: Joi.string().required(),
            city: Joi.string().required(),
            phoneNumber: Joi.string().required(),
            email: Joi.string().required(),
        })
    })
}

const verifyPaymentSchema={
    body: Joi.object().keys({
        userToken: Joi.string().required(),
        razorpay_order_id: Joi.string().required(),
        razorpay_payment_id:Joi.string().required(),
        razorpay_signature: Joi.string().required(),
    })
}

module.exports={
    capturePaymentSchema,
    verifyPaymentSchema,
    getOrderDetailsSchema
}