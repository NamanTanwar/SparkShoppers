import { apiConnector } from "../apiConnector";
import {toast} from 'react-hot-toast'
import { categoryEndpoints } from "../apis";
import { setLoading,setError,setProducts,setBrandNames,setCategoryNames,appendProducts,setPriceRanges,setPage } from "../../slices/superCategorySlice";

const {GET_SUPER_CATEGORIES_PAGE_DATA_API,GET_SUPER_CATEGORIES_CATEGORY_DATA_API,GET_SUPER_CATEGORIES_BRAND_DATA_API}=categoryEndpoints


export const fetchSuperCategoryPageData=(superCategoryName,page=1,limit=10,option)=>{
    return async (dispatch)=>{
        let result=null
        const toastId=toast.loading("Loading Category")
        try{
            dispatch(setLoading(true))
            dispatch(setError(null))

            let response=await apiConnector(
                    'POST',
                    GET_SUPER_CATEGORIES_PAGE_DATA_API,
                    { 
                        superCategoryName,
                        option
                    },
                    null,
                    {
                        page,
                        limit
                    },
            )
            let categories=response.data.categories
            const uniqueCategories = categories.reduce((acc, current) => {
                if (!acc.find(item => item.name === current.name)) {
                    acc.push(current);
                }
                return acc;
            }, []);
            const brandNames=response.data.brands
            const uniqueBrands=brandNames.reduce((acc,current)=>{
                if(!acc.find(item=>item.brand===current.brand)){
                    acc.push(current)
                }
                return acc
            },[])
            console.log('unique brands:',uniqueBrands)
            console.log('unique categories:',uniqueCategories)
            console.log('Result from api:',response)
            console.log('Response.data.products:',response.data.products)
            console.log('page no from backend:',response.data.page)
            dispatch(setLoading(false))
            if(page===1)
                dispatch(setProducts(response.data.products))
            else
            dispatch(appendProducts(response.data.products))
            dispatch(setCategoryNames(uniqueCategories))
            dispatch(setBrandNames(uniqueBrands))
            dispatch(setPriceRanges(response.data.priceRanges))
            dispatch(setPage(response.data.page+1))
            toast.success('Data fetched successfully!')
            if(response.data.products.length===0)
                    toast.success('No more products to show !!')
            console.log('products:',response.data.products)
            console.log('categories:',response.data.categories)
            console.log('brand:',response.data.brands)
            console.log('priceRanges length:',response.data.priceRanges)
            result=response.data
        }catch(err){
            console.log('Error in fetching superCategory data:',err)
            toast.error('Error in fetching category data')
            setError(err)
        }finally{
            toast.dismiss(toastId)
            dispatch(setLoading(false))
        }
    }
}

export const fetchSuperCategoryCategoryData=(categoryId,superCategoryName)=>{
    return async (dispatch)=>{
        const toastId=toast.loading('Loading....')
        try{
            dispatch(setLoading(true))
            dispatch(setError(null))
            const response=await apiConnector(
                'POST',
                GET_SUPER_CATEGORIES_CATEGORY_DATA_API,
                {
                    categoryId,
                    superCategoryName,
                }
            )
            console.log('Response from fetchSuperCategoryCategoryData:',response)
            console.log('Response data:',response.data)
            dispatch(setProducts(response.data.products))
            dispatch(setBrandNames(response.data.brands))
            dispatch(setCategoryNames(response.data.categories))
            dispatch(setPriceRanges(response.data.priceRanges))
            dispatch(setPage(response.data.page))
            toast.success('data fetched successfully')
        }catch(err){
            console.log('Error in fetchSuperCategoryCategoryData service',err.message)
            toast.error('Something went wrong!')
        }finally{
            dispatch(setLoading(false))
            toast.dismiss(toastId)
        }
    }
}

export const fetchSuperCategoryBrandData=(superCategoryName,brandName,page=1,limit=10)=>{
    return async (dispatch)=>{
        const toastId=toast.loading('Loading....')
        console.log('Printing url:',GET_SUPER_CATEGORIES_BRAND_DATA_API+`/${superCategoryName}/${brandName}`)
        try{
            dispatch(setLoading(true))
            dispatch(setError(null))
            const response=await apiConnector(
                'POST',
                GET_SUPER_CATEGORIES_BRAND_DATA_API+`/${superCategoryName}/${brandName}`,
                {
                    superCategoryName,
                    brandName
                },
                null,
                {
                    page,
                    limit,
                }
            )

            if(!response.data.success){
                throw new Error(response.data.message)
            }

            console.log('response.data:',response.data)
            dispatch(setProducts(response.data.products))
            dispatch(setCategoryNames(response.data.categories))
            dispatch(setPriceRanges(response.data.priceRanges))
            dispatch(setBrandNames(response.data.brands))
            toast.success('data fetched!')
            return response.data

        }catch(err){
            console.log('Error in fetchSuperCategoryBrandData',err)
            toast.error('Something went wrong!')
            dispatch(setError(err))
        }finally{
            dispatch(setLoading(false))
            toast.dismiss(toastId)
        }
    }
}