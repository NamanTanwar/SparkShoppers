import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { cartEndpoints } from "../apis"
import { setLoading,setCart,setError,setTotalPrice } from "../../slices/cartSlice"

const accessToken='xyz'

const {GET_CART_API,ADD_TO_CART_API,REMOVE_CART_ITEM_API,CALCULATE_CART_TOTAL}=cartEndpoints

export const getUserCart=()=>{
        return async (dispatch)=>{
            const toastId=toast.loading()
            dispatch(setLoading(true))
            try{
                let response=await apiConnector(
                    'POST',
                    GET_CART_API,
                    null,
                    {
                        Authorization: `Bearer ${accessToken}`
                    }

                )

                if(!response?.data?.success){
                    throw new Error(response?.data?.message)
                }

                console.log('Response for get cart:',response)

                dispatch(setCart(response.data))
                toast.success('Cart fetched successfully')
                return response.data
            }catch(err){
                console.log('Error in getCart service:',err)
                console.log('Error message',err.message || 'Error occured')
                toast.error('Error in fetching  Cart! Try again later.')
                dispatch(setError(err.message||'Something went wrong'))
            }finally{
                dispatch(setLoading(false))
                toast.dismiss(toastId)
            }
        }
}

export const addItemToCartService=(productId,userToken)=>{
        return async (dispatch)=>{
            const toastId=toast.loading('Loading...')
            dispatch(setLoading(true))
            try{
                let response=await apiConnector(
                    'POST',
                    ADD_TO_CART_API,
                    {
                        productId,
                        userToken
                    },
                    {
                        authorization: `Bearer ${userToken}`
                    }
                )
                dispatch(setCart(response.data.userCart))
                dispatch(setTotalPrice(response.data.totalPrice))
                dispatch(setLoading(false))
                toast.success('Item successfully added to cart')
            }catch(err){    
                toast.error('Error in adding to cart')
                console.log('Error message:',err.message)
            }finally{
                toast.dismiss(toastId)
                dispatch(setLoading(false))
            }
        }
}

export const removeFromCartService=(productId,userToken,removeItem)=>{
    return async (dispatch)=>{
        const toastId=toast.loading('Loading...')
        dispatch(setLoading(true))
        try{
            let response=await apiConnector(
                'POST',
                REMOVE_CART_ITEM_API,
                {
                    productId,
                    userToken,
                    removeItem,
                },
                {
                    authorization: `Bearer ${userToken}`
                }
            )
            dispatch(setCart(response.data.userCart))
            dispatch(setTotalPrice(response.data.totalPrice))
            dispatch(setLoading(false))
            toast.success('Item successfully removed from cart')
        }catch(err){
            toast.error('Error in removing from cart')
            console.log('Error message:',err.message)
        }finally{
            toast.dismiss(toastId)
            dispatch(setLoading(false))
        }
    }
}

export const caclulateTotalPrice=(cartItems)=>{

    return async (dispatch)=>{
        const toastId=toast.loading()
        setLoading(true)
        try{
            const response=await apiConnector(
                'POST',
                 CALCULATE_CART_TOTAL,
                 cartItems,
            )

            if(!response?.data?.success){
                throw new Error(response?.data?.message || "Server error")
            }

            dispatch(setTotalPrice(response.data.total))
            toast.success('Total Price calculated successfully')
            return response.data.total

        }catch(err){
            console.log("Error in calculate total price service:",err)
            toast.err('Error in calculating total Price')
            dispatch(setError(err.message))
        }finally{
            toast.dismiss(toastId)
            setLoading(false)
        }
    }

}