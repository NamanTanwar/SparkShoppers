const { options } = require('joi')
const Category=require('../models/Category')
const SuperCategory=require('../models/SuperCategory')
const mongoose  = require('mongoose')
const Product=require('../models/Product')


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

const getSuperCategoryDataByName=async (superCategoryName,skip,limit,option)=>{
    
    console.log('skip and limit in service:',skip,limit)


    const brandNamesResult=await SuperCategory.findOne({name: superCategoryName}).populate({
        path: 'products',
        select: "brand cost"
    })
    
    let data=null

    switch(option){
        case 'recomended':
            data=await SuperCategory.findOne({name: superCategoryName}).//skip(skip).limit(limit).
            populate({
                path:'products',
                select: "_id name brand cost images ratingAndReviews",
                options: {
                    skip: skip,
                    limit: limit
                }
            }).
            populate({
                path: 'categories',
                select: "name"
            })
            break
        case 'newest':
            data=await SuperCategory.findOne({name: superCategoryName}).//skip(skip).limit(limit).
            populate({
                path:'products',
                select: "_id name brand cost images ratingAndReviews createdAt",
                options: {
                    sort: {createdAt: -1},
                    skip: skip,
                    limit: limit
                }
            }).
            populate({
                path: 'categories',
                select: "name"
            })
            break
        case 'price:lowtohigh':
            data=await SuperCategory.findOne({name: superCategoryName}).//skip(skip).limit(limit).
            populate({
                path:'products',
                select: "_id name brand cost images ratingAndReviews createdAt",
                options: {
                    sort: {cost: 1},
                    skip: skip,
                    limit: limit
                }
            }).
            populate({
                path: 'categories',
                select: "name"
            })
            break
        case 'price:hightolow':
            data=await SuperCategory.findOne({name: superCategoryName}).//skip(skip).limit(limit).
            populate({
                path:'products',
                select: "_id name brand cost images ratingAndReviews createdAt",
                options: {
                    sort: {cost: -1},
                    skip: skip,
                    limit: limit
                }
            }).
            populate({
                path: 'categories',
                select: "name"
            })
            break
        case 'popularity':
            data=await SuperCategory.aggregate([
                { $match: { name: superCategoryName } },
                {
                    $lookup: {
                        from: 'products', // The name of the product collection
                        localField: 'products',
                        foreignField: '_id',
                        as: 'products'
                    }
                },
                {
                    $lookup: {
                        from: 'categories', // The name of the category collection
                        localField: 'categories',
                        foreignField: '_id',
                        as: 'categories'
                    }
                },
                {
                    $addFields: {
                        'products.ratingAndReviewsLength': { $size: '$products.ratingAndReviews' }
                    }
                },
                { $unwind: '$products' },
                {
                    $sort: {
                        'products.ratingAndReviewsLength': -1 // Sort by ratingAndReviews length in descending order
                    }
                },
                { $skip: skip },
                { $limit: limit },
                {
                    $group: {
                        _id: '$_id',
                        products: { $push: '$products' },
                        categories: { $first: '$categories' },
                        name: { $first: '$name' },
                        // Add other fields if necessary
                    }
                },
                {
                    $project: {
                        'products._id': 1,
                        'products.name': 1,
                        'products.brand': 1,
                        'products.cost': 1,
                        'products.images': 1,
                        'products.ratingAndReviews': 1,
                        'products.createdAt': 1,
                        categories: 1,
                        name: 1
                        // Add other fields if necessary
                    }
                }
            ]) 
            break
        case 'customerRating':
            await SuperCategory.aggregate([
                { $match: { name: superCategoryName } },
                {
                    $lookup: {
                        from: 'products', // The name of the product collection
                        localField: 'products',
                        foreignField: '_id',
                        as: 'products'
                    }
                },
                {
                    $lookup: {
                        from: 'categories', // The name of the category collection
                        localField: 'categories',
                        foreignField: '_id',
                        as: 'categories'
                    }
                },
                {
                    $unwind: '$products'
                },
                {
                    $lookup: {
                        from: 'ratingandreviews', // The name of the ratingAndReview collection
                        localField: 'products.ratingAndReviews',
                        foreignField: '_id',
                        as: 'ratingAndReviews'
                    }
                },
                {
                    $addFields: {
                        'products.avgRating': {
                            $avg: '$ratingAndReviews.rating'
                        }
                    }
                },
                {
                    $sort: {
                        'products.avgRating': -1 // Sort by avgRating in descending order
                    }
                },
                { $skip: skip },
                { $limit: limit },
                {
                    $group: {
                        _id: '$_id',
                        products: { $push: '$products' },
                        categories: { $first: '$categories' },
                        name: { $first: '$name' },
                        // Add other fields if necessary
                    }
                },
                {
                    $project: {
                        'products._id': 1,
                        'products.name': 1,
                        'products.brand': 1,
                        'products.cost': 1,
                        'products.images': 1,
                        'products.avgRating': 1,
                        'products.createdAt': 1,
                        categories: 1,
                        name: 1
                        // Add other fields if necessary
                    }
                }
            ]);
            break
    }   

    
    console.log('data in service:',data)


    if(!data){
        throw new Error('Error in fetching superCategoryData')
    }

    let minPrice=brandNamesResult.products[0].cost
    let maxPrice=brandNamesResult.products[0].cost

    for(let i=0;i<brandNamesResult.products.length;i++){
        minPrice=Math.min(minPrice,brandNamesResult.products[i].cost)
        maxPrice=Math.max(maxPrice,brandNamesResult.products[i].cost)
    }


    return {
        products: data.products,
        categories: data.categories,
        brands: brandNamesResult.products,
        minPrice: minPrice,
        maxPrice: maxPrice,
    }

}

