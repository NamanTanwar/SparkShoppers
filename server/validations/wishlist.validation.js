const Joi=require('joi')
const {objectId}=require('./custom.validation')


const addToWishlistSchema={
    body: Joi.object().keys({
       //userId: Joi.string().required().custom(objectId),
       productId: Joi.string().required().custom(objectId),
       userToken: Joi.string()
    })
}

const userWishlistSchema={
    params: Joi.object().keys({
        userId: Joi.string().required().custom(objectId)
    })
}

const deleteFromWishlist={
    body: Joi.object().keys({
       // userId: Joi.string().required().custom(objectId),
        productId: Joi.string().required().custom(objectId),
        userToken: Joi.string()
    })
}

module.exports={
    addToWishlistSchema,
    userWishlistSchema,
    deleteFromWishlist
}


