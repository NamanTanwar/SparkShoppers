const Joi=require('joi')
const {objectId,password}=require('./custom.validation')


const getUserSchema={
    params: Joi.object().keys(
        {
            userId: Joi.string().custom(objectId)
        }
    )
}

const createUserSchema={
    body: Joi.object().keys({
        name : Joi.string().required(),
        email : Joi.string().required(),
        password : Joi.string().required().custom(password),
        walletMoney : Joi.number().required(),
        address : Joi.string()
    })
}

const setAddressSchema={
    params: Joi.object().keys({
        userId: Joi.string().custom(objectId),
    }),
    body: Joi.object().keys({
        address: Joi.string().required().min(20)
    })
}

const deleteUserSchema={
    params: Joi.object().keys({
        userId: Joi.string().custom(objectId)
    })
}

const addRatingAndReviewSchema={
    body: Joi.object().keys({
        userToken: Joi.string().required(),
        rating: Joi.number().required().min(1).max(5),
        review: Joi.string().required(),
        productId: Joi.string().custom(objectId)
    })
}

const getRatingAndReviewsSchema={
    body: Joi.object().keys({
        userToken: Joi.string().required()
    })
}

module.exports={
    getUserSchema,
    createUserSchema,
    setAddressSchema,
    deleteUserSchema,
    addRatingAndReviewSchema,
    getRatingAndReviewsSchema
}