const getSuperCategoryCategoryData = async (categoryId, superCategoryName, skip, limit) => {
    try {
        // Fetch the super category to get relevant categories and products
        const superCategory = await SuperCategory.findOne({ name: superCategoryName }).populate({ path: 'categories', select: '_id name' });

        if (!superCategory) {
            throw new Error('SuperCategory not found');
        }

        // Get all category names within the super category
        const categories = superCategory.categories.map(category => ({ _id: category._id, name: category.name }));
        console.log('Categories here:', categories);

        // Base query for filtering products
        const baseQuery = {
            category: new mongoose.Types.ObjectId(categoryId),
            superCategory: new mongoose.Types.ObjectId(superCategory._id)
        };

        // Fetch all matching products to calculate min and max prices
        const allMatchingProducts = await Product.find(baseQuery).select('cost');

        // Calculate min and max price of the filtered products
        const prices = allMatchingProducts.map(product => product.cost);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);

        // Fetch total number of products matching the criteria
        const totalProducts = allMatchingProducts.length;

        // Fetch products with pagination and select specific fields
        const products = await Product.find(baseQuery)
            .select('_id name brand cost images ratingAndReviews createdAt')
            .skip(skip)
            .limit(limit);

        // Extract brand objects from the filtered products
        const brands = [];
        const brandSet = new Set();

        products.forEach(product => {
            if (!brandSet.has(product.brand)) {
                brandSet.add(product.brand);
                brands.push({ _id: product._id, brand: product.brand });
            }
        });

        return { products, brands, categories, minPrice, maxPrice, totalProducts };
    } catch (error) {
        console.error('Error fetching super category data:', error);
        throw error;
    }
};

//products,brands,categories,minPrice,maxPrice
const getSuperCategoryBrandData=async (superCategoryName,brandName,limit,skip)=>{

    try{
        //get all brand names on the basis of superCategoryName
        const superCategoryData=await SuperCategory.findOne({name: superCategoryName}).populate({path: 'products',select: '_id brand'})
        //brand
        console.log('superCategory.products:',superCategoryData.products)

        const products=await Product.find({superCategory: superCategoryData._id,brand: brandName}).select("_id name brand cost images ratingAndReviews createdAt category").populate('category')
        console.log('products:',products)
        
        //calculating minPrice and maxPrice:
        const prices = products.map(product => product.cost)
        const minPrice = Math.min(...prices)
        const maxPrice = Math.max(...prices)

        console.log('minPrice:',minPrice)
        console.log('maxPrice:',maxPrice)
        //categories
        const categories=products.map((product)=>{
            return {
                _id:product.category._id,
                name: product.category.name
            }
        })
        console.log('categories:',categories)

        const finalProducts=await Product.find({superCategory: superCategoryData._id,brand: brandName}).select("_id name brand cost images ratingAndReviews createdAt category").populate('category').skip(skip).limit(limit)
        console.log('final Products',finalProducts)


        return {
            products:finalProducts,
            brands:superCategoryData.products,
            categories:categories,
            minPrice:minPrice,
            maxPrice:maxPrice,
        }
        
    }catch(err){
        console.log('Error in fetching super category brand data:',err)
        throw err
    }

}


module.exports={
    getCategoryProducts,
    getAllCategories,
    findCategory,
    createCategory,
    getAllSuperCategories,
    createSuperCategory,
    getSuperCategoryDataByName,
    getSuperCategoryCategoryData,
    getSuperCategoryBrandData
}