import { apiConnector } from "../apiConnector";
import {toast} from 'react-hot-toast'
import { productEndpoints } from "../apis";



const {CREATE_PRODUCT_API,SEARCH_PRODUCT_API}=productEndpoints;


export const createProduct=async (formData)=>{

        console.log('Form Data in service:',formData)
        const toastId=toast.loading('Loading')
        try{
            let response=await apiConnector(
                'POST',
                CREATE_PRODUCT_API,
                formData,
                {'Content-Type': 'multipart/form-data'},
            )
                console.log('Inside try block')
            if(!response?.data?.success){
                throw new Error(response.data?.message)
            }

            console.log('create product response:',response)
            toast.success('Product Added Successfully')
            toast.dismiss(toastId)
            return response
        }catch(err){
            console.log('Error in CREATE_PRODUCT_API service:',err)
            console.log('Error message:',err.message)
            toast.error('Error in submitting form')
        }
        toast.dismiss(toastId)
        
}

export const getProducts=async (queryKey)=>{

    console.log(queryKey)

    console.log(queryKey.queryKey[1])
    console.log(queryKey.pageParam)
    
    const searchQuery=queryKey.queryKey[1]
    const pageParam=queryKey.pageParam



     console.log('page param is:',pageParam)

         const url=`${SEARCH_PRODUCT_API}?q=${searchQuery}&page=${pageParam}&limit=${10}`
         console.log(url)
         console.log('SearchQuery:',searchQuery)
         console.log('pageParam',pageParam)
         try{
            let response=await apiConnector(
                 'GET',
                 url,
             )
             console.log('Response is:',response)
             return response.data
         }catch(err){
             console.log('Error in getProducts service',err)
        }

}