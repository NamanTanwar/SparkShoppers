const Joi=require('joi')

const getCategoryProductsSchema={
    body: Joi.object().keys({
        categoryName: Joi.string().required()
    })
}

module.exports={
    getCategoryProductsSchema
}