import React from "react";
import { MdCancel } from "react-icons/md";
import { useDispatch } from "react-redux";

const SelectedFiltersTab = ({
  selectedCategories,
  selectedBrands,
  selectedPriceRange,
  removeCategoryFilter,
  removeBrandFilter,
  removePriceFilter,
}) => {
  //Initializing useDispatch hook
  const dispatch = useDispatch();
  //handler for removing category filter
  const handleCategoryClick = (categoryId) => {
    dispatch(removeCategoryFilter(categoryId));
  };
  //handler for removing brand filter
  const handleBrandClick = (brandName) => {
    dispatch(removeBrandFilter(brandName));
  };
  //handler for removing price filter
  const handlePriceClick = () => {
    dispatch(removePriceFilter());
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md mb-4">
      <div className="flex flex-wrap gap-4">
        {/* Render selected categories */}
        {selectedCategories && selectedCategories.length > 0 && (
          <div className="flex items-center">
            <h3 className="font-semibold mr-2">Categories:</h3>
            <div className="flex flex-wrap gap-2">
              {selectedCategories.map((category) => (
                <div
                  key={category._id}
                  className="flex items-center bg-white border border-gray-300 rounded-full px-3 py-1"
                >
                  <p className="mr-2">{category.name}</p>
                  <button onClick={() => handleCategoryClick(category._id)}>
                    <MdCancel />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Render selected brands */}
        {selectedBrands && selectedBrands.length > 0 && (
          <div className="flex items-center">
            <h3 className="font-semibold mr-2">Brands:</h3>
            <div className="flex flex-wrap gap-2">
              {selectedBrands.map((brand, idx) => (
                <div
                  key={idx}
                  className="flex items-center bg-white border border-gray-300 rounded-full px-3 py-1"
                >
                  <p className="mr-2">{brand}</p>
                  <button onClick={() => handleBrandClick(brand)}>
                    <MdCancel />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Render selected price range */}
        {selectedPriceRange &&
          selectedPriceRange.start !== -Infinity &&
          selectedPriceRange.end !== Infinity && (
            <div className="flex items-center">
              <h3 className="font-semibold mr-2">Price Range:</h3>
              <div className="flex items-center bg-white border border-gray-300 rounded-full px-3 py-1">
                <p className="mr-2">
                  {selectedPriceRange.start} - {selectedPriceRange.end}
                </p>
                <button onClick={handlePriceClick}>
                  <MdCancel />
                </button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default SelectedFiltersTab;
