import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { cartEndpoints } from "../apis"
import { setLoading,setCart,setError } from "../../slices/cartSlice"

const accessToken='xyz'

const {GET_CART_API}=cartEndpoints

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