import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { fetchSuperCategoryPageData } from '../services/operations/superCategoryAPI'
import Sidebar from '../components/core/SuperCategoryPage/Sidebar'
import ProductList from '../components/core/SuperCategoryPage/ProductList'
import { setSelectedSuperCategory } from '../slices/superCategorySlice'

const SuperCategoryPage=()=>{
    
    const dispatch=useDispatch()

    const [selectedOption,setSelectedOption]=useState('recomended')


    const {categoryName}=useParams()
    dispatch(setSelectedSuperCategory(categoryName))
    //const {isLoading,error,page,limit}=useSelector((state)=>state.superCategory)

    // useEffect(()=>{
    //     dispatch(fetchSuperCategoryPageData(categoryName,page,limit,selectedOption))
    // },[selectedOption])


    // if(isLoading){
    //     return <h1>Loading...</h1>
    // }

    // if(error){
    //     return <h1>Something went wrong</h1>
    // }
    
    return (
        <div>
            <h1>Entered category page</h1>
            <div>
                <select id='filterOptions' value={selectedOption} onChange={(e)=>setSelectedOption(e.target.value)}>
                    <option value='recomended'>Recomended</option>
                    <option value='newest'>What's New</option>
                    <option value='popularity'>Popularity</option>
                    <option value='price:lowtohigh'>Price: low to high</option>
                    <option value='price:hightolow'>Price: high to low</option>
                    <option value='customerRating'>Customer Rating</option>
                </select>
            </div>
            <div className='flex flex-row'>
                <Sidebar />
                <ProductList categoryName={categoryName} selectedOption={selectedOption}/>
            </div>
        </div>
    )
}

export default SuperCategoryPage