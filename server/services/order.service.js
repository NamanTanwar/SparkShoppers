const httpStatus = require("http-status");
const Order = require("../models/Order");
const mongoose = require("mongoose");

//user->{
//   firstname,
//    lastname,
//}
//products->[
//{
//   product: {
//      namne,
//      brand,
//      cost,
//  },
//quantity: ,
//cost: ,
//
//
//},{}
//]
//other fields

const getOrderDetails = async (orderId) => {
  try {
    const orderDetails = await Order.findOne({ orderId: orderId })
      .populate({
        path: "user",
        select: "firstname lastname",
      })
      .populate({
        path: "products.product",
        select: "name brand cost",
      });

    if (!orderDetails) {
      throw new Error("Error in fetching orderDetails");
    }

    return orderDetails;
  } catch (err) {
    console.log("Err in getOrderDetails service:", err);
    throw err;
  }
};

const createUserOrder = async (
  userId,
  orderId,
  productsDetails,
  totalAmount,
  status
) => {
  try {
    const newOrder = await Order.create({
      user: userId,
      products: productsDetails,
      status: status,
      orderAmount: totalAmount,
      orderId: orderId,
    });

    if (!newOrder) {
      throw new Error("Error in order creation");
    }

    return newOrder;
  } catch (err) {
    console.log("Error in create order service:", err);
    console.log("error message:", err.message);
    throw new Error(err.message);
  }
};

const updateOrderStatus = async (orderId, status) => {
  try {
    const order = await Order.findOne({ orderId: orderId })
      .populate("user")
      .populate("products.product");
    if (!order) {
      throw new Error("Order not found");
    }
    order.status = status;
    order.save();
    return order;
  } catch (err) {
    console.log("Error in updateOrderStatus service:", err);
    console.log("error message:", err.message);
    throw new Error(err.message);
  }
};

const getOrderComparisonData = async () => {
  try {
    const currentDate = new Date();
    const startOfCurrentMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    );
    const startOfPreviousMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    const endOfPreviousMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      0
    );

    // Aggregate total orders for the current month
    const currentMonthOrders = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfCurrentMonth, $lte: currentDate },
        },
      },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
        },
      },
    ]);

    // Aggregate total orders for the previous month
    const previousMonthOrders = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfPreviousMonth, $lte: endOfPreviousMonth },
        },
      },
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
        },
      },
    ]);

    const currentMonthTotal = currentMonthOrders[0]
      ? currentMonthOrders[0].totalOrders
      : 0;
    const previousMonthTotal = previousMonthOrders[0]
      ? previousMonthOrders[0].totalOrders
      : 0;

    const percentageChange = previousMonthTotal
      ? ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100
      : currentMonthTotal * 100;

    return {
      currentMonthTotal,
      previousMonthTotal,
      percentageChange,
    };
  } catch (err) {
    console.log("Error in getOrderComparisonData service:", err);
    throw err;
  }
};

module.exports = {
  createUserOrder,
  updateOrderStatus,
  getOrderDetails,
  getOrderComparisonData,
};
