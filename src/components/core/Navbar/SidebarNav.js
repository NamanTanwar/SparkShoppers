import React, { useState } from "react";
import Logo from "../../../assets/logo-no-background.png";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import { setShowSidebar, setShowDropDown } from "../../../slices/UISlice";
import buttonText from "../../../data/navbarData";
import CTAButton from "../../common/CTAButton";
import { navIcons } from "../../../data/navbarIconsData";
import { useNavigate } from "react-router-dom";
import SearchBar from "../../common/SearchBar";
import DropDown from "./DropDown";
import { CiHeart } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";

const SidebarNav = ({ scrollToRef = null, searchRef = null }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Get auth state to check if user logged in
  const { isLoggedIn } = useSelector((state) => state.auth);
  //UI state to decide if to show sidebar and dropdown
  const { showSidebar, showDropDown } = useSelector((state) => state.UI);

  //Handle click on navigation items
  const handleClick = (text) => {
    if (text === "Shop Now") {
      //Focus on search bar if searchRef is available(Search bar is mounted)
      if (searchRef && searchRef.current) {
        searchRef.current.focus();
      }
    } else if (text === "Categories") {
      dispatch(setShowDropDown(true));
    } else if (text === "New Arrivals") {
      //Scroll if scrollToRef is available
      if (scrollToRef && scrollToRef.current) {
        dispatch(setShowSidebar(false));
        scrollToRef.current.scrollIntoView({ behavior: "smooth" });
      }
    } else if (text === "Contact Us") {
      dispatch(setShowSidebar(false));
      navigate("/contact-us");
    } else {
      dispatch(setShowSidebar(false));
      navigate("/about-us");
    }
  };

  return (
    <div className="relative z-50">
      {/* Sidebar for mobile view */}
      <div className="md:hidden fixed left-0 top-0 h-full bg-accent-100 w-64 py-2 px-4  flex flex-col space-y-14">
        {/* Logo and close button */}
        <div className="flex flex-row justify-between">
          <img src={Logo} className="h-6" alt="Logo" />
          <button
            className="h-8"
            onClick={() => dispatch(setShowSidebar(!showSidebar))}
          >
            <IoMdArrowRoundBack />
          </button>
        </div>
        {/* Search bar */}
        <div>
          <SearchBar />
        </div>
        {/* Navigation buttons */}
        <div className="flex flex-col items-stretch">
          {buttonText.map((text, idx) => {
            return (
              <button
                className="hover:bg-primary-100 hover:text-bold h-12 hover:text-white"
                key={idx}
                onClick={() => handleClick(text)}
              >
                {text}
              </button>
            );
          })}
        </div>
        {/* User actions section */}
        <div>
          {isLoggedIn ? ( // Display nav icons for logged-in users
            <div className="flex flex-row space-x-4 justify-center items-center">
              {navIcons.map((navIcon, idx) => (
                <button key={idx}>
                  <span className="">{navIcon.icon}</span>
                </button>
              ))}
            </div> // Display wishlist, cart, signup, and login buttons for non-logged-in users
          ) : (
            <div className="flex flex-col space-y-4 justify-center">
              <div className="flex flex-row space-x-4 justify-center items-center">
                <button onClick={() => navigate("/wishlist")}>
                  <CiHeart />
                </button>
                <button onClick={() => navigate("/cart")}>
                  <FaCartShopping />
                </button>
              </div>

              <div className="flex flex-row space-x-4 justify-center items-center">
                <CTAButton text="Sign Up" />
                <CTAButton text="Login" />
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Render DropDown component if showDropDown and showSidebar are true */}
      {showDropDown && showSidebar && <DropDown />}
    </div>
  );
};

export default SidebarNav;
