import React from 'react'
import { useDispatch } from 'react-redux'
import { setShowLogoutModal } from '../../slices/UISlice'
import { logout } from '../../services/operations/authAPI'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ConfirmationModal=()=>{

    const dispatch=useDispatch()

    

    const navigate=useNavigate()
    
    const {user}=useSelector((state) => state.auth)
    
    const handleBack=()=>{
        dispatch(setShowLogoutModal(false))
    }

    const handleLogout=()=>{
        dispatch(logout(user,navigate))
    }

    return (
        <div class="absolute top-56 left-0 w-full h-full">

            <div class="flex flex-col justify-center items-center space-y-4 mx-auto p-8 max-w-md bg-white rounded-lg shadow-md">

                <h1>Confirm Logout</h1>

                <h4 class="text-gray-700">Hey {user.firstname} {user.lastname}</h4>

                <p class="text-gray-700">Are you sure you want to logout?</p>

            <div class="flex flex-row space-x-4">
                <button class="px-4 py-2 text-gray-700 bg-white rounded-md hover:bg-gray-100 focus:outline-none" onClick={handleBack}>Back</button>
                <button class="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none" onClick={handleLogout}>Logout</button>
            </div>

            </div>

        </div>
    )
}

export default ConfirmationModal