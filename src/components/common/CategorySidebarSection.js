import React from 'react'

const CategorySidebarSection=({searchTerm,setSearchTerm,filteredCategories,handleCategoryClick})=>{
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
                                    <li key={category._id} className="cursor-pointer hover:bg-gray-200 p-2 rounded" onClick={()=>handleCategoryClick(category)}>
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

export default CategorySidebarSection