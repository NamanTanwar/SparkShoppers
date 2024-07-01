import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowDropDown } from "../../../slices/UISlice";
import { useNavigate } from "react-router-dom";

const DropDown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Get superCategories from the category store in redux store
  const { superCategories } = useSelector((state) => state.category);
  //Get showDropDowm and showSidebar from the UI state in redux store
  const { showDropDown, showSidebar } = useSelector((state) => state.UI);
  //Handler for the mouse event
  const handleMouseEnter = () => {
    if (showDropDown === true) {
      dispatch(setShowDropDown(true));
    }
  };
  // Handler for mouse leave event
  const handleMouseLeave = () => {
    if (showDropDown === true) {
      dispatch(setShowDropDown(false));
    }
  };
  // Handler for click event on a category
  const handleClick = (superCategoryName) => {
    //constructing string of type '/category/Beauty%20And%20Healthcare'
    let wordsArr = superCategoryName.split(" ");
    let navigateStr = "";
    for (let i = 0; i < wordsArr.length; i++) {
      navigateStr += wordsArr[i];
      if (i !== wordsArr.length - 1) navigateStr += "%20";
    }
    // Navigate to the category page
    navigate(`/category/${navigateStr}`);
  };

  return (
    <div
      className="absolute bg-gray-200 p-3 rounded-md shadow-md lg:top-6 md:top-10 right-0 left-0 lg:w-32 md:w-28 z-50"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {" "}
      {/*List to render super categories*/}
      <ul>
        {superCategories.map((superCategory) => {
          return (
            <li
              key={superCategory._id}
              className="p-1 hover:bg-primary-100 hover:text-white cursor-pointer"
              onClick={() => handleClick(superCategory.name)}
            >
              <p className="">{superCategory.name}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DropDown;
