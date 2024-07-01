import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Sidebar from "../components/core/SuperCategoryPage/Sidebar";
import ProductList from "../components/core/SuperCategoryPage/ProductList";
import { setSelectedSuperCategory } from "../slices/superCategorySlice";
import SelectedFiltersTab from "../components/common/SelectedFiltersTab";
import {
  removeBrandFilter,
  removeCategoryFilter,
  removePriceFilter,
} from "../slices/superCategorySlice";
import SidebarNav from "../components/core/Navbar/SidebarNav";
import Navbar from "../components/common/Navbar";

const SuperCategoryPage = () => {
  //Initializing useDispatch hook
  const dispatch = useDispatch();
  //Redux state for different types of filters
  const { categoriesFilters, brandsFilters, priceFilters } = useSelector(
    (state) => state.superCategory
  );
  //state to show sidebar
  const { showSidebar } = useSelector((state) => state.UI);
  //local state to store the selected option
  const [selectedOption, setSelectedOption] = useState("recomended");
  //Used to fetch category name from url
  const { categoryName } = useParams();

  useEffect(() => {
    //Setting the current selected category name
    dispatch(setSelectedSuperCategory(categoryName));
  }, [categoryName, dispatch]);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden mx-auto">
      {/* Render SidebarNav if showSidebar is true */}
      {showSidebar && <SidebarNav />}
      {/* Render Navbar component */}
      <Navbar />
      <div className="container p-4">
        {/* Display category name */}
        <h1 className="text-3xl font-bold mb-4">Category: {categoryName}</h1>
        {/* Dropdown for sorting options */}
        <div className="mb-4">
          <select
            id="filterOptions"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500"
          >
            <option value="recomended">Recommended</option>
            <option value="newest">What's New</option>
            <option value="popularity">Popularity</option>
            <option value="price:lowtohigh">Price: Low to High</option>
            <option value="price:hightolow">Price: High to Low</option>
            <option value="customerRating">Customer Rating</option>
          </select>
        </div>
        {/* Render SelectedFiltersTab if any filters are applied */}
        {(categoriesFilters || brandsFilters || priceFilters) && (
          <SelectedFiltersTab
            selectedCategories={categoriesFilters}
            selectedBrands={brandsFilters}
            selectedPriceRange={priceFilters}
            removeBrandFilter={removeBrandFilter}
            removeCategoryFilter={removeCategoryFilter}
            removePriceFilter={removePriceFilter}
          />
        )}
        {/* Main content area with Sidebar and ProductList */}
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/4">
            <Sidebar />
          </div>
          <div className="md:w-3/4">
            <ProductList
              categoryName={categoryName}
              selectedOption={selectedOption}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperCategoryPage;
