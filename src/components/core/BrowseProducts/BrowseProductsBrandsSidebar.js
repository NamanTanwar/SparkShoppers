import React, { useState, useEffect } from "react";
import useDebounce from "../../../hooks/useDebounce";
import BrandSidebarSection from "../../common/BrandSidebarSection";
import { useDispatch, useSelector } from "react-redux";
import { setBrandsToFilter } from "../../../slices/browseProductsSlice";

const BrowseProductsBrandsSidebar = () => {
  const dispatch = useDispatch();

  const { brandFilter } = useSelector((state) => state.browseProducts);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBrands, setFilteredBrands] = useState([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm === "") {
      setFilteredBrands([]);
      return;
    }
    const filteredResults = brandFilter.filter((brand) =>
      brand.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
    setFilteredBrands(filteredResults);
  }, [debouncedSearchTerm, brandFilter]);

  const handleBrandClick = (brand) => {
    dispatch(setBrandsToFilter(brand));
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

export default BrowseProductsBrandsSidebar;
