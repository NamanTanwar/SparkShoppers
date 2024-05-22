import { toast } from "react-hot-toast"
import { apiConnector } from "../apiConnector"
import { authEndpoints } from "../apis"
import { setLoading } from "../../slices/categorySlice"
import {setAccessToken, setIsLoggedIn, setUser} from "../../slices/authSlice"
import { handleLogout } from "../../slices/authSlice"
import { setShowLogoutModal } from "../../slices/UISlice"
import { setWishlistItems,clearWishlist } from "../../slices/wishlistSlice"
import { setCart,setTotalPrice,clearCart } from "../../slices/cartSlice"


const {SEND_OTP_API,SIGNUP_API,LOGIN_API,LOGOUT_API}=authEndpoints

export const signup=(firstname,lastname,email,password,navigate)=>{
    return async (dispatch)=>{
        console.log("Entered here")
        const toastId=toast.loading('Loading...')
        dispatch(setLoading(true))       
        try{
            const response=await apiConnector(
                'POST',
                SEND_OTP_API,
                {
                    firstname,
                    lastname,
                    email,
                    password,
                },
                { 'Content-Type': 'application/json' },
            )

            if(!response?.data?.success){
                throw new Error(response.data?.message)
            }

            console.log("Response for signup service: ",response)

            toast.success("Form submitted successfully")

            navigate('/verify-otp')


        }catch(err){
            console.log("Error in signup service:",err)
            toast.error(err.message || 'Something went wrong')
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export const sendOtp=(otp,navigate)=>{
    return async (dispatch)=>{

        console.log("Otp here is:",otp)

        const toastId=toast.loading('Loading...')
        dispatch(setLoading(true))
        try{
            const response=await apiConnector(
                'POST',
                SIGNUP_API,
                {
                    otp,
                },
                { 'Content-Type': 'application/json' },
            )

            console.log("Response here is:",response)

            if(!response?.data?.success){
                throw new Error(response.data?.message)
            }

            console.log("Response is:",response)

            console.log("Response.data is:",response.data)

            console.log("userResponse is:",response.data.userResponse)

            console.log("accessToken is:",response.data.accessToken)

            console.log("accessToken.access is:",response.data.accessToken.access)

            dispatch(setUser(response.data.userResponse))
            dispatch(setAccessToken(response.data.accessToken.access))

            toast.success('OTP Verified successfully')

            navigate('/login')

        }catch(err){
            console.log("Error in sending otp:",err)
           toast.error(err.message || "Error occured")
        }
        toast.dismiss(toastId)
        dispatch(setLoading(false))
    }
}


export const login=(data,navigate)=>{
    return async (dispatch)=>{
        const toastId=toast.loading("Loading...")
        dispatch(setLoading(true))
        try{
            let response=await apiConnector(
                'POST',
                LOGIN_API,
                data,
                { 'Content-Type': 'application/json' },
            )

            console.log("Response of login:",response)

            if(!response?.data?.success){
                throw new Error(response?.data?.message)
            }

            dispatch(setIsLoggedIn(true))
            dispatch(setUser(response.data.userResponse))
            dispatch(setAccessToken(response.data.accessToken.access))
            dispatch(setWishlistItems(response.data.userResponse.userWishlist))
            dispatch(setCart(response.data.userResponse.userCart))
            dispatch(setTotalPrice(response.data.userResponse.cartTotal))

            toast.success("Login success")
            navigate('/products')
        }catch(err){
            console.log("Error in login service:",err)
            toast.error(err.message || "Error occured")
        }
        toast.dismiss(toastId)
        dispatch(setLoading(false))
    } 
}

export const logout=(data,navigate)=>{
    return async (dispatch)=>{
        dispatch(setLoading(true))
        const toastId=toast.loading('Loading...')
        try{
            
            const response=await apiConnector(
                'POST',
                LOGOUT_API,
                data,
                { 'Content-Type': 'application/json' },
            )
            
            console.log(response)
            
            if(!response?.data?.success){
                throw new Error(response.data?.message)
            }

            //setting state tot initial state
            dispatch(handleLogout())
            dispatch(clearWishlist())
            dispatch(clearCart())
            //removing persisited data stored by redux-persist
            localStorage.removeItem('persist-root')

            toast.success('Logout Successfull!')
            dispatch(setShowLogoutModal(false))
            navigate('/')

        }catch(err){
            console.log("Error in logout api:",err)
            toast.error(err.message || "Error occured")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}


//isLoggedOut->false,
//clear accessToken from local storage and refresh token as a cookie
//clear user from localstorage


//





