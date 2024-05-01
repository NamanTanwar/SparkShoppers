import React from 'react';
import Logo from '../../../assets/logo-no-background.png'
import { IoMdArrowRoundBack } from "react-icons/io";
import { useSelector,useDispatch } from 'react-redux';
import { setShowSidebar } from '../../../slices/UISlice';
import buttonText from '../../../data/navbarData';
import CTAButton from '../../common/CTAButton';

const Sidebar=()=>{

    const dispatch=useDispatch()

    const {showSidebar}=useSelector((state)=>state.UI)

   

    return (
      <div className="fixed left-0 top-0 h-full bg-accent-100 w-64 py-2 px-4 z-100 flex flex-col space-y-36">

        <div className="flex flex-row justify-between">
          <img src={Logo} className="h-6" alt="Logo"/>
          <button onClick={() => dispatch(setShowSidebar(!showSidebar))}>
              <IoMdArrowRoundBack />
          </button>
        </div>

        <div className="flex flex-col items-stretch">
          {
              buttonText.map((text,idx)=>{
                  return (
                      <button className="hover:bg-primary-100 hover:text-bold h-12 hover:text-white" key={idx}>{text}</button>
                  )
              })

          }
        </div>

        <div className="flex flex-row space-x-4 justify-center">
         
         <CTAButton text="Sign Up"/>
         <CTAButton text="Login"/>

        </div>
      </div> 
    )

}

export default Sidebar