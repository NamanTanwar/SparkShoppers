import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserOrderHistory } from "../services/operations/userAPI.js";
import RatingAndReviewModal from "../components/common/RatingAndReivew/RatingAndReviewModal.js";
import Navbar from "../components/common/Navbar.js";
import SidebarNav from "../components/core/Navbar/SidebarNav.js";

const OrderHistory = () => {
  const { accessToken, user } = useSelector((state) => state.auth);
  const { showSidebar } = useSelector((state) => state.UI);
  const [orderHistory, setOrderHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [currProdId, setCurrProdId] = useState(null);

  const handleAddReview = (productId) => {
    setCurrProdId(productId);
    setShowRatingModal(true);
  };

  const handleCloseModal = () => {
    setShowRatingModal(false);
    setCurrProdId(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getUserOrderHistory(accessToken.token);
        setOrderHistory(response);
      } catch (err) {
        console.error("Error fetching order history:", err);
        setOrderHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <h1 className="text-gray-700">Loading...</h1>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {showSidebar && <SidebarNav />}
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Orders</h1>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Order ID</th>
                <th className="py-3 px-6 text-left">Order Details</th>
                <th className="py-3 px-6 text-left">Created At</th>
                <th className="py-3 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {orderHistory && orderHistory.length > 0 ? (
                orderHistory.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <span className="font-medium">{order._id}</span>
                    </td>
                    <td className="py-3 px-6">
                      {order.products &&
                        order.products.map((product) => (
                          <div
                            key={product._id}
                            className="flex flex-col space-y-1 mb-2"
                          >
                            <p className="text-sm font-">
                              <span className="font-semibold">Product:</span>{" "}
                              {product.product.name}
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Cost:</span> $
                              {product.cost}
                            </p>
                            <p className="text-sm">
                              <span className="font-medium">Quantity:</span>{" "}
                              {product.quantity}
                            </p>
                            <button
                              className="text-xs bg-indigo-500 text-white py-1 px-2 rounded hover:bg-indigo-600 transition duration-300 ease-in-out transform hover:-translate-y-1 mt-1 w-max"
                              onClick={() =>
                                handleAddReview(product.product._id)
                              }
                            >
                              Add review
                            </button>
                          </div>
                        ))}
                    </td>
                    <td className="py-3 px-6 text-left">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-6 text-left">
                      <span
                        className={`py-1 px-3 rounded-full text-xs ${
                          order.status === "paid"
                            ? "bg-green-200 text-green-600"
                            : order.status === "pending"
                            ? "bg-yellow-200 text-yellow-600"
                            : "bg-red-200 text-red-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-6 text-center text-gray-500">
                    No orders to show
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {showRatingModal && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="absolute inset-0 bg-black opacity-50"
              onClick={handleCloseModal}
            ></div>
            <div
              className="relative z-10 bg-white p-8 rounded-lg shadow-xl max-w-md mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <RatingAndReviewModal
                productId={currProdId}
                onClose={handleCloseModal}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
