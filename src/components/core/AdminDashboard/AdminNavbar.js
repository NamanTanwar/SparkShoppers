import React from "react";
import Logo from "../../../assets/logo-no-background.png";
import SearchBar from "../../common/SearchBar";
import { CiBellOn } from "react-icons/ci";
import { FaCircleUser } from "react-icons/fa6";
import ConfirmationModal from "../../common/ConfirmationModal";
import { useSelector, useDispatch } from "react-redux";
import { setShowLogoutModal } from "../../../slices/UISlice";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  //Initializing useNavigate and
  //useDispatch hook
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //State to show log out modal
  const { showLogoutModal } = useSelector((state) => state.UI);

  //show confirmation modal on logout initiation
  const handleSignOut = () => {
    dispatch(setShowLogoutModal(true));
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img src={Logo} className="h-8 w-auto" alt="Logo" />
          <h1 className="text-xl font-bold text-gray-800 dark:text-white hidden sm:block">
            Admin Dashboard
          </h1>
        </div>
        <div className="flex-1 max-w-xl px-4">
          <SearchBar />
        </div>

        <div className="flex items-center space-x-6">
          <button className="relative text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors">
            <CiBellOn className="text-2xl" />
            <span className="absolute top-0 right-0 -mt-1 -mr-1 px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
              3
            </span>
          </button>

          <div className="relative group">
            <button className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors">
              <FaCircleUser className="text-2xl" />
              <span className="hidden sm:block">Admin User</span>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 invisible group-hover:visible transition-all duration-300 ease-in-out flex flex-col">
              <button className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 flex-grow">
                Your Profile
              </button>
              <button
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 flex-grow"
                onClick={() => navigate("/")}
              >
                Navigate Home
              </button>
              <button
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 flex-grow"
                onClick={handleSignOut}
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </div>
      {showLogoutModal && <ConfirmationModal />}
    </nav>
  );
};

export default AdminNavbar;
