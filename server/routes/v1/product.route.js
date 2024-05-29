const express=require('express')
const productController=require('../../controllers/product.controller')
const {validate}=require('../../middlewares/validate')
const {productSchema,getProductSchema,searchProductSchema}=require('../../validations/product.validation')
const auth=require('../../middlewares/auth')
const {cacheMiddleware}=require('../../middlewares/cache')
const {pagination}=require('../../middlewares/pagination')

const router=express.Router()
 
//TODO->ADD IMAGE VALIDATION
router.post('/create-product',productController.createProduct)

router.post('/get-product/:productId',cacheMiddleware,validate(getProductSchema),productController.getProduct)

 

//TODO->ADD IMAGE VALIDATION
router.post('/addImage',auth,productController.addImage)

router.delete('/delete-product/:productId',productController.deleteProduct)




router.get('/search-product',pagination,productController.searchProduct)

router.post('/test-embedding',productController.testEmbedding)

module.exports=router    