const {uploadImageToCloudinary}=require('../utils/imageUploader')
require('dotenv').config()
const Product=require('../models/Product')
const httpStatus=require('http-status')
const RatingAndReview = require('../models/RatingAndReview')
const categoryService=require('../services/category.service')
const productService=require('../services/product.service')
const {client}=require('../config/redisConfig')
const embeddingsService=require('../services/embeddings.service.js')
const mongoose=require('mongoose')
const {normalizeL2}=require('../utils/embeddings')

 


const createProduct=async (req,res)=>{

    //session for transaction
    const session=await mongoose.startSession()

    //Starting transaction
    await session.startTransaction()
    
    try{

        const {name,description,category,superCategory,cost,quantity,brand,...productOptions}=req.body;
        //const {productImage}=req.files
        //console.log('Request.body is:',req.body)
       // console.log('req.files is:',req.files)
        //console.log('Images are:',req.files['images[]'])

        //newProduct created and textToEmbedd string
       const {newProduct,textToEmbbed}=await productService.createProduct(name,description,category,superCategory,cost,quantity,brand,req.files['images[]'])

       if(!newProduct){
        throw new Error('Error in creating product')
       }

       console.log('New created product:',newProduct)
       console.log('Text to embedd:',textToEmbbed)
       //creating productOptions
       const newProductOptions=await productService.createProductOptions(newProduct._id,productOptions)

        if(!newProductOptions){
            throw new Error('Error in creating product Options')
        }

        console.log('newProductOptions created is:',newProductOptions)
        //adding productOptions
        newProduct.productOptions=newProductOptions._id
        //creating embeddings
        const embedding=await embeddingsService.createEmbeddings(textToEmbbed)
        //normalizing vector embedding
        const normalizedEmbedding=normalizeL2(embedding)
        //adding product embeddings to newProduct
        newProduct.productEmbedding=normalizedEmbedding
        //Finally saving the newProduct to db
        await newProduct.save()

        res.status(httpStatus.CREATED).json({
            success: true,
            message: "Product created successfully",
            data: newProduct
        })

        await session.commitTransaction()
    }catch(err){
        await session.abortTransaction()
        console.log("Error in createProduct: ",err)
        let statusCode=httpStatus.INTERNAL_SERVER_ERROR
        let errorMessage='Internal Server Error'

        if(err.message==='Product Already exists'){
            statusCode=httpStatus.CONFLICT,
            errorMessage=err.message
        } 

        if(err.message==='Super Category does not exist'){
            statusCode=httpStatus.NOT_FOUND,
            errorMessage=err.message
        }

        res.status(statusCode).json({
            success:false,
            error:err.message,
            message: errorMessage
        })
    }finally{
        await session.endSession()
    }
}


const getProduct=async (req,res)=>{
    try{

        const {productId}=req.params;
        const {getRelatedProducts}=req.body

        const {product,relatedProducts}=await productService.getProduct(productId,getRelatedProducts)

        console.log("Product:",product)

        if(!product){
            throw new Error('Product not found')
        }


       
        res.status(httpStatus.OK).json({
            success:true, 
            message:"Product fetched successfully",
            product: product,
            relatedProducts: relatedProducts,
        })



    }catch(err){
        console.log("Error in getProduct controller:",err)
        res.status(500).json({
            success:false,
            error:err.message,
            message:"Internal Server Error"
        })
    }
}

const searchProduct=async (req,res)=>{

    try{
        console.log('Entered search product controller')
        //Extracting query params from request

        console.log('request query is:',req.query)

        console.log('Pagination info:',req.pagination)

        const {q,category,minVal,maxVal,availability}=req.query
        
        console.log('Params value:',q)

        const {skip,limit,page}=req.pagination

        const {finalResult,totalProductDocuments,hasNextPage,nextPage}=await productService.searchProduct(skip,parseInt(limit),q,page)

        if(!finalResult || totalProductDocuments==0)
            throw new Error( 'No Products Found')

        res.status(httpStatus.OK).json({
            success:true,
            message:"Products fetched successfully",
            products:finalResult ,
            totalPages: Math.ceil(totalProductDocuments/limit),
            hasNextPage, 
            nextPage,
        })

        
       
    }catch(err){
        console.log("Error in searchProduct controller: ",err)
        res.status(500).json({
            success:false,
            error:err.message,
            message:"Internal Server Error"
        })
    }
}

const filterByRating=async (req,res)=>{
    
    try{
        const {rating}=req.query

        const ratings=await RatingAndReview.find({rating: {$gte: rating}}).populate('product')

        if(!ratings){
            return res.status(httpResponse.NOT_FOUND).json({
                success:false,
                message:"No products exist for the specified rating"
            })
        }

        let products=[]

        for(let i=0;i<ratings.length;i++){
            products.push(ratings[i].product)
        }

        res.status(200).json({
            success:true,
            message:"Products fetched successfully",
            data: products,
        })


    }catch(err){
        console.log(err)
        res.status(500).json({
            success:true,
            error:err.message,
            message:"Internal Server Error"
        })
    }

}

const addImage=async (req,res)=>{
    
    try{

        const {productId}=req.body
        const {productImage}=req.files

        const image=await uploadImageToCloudinary(
            productImage,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        if(!image){
            return res.status(httpStatus.BAD_REQUEST).json({
                success:false,
                message:"Error in creating the product"
            })
        }

        const updatedProduct=await productService.addImageToProduct(productId,image.secure_url)

        res.status(httpStatus.OK).json({
            success:true,
            message: 'Image added successfully',
            data: updatedProduct
        })


    }catch(err){
        console.log('Error in product controller',err)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            error:err.message,
            message: "Internal Server Error"
        })
    }
}

const deleteProduct=async (req,res)=>{

   

    const {productId}=req.params
    try{
        //update product logic

        //invalidate cache
        const prodId=productId.toString()
        console.log('productId:',prodId)
        client.del(`product:${prodId}`);
        res.status(httpStatus.OK).json({
            success:true,
            message: 'Product deleted Successfully'
        })

    }catch(err){
        console.log('Error in product delete controller:',err)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success: false,
            error:err.message,
            message:"Internal Server Error"
        })
    }
}


// //Building a fitering Conditions object to include all filtering conditions
        // let filteringConditions={}

        // if(q)
        // filteringConditions.name={$regex: new RegExp(q,'i')}

        // if(minVal || maxVal){
        //     filteringConditions.cost={}
        //     if(minVal)
        //     filteringConditions.cost.$gte=minVal
        //     if(maxVal)
        //     filteringConditions.cost.$lte=maxVal
        // }

        // if(availability){
        //     filteringConditions.quantity={$gt: 0}
        // }

        // if(category){
        //     filteringConditions.category=category
        // }

        // const result=await productService.filterProducts(filteringConditions)

        // //if no product found
        // if(!result || result.length===0){
        //     return res.status(httpStatus.NOT_FOUND).json({
        //         success:false,
        //         mesasge:"No Product Found"
        //     })
        // }

        // console.log("Result is: ",result)

        //Successfull response 


        const testEmbedding=async (req,res)=>{
            const {text}=req.body
            try{
                const embedding=await embeddingsService.createEmbeddings(text)
                console.log('Response in test controller:',embedding)
                return res.status(200).json({
                    success: true,
                    messageL:'Embedding created successfully',
                    embedding
                })
            }catch(err){
                console.log(err)
                res.status(500).json({
                    success:false,
                    error: err.message,
                    message: "Interal Server Error"
                })
            }
        }

module.exports={
    createProduct,
    getProduct,
    searchProduct,
    filterByRating,
    addImage,
    deleteProduct,
    testEmbedding
}