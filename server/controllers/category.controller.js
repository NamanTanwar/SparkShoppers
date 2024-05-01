const httpStatus=require('http-status')
const categoryService=require('../services/category.service')

const getCategoryProducts=async (req,res)=>{

    try{
        const {categoryName}=req.body

        const products=await categoryService.getCategoryProducts(categoryName)

        //returning a list of products for the specific category
        return res.status(200).json({
            success:true,
            message:"Successfully fetched products for the specified category",
            data: products
        })

    }catch(err){
        console.log(err)

        let statusCode=httpStatus.INTERNAL_SERVER_ERROR
        let errorMessage="Internal Server Error"

        if(err.message==="Category does not exist"){
            statusCode=httpStatus.BAD_REQUEST,
            errorMessage=err.message
        }

        res.status(statusCode).json({
            success:false,
            message:errorMessage,
            error: err.message
        })
    }

}

const getAllCategories=async (req,res)=>{

   try{

    const categories=await categoryService.getAllCategories()

    res.status(httpStatus.OK).json({
        success: true,
        message: 'All categories fetched successfully',
        data: categories
    })


   }catch(err){
    console.log("Error in category controller:",err)
    let statusCode=httpStatus.INTERNAL_SERVER_ERROR
    let errorMessage='Internal Server Error'

    if(err.message==='No categories found'){
        statusCode=httpStatus.NOT_FOUND
        errorMessage=err.message
    }
    res.status(statusCode).json({
        success: false,
        error:err.message,
        message: errorMessage
    })

   }

}

const getAllSuperCategories=async (req,res)=>{
         try{

            const superCategories=await categoryService.getAllSuperCategories()

            res.status(httpStatus.OK).json({
                success: true,
                message: "All Super Categories fetched successfully",
                superCategories
            })

         }catch(err){

            console.log("Error in category controller:",err)
            let statusCode=httpStatus.INTERNAL_SERVER_ERROR
            let errorMessage='Internal Server Error'

            if(err.message==='No super categories found'){
               statusCode=httpStatus.NOT_FOUND
               errorMessage=err.message
                }

            res.status(statusCode).json({
                success: false,
                error:err.message,
                message: errorMessage
            })
              
         }
}

const createSuperCategory=async (req,res)=>{
    const {superCategoryName}=req.body
    try{
        const newSuperCategory=await categoryService.createSuperCategory(superCategoryName)

        if(!newSuperCategory){
            return res.status(httpStatus.BAD_REQUEST).json({
                success:false,
                message:"Super Category not created"
            })
        }

        res.status(httpStatus.CREATED).json({
            success:true,
            message:"Super Category created successfully",
            newSuperCategory,
        })

    }catch(err){
        console.log("create super category controller error:",err)
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            success:false,
            error:err.message,
            message:"Internal Server Error"
        })

    }
}


module.exports={
    getCategoryProducts,
    getAllCategories,
    getAllSuperCategories,
    createSuperCategory
}