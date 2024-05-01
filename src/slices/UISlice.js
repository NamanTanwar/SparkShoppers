import {createSlice} from '@reduxjs/toolkit'


const initialState={
    showSidebar: false,
    showDropDown: false,
    showLogoutModal: false
}

const UISlice=createSlice({
    name: 'UI',
    initialState,
    reducers: {
        setShowSidebar(state,action){
            console.log("Action dispatched")
            state.showSidebar=action.payload
        },
        setShowDropDown(state,action){
            state.showDropDown=action.payload
        },
        setShowLogoutModal(state,action){
            state.showLogoutModal=action.payload
        }
    }
})

export const {setShowSidebar,setShowDropDown,setShowLogoutModal}=UISlice.actions
export default UISlice.reducer
