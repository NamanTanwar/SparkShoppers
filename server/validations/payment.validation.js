const Joi=require('joi')
const {objectId}=require('../validations/custom.validation')

const capturePaymentSchema={

    body: Joi.object().keys({
        userId: Joi.string().required().custom(objectId)
    })

}

module.exports={
    capturePaymentSchema,
}