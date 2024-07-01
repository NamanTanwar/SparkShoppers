import React, { useState, useEffect } from "react";
import CategorySidebarSection from "../../common/CategorySidebarSection";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../../../hooks/useDebounce";
import { setCategoriesToFilter } from "../../../slices/browseProductsSlice";

const BrowseProductsCategorySidebar = () => {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { categoryFilter: categoryNames } = useSelector(
    (state) => state.browseProducts
  );

  useEffect(() => {
    if (debouncedSearchTerm === "") {
      setFilteredCategories([]);
      return;
    }
    const result = categoryNames.filter((category) =>
      category.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
    setFilteredCategories(result);
  }, [debouncedSearchTerm, categoryNames]);

  const handleCategoryClick = (category) => {
    dispatch(setCategoriesToFilter(category));
    setSearchTerm("");
    setFilteredCategories([]);
  };

  return (
    <CategorySidebarSection
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      filteredCategories={filteredCategories}
      handleCategoryClick={handleCategoryClick}
    />
  );
};

export default BrowseProductsCategorySidebar;
