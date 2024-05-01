const Joi=require('joi')
const {password}=require('./custom.validation')

//Used Joi email() method to validate email
const signupSchema={
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        password: Joi.string().required().custom(password)
    })
}

const loginSchema={
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password)
    })
}

const otpSchema={
    body: Joi.object().keys({
        otp: Joi.string().length(6).required()
    })
}

module.exports={
    signupSchema,
    loginSchema,
    otpSchema,
}