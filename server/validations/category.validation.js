const Joi=require('joi')

const getCategoryProductsSchema={
    body: Joi.object().keys({
        categoryName: Joi.string().required()
    })
}

const getSuperCategoryPageData={
    body: Joi.object().keys({ 
        superCategoryName: Joi.string().required(),
        option: Joi.string().required()
    })
}

const getSuperCategoryCategoryData={
    body: Joi.object().keys({
        categoryId: Joi.string().required(),
        superCategoryName: Joi.string().required(),
    })
}

const getSuperCategoryBrandData={
    body: Joi.object().keys({
        brandName: Joi.string().required(),
        superCategoryName: Joi.string().required()
    }),
    params: Joi.object().keys({
        superCategoryName: Joi.string().required(),
        brandName: Joi.string().required(),
    })

}

module.exports={
    getCategoryProductsSchema, 
    getSuperCategoryPageData,
    getSuperCategoryCategoryData,
    getSuperCategoryBrandData
}