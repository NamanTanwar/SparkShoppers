const Category=require('../models/Category')
const SuperCategory=require('../models/SuperCategory')

const getCategoryProducts=async (categoryName)=>{

    let categoryProducts=[]

    const category=await Category.findOne({name: categoryName})
                                 .populate('products')

    if(!category){
        throw new Error("Category does not exist")
    }

    categoryProducts=category.products

    return categoryProducts

}

const getAllCategories=async ()=>{
    
    const categories=await Category.find({})

    if(!categories){
        throw new Error('No categories found')
    }

    return categories
}

const findCategory=async (category)=>{

    const isCategory=await Category.findOne({name: category})

    return isCategory



}

const createCategory=async (category,products)=>{

    const newCategory=await Category.create({
        name: category,
        products: products
    })

    return newCategory

}

const getAllSuperCategories=async ()=>{
    const superCategories=await SuperCategory.find({})

    if(!superCategories){
        throw new Error('No super categories found')
    }

    return superCategories
}

const createSuperCategory=async (superCategoryName)=>{

    const superCategory=await SuperCategory.create({
        name: superCategoryName,
        products: [],
        categories: []
    })

    if(!superCategory){
        throw new Error('Error in creating superCategory')
    }

    return superCategory

}

module.exports={
    getCategoryProducts,
    getAllCategories,
    findCategory,
    createCategory,
    getAllSuperCategories,
    createSuperCategory,
}