import {createSlice} from "@reduxjs/toolkit"

const initialState={
    isLoggedIn: false,
    user: {},
    accessToken:{},  
    loading: false,
    errors:{},
}

const authSlice=createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedIn :(state,action)=>{
            state.isLoggedIn=action.payload
        },
        setUser: (state,action)=>{
            state.user=action.payload
        },
        setLoading: (state,action)=>{
            state.loading=action.payload
        },
        setErrors: (state,action)=>{
            state.errors=action.payload
        },
        setAccessToken: (state,action)=>{
            state.accessToken=action.payload
        },
        handleLogout: (state)=>{
            state.isLoggedIn=false
            state.user={}
            state.accessToken={}
            state.loading=false
            state.errors={}
        }
    }
})

export const {setIsLoggedIn,setUser,setLoading,setAccessToken,handleLogout}=authSlice.actions
export default authSlice.reducer

