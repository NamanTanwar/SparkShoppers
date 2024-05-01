import { createSlice } from "@reduxjs/toolkit";

const initialState={
    products: [],
    filteredProducts: [],
    sortedProducts: [],
    searchQuery: '',
}

const productSlice=createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts(state,action){
            state.products=action.payload
        },
        setFilteredProducts(state,action){
            state.filteredProducts=action.payload
        },
        setSortedProducts(state,action){
            state.sortedProducts=action.payload
        },
        setSearchQuery(state,action){
            state.searchQuery = action.payload
        }
    }
})

export const {setProducts,filteredProducts,sortedProducts,setSearchQuery}=productSlice.actions
export  default productSlice.reducer