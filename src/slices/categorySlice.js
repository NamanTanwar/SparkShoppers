import { createSlice } from "@reduxjs/toolkit";

const initialState={
    loading: false,
    superCategories: [],
}

const categorySlice=createSlice({
    name: "category",
    initialState,
    reducers : {
       setSuperCategories: (state,action)=>{
        state.superCategories=action.payload
       },
       setLoading: (state,action)=>{
        state.loading=action.payload
    } 
    },
})

export const {setSuperCategories,setLoading}=categorySlice.actions
export default categorySlice.reducer