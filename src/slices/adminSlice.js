import { createSlice } from "@reduxjs/toolkit";


const initialState={
    salesChartData:{
        result1: [30,50,25,67,87,23,76,74,76,32,12,32],//orders per month
        result2: [8500,9200,10100,11500,12000,10800,9500,8800,9700,10300,11200,9900],//sales per month
        percentageIncrease: 9,
    },
}

const adminSlice=createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setSalesChartData: (state,action)=>{
            state.salesChartData=action.payload
        }
    }
})

export const {setSalesChartData}=adminSlice.actions
export default adminSlice.reducer