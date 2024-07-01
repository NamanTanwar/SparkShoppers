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
    hasNextPage: true,
    categoriesFilters: [],
    brandsFilters: [],
    priceFilters: {
        start: -Infinity,
        end: Infinity
    },
    allFilters: [],
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
        },
        setHasNextPage: (state,action)=>{
            state.hasNextPage=action.payload
        },
        addFilterCategories: (state,action)=>{
            if(state.categoriesFilters.some(element=>element._id===action.payload._id))
                return state
            return {
                ...state,
                categoriesFilters: [...state.categoriesFilters,action.payload],
                allFilters: [...state.allFilters,action.payload.name]
            }
        },
        addBrandsFilter: (state,action)=>{
            if(state.brandsFilters.includes(action.payload))
            return state
            return {
                ...state,
                brandsFilters: [...state.brandsFilters,action.payload],
                allFilters: [...state.allFilters,action.payload]
            }
        },
        setPriceFilters: (state,action)=>{
            if(state.priceFilters.start===action.payload.start && state.priceFilters.end===action.payload.end)
                return state
            state.priceFilters=action.payload
        },
        removeCategoryFilter: (state,action)=>{
            return {
                ...state,
                categoriesFilters: state.categoriesFilters.filter(category=>category._id!==action.payload)
            }
        },
        removeBrandFilter: (state,action)=>{
            return {
                ...state,
                brandsFilters: state.brandsFilters.filter(brand=>brand!==action.payload)
            }
        },
        removePriceFilter: (state,action)=>{
            return {
                ...state,
                priceFilters: {
                    start: -Infinity,
                    end: Infinity
                }
            }
        }
    }
})

export const {setProducts,setBrandNames,setCategoryNames,setPricePoints,setLoading,setError,appendProducts,setPriceRanges,setPage,setSelectedSuperCategory,setFilteredSuperCategoryProducts,setHasNextPage,addFilterCategories,addBrandsFilter,setPriceFilters,removeCategoryFilter,removeBrandFilter,removePriceFilter}=superCategorySlice.actions
export default superCategorySlice.reducer

