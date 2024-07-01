const Order = require("../models/Order");

const getOrdersData = async (month, type) => {
  // try{
  //     const monthNumber = new Date(Date.parse(month + " 1, 2020")).getMonth() + 1; // Parsing to get month number
  //     if (isNaN(monthNumber)) {
  //         throw new Error("Invalid month");
  //     }

  //     const currentYear = new Date().getFullYear();
  //     const startOfMonth = new Date(currentYear, monthNumber - 1, 1);
  //     const endOfMonth = new Date(currentYear, monthNumber, 0);
  //     const daysInMonth = endOfMonth.getDate();

  //     const matchStage = {
  //         $match: {
  //             createdAt: {
  //                 $gte: startOfMonth,
  //                 $lt: new Date(currentYear, monthNumber, 1) // Next month's start date
  //             }
  //         }
  //     };

  //     const groupStage = {
  //         $group: {
  //             _id: { $dayOfMonth: "$createdAt" },
  //             count: { $sum: 1 },
  //             totalAmount: { $sum: "$orderAmount" }
  //         }
  //     };

  //     const projectStage = type === 'orders' ? {
  //         $project: {
  //             day: "$_id",
  //             value: "$count",
  //             _id: 0
  //         }
  //     } : {
  //         $project: {
  //             day: "$_id",
  //             value: "$totalAmount",
  //             _id: 0
  //         }
  //     };

  //     const sortStage = {
  //         $sort: { day: 1 }
  //     };

  //     const pipeline = [matchStage, groupStage, projectStage, sortStage];

  //     const results = await Order.aggregate(pipeline);

  //     // Generate an array with all days of the month initialized to 0
  //     const daysArray = Array.from({ length: daysInMonth }, (_, i) => ({
  //         day: i + 1,
  //         value: 0
  //     }));

  //     // Merge the results with the complete days array
  //     results.forEach(result => {
  //         const dayIndex = result.day - 1;
  //         if (dayIndex >= 0 && dayIndex < daysInMonth) {
  //             daysArray[dayIndex].value = result.value;
  //         }
  //     });

  //     return daysArray;

  // }catch(err){
  //     console.log(err)
  //     throw err
  // }
  try {
    const monthNumber = new Date(Date.parse(month + " 1, 2020")).getMonth() + 1; // Parsing to get month number
    if (isNaN(monthNumber)) {
      throw new Error("Invalid month");
    }

    const currentYear = new Date().getFullYear();
    const startOfMonth = new Date(currentYear, monthNumber - 1, 1);
    const endOfMonth = new Date(currentYear, monthNumber, 0);
    const startOfPreviousMonth = new Date(currentYear, monthNumber - 2, 1);
    const endOfPreviousMonth = new Date(currentYear, monthNumber - 1, 0);

    const daysInMonth = endOfMonth.getDate();

    const matchCurrentMonthStage = {
      $match: {
        createdAt: {
          $gte: startOfMonth,
          $lt: new Date(currentYear, monthNumber, 1), // Next month's start date
        },
      },
    };

    const matchPreviousMonthStage = {
      $match: {
        createdAt: {
          $gte: startOfPreviousMonth,
          $lt: startOfMonth,
        },
      },
    };

    const groupByDayStage = {
      $group: {
        _id: { $dayOfMonth: "$createdAt" },
        count: { $sum: 1 },
        totalAmount: { $sum: "$orderAmount" },
      },
    };

    const groupByMonthStage = {
      $group: {
        _id: null,
        totalSales: { $sum: "$orderAmount" },
      },
    };

    const projectStage =
      type === "orders"
        ? {
            $project: {
              day: "$_id",
              value: "$count",
              _id: 0,
            },
          }
        : {
            $project: {
              day: "$_id",
              value: "$totalAmount",
              _id: 0,
            },
          };

    const sortStage = {
      $sort: { day: 1 },
    };

    const currentMonthPipeline = [
      matchCurrentMonthStage,
      groupByDayStage,
      projectStage,
      sortStage,
    ];
    const currentMonthSalesPipeline = [
      matchCurrentMonthStage,
      groupByMonthStage,
    ];
    const previousMonthSalesPipeline = [
      matchPreviousMonthStage,
      groupByMonthStage,
    ];

    const [currentMonthResults, currentMonthSales, previousMonthSales] =
      await Promise.all([
        Order.aggregate(currentMonthPipeline),
        Order.aggregate(currentMonthSalesPipeline),
        Order.aggregate(previousMonthSalesPipeline),
      ]);

    // Calculate the total sales for the current month
    const currentMonthTotalSales = currentMonthSales[0]
      ? currentMonthSales[0].totalSales
      : 0;

    // Calculate the total sales for the previous month
    const previousMonthTotalSales = previousMonthSales[0]
      ? previousMonthSales[0].totalSales
      : 0;

    // Calculate percentage change
    const percentageChange = previousMonthTotalSales
      ? ((currentMonthTotalSales - previousMonthTotalSales) /
          previousMonthTotalSales) *
        100
      : currentMonthTotalSales * 100;

    // Generate an array with all days of the month initialized to 0
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      value: 0,
    }));

    // Merge the results with the complete days array
    currentMonthResults.forEach((result) => {
      const dayIndex = result.day - 1;
      if (dayIndex >= 0 && dayIndex < daysInMonth) {
        daysArray[dayIndex].value = result.value;
      }
    });

    return {
      daysArray,
      currentMonthTotalSales,
      percentageChange,
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getOrdersComparisonData = async () => {
  try {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const startOfCurrentMonth = new Date(currentYear, currentMonth, 1);
    const startOfPreviousMonth = new Date(currentYear, currentMonth - 1, 1);
    const endOfPreviousMonth = new Date(currentYear, currentMonth, 0);

    const pipeline = [
      {
        $match: {
          createdAt: {
            $gte: startOfPreviousMonth,
            $lt: new Date(currentYear, currentMonth + 1, 1), // Start of the next month
          },
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
        },
      },
      {
        $group: {
          _id: { month: "$month", year: "$year" },
          totalOrders: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
      {
        $project: {
          _id: 0,
          month: "$_id.month",
          year: "$_id.year",
          totalOrders: 1,
        },
      },
    ];

    const results = await Order.aggregate(pipeline);

    // Calculate percentage increase or decrease
    let previousMonthOrders = 0;
    let currentMonthOrders = 0;

    results.forEach((result) => {
      if (result.year === currentYear && result.month === currentMonth + 1) {
        currentMonthOrders = result.totalOrders;
      } else if (result.year === currentYear && result.month === currentMonth) {
        previousMonthOrders = result.totalOrders;
      }
    });

    const percentageChange =
      ((currentMonthOrders - previousMonthOrders) / previousMonthOrders) * 100;

    return {
      previousMonthOrders,
      currentMonthOrders,
      percentageChange,
    };
  } catch (err) {
    console.log("Error occured in getOrdersComparisonData:", err);
    throw err;
  }
};

const getSalesComparison = async () => {
  try {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-based, so January is 0, February is 1, etc.

    const startOfCurrentMonth = new Date(currentYear, currentMonth, 1);
    const startOfPreviousMonth = new Date(currentYear, currentMonth - 1, 1);
    const endOfPreviousMonth = new Date(currentYear, currentMonth, 0);

    const pipeline = [
      {
        $match: {
          createdAt: {
            $gte: startOfPreviousMonth,
            $lt: new Date(currentYear, currentMonth + 1, 1), // Start of the next month
          },
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
          orderAmount: 1,
        },
      },
      {
        $group: {
          _id: { month: "$month", year: "$year" },
          totalSales: { $sum: "$orderAmount" },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
      {
        $project: {
          _id: 0,
          month: "$_id.month",
          year: "$_id.year",
          totalSales: 1,
        },
      },
    ];

    const results = await Order.aggregate(pipeline);

    // Calculate percentage increase or decrease
    let previousMonthSales = 0;
    let currentMonthSales = 0;

    results.forEach((result) => {
      if (result.year === currentYear && result.month === currentMonth + 1) {
        currentMonthSales = result.totalSales;
      } else if (result.year === currentYear && result.month === currentMonth) {
        previousMonthSales = result.totalSales;
      }
    });

    const percentageChange =
      previousMonthSales === 0
        ? currentMonthSales === 0
          ? 0
          : 100
        : ((currentMonthSales - previousMonthSales) / previousMonthSales) * 100;

    return {
      previousMonthSales,
      currentMonthSales,
      percentageChange,
    };
  } catch (err) {
    console.log("Error occured at getSalesComparison service:", err);
    throw err;
  }
};

module.exports = {
  getOrdersData,
  getOrdersComparisonData,
  getSalesComparison,
};
