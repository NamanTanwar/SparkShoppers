import React from 'react'
import { useSelector } from 'react-redux'
import { CiHeart } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import { FaCircleUser } from "react-icons/fa6";
import ProfileDropdown from './ProfileDropdown';

const LoggedInNavbar=()=>{

    const navIcons=[{
    name: 'Wishlist',
    icon: <CiHeart/>},
    {
    name: 'Cart',
    icon:<FaCartShopping />},
    {
    name: 'My Profile',
    icon:<FaCircleUser />
    }]

    const {showSidebar}=useSelector((state)=>state.UI)

    return (
        <div className="relative">
                
            {
                showSidebar ? (<div>
                    <div className="flex flex-col">

                        {
                            navIcons.map((navIcon,idx)=>(
                                <div key={idx} className="flex flex-row">
                                    <p>{navIcon.name}</p>
                                    {navIcon.icon}
                                </div>
                            ))
                        }

                    </div>
                </div>) : (
                    
                    <div className='relative flex flex-row space-x-5 items-center justify-center'>
                    

                        <ProfileDropdown />

                        {
                            navIcons.map((navIcon,idx)=>(
                                <button key={idx}>
                                  <span className=''>{navIcon.icon}</span>   
                                </button>
                            ))
                        }
                </div>
                )
                
            }
            
        </div>
    )
}

export default LoggedInNavbar