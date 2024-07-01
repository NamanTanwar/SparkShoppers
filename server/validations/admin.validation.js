const Joi=require('joi')

const getOrdersDataSchema={
    body: Joi.object().keys({
        month: Joi.string().required(),
        type: Joi.string().required(),
        productsOption: Joi.string().required()
    })
}

module.exports={
    getOrdersDataSchema
}