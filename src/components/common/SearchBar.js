import React,{useState,useEffect} from 'react'
import { CiSearch } from "react-icons/ci";
import { useDebounce } from '../../hooks/useDebounce';
import {setSearchQuery} from '../../slices/productSlice'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SearchBar=({searchRef,bgColor='white'})=>{

    const dispatch=useDispatch()
    const navigate=useNavigate()

    const [searchTerm,setSearchTerm]=useState('')

    const handleClick=()=>{
        if(searchTerm==='')
            return
        dispatch(setSearchQuery(searchTerm))
        navigate(`/search-product?q=${searchTerm}`)
        //call api
    }

    // const debounceTime=500 //500ms
    // const debouncedSearchTerm=useDebounce(searchQuery,debounceTime)

    // const handleChange=(e)=>{
    //         setSearchQuery(e.target.value)
    // }

    

    
    return (
        <div className={`max-w-xs flex flex-row items-center justify-between peer rounded-md border border-gray-300 px-2 py-1 focus-within:ring-1 focus-within:ring-blue-700 focus-within:ring-opacity-50 bg-${bgColor}`}>
            <input 
                type='text'
                name='searchQuery'
                id='searchQuery'
                className={`text-gray-700 focus:outline-none bg-${bgColor}`}
                value={searchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}
                placeholder='Search for products'
                ref={searchRef}
            />
            <button type='submit' onClick={handleClick}>
                <CiSearch className="text-xl"/>
            </button>
            
        </div>
    )
}

export default SearchBar