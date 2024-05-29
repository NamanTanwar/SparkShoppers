import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import useDebounce from '../../../../hooks/useDebounce'
import { fetchSuperCategoryCategoryData } from '../../../../services/operations/superCategoryAPI'


const CategorySidebar=()=>{

    const [searchTerm,setSearchTerm]=useState('')
    const [filteredCategories,setFilteredCategories]=useState([])
    const {categoryNames,selectedSuperCategory}=useSelector((state)=>state.superCategory)
    const dispatch=useDispatch()
    const debouncedSearchTerm=useDebounce(searchTerm,500)

    useEffect(()=>{
        if(debouncedSearchTerm===''){
            setFilteredCategories([])
            return
        }
        const result=categoryNames.filter(category=>category.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
        setFilteredCategories(result)
    },[debouncedSearchTerm,categoryNames])

     const handleCategoryClick=(categoryId)=>{
         dispatch(fetchSuperCategoryCategoryData(categoryId,selectedSuperCategory))
     }

    
    return (
        <div className='mb-4'>
            <h2 className="text-lg font-semibold">Categories</h2>
            <input 
                type='text'
                className='w-full p-2 border border-gray-300 rounded-md mt-2 mb-2'
                placeholder='Search Categories....'
                value={searchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}
            />
            
                {
                    filteredCategories && filteredCategories.length>0 ? (
                        <ul className='mb-4'>
                            {
                                filteredCategories.map((category,idx)=>(
                                    <li key={category._id} className="cursor-pointer hover:bg-gray-200 p-2 rounded" onClick={()=>handleCategoryClick(category._id)}>
                                        {category.name}
                                    </li>
                                ))
                            }
                        </ul>
                    ) : (
                        <div>
                            Search Categories to show
                        </div>
                    )
                }
        </div>
    )
}

export default CategorySidebar

//