import { createSlice } from "@reduxjs/toolkit";

const initialState={
    orderId: ''
}

const paymentSlice=createSlice({
    name: 'payments',
    initialState,
    reducers: {
        setOrderId: (state,action)=>{
            state.orderId=action.payload
        }
    }
})

export const {setOrderId}=paymentSlice.actions
export default paymentSlice.reducer