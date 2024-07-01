import React from "react";
import { useSelector } from "react-redux";
import { FaStar, FaArrowUp, FaArrowDown } from "react-icons/fa";
import RatingStars from "../../../common/RatingStars";

const RatingTab = () => {
  const { ratingComparisonData } = useSelector((state) => state.admin);

  const { currentMonthAverage, percentageChange } = ratingComparisonData || {
    currentMonthAverage: 0,
    percentageChange: 0,
  };

  const isPositiveChange = percentageChange >= 0;

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-full transition-colors duration-300">
            <FaStar className="text-yellow-500 dark:text-yellow-400 text-2xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white transition-colors duration-300">
              Customer Reviews
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
              Reviews this month
            </p>
            <div className="flex items-center mt-1">
              <RatingStars avgRating={currentMonthAverage} starSize={20} />
              <p className="text-2xl font-semibold ml-2 text-gray-800 dark:text-white transition-colors duration-300">
                {currentMonthAverage.toFixed(1)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center mt-2">
        {isPositiveChange ? (
          <FaArrowUp className="text-green-500 dark:text-green-400 mr-2 transition-colors duration-300" />
        ) : (
          <FaArrowDown className="text-red-500 dark:text-red-400 mr-2 transition-colors duration-300" />
        )}
        <p
          className={`${
            isPositiveChange
              ? "text-green-500 dark:text-green-400"
              : "text-red-500 dark:text-red-400"
          } text-sm font-medium transition-colors duration-300`}
        >
          {Math.abs(percentageChange).toFixed(2)}%{" "}
          {isPositiveChange ? "increase" : "decrease"} from last month
        </p>
      </div>
    </div>
  );
};

export default RatingTab;
