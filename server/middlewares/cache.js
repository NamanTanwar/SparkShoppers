const {client}=require('../config/redisConfig')
const httpStatus=require('http-status')
 
const cacheMiddleware=async (req,res,next)=>{

    try{

        console.log('request body in cache:',req.body)

        let productData
        let relatedProductData

        const {productId}=req.params;
        const {getRelatedProducts}=req.body

        const relatedDataCacheKey=`relatedProducts:${productId}`
        const cacheKey=`product:${productId}`
        
        if(getRelatedProducts){
        [productData,relatedProductData]=await Promise.all([
            await client.hGet(cacheKey, 'data'),
            await client.hGet(relatedDataCacheKey,'data')
       ])
    }
    else{
        productData = await client.hGet(cacheKey,'data')
    }

    let relatedProducts=[]

    console.log('Cached product received from redis:',productData)
    console.log('Cached related data from products:',relatedProductData)
    if(productData && Object.keys(productData).length > 0){
        console.log('Entered cachedProduct block')
        const product=JSON.parse(productData) 
        //const relatedProducts=JSON.parse(relatedProductData)
        if(relatedProductData)
            relatedProducts=JSON.parse(relatedProductData)
        res.status(200).json({
            success:true,
            message:'Product fetched successfully',
            product,
            relatedProducts
        }) 
    }
    else{
        console.log('Entered else block')
        next()
    }
    }catch(err){
        console.log('Error in cacheMiddle:',err)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            error:err.message,
            message:'Internal Server Error'
        })
    }
    

}

module.exports={cacheMiddleware}