import React from 'react'
import CategorySidebar from './Sidebar/CategorySidebar'
import BrandSidebar from './Sidebar/BrandSidebar'
import PriceSidebar from './Sidebar/PriceRangeSidebar'

const Sidebar=()=>{
    return (
        <div className='sticky top-0 flex flex-col'>
            <h1>This is a sidebar</h1>
            <CategorySidebar />
            <BrandSidebar />
            <PriceSidebar />
        </div>
    )
}

export default Sidebar