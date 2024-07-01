import React, { lazy, Suspense } from "react";
import Navbar from "../components/common/Navbar";
import { useSelector } from "react-redux";
import OTPInput from "../components/core/VerfiyOtp/OTPInput";

const Sidebar = lazy(() => import("../components/core/Navbar/SidebarNav"));

const VerifyOtp = () => {
  const { showSidebar } = useSelector((state) => state.UI);

  return (
    <div>
      {showSidebar && <Sidebar />}
      <Navbar />
      <div className="flex flex-col mt-24">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-5xl">OTP Verification</h1>
          <p className="text-text-200 pt-3 text-2xl">
            Enter the OTP sent to email{" "}
          </p>
          <OTPInput />
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
