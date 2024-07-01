import React from "react";
import SignupForm from "../components/core/Signup/SignupForm";
import SignUpImg from "../assets/SignUp.jpg";
import SidebarNav from "../components/core/Navbar/SidebarNav";
import Navbar from "../components/common/Navbar";
import { useSelector } from "react-redux";

const Signup = () => {
  //Extract showSidebar state from the UI slice in redux store
  //To decide if sidebar is to be shown
  const { showSidebar } = useSelector((state) => state.UI);

  return (
    <div>
      {/* Render Sidebar component if showSidebar is true */}
      {showSidebar && <SidebarNav />}
      {/* Render Navbar component */}
      <Navbar />
      {/* Main content container */}
      <div className="flex flex-col lg:flex-row justify-around items-center space-y-4 lg:space-x-4 lg:space-y-0 mt-24">
        {/* Image container */}
        <div>
          <img
            src={SignUpImg}
            alt="Sign up image"
            className="w-full max-w-md rounded-lg shadow-lg sm:w-3/4 md:w-1/2 lg:w-10/12"
          />
        </div>
        {/* Sign-up form container */}
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-2xl font-bold mb-2">
            Create Your Account with Spark Shoppers
          </h1>
          <p className="text-lg text-gray-600">Enter Your details below</p>
          {/* Render SignupForm component */}
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default Signup;
