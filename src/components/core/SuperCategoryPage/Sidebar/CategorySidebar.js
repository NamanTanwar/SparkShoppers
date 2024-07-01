import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../../../../hooks/useDebounce";
import { addFilterCategories } from "../../../../slices/superCategorySlice";
import CategorySidebarSection from "../../../common/CategorySidebarSection";

const CategorySidebar = () => {
  //Initializing useDispatch hook
  const dispatch = useDispatch();
  //State for search term input
  const [searchTerm, setSearchTerm] = useState("");
  //State for filtered categories based on search
  const [filteredCategories, setFilteredCategories] = useState([]);
  //Select relevent state from redux store
  const { categoryNames } = useSelector((state) => state.superCategory);
  //Custom debounce hook to filter categories based on search term
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  //Effect to filter categories based in debounced search term
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

  //Handler for when a category is clicked
  const handleCategoryClick = (category) => {
    dispatch(addFilterCategories(category));
    setSearchTerm("");
    setFilteredCategories([]);
  };
  // Render the CategorySidebarSection component with props
  return (
    <CategorySidebarSection
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      filteredCategories={filteredCategories}
      handleCategoryClick={handleCategoryClick}
    />
  );
};

export default CategorySidebar;
