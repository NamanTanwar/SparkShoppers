import React from 'react';
import CategorySidebar from './Sidebar/CategorySidebar';
import BrandSidebar from './Sidebar/BrandSidebar';
import PriceSidebar from './Sidebar/PriceRangeSidebar';

const Sidebar = () => {
  return (
    <div className='sticky top-0 p-4 bg-gray-100 rounded-md shadow-md'>
      <h2 className='text-2xl font-bold mb-4'>Filters</h2>
      <CategorySidebar />
      <BrandSidebar />
      <PriceSidebar />
    </div>
  );
};

export default Sidebar;
