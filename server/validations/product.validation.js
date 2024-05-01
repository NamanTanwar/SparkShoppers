const Joi=require('joi')
const {objectId}=require('./custom.validation')


const productSchema={
    body: Joi.object().keys({
        name: Joi.string().required(),
        category: Joi.string().required(),
        cost: Joi.string().required(),
        quantity: Joi.string().required()
    })
    //TODO->Add image validation
}

const getProductSchema={
    params: Joi.object().keys({
        productId: Joi.string().custom(objectId)
    })
}

const searchProductSchema={
    
    params: Joi.object().keys({
        //All fields are optional by default
        q: Joi.string(),
        category: Joi.string(),
        minValue: Joi.number(),
        maxValue: Joi.number(),
        availability: Joi.boolean()
    })

}

module.exports={
    productSchema,
    getProductSchema,
    searchProductSchema
}
