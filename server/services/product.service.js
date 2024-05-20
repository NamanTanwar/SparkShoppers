const Product=require('../models/Product')
const SuperCategory=require('../models/SuperCategory')
const Category=require('../models/Category')
const mongoose=require('mongoose')
const ProductOptions = require('../models/ProductOptions')
const {uploadImageToCloudinary}=require('../utils/imageUploader')
const embeddingsService=require( './embeddings.service' )
const {normalizeL2}=require('../utils/embeddings')
const {reciprocalRankFusion}=require('../utils/ranking')
const {client}=require('../config/redisConfig')

const createProduct=async (productName,productDescription,productCategory,productSuperCategory,productCost,productQuantity,productBrand,productImages)=>{


    //Store images secure_urls
    let imagesSecureUrls=[]
    //Store categoryId
    let categoryId
    //Store new Category
    let newCategory

    //Check if superCategory exists
    const sCategory=await SuperCategory.findById(new mongoose.Types.ObjectId(productSuperCategory))
    
    if(!sCategory){
        throw new Error('Super Category does not exist')
    }

    //Check if already a product exists with same name and same category
    const category=await Category.findOne({name: productCategory})
    if(category){
    const findProduct=await Product.findOne({
        name :productName
        })

        if(findProduct){
            throw new Error('Product Already exists')
        }
        categoryId=category._id
    }
    else{
        //creating new Category
        newCategory=await Category.create(({name : productCategory,products: []}))
        categoryId=newCategory._id
    }
    

    //Uploading images to cloudinary
    for(let i=0;i<productImages.length;i++){
        const image=await uploadImageToCloudinary(
            productImages[i],
            process.env.FOLDER_NAME,
            500,
            500
        )
        if(!image){
            return res.status(httpStatus.BAD_REQUEST).json({
                success:false,
                message:"Error in creating the product"
            })
        }

        imagesSecureUrls.push(image.secure_url)
    }

    const newProduct=await Product.create({
        name: productName,
        description: productDescription,
        category: categoryId,
        superCategory: productSuperCategory,
        cost: productCost,
        quantity: productQuantity,
        brand: productBrand,
        ratingAndReviews: [],
        images: imagesSecureUrls,
        superCategory: sCategory._id
    })

    const textToEmbbed=`${productName} ${productDescription} ${productBrand} ${productCategory} ${sCategory.name}`

    if(!newProduct){
        throw new Error('Error in creating product')
    }

    sCategory.products.push(newProduct._id)
    sCategory.categories.push(categoryId)
    if(category){
        category.products.push(newProduct._id)
        category.save()
    }else{
        newCategory.products.push(newProduct._id)
        newCategory.save()   
    }

    sCategory.save()

    return {newProduct,textToEmbbed}

}

const addImageToProduct=async (productId,image)=>{

    const product=await Product.findByIdAndUpdate(
        productId,
        {
            $push: {
               images: image
            }
        },{
            new: true,
        }
        )

    if(!product){
        throw new Error('Product not found')
    }

    return product

}

const getProduct=async (productId,getRelatedProducts)=>{

     const relatedDataCacheKey=`relatedProducts:${productId}`
     const cacheKey=`product:${productId}`

    // console.log('Cache miss')
    let relatedProducts={}

    const product=await Product.findById(productId).populate('category').populate('ratingAndReviews').populate('superCategory').populate('productOptions').select('-productEmbedding')

    if(!product){
        throw new Error('Product not found')
    }
     if(getRelatedProducts){
        const categoryId=product.category._id
        relatedProducts=await Product.find(
            {
                category:new mongoose.Types.ObjectId(categoryId),
                _id: {$ne:new mongoose.Types.ObjectId(productId)}
            },
            "name brand price images ratingAndReviews",
            {limit: 10}
        ).populate('ratingAndReviews') 
     }

     
     const relatedProductData=JSON.stringify(relatedProducts)
     const productData=JSON.stringify(product)

     const cacheResult=await Promise.all([
        await client.hSet(relatedDataCacheKey,'data',relatedProductData),
        await client.hSet(cacheKey,'data',productData)
     ])

     console.log("Cache result:",cacheResult)

    return {product,relatedProducts}

}

