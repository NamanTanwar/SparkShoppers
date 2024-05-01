import React,{useState,useEffect} from 'react'
import { CiSearch } from "react-icons/ci";
import { useDebounce } from '../../hooks/useDebounce';
import {setSearchQuery} from '../../slices/productSlice'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const SearchBar=()=>{

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
        <div className='max-w-xs flex flex-row items-center justify-between peer rounded-md border border-gray-300 px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50'>
            <input 
                type='text'
                name='searchQuery'
                id='searchQuery'
                className='text-gray-700 focus:outline-none'
                value={searchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}
            />
            <button type='submit' onClick={handleClick}>
                <CiSearch className="text-xl"/>
            </button>
            
        </div>
    )
}

export default SearchBar