import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import ProfileDropdown from './ProfileDropdown';
import { useNavigate } from 'react-router-dom';
import { navIcons } from '../../../data/navbarIconsData';

const LoggedInNavbar=()=>{
    const [showProfileDropDown,setShowProfileDropdown]=useState(false)

    const navigate=useNavigate()

    const {showSidebar}=useSelector((state)=>state.UI)

    return (
        <div className="relative">
                
            {
                showSidebar ? (<div>
                    <div className="flex flex-col">

                        {
                            navIcons.map((navIcon,idx)=>(
                                <div key={idx} className="flex flex-row" onClick={()=>'navigate' in navIcon ? navigate(navigate) : setShowProfileDropdown((prevValue)=>!prevValue)}>
                                    <p>{navIcon.name}</p>
                                    {navIcon.icon}
                                </div>
                            ))
                        }

                    </div>
                </div>) : (
                    
                    <div className='relative flex flex-row space-x-5 items-center justify-center'>
                    

                        {showProfileDropDown && (<ProfileDropdown />)}

                        {
                            navIcons.map((navIcon,idx)=>(
                                <button className='text-xl hover:text-purple-600' key={idx} onClick={()=>'navigateTo' in navIcon ? navigate(navIcon.navigateTo) : setShowProfileDropdown((prevValue)=>!prevValue)}>
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