import React from "react";
import CTAButton from "./CTAButton";
import { FaArrowDown } from "react-icons/fa";
import Logo from "../../assets/logo-no-background.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { useSelector, useDispatch } from "react-redux";
import { setShowSidebar } from "../../slices/UISlice";
import buttonText from "../../data/navbarData";
import DropDown from "../core/Navbar/DropDown";
import { setShowDropDown } from "../../slices/UISlice";
import LoggedInNavbar from "../core/Navbar/LoggedInNavbar";
import ConfirmationModal from "./ConfirmationModal";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";

const Navbar = ({ scrollToRef = null, searchRef = null }) => {
  //Initializing useDispatch hook
  const dispatch = useDispatch();
  //Initializing useNavigate hook
  const navigate = useNavigate();

  //Accessing state from the redux store
  const { showSidebar, showDropDown, showLogoutModal } = useSelector(
    (state) => state.UI
  );
  const { isLoggedIn } = useSelector((state) => state.auth);

  //Function to toggle sidebar visibility
  const handleToggleSidebar = () => {
    if (showSidebar === false) {
      dispatch(setShowSidebar(true));
    } else {
      dispatch(setShowSidebar(false));
    }
  };

  const handleBtnClick = (text) => {
    if (text === "Shop Now") {
      navigate("/");
      //Focus on search bar if searchRef exists
      if (searchRef && searchRef.current) searchRef.current.focus();
    } else if (text === "New Arrivals") {
      //Focus in scrollToRef if exists
      if (scrollToRef && scrollToRef.current) {
        scrollToRef.current.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
      }
    } else if (text === "Contact Us") {
      navigate("/contact-us");
    } else if (text === "About Us") {
      navigate("/about-us");
    }
  };

  return (
    <div className="relative">
      {/* Mobile Hamburger Menu */}
      <div className="block md:hidden">
        {
          //Show hamburger icon only if sidebar not currently shown in mobile view
          !showSidebar && (
            <button onClick={handleToggleSidebar}>
              <RxHamburgerMenu />
            </button>
          )
        }
      </div>
      {/* Desktop Navbar */}
      <div className="hidden md:flex flex-row justify-around items-center space-y-2 ">
        {/*Img container */}
        <div className="pl-3">
          <img src={Logo} className="h-8" alt="Logo" />
        </div>
        {/*Nav items */}
        <div class="flex flex-row space-x-3 relative">
          {buttonText.map((text, idx) => {
            return (
              <div
                className="relative inline-flex flex-row items-center text-bold hover:text-primary-200 hover:text-bold cursor-pointer hover:font-sans"
                key={idx}
                onMouseEnter={() =>
                  text === "Categories" && dispatch(setShowDropDown(true))
                }
                onMouseLeave={() =>
                  text === "Categories" && dispatch(setShowDropDown(false))
                }
                onClick={() => handleBtnClick(text)}
              >
                {" "}
                {/*Rendering Down  and check for dropdown in text is categories */}
                {text}
                {text === "Categories" && <FaArrowDown />}
                {text === "Categories" && showDropDown && <DropDown />}
              </div>
            );
          })}
        </div>

        <SearchBar searchRef={searchRef} />

        {isLoggedIn ? (
          //Rendering Logged in navbar ui component if user logged in
          <div>
            <LoggedInNavbar />
          </div>
        ) : (
          //Rendering Logged out navbar ui component if user logged out
          <div className="flex flex-row space-x-5 pr-3 text-white align-items justify-center">
            <button
              className="text-black hover:text-purple-600 text-xl"
              onClick={() => navigate("/wishlist")}
            >
              <CiHeart />
            </button>
            <button
              className="text-black hover:text-purple-600 text-xl"
              onClick={() => navigate("/cart")}
            >
              <FaCartShopping />
            </button>
            {/*Call to action button for login and signup */}
            <CTAButton text="Sign Up" path={"/signup"} />
            <CTAButton text="Log In" path={"/login"} />
          </div>
        )}
      </div>
      {/*Conditionally rendering the log out conformation modal*/}
      <div className="relative">{showLogoutModal && <ConfirmationModal />}</div>
    </div>
  );
};

export default Navbar;
