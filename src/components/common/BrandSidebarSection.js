import React from 'react'

const BrandSidebarSection=({searchTerm,setSearchTerm,handleBrandClick,filteredBrands})=>{
    return (
        <div className='mb-4'>
            <h2 className="text-lg font-semibold">Brands:</h2>
            <input 
                type='text'
                className='w-full p-2 border border-gray-300 rounded-md mt-2 mb-2'
                value={searchTerm}
                onChange={(e)=>setSearchTerm(e.target.value)}
                placeholder='Enter brand name'
            />
            {
               filteredBrands && filteredBrands.length>0 ? (
                <ul className='mb-4'>
                    {
                        filteredBrands.map((brand,idx)=>(
                            <li key={idx} className="cursor-pointer hover:bg-gray-200 p-2 rounded" onClick={()=>handleBrandClick(brand)}>{brand}</li>
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

export default BrandSidebarSection