import { createSlice } from "@reduxjs/toolkit";
import productSlice from "./productSlice";

const initialState={
    items: [],
    isLoading: false,
    error: null
}

export const wishlistSlice=createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        setWishlistItems: (state,action)=>{
            state.items=action.payload
        },
        setLoading: (state,action)=>{
            state.isLoading=action.payload
        },
        setError: (state,action)=>{
            state.error=action.payload
        },
        addToWishlist: (state,action)=>{
            const product=action.payload
            const productId=product._id
            const targetItem=state.items.find((item=>item._id===productId))
            if(targetItem)
                return
            return {
                ...state,
                items: [...state.items,product]
            }
        },
        removeFromWishlist: (state,action)=>{
            const productId=action.payload
            const targetItem=state.items.find((item)=>item._id===productId)
            if(!targetItem)
                return
            return {
                ...state,
                items: state.items.filter((item)=>item._id!==productId)
            }
        },
        clearWishlist: ()=>{
            return initialState
        }
    }
})

export const {setWishlistItems,setLoading,setError,addToWishlist,removeFromWishlist,clearWishlist}=wishlistSlice.actions
export default wishlistSlice.reducer


