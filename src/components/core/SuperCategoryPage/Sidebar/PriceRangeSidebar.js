import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPriceFilters } from "../../../../slices/superCategorySlice";
import PriceRangeSidebarSection from "../../../common/PriceRangeSidebarSection";

const PriceSidebar = () => {
  //Initializing useDispatch hook
  const dispatch = useDispatch();

  const { priceRanges } = useSelector((state) => state.superCategory);

  const handlePriceRangeFilter = (priceRange) => {
    dispatch(setPriceFilters(priceRange));
  };

  return (
    <PriceRangeSidebarSection
      priceRanges={priceRanges}
      handlePriceRangeFilter={handlePriceRangeFilter}
    />
  );
};

export default PriceSidebar;
