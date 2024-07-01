import React from 'react'

const PriceRangeSidebarSection=({priceRanges,handlePriceRangeFilter})=>{
    return (
        <div className='mb-4'>
            <h2 className="text-lg font-semibold">Price Range:</h2>
            {
                priceRanges && priceRanges.length>0 ? (
                    <ul className='mb-4'>
                        {
                            priceRanges.map((priceRange,idx)=>(
                                <li key={idx} className="cursor-pointer hover:bg-gray-200 p-2 rounded" onClick={()=>handlePriceRangeFilter(priceRange)}>Rs.{priceRange.start}-Rs.{priceRange.end}</li>
                            ))
                        }
                    </ul>) : (<p>No price ranges to show</p>)
            }
        </div>
    )
}

export default PriceRangeSidebarSection