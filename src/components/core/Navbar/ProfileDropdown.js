import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import { HiOutlineShoppingBag } from "react-icons/hi";
import { MdOutlineCancel } from "react-icons/md";
import { CiStar } from "react-icons/ci";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { setShowLogoutModal } from '../../../slices/UISlice';
import { useDispatch } from 'react-redux';

const ProfileDropdown=()=>{

    const navigate=useNavigate()
    const dispatch=useDispatch()

    const MyOrdersHandler=()=>{
        navigate('/my-orders')
    }

    const myCancellationsHandler=()=>{
        navigate('/my-cancellations')
    }

    const myReviewsHandler=()=>{
        navigate('/my-reviews')
    }


    const logoutHandler=()=>{
        dispatch(setShowLogoutModal(true)) 
    }


    const profileDropdownData=[
        {
            name:'My Orders',
            icon: <HiOutlineShoppingBag />,
            onClickHandler: MyOrdersHandler
        },
        {
            name: 'Cancellations',
            icon: <MdOutlineCancel />,
            onClickHandler: myCancellationsHandler,
        },
        {
            name: 'My Reviews',
            icon: <CiStar />,
            onClickHandler: myReviewsHandler,
        },
        {
            name: 'Logout',
            icon: <CiLogout />,
            onClickHandler: logoutHandler,
        }
    ]




    return (
        <div className="absolute flex flex-col space-y-2 bg-gray-200 p-3 rounded-md shadow-md backdrop-blur-md z-50 top-6 left-5">
            
            {
                profileDropdownData.map((element,idx)=>(
                    <button key={idx} className="p-1 flex flex-row justify-between items-center space-x-4 hover:bg-primary-200 hover:rounded-md hover:text-white" onClick={element.onClickHandler}>
                        {element.icon}
                        <p>{element.name}</p>
                    </button>
                ))  //
            }

            

        </div>
    )
}

export default ProfileDropdown