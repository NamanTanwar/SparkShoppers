const Joi=require('joi')
const {objectId}=require('./custom.validation')

const addToCartSchema={
    body: Joi.object().keys({
          userId: Joi.string().required().custom(objectId),
          productId: Joi.string().required().custom(objectId)
    })
}

const getUserCartSchema={
    params: Joi.object().keys({
        userId: Joi.string().required().custom(objectId)
    })
}

const removeFromCartSchema={
    body: Joi.object().keys({
    userId: Joi.string().required().custom(objectId),
    productId: Joi.string().required().custom(objectId),
    })

}

module.exports={
    addToCartSchema,
    getUserCartSchema,
    removeFromCartSchema,
}