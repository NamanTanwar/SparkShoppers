import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getOrderDetails } from "../services/operations/paymentAPI";
import Lottie from "lottie-react";
import PaymentSuccessAnimation from "../assets/PaymentSuccess.json";
import { useNavigate } from "react-router-dom";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState();

  const { orderId } = useSelector((state) => state.payments);

  useEffect(() => {
    if (orderId) getOrderDetails(orderId, setLoading, setError);
  }, [orderId]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Something went wrong!!</h1>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <h1 className="text-3xl font-extrabold text-center text-green-600 mb-6">
          Payment Successful
        </h1>
        <div className="text-center">
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            Thank you for your order!
          </h2>
          <div className="mt-8">
            <Lottie
              animationData={PaymentSuccessAnimation}
              loop={false}
              className="h-64 mx-auto"
            />
            <h1 className="mt-6 text-lg text-gray-600">
              Check your email for complete order details
            </h1>
          </div>
        </div>
        <div className="mt-8">
          <button
            onClick={() => navigate("/my-orders")}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            See My Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
