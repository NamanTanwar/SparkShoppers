const express=require('express')
const router=express.Router()
const categoryController=require('../../controllers/category.controller')
const auth=require('../../middlewares/auth')
const {validate}=require('../../middlewares/validate')
const {getCategoryProductsSchema}=require('../../validations/category.validation')

router.post('/getCategoryProducts',auth,validate(getCategoryProductsSchema),categoryController.getCategoryProducts)

router.get('/getAllCategories',auth,categoryController.getAllCategories)

router.get('/getSuperCategories',categoryController.getAllSuperCategories)

router.post('/createSuperCategories',categoryController.createSuperCategory)

module.exports=router; 