import React from 'react';
import BrowseProductsBrandsSidebar from './BrowseProductsBrandsSidebar';
import BrowseProductsCategorySidebar from './BrowseProductsCategorySidebar';
import BrowseProductsPriceRangeSidebar from './BrowseProductsPriceRangeSidebar';

const Sidebar = () => {
    return (
        <div className='sticky top-0 flex flex-col space-y-4 p-4 bg-white shadow-md rounded'>
            <BrowseProductsCategorySidebar />
            <BrowseProductsBrandsSidebar />
            <BrowseProductsPriceRangeSidebar />
        </div>
    );
};

export default Sidebar;
