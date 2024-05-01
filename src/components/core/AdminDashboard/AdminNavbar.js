import React from 'react';
import Logo from "../../../assets/logo-no-background.png"
import SearchBar from '../../common/SearchBar';
import { CiBellOn } from "react-icons/ci";
import { FaCircleUser } from "react-icons/fa6";
import ProfileDropdown from '../Navbar/ProfileDropdown';

const AdminNavbar=()=>{
    return (
        <div className='flex flex-row space-x-4 justify-around items-center'>

            <img src={Logo} className='h-8' alt="Logo"/>
            <SearchBar />
            <CiBellOn className='text-3xl'/>
            <div className='relative'>
                <FaCircleUser />
            </div>   
        </div>
    )
}

export default AdminNavbar;

