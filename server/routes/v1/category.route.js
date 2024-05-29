const express=require('express')
const router=express.Router()
const categoryController=require('../../controllers/category.controller')
const auth=require('../../middlewares/auth')
const {validate}=require('../../middlewares/validate')
const {getCategoryProductsSchema,getSuperCategoryPageData,getSuperCategoryCategoryData,getSuperCategoryBrandData}=require('../../validations/category.validation')
const {pagination}=require('../../middlewares/pagination')

router.post('/getCategoryProducts',auth,validate(getCategoryProductsSchema),categoryController.getCategoryProducts)

router.get('/getAllCategories',auth,categoryController.getAllCategories)

router.get('/getSuperCategories',categoryController.getAllSuperCategories)

router.post('/createSuperCategories',categoryController.createSuperCategory)

router.post('/getSuperCategoryPageData',validate(getSuperCategoryPageData),pagination,categoryController.getSuperCategoryPageData)

router.post('/getSuperCategoryCategoryData',validate(getSuperCategoryCategoryData),pagination,categoryController.getSuperCategoryCategoryData)

router.post('/:superCategoryName/:brandName',validate(getSuperCategoryBrandData),pagination,categoryController.getSuperCategoryBrandData)


module.exports=router; 