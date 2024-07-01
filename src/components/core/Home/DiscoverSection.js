import React, { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import DiscoverImg from "../../../assets/discover-section.png";
import { useNavigate } from "react-router-dom";
import { MdCancel } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";

const DiscoverSection = ({ searchRef }) => {
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(true);

  const handleClick = () => {
    if (searchRef.current) searchRef.current.focus();
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const togglePopup = () => {
    setShowPopup(true);
  };

  return (
    <div className="relative flex flex-row pt-6">
      <button
        onClick={togglePopup}
        className={`${
          !showPopup ? `block` : `hidden`
        } absolute top-3 right-1 bg-white border-black border-[1px] rounded-sm`}
      >
        <FaArrowLeft />
      </button>
      <div
        className={`${
          showPopup ? `block` : `hidden`
        } absolute top-2 right-2 z-3 w-44 bg-white rounded-md p-2 border-black border-[1px]`}
      >
        <button onClick={handlePopupClose}>
          <MdCancel />
        </button>
        <p>
          Hey there! To check out site full functionality click on the button
          below to login with test credentials. Though if you want to check out
          auth flow you can click above for traditional sign in or google oauth
        </p>
        <button
          onClick={() => navigate("/test-login")}
          className="bg-purple-500 text-white px-3 py-1 rounded"
        >
          Login Here
        </button>
      </div>

      <div className="flex flex-col space-y-8 pl-10 w-1/2 pt-20">
        <h1 className="font-bold text-4xl">
          Find Your Perfect Products <br /> at Amazing Prices
        </h1>
        <p className="text-text-200">
          Explore our collection of featured products and discover the best
          deals on the <br />
          market. Whether you're looking for electronics, fashion, or home
          decor, we have
          <br /> something for everyone
        </p>
        <div className="flex flex-row items-center space-x-8">
          <button
            className="border-black pl-4 pr-4 pt-2 pb-2 border-x border-y hover:border-purple-600 hover:text-purple-600"
            onClick={handleClick}
          >
            Shop
          </button>
          <button
            className="flex flex-row hover:text-purple-500"
            onClick={() => navigate("/login")}
          >
            Learn More
            <MdKeyboardArrowRight />
          </button>
        </div>
      </div>

      <div className="w-1/2 pr-10">
        <img className="w-auto" src={DiscoverImg} alt="Discover Section" />
      </div>
    </div>
  );
};

export default DiscoverSection;
