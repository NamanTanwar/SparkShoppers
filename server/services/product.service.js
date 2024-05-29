const Product = require('../models/Product')
const SuperCategory = require('../models/SuperCategory')
const Category = require('../models/Category')
const mongoose = require('mongoose')
const ProductOptions = require('../models/ProductOptions')
const { uploadImageToCloudinary } = require('../utils/imageUploader')
const embeddingsService = require('./embeddings.service')
const { normalizeL2 } = require('../utils/embeddings')
const { reciprocalRankFusion, meanFilter } = require('../utils/ranking')
const { client } = require('../config/redisConfig')

const createProduct = async (productName, productDescription, productCategory, productSuperCategory, productCost, productQuantity, productBrand, productImages) => {


    //Store images secure_urls
    let imagesSecureUrls = []
    //Store categoryId
    let categoryId
    //Store new Category
    let newCategory

    //Check if superCategory exists
    const sCategory = await SuperCategory.findById(new mongoose.Types.ObjectId(productSuperCategory))

    if (!sCategory) {
        throw new Error('Super Category does not exist')
    }

    //Check if already a product exists with same name and same category
    const category = await Category.findOne({ name: productCategory })
    if (category) {
        const findProduct = await Product.findOne({
            name: productName
        })

        if (findProduct) {
            throw new Error('Product Already exists')
        }
        categoryId = category._id
    }
    else {
        //creating new Category
        newCategory = await Category.create(({ name: productCategory, products: [] }))
        categoryId = newCategory._id
    }


    //Uploading images to cloudinary
    for (let i = 0; i < productImages.length; i++) {
        const image = await uploadImageToCloudinary(
            productImages[i],
            process.env.FOLDER_NAME,
            500,
            500
        )
        if (!image) {
            return res.status(httpStatus.BAD_REQUEST).json({
                success: false,
                message: "Error in creating the product"
            })
        }

        imagesSecureUrls.push(image.secure_url)
    }

    const newProduct = await Product.create({
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

    const textToEmbbed = `${productName} ${productDescription} ${productBrand} ${productCategory} ${sCategory.name}`

    if (!newProduct) {
        throw new Error('Error in creating product')
    }

    sCategory.products.push(newProduct._id)
    sCategory.categories.push(categoryId)
    if (category) {
        category.products.push(newProduct._id)
        category.save()
    } else {
        newCategory.products.push(newProduct._id)
        newCategory.save()
    }

    sCategory.save()

    return { newProduct, textToEmbbed }

}

const addImageToProduct = async (productId, image) => {

    const product = await Product.findByIdAndUpdate(
        productId,
        {
            $push: {
                images: image
            }
        }, {
        new: true,
    }
    )

    if (!product) {
        throw new Error('Product not found')
    }

    return product

}

const getProduct = async (productId, getRelatedProducts) => {

    console.log('Value of getRelatedProducts:',getRelatedProducts)

    const relatedDataCacheKey = `relatedProducts:${productId}`
    const cacheKey = `product:${productId}`

    // console.log('Cache miss')
    let relatedProducts

    const product = await Product.findById(productId).populate('category').populate('ratingAndReviews').populate('superCategory').populate('productOptions').select('-productEmbedding')

    if (!product) {
        throw new Error('Product not found')
    }

    console.log()

    if (getRelatedProducts) {
        console.log('Entered getRelatedProducts:',getRelatedProducts)
        const superCategoryId = product.superCategory._id
        relatedProducts = await Product.find(
            {
                superCategory: new mongoose.Types.ObjectId(superCategoryId),
                _id: { $ne: new mongoose.Types.ObjectId(productId) }
            },
            "name brand price images ratingAndReviews",
            { limit: 10 }
        ).populate('ratingAndReviews')
    } 

    console.log('Related Products in service:',relatedProducts)


    const relatedProductData = JSON.stringify(relatedProducts)
    const productData = JSON.stringify(product)

    let cacheResult

    if(relatedProducts){
    cacheResult = await Promise.all([
        await client.hSet(relatedDataCacheKey, 'data', relatedProductData),
        await client.hSet(cacheKey, 'data', productData)
    ])
    }
    else{
        cacheResult=await client.hSet(cacheKey,'data',productData)
    }

    console.log("Cache result:", cacheResult)

    return { product, relatedProducts }

}

const filterProducts = async (filteringConditions) => {

    const products = await Product.find(filteringConditions)

    return products;

}

const createProductOptions = async (productId, productOptions) => {


    //Constructing options object to save
    const entries = Object.entries(productOptions)
    const optionsToSave = []
    for (const [key, value] of entries) {
        let newKey = key.endsWith('[]') ? key.slice(0, -2) : key
        const newValue = Array.isArray(value) ? value : [value];
        optionsToSave.push({
            name: newKey,
            values: newValue
        })
    }

    try {
        const newProductOptions = await ProductOptions.create({
            product: productId,
            options: optionsToSave
        })

        if (!newProductOptions) {
            throw new Error('Failed to add product options')
        }

        return newProductOptions
    } catch (err) {
        console.log('Error in create product options service', err)
        throw err
    }

}


const searchProduct = async (skip, limit, userQuery, page, categories = null, brands = null, priceRange = null, availability = null) => {

    // Converting to vector embedding
    const embeddedUserQuery = await embeddingsService.createEmbeddings(userQuery);
    // Normalizing for similarity calculation
    const normalizedEmbedding = normalizeL2(embeddedUserQuery);

    console.log('User Query is:', userQuery);
    console.log(skip, limit);

    let initialFilterPipeline = [];

    if (categories) {
        initialFilterPipeline.push({ $match: { category: { $in: categories } } });
    }

    if (brands) {
        initialFilterPipeline.push({ $match: { brand: { $in: brands } } });
    }

    if (priceRange) {
        if (priceRange.start !== null && priceRange.end !== null) {
            initialFilterPipeline.push({ $match: { cost: { $gte: priceRange.start, $lte: priceRange.end } } });
        } else if (priceRange.start !== null) {
            initialFilterPipeline.push({ $match: { cost: { $gte: priceRange.start } } });
        } else if (priceRange.end !== null) {
            initialFilterPipeline.push({ $match: { cost: { $lte: priceRange.end } } });
        }
    }

    if (availability) {
        initialFilterPipeline.push({ $match: { quantity: { $gte: 1 } } });
    }

    //TODO:
    const lookupCategoryStage = {
        $lookup: {
            from: 'categories',
            localField: 'category',
            foreignField: '_id',
            as: 'categoryDetails'
        }
    };
    //TODO:
    const unwindCategoryStage = {
        $unwind: '$categoryDetails'
    };
    //TODO:
    const addFieldsCategoryStage = {
        $addFields: {
            category: {
                _id: '$categoryDetails._id',
                name: '$categoryDetails.name'
            }
        }
    };

    // Full text search pipeline
    const textSearchPipeline = [
        ...initialFilterPipeline,
        {
            $search: {
                index: 'searchProducts',
                text: {
                    query: userQuery,
                    path: ['name', 'description', 'brand', 'category', 'superCategory', 'ratingAndReviews']
                }
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
                score: { $meta: "searchScore" } // Correct way to access score
            }
        },
        { $sort: { score: -1 } }, // Sort by score in descending order
        { $skip: skip },
        { $limit: limit }
    ];

    // Semantic search pipeline
    const schematicSearchPipeline = [
        ...initialFilterPipeline,
        {
            $vectorSearch: {
                index: "vector_index",
                path: "productEmbedding",
                queryVector: normalizedEmbedding,
                numCandidates: 100,
                limit: 100,
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
                score: { $meta: "vectorSearchScore" }
            }
        },
        { $sort: { score: -1 } }, // Sort by score in descending order
        { $skip: skip },
        { $limit: limit }
    ];

    try {
        // Fetching products via text search
        const productsFromTextSearch = await Product.aggregate(textSearchPipeline);
        console.log('Text search products:', productsFromTextSearch);

        // Fetching products via semantic search
        const productsFromSchematicSearch = await Product.aggregate(schematicSearchPipeline);

        let updatedProductsFromSchematicSearch = productsFromSchematicSearch.map((product) => ({
            ...product,
            score: product.score + 1
        }));

        console.log('Schematic search products:', productsFromSchematicSearch);

        const finalResult = reciprocalRankFusion(productsFromTextSearch, updatedProductsFromSchematicSearch);

        let filteredResults = meanFilter(finalResult);

        console.log('Results after mean filtering:', filteredResults);
        console.log('Final:', finalResult);

        const totalProductDocuments = finalResult.length;
        const hasNextPage = totalProductDocuments > (page * limit);
        console.log('Total Product Documents:', totalProductDocuments);
        console.log('Products fetched:', productsFromTextSearch);

        return {
            finalResult: filteredResults,
            totalProductDocuments,
            hasNextPage,
            nextPage: hasNextPage ? page + 1 : null
        };
    } catch (err) {
        console.log('Error in product service:', err);
        throw err;
    }
}

module.exports = {
    createProduct,
    addImageToProduct,
    getProduct,
    filterProducts,
    createProductOptions,
    searchProduct
}