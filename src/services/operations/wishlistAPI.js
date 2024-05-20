import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { setLoading,setError,setWishlistItems } from "../../slices/wishlistSlice"
import { wishlistEndpoints} from "../apis"



const {
    REMOVE_WISHLIST_ITEM_API,
    ADD_WISHLIST_ITEM_API,
    }=wishlistEndpoints

export const removeItemFromWishlist=(productId,userToken)=>{
    return async (dispatch)=>{
        const toastId=toast.loading('Loading...')
        try{
            dispatch(setLoading(true))
            dispatch(setError(null))
            const response=await apiConnector(
                'DELETE',
                REMOVE_WISHLIST_ITEM_API,
                {
                    productId,
                    userToken
                },
                {
                    Authorization: `Bearer ${userToken}`
                }
                )

                console.log('Response from removeFromWishlist api:',response)

                const updatedWishlist=response.data.updatedWishlist
                dispatch(setWishlistItems(updatedWishlist))
                dispatch(setLoading(false))
                toast.dismiss(toastId)
                toast.success('Item removed from wishlist')
                return updatedWishlist
        }catch(err){
            console.log('Error in remove from wishlist service:',err)
            dispatch(setError(err))
            toast.error('Error in removing item')
        }
        finally{
            dispatch(setLoading(false))
            toast.dismiss(toastId)
        }
    }
}

export const addItemToWishlist=(productId,userToken)=>{
    return async (dispatch)=>{
        console.log("User token is:",userToken)
        const toastId=toast.loading('Loading...')
        try{
            dispatch(setLoading(true))
            dispatch(setError(null))
            const response=await apiConnector(
                'POST',
                ADD_WISHLIST_ITEM_API,
                {
                    productId,
                    userToken
                },
                {
                    authorization: `Bearer ${userToken}`
                }
            )

            console.log('Response from add item to wishlist:',response)
            const updatedWishlist=response.data.updatedWishlist
            console.log('UpdatedWishlist:',updatedWishlist)
            dispatch(setWishlistItems(updatedWishlist))
            dispatch(setLoading(false))
            toast.dismiss(toastId)
            toast.success('Item successfully added to wishlist')
        }catch(err){
            console.log('Error in add item to wishlist service:',err)
            setError(err)
            toast.error('Error in adding to wishlist')
        }finally{
            dispatch(setLoading(false))
            toast.dismiss(toastId)
        }
    }
}