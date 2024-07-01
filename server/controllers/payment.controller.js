const httpStatus = require("http-status");
const cartService = require("../services/cart.service");
const paymentService = require("../services/payment.service");
const orderService = require("../services/order.service");
const tokenService = require("../services/token.service");
const razorpay = require("../config/payment");
const userService = require("../services/user.service");
const crypto = require("crypto");
require("dotenv").config();

const getOrderDetails = async (req, res) => {
  try {
    const { orderId } = req.body;
    const orderDetails = await orderService.getOrderDetails(orderId);

    if (!orderDetails) {
      throw new Error("Error in fetching order Details");
    }

    res.status(httpStatus.OK).json({
      success: true,
      message: "Order details fetched successfully",
      orderDetails,
    });
  } catch (err) {
    console.log("Error in getOrderDetails controller:", err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    //Extracting address info for user
    const { formData } = req.body;
    //Extracting user token from authorization headers
    const userToken = req.headers.authorization.split(" ")[1];
    //Extracting user id from token
    const userId = await tokenService.extractUserIdFromToken(userToken);
    //Validating user id
    if (!userId) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: "Invalid user",
      });
    }
    //Extracting cart items
    const products = await cartService.getAllItems(userId);
    //update user address
    const user = await userService.updateAddress(formData, userId);

    //Validating user and user cart products
    if (!user) {
      throw new Error("Error in updated user address");
    }
    if (!products || !products.length) {
      return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: "User products not found",
      });
    }

    let totalAmount = 0;
    let productsId = [];
    let productsDetails = [];
    //Calculating total amount]
    //and creating a string of productIds
    for (let i = 0; i < products.length; i++) {
      let currProduct = products[i];
      let productObj = {};
      productObj.product = currProduct._id._id;
      productObj.quantity = currProduct.quantity;
      productObj.cost = currProduct.quantity * currProduct._id.cost;
      totalAmount += currProduct._id.cost * currProduct.quantity;
      productsDetails.push(productObj);
      productsId.push(currProduct._id._id.toString());
    }

    const orderOptions = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        userId: userId.toString(),
        productsId: productsId.join(","),
      },
    };
    //Creating order
    const order = await razorpay.orders.create(orderOptions);
    //Creating order in db with status->created
    const userOrder = await orderService.createUserOrder(
      userId,
      order.id,
      productsDetails,
      totalAmount,
      order.status
    );

    //Sending successfull response to
    //client
    res.status(httpStatus.OK).json({
      success: true,
      message: "Order created successfully",
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    //creating a HMAC this can be used to hash
    const shasum = crypto.createHmac("sha256", secret);
    //hashing the payload using HMAC
    shasum.update(JSON.stringify(req.body));
    //this is the hashed value of the request body using the secret key
    const digest = shasum.digest("hex");
    //comparing generated hash with the razorpay signature
    if (digest === req.headers["x-razorpay-signature"]) {
      const event = req.body.event;
      //successfull payment
      if (event === "payment.captured") {
        const paymentEntity = req.body.payload.payment.entity;
        const orderId = paymentEntity.order_id;
        //updating backend
        const userOrder = await orderService.updateOrderStatus(orderId, "paid");
        if (!userOrder) {
          throw new Error("error in payment verification");
        }
        //sending success mail to user
        const info = await paymentService.sendPaymentSuccessEmail(
          userOrder.user.firstname,
          userOrder.user.lastname,
          userOrder.user.email,
          userOrder.orderAmount,
          userOrder.products
        );

        res.status(httpStatus.OK).json({ status: "ok" });
      } else {
        const userOrder = await orderService.updateOrderStatus(
          razorpay_order_id,
          "failed"
        );
        if (!userOrder) {
          throw new Error("error in userOrder");
        }
        res.status(httpStatus.OK).json({ status: "ok" });
      }
    } else {
      res.status(httpStatus.BAD_REQUEST).json({
        status: "error",
        message: "Invalid signature",
      });
    }
  } catch (err) {
    console.log("Error occured in verify-payment controller:", err);
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  capturePayment,
  verifyPayment,
  getOrderDetails,
};
