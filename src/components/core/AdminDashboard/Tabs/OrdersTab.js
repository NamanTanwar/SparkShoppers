import React from "react";
import { useSelector } from "react-redux";
import { FaBoxOpen, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { Line } from "react-chartjs-2";

const OrdersTab = () => {
  const { ordersComparisonData } = useSelector((state) => state.admin);

  const { currentMonthOrders, percentageChange } = ordersComparisonData || {
    currentMonthOrders: 0,
    percentageChange: 0,
  };

  const isPositiveChange = percentageChange >= 0;

  const chartData = {
    labels: Array.from({ length: 30 }, (_, i) => i + 1),
    datasets: [
      {
        label: "Orders",
        data: Array.from({ length: 30 }, () => Math.random() * 10),
        borderColor: "rgba(59, 130, 246, 1)", // blue-500
        backgroundColor: "rgba(59, 130, 246, 0.1)", // blue-500 with low opacity
        borderWidth: 2,
        pointRadius: 0,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full transition-all duration-300">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full transition-colors duration-300">
            <FaBoxOpen className="text-blue-500 dark:text-blue-400 text-2xl" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              Orders
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Orders this month
            </p>
            <p className="text-3xl font-semibold text-gray-800 dark:text-white mt-1">
              {currentMonthOrders?.toLocaleString() || "0"}
            </p>
          </div>
        </div>
        <div className="w-1/3 h-16">
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  display: false,
                },
                y: {
                  display: false,
                },
              },
              elements: {
                line: {
                  borderWidth: 2,
                },
                point: {
                  radius: 0,
                },
              },
            }}
          />
        </div>
      </div>
      <div className="flex items-center mt-2">
        {isPositiveChange ? (
          <FaArrowUp className="text-green-500 dark:text-green-400 mr-2" />
        ) : (
          <FaArrowDown className="text-red-500 dark:text-red-400 mr-2" />
        )}
        <p
          className={`${
            isPositiveChange
              ? "text-green-500 dark:text-green-400"
              : "text-red-500 dark:text-red-400"
          } text-sm font-medium`}
        >
          {Math.abs(percentageChange).toFixed(2)}%{" "}
          {isPositiveChange ? "increase" : "decrease"} from last month
        </p>
      </div>
    </div>
  );
};

export default OrdersTab;
