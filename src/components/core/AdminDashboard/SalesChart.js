// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { LuShoppingBag } from "react-icons/lu";
// import { FaArrowUp, FaLongArrowAltDown } from "react-icons/fa";
// import { Line } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { setMonth, setType } from "../../../slices/adminSlice";
// import "tailwindcss/tailwind.css";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const SalesChart = () => {
//   const dispatch = useDispatch();
//   const { chartData, month, type } = useSelector((state) => state.admin);

//   const daysArray = chartData?.daysArray || [];
//   const currentMonthTotalSales = chartData?.currentMonthTotalSales || 0;
//   const percentageChange = chartData?.percentageChange || 0;

//   const handleMonthChange = (e) => {
//     dispatch(setMonth(e.target.value));
//   };

//   const handleTypeChange = (e) => {
//     dispatch(setType(e.target.value));
//   };

//   const data = {
//     labels: daysArray.map((day) => day.day),
//     datasets: [
//       {
//         label: "Sales",
//         data: daysArray.map((day) => day.value),
//         borderColor: "rgb(75, 192, 192)",
//         backgroundColor: "rgba(75, 192, 192, 0.2)",
//         fill: true,
//         tension: 0.1,
//       },
//     ],
//   };

//   return (
//     <>
//       {chartData && (
//         <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
//             <div className="flex items-center space-x-4">
//               <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
//                 <LuShoppingBag className="text-green-500 dark:text-green-400 text-2xl" />
//               </div>
//               <div>
//                 <div className="text-3xl font-bold text-gray-800 dark:text-white">
//                   Rs. {currentMonthTotalSales.toLocaleString()}
//                 </div>
//                 <div className="text-sm text-gray-500 dark:text-gray-400">
//                   Total {type.charAt(0).toUpperCase() + type.slice(1)}
//                 </div>
//               </div>
//               {percentageChange >= 0 ? (
//                 <div className="flex items-center space-x-1 text-green-500 dark:text-green-400">
//                   <FaArrowUp />
//                   <span className="font-semibold">
//                     {percentageChange.toFixed(2)}%
//                   </span>
//                 </div>
//               ) : (
//                 <div className="flex items-center space-x-1 text-red-500 dark:text-red-400">
//                   <FaLongArrowAltDown />
//                   <span className="font-semibold">
//                     {Math.abs(percentageChange).toFixed(2)}%
//                   </span>
//                 </div>
//               )}
//             </div>
//             <div className="flex space-x-4">
//               <select
//                 value={month}
//                 onChange={handleMonthChange}
//                 className="px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 {[
//                   "January",
//                   "February",
//                   "March",
//                   "April",
//                   "May",
//                   "June",
//                   "July",
//                   "August",
//                   "September",
//                   "October",
//                   "November",
//                   "December",
//                 ].map((month) => (
//                   <option key={month} value={month}>
//                     {month}
//                   </option>
//                 ))}
//               </select>
//               <select
//                 value={type}
//                 onChange={handleTypeChange}
//                 className="px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="orders">Orders</option>
//                 <option value="sales">Sales</option>
//               </select>
//             </div>
//           </div>
//           <div className="w-full h-80">
//             <Line
//               data={data}
//               options={{
//                 responsive: true,
//                 maintainAspectRatio: false,
//                 plugins: {
//                   legend: {
//                     position: "top",
//                     labels: {
//                       color: "rgb(156, 163, 175)", // text-gray-400
//                     },
//                   },
//                   title: {
//                     display: true,
//                     text: `${
//                       type.charAt(0).toUpperCase() + type.slice(1)
//                     } Chart`,
//                     color: "rgb(156, 163, 175)", // text-gray-400
//                   },
//                 },
//                 scales: {
//                   x: {
//                     grid: {
//                       color: "rgba(156, 163, 175, 0.1)", // text-gray-400 with low opacity
//                     },
//                     ticks: {
//                       color: "rgb(156, 163, 175)", // text-gray-400
//                     },
//                   },
//                   y: {
//                     grid: {
//                       color: "rgba(156, 163, 175, 0.1)", // text-gray-400 with low opacity
//                     },
//                     ticks: {
//                       color: "rgb(156, 163, 175)", // text-gray-400
//                     },
//                   },
//                 },
//               }}
//             />
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default SalesChart;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LuShoppingBag } from "react-icons/lu";
import { FaArrowUp, FaLongArrowAltDown } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { setMonth, setType } from "../../../slices/adminSlice";
import "tailwindcss/tailwind.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const SalesChart = () => {
  const dispatch = useDispatch();
  const { chartData, month, type } = useSelector((state) => state.admin);

  const daysArray = chartData?.daysArray || [];
  const currentMonthTotalSales = chartData?.currentMonthTotalSales || 0;
  const percentageChange = chartData?.percentageChange || 0;

  const handleMonthChange = (e) => {
    dispatch(setMonth(e.target.value));
  };

  const handleTypeChange = (e) => {
    dispatch(setType(e.target.value));
  };

  const data = {
    labels: daysArray.map((day) => day.day),
    datasets: [
      {
        label: type.charAt(0).toUpperCase() + type.slice(1),
        data: daysArray.map((day) => day.value),
        borderColor: "rgb(59, 130, 246)", // blue-500
        backgroundColor: "rgba(59, 130, 246, 0.1)", // blue-500 with low opacity
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <>
      {chartData && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all duration-300">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full transition-colors duration-300">
                <LuShoppingBag className="text-blue-500 dark:text-blue-400 text-2xl" />
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-800 dark:text-white transition-colors duration-300">
                  Rs. {currentMonthTotalSales.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                  Total {type.charAt(0).toUpperCase() + type.slice(1)}
                </div>
              </div>
              {percentageChange >= 0 ? (
                <div className="flex items-center space-x-1 text-green-500 dark:text-green-400 transition-colors duration-300">
                  <FaArrowUp />
                  <span className="font-semibold">
                    {percentageChange.toFixed(2)}%
                  </span>
                </div>
              ) : (
                <div className="flex items-center space-x-1 text-red-500 dark:text-red-400 transition-colors duration-300">
                  <FaLongArrowAltDown />
                  <span className="font-semibold">
                    {Math.abs(percentageChange).toFixed(2)}%
                  </span>
                </div>
              )}
            </div>
            <div className="flex space-x-4">
              <select
                value={month}
                onChange={handleMonthChange}
                className="px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              >
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              <select
                value={type}
                onChange={handleTypeChange}
                className="px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              >
                <option value="orders">Orders</option>
                <option value="sales">Sales</option>
              </select>
            </div>
          </div>
          <div className="w-full h-80">
            <Line
              data={data}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "top",
                    labels: {
                      color: "rgb(156, 163, 175)", // text-gray-400
                      font: {
                        size: 12,
                        weight: "bold",
                      },
                    },
                  },
                  title: {
                    display: true,
                    text: `${
                      type.charAt(0).toUpperCase() + type.slice(1)
                    } Chart`,
                    color: "rgb(107, 114, 128)", // text-gray-500
                    font: {
                      size: 16,
                      weight: "bold",
                    },
                  },
                },
                scales: {
                  x: {
                    grid: {
                      color: "rgba(156, 163, 175, 0.1)", // text-gray-400 with low opacity
                    },
                    ticks: {
                      color: "rgb(156, 163, 175)", // text-gray-400
                      font: {
                        size: 10,
                      },
                    },
                  },
                  y: {
                    grid: {
                      color: "rgba(156, 163, 175, 0.1)", // text-gray-400 with low opacity
                    },
                    ticks: {
                      color: "rgb(156, 163, 175)", // text-gray-400
                      font: {
                        size: 10,
                      },
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default SalesChart;
