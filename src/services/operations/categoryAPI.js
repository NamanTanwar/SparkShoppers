import { categoryEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import {toast} from 'react-hot-toast'
import { setSuperCategories,setLoading } from "../../slices/categorySlice";

const {GET_SUPER_CATEGORIES_API}=categoryEndpoints

export const getSuperCategories=()=>{

    return async (dispatch)=>{
        let result=null
        const toastId=toast.loading("Loading Categories")
        dispatch(setLoading(true))
        console.log("Endpoint is:",GET_SUPER_CATEGORIES_API)
        try{
            let response=await apiConnector(
                        'GET',
                        GET_SUPER_CATEGORIES_API,)

        if(!response?.data?.success){
            throw new Error('Failed to get super categories')

        }
        toast.success("Super Categories fetched successfully")
        result=response?.data?.superCategories
        console.log("Result superCategories array:",result)
        dispatch(setSuperCategories(result))
        dispatch(setLoading(false))
    }catch(err){
        console.log("GET SUPER CATEGORIES API ERROR:",err)
        toast.error(err.message)
    }
    toast.dismiss(toastId)
    return result
    }

}

