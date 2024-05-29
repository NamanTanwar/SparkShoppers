import React,{useState,useEffect} from 'react'
import useDebounce from '../../../../hooks/useDebounce'
import { useDispatch,useSelector } from 'react-redux'
import { fetchSuperCategoryBrandData } from '../../../../services/operations/superCategoryAPI' 

const BrandSidebar=()=>{

    const dispatch=useDispatch()

    const {brandNames,selectedSuperCategory}=useSelector((state)=>state.superCategory)

    const [searchTerm,setSeachTerm]=useState('')
    const [filteredBrands,setFilteredBrands]=useState([])
    
    const debouncedSearchTerm=useDebounce(searchTerm,500)

    useEffect(()=>{
        if(debouncedSearchTerm===''){
            setFilteredBrands([])
            return
        }
        const filteredResults=brandNames.filter((brand)=>brand.brand.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
        setFilteredBrands(filteredResults)
    },[debouncedSearchTerm,brandNames])

    const handleBrandClick=(brandName)=>{
        dispatch(fetchSuperCategoryBrandData(selectedSuperCategory,brandName))
    }


    return (
        <div className='mb-4'>
            <h2 className="text-lg font-semibold">Brands:</h2>
            <input 
                type='text'
                className='w-full p-2 border border-gray-300 rounded-md mt-2 mb-2'
                value={searchTerm}
                onChange={(e)=>setSeachTerm(e.target.value)}
                placeholder='Enter brand name'
            />
            {
               filteredBrands && filteredBrands.length>0 ? (
                <ul className='mb-4'>
                    {
                        filteredBrands.map((brand,idx)=>(
                            <li key={brand._id} className="cursor-pointer hover:bg-gray-200 p-2 rounded" onClick={()=>handleBrandClick(brand.brand)}>{brand.brand}</li>
                        ))
                    }
                </ul>
               ) : (
                <p>Search categories to show</p>
               ) 
            }
        </div>
    )
}

export default BrandSidebar