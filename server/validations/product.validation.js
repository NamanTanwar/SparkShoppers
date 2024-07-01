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
    }),
    body: Joi.object().keys({
        getRelatedProducts: Joi.boolean()
    })
}

const searchProductSchema={
    
    query: Joi.object().keys({
        //All fields are optional by default
       q: Joi.string().required(),
       brands: Joi.string(),
       categories: Joi.string(),
       price_start: Joi.number(),
       price_end: Joi.number(),
       filter_option: Joi.string(),
    })

}

module.exports={
    productSchema,
    getProductSchema,
    searchProductSchema
}
