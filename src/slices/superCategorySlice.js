import { createSlice } from "@reduxjs/toolkit";

const initialState={
    products: [],
    brandNames: [],
    categoryNames: [],
    isLoading: false,
    error: null,
    page: 1,
    limit: 10,
    priceRanges: [],
    selectedSuperCategory: '',
    filteredSuperCategoryProducts: [],
}

const superCategorySlice=createSlice({
    name: 'superCategory',
    initialState,
    reducers: {
        setProducts: (state, action) => { 
            state.products = action.payload
        },
        setBrandNames: (state, action) => {
            state.brandNames=action.payload
        },
        setCategoryNames: (state, action) => {
            state.categoryNames=action.payload
        },
        setPricePoints: (state,action)=>{
            state.pricePoints=action.payload
        },
        setLoading: (state,action)=>{
            state.isLoading=action.payload
        },
        setError: (state,action)=>{
            state.error=action.payload
        },
        appendProducts: (state,action)=>{
            return {
                ...state,
                products: [...state.products,...action.payload]
            }
        },
        setPriceRanges: (state,action)=>{
            state.priceRanges=action.payload
        },
        setPage: (state,action)=>{
            state.page=action.payload
        },
        setSelectedSuperCategory: (state,action)=>{
            state.selectedSuperCategory=action.payload
        },
        setFilteredSuperCategoryProducts: (state,action)=>{
            state.filteredSuperCategoryProducts=action.payload
        }
    }
})

export const {setProducts,setBrandNames,setCategoryNames,setPricePoints,setLoading,setError,appendProducts,setPriceRanges,setPage,setSelectedSuperCategory,setFilteredSuperCategoryProducts}=superCategorySlice.actions
export default superCategorySlice.reducer

