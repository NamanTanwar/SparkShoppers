const {client}=require('../config/redisConfig')
const httpStatus=require('http-status')
 
const cacheMiddleware=async (req,res,next)=>{

    try{

        const {productId}=req.params
    const cacheKey=`product:${productId}`
    const cachedProduct=await client.hGetAll(cacheKey)
    console.log('Cached product received from redis:',cachedProduct)
    console.log('Cached product from redis:',cachedProduct)
    if(cachedProduct && Object.keys(cachedProduct).length > 0){
        console.log('Entered cachedProduct block')
        const productData=cachedProduct['data']
        res.status(200).json({
            success:true,
            message:'Product fetched successfully',
            data:JSON.parse(productData) 
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