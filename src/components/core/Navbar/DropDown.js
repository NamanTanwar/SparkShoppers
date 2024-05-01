import React from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { setShowDropDown } from '../../../slices/UISlice';
import './NavbarCSS.css'

const DropDown=()=>{

    const dispatch=useDispatch()
    
    const {superCategories}=useSelector((state)=>state.category)
    const {showDropDown}=useSelector((state)=>state.UI)
   
    const handleMouseEnter=()=>{
        if(showDropDown===true){
            dispatch(setShowDropDown(true))
        }
    }

    const handleMouseLeave=()=>{
            if(showDropDown===true){
                dispatch(setShowDropDown(false))
            }
    }

    return (
        <div className="absolute custom-dropdown bg-gray-200 p-3 rounded-md shadow-md"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        >
            <ul>
                {
                    superCategories.map((superCategory)=>{
                        return (
                            <li key={superCategory._id} className="p-1 hover:bg-primary-100 hover:text-white">
                                <p className="">{superCategory.name}</p>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default DropDown