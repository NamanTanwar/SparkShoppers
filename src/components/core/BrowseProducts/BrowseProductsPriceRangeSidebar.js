import React from "react";
import PriceRangeSidebarSection from "../../common/PriceRangeSidebarSection";
import { useDispatch, useSelector } from "react-redux";
import { setPriceToFilter } from "../../../slices/browseProductsSlice";

const BrowseProductsPriceRangeSidebar = () => {
  const dispatch = useDispatch();

  const { priceFilters: priceRanges } = useSelector(
    (state) => state.browseProducts
  );

  const handlePriceRangeFilter = (priceRange) => {
    dispatch(setPriceToFilter(priceRange));
  };

  return (
    <PriceRangeSidebarSection
      priceRanges={priceRanges}
      handlePriceRangeFilter={handlePriceRangeFilter}
    />
  );
};

export default BrowseProductsPriceRangeSidebar;
