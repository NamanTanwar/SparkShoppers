import React, { useState, useEffect } from "react";
import useDebounce from "../../../../hooks/useDebounce";
import { useDispatch, useSelector } from "react-redux";
import { addBrandsFilter } from "../../../../slices/superCategorySlice";
import BrandSidebarSection from "../../../common/BrandSidebarSection";

const BrandSidebar = () => {
  //Initializing useDispatch hook
  const dispatch = useDispatch();
  //Redux state for brandNames
  const { brandNames } = useSelector((state) => state.superCategory);
  //local state for search query
  const [searchTerm, setSearchTerm] = useState("");
  //local state to store filtered brands
  const [filteredBrands, setFilteredBrands] = useState([]);
  //Custom debounce hook to debounce for search term
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm === "") {
      setFilteredBrands([]);
      return;
    }
    //Filtering brands on the basis of user search query
    const filteredResults = brandNames.filter((brand) =>
      brand.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
    setFilteredBrands(filteredResults);
  }, [debouncedSearchTerm, brandNames]);

  //Function to add brand filter to redux state
  const handleBrandClick = (brandName) => {
    dispatch(addBrandsFilter(brandName));
    setSearchTerm("");
    setFilteredBrands([]);
  };

  return (
    <BrandSidebarSection
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      handleBrandClick={handleBrandClick}
      filteredBrands={filteredBrands}
    />
  );
};

export default BrandSidebar;
