import { createSlice } from "@reduxjs/toolkit";


const initialState={
   chartData: {},
   ordersComparisonData: {},
   salesComparisonData: {},
   recentReviewsData: [],
   ratingsComparisonData: {},
   productsData: [],
   isLoading: false,
   error: null,
   month: 'June',
   type: 'orders',
   productsOption: 'Recently Added'
}

const adminSlice=createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setChartData: (state,action)=>{
            state.chartData=action.payload
        },
        setOrdersComparisonData: (state,action)=>{
            state.ordersComparisonData=action.payload
        },
        setSalesComparisonData: (state,action)=>{
            state.salesComparisonData=action.payload
        },
        setRecentReviewsData: (state,action)=>{
            state.recentReviewsData=action.payload
        },
        setRatingsComparisonData: (state,action)=>{
            state.ratingsComparisonData=action.payload
        },
        setProductsData: (state,action)=>{
            state.productsData=action.payload
        },
        setIsLoading: (state,action)=>{
            state.isLoading=action.payload
        },
        setError: (state,action)=>{
            state.error=action.payload
        },
        setMonth: (state,action)=>{
            state.month=action.payload
        },
        setType: (state,action)=>{
            state.type=action.payload
        },
        setProductsOption: (state,action)=>{
            state.productsOption=action.payload
        }
    }
})

export const {setChartData,setOrdersComparisonData,setSalesComparisonData,setRecentReviewsData,setRatingsComparisonData,setProductsData,setIsLoading,setError,setType,setProductsOption,setMonth}=adminSlice.actions
export default adminSlice.reducer