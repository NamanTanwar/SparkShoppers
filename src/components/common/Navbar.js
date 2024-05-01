import React,{useState} from 'react';
import CTAButton from './CTAButton';
import { FaArrowDown } from "react-icons/fa";
import Logo from "../../assets/logo-no-background.png";
import { RxHamburgerMenu } from "react-icons/rx";
import {useSelector,useDispatch} from 'react-redux'
import {setShowSidebar} from '../../slices/UISlice'
import buttonText from '../../data/navbarData';
import DropDown from '../core/Navbar/DropDown';
import { setShowDropDown } from '../../slices/UISlice';
import LoggedInNavbar from '../core/Navbar/LoggedInNavbar';
import ConfirmationModal from './ConfirmationModal';
import SearchBar from './SearchBar';





const Navbar=()=>{

    const dispatch=useDispatch()

    const {showSidebar,showDropDown,showLogoutModal}=useSelector((state)=>state.UI)
    const {isLoggedIn,user}=useSelector((state)=>state.auth)

    

    const handleToggleSidebar=()=>{
        console.log("showSidebar value:",showSidebar)
        if(showSidebar===false){
            dispatch(setShowSidebar(true))
        }
        else{
            dispatch(setShowSidebar(false))
        }
    }
   
    return (

     <div className='relative'>

        

        

        <div className="block md:hidden">
           <button onClick={handleToggleSidebar}>
           <RxHamburgerMenu />
           </button>
        </div>

        {
            showDropDown && (
                <DropDown />
            )
        }
        
        <div className="hidden md:flex flex-row justify-around items-center space-y-2 ">
         
         <div className="pl-3">
            <img src={Logo} className="h-8" alt="Logo"/>
         </div>

         <div class="flex flex-row space-x-3 relative">
         {
            buttonText.map((text,idx)=>{
                return (
                    <div className="relative flex flex-row items-center text-bold hover:text-primary-200 hover:font-bold hover: cursor-pointer hover:font-sans" 
                    key={idx}
                    onMouseEnter={()=>text==='Categories' && dispatch(setShowDropDown(true))}
                    onMouseLeave={()=>text==='Categories' && dispatch(setShowDropDown(false))}
                    >
                        {text}
                        {text==='Categories' && (
                            <FaArrowDown />
                        )}
                    </div>
                )
            })
         }
         </div>

         <SearchBar />

         {
            isLoggedIn ? (<div>
                <LoggedInNavbar />
            </div>) : (<div className="flex flex-row space-x-3 pr-3 text-white align-items justify-center">
             
             <CTAButton text="Sign Up" path={'/signup'}/>
          
          
          <CTAButton text="Log In" path={'/login'}/>
          
          
      </div>)
         }

         

        </div>

        {showLogoutModal && <ConfirmationModal />}
     </div>
  
    )
}

export default Navbar;