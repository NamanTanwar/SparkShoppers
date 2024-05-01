import { createSlice } from "@reduxjs/toolkit"; 

const initialState={
    cartItems: [],
    isLoading: false,
    error: null,
}

export const cartSlice=createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setLoading:(state,action)=>{
            state.isLoading=action.payload
        },
        setCart:(state,action)=>{
            state.cartItems = action.payload
        },
        setError:(state,action)=>{
            state.error=action.payload
        }
    }
})

export const {setLoading,setCart,setError}=cartSlice.actions
export default  cartSlice.reducer