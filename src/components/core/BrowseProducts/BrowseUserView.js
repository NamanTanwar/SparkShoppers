import React, { useState, useEffect } from "react";
import { getBrowseUserViewData } from "../../../services/operations/productAPI";
import Carousal from "../../common/Carousal";
import CategorySection from "../../core/Home/CategorySection";
import { useSelector } from "react-redux";

const BrowseUserView = () => {
  const { user } = useSelector((state) => state.auth);

  const [data, setData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    getBrowseUserViewData(setIsLoading, setData, setError);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold text-red-600">
          An error occurred. Please try again later.
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b-2">
        Welcome {user.firstname} {user.lastname}
      </h1>
      {data ? (
        <div className="flex flex-col space-y-16">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Highest Rated Products
            </h2>
            {data.highestRatedProducts && (
              <Carousal items={data.highestRatedProducts} itemsInView={4} />
            )}
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Most Shopped Product
            </h2>
            {data.mostShoppedProducts && (
              <Carousal items={data.mostShoppedProducts} itemsInView={4} />
            )}
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Browse Categories
            </h2>
            <CategorySection />
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Our Newest Arrivals
            </h2>
            {data.newArrivalsProducts && (
              <Carousal items={data.newArrivalsProducts} itemsInView={4} />
            )}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-64">
          <h1 className="text-2xl font-bold text-red-600">
            Error loading data. Please refresh the page.
          </h1>
        </div>
      )}
    </div>
  );
};

export default BrowseUserView;
