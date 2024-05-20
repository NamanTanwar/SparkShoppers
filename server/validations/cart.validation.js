const Joi=require('joi')
const {objectId}=require('./custom.validation')

const addToCartSchema={
    body: Joi.object().keys({
          //userId: Joi.string().required().custom(objectId),
          productId: Joi.string().required().custom(objectId),
          userToken: Joi.string()
        })
}

const getUserCartSchema={
    params: Joi.object().keys({
        userId: Joi.string().required().custom(objectId)
    })
}

const removeFromCartSchema={
    body: Joi.object().keys({
        //userId: Joi.string().required().custom(objectId),
        productId: Joi.string().required().custom(objectId),
        userToken: Joi.string(),
        removeItem: Joi.boolean()
      })

}

const calculateCartTotalSchema={
    body: Joi.object().keys({
        cartItems: Joi.array().items(Joi.object().keys({
            productId: Joi.string().required().custom(objectId),
            quantity: Joi.number().required()
        }))
    })
}

module.exports={
    addToCartSchema,
    getUserCartSchema,
    removeFromCartSchema,
    calculateCartTotalSchema
}