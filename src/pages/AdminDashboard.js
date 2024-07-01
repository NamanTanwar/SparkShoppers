import React, { useEffect } from "react";
import AdminNavbar from "../components/core/AdminDashboard/AdminNavbar";
import { getAdminPageData } from "../services/operations/adminAPI";
import SalesChart from "../components/core/AdminDashboard/SalesChart";
import OrdersTab from "../components/core/AdminDashboard/Tabs/OrdersTab";
import SalesTab from "../components/core/AdminDashboard/Tabs/SalesTab";
import RatingTab from "../components/core/AdminDashboard/Tabs/RatingsTab";
import RecentReviewsCarousel from "../components/core/AdminDashboard/RecentReviewsCarousel";
import ProductTable from "../components/core/AdminDashboard/ProductsView";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "../components/common/ConfirmationModal";

const AdminDashboard = () => {
  const { showLogoutModal } = useSelector((state) => state.UI);
  const { accessToken } = useSelector((state) => state.auth);

  const {
    chartData,
    ordersComparisonData,
    salesComprisonData,
    recentReviewsData,
    ratingsComparisonData,
    productsData,
    isLoading,
    error,
    month,
    type,
    productsOption,
  } = useSelector((state) => state.admin);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdminPageData(month, type, productsOption, accessToken.access));
  }, [month, type]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <AdminNavbar />
      <main className="flex-1 p-6 md:p-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
              Sales Overview
            </h2>
            <SalesChart />
          </div>
          <div className="col-span-1 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <OrdersTab />
              </div>
              <div className="col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <SalesTab />
              </div>
            </div>
            <div className="col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <RatingTab />
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            Recent Reviews
          </h2>
          <RecentReviewsCarousel />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            Product Table
          </h2>
          <ProductTable />
        </div>
      </main>
      {/*Conditionally rendering the log out conformation modal*/}
      <div className="relative">{showLogoutModal && <ConfirmationModal />}</div>
    </div>
  );
};

export default AdminDashboard;