const filterProducts=async (filteringConditions)=>{

    const products=await Product.find(filteringConditions)

    return products;

}

const createProductOptions=async (productId,productOptions)=>{

    
    //Constructing options object to save
    const entries=Object.entries(productOptions)
    const optionsToSave=[]
    for(const [key,value] of entries){
        let newKey=key.endsWith('[]') ? key.slice(0,-2) : key
        const newValue = Array.isArray(value) ? value : [value]; 
        optionsToSave.push({
            name: newKey,
            values: newValue
        })
    }

    try{
        const newProductOptions=await ProductOptions.create({
            product: productId,
            options: optionsToSave
        })

        if(!newProductOptions){
            throw new Error('Failed to add product options')
        }

        return newProductOptions
    }catch(err){
        console.log('Error in create product options service',err)
        throw err
    }

}


const searchProduct=async (skip,limit,userQuery,page)=>{

    //converting to vector embedding
    const embeddedUserQuery=await embeddingsService.createEmbeddings(userQuery)
    //normalizing for similarity calculation
    const normalizedEmbedding=normalizeL2(embeddedUserQuery)

    console.log('User Query is:',userQuery)
    console.log(skip,limit)
    //full text search pipeline
    const textSearchPipeline=[
        {
            $search: {
                index: 'searchProducts',
                text: {
                    query: userQuery,
                    path: ['name','description','brand','category','superCategory','ratingAndReviews']
                },
                scoreDetails: true,
            }
        },
        {
            $project: {
                _id: 1,
                name: 1,
                brand: 1,
                cost: 1,
                images: 1,
                ratingAndReviews: 1,
                score: {$meta: "searchScoreDetails"}
            }
        },
             {
                    $sort: { score: -1 } // Sort by score in descending order    
             }
    ]

    //schemantic search pipeline
    //numOfCandidates->default 100
    const schematicSearchPipeline =[
        {
            "$vectorSearch": {
                "index": "vector_index",
                "path": "productEmbedding",
                "queryVector": normalizedEmbedding,
                "numCandidates":100,
                "limit": 100,
            },
        },
        {
            $project: {
                _id: 1,
                name: 1,
                brand: 1,
                cost: 1,
                images: 1,
                ratingAndReviews: 1,
                score: {$meta: "vectorSearchScore"}
            }
        },
        {
                $sort: { score: -1 } // Sort by score in descending order    
        }
    ]

    //product name
    //brand name
    //price
    //total rating->length of array
    //images
    //avg rating 


    


    try{
        //fetching products via text search
        const productsFromTextSeach=await Product.aggregate(textSearchPipeline)
        console.log('Text search products:',productsFromTextSeach)
        //fetching products via schemantic search
        const  productsFromSchematicSearch= await Product.aggregate(schematicSearchPipeline)
        console.log('Schemantic search products:',productsFromSchematicSearch)

        const finalResult=reciprocalRankFusion(productsFromTextSeach,productsFromSchematicSearch)

        console.log('Final:',finalResult)

        const totalProductDocuments=finalResult.length
        const hasNextPage=totalProductDocuments>(page*limit)
        console.log('Total Product Documents:',totalProductDocuments)
        console.log('Products fetched:',productsFromTextSeach)
        return {
            finalResult,
            totalProductDocuments,
            hasNextPage,
            nextPage: hasNextPage ? page+1 : null
        }
    }catch(err){
        console.log('Error in product service :',err)
        throw err
    }

} 

module.exports={
    createProduct,
    addImageToProduct,
    getProduct,
    filterProducts,
    createProductOptions, 
    searchProduct
}