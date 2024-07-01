import React from "react";
import { useSelector } from "react-redux";

const CartView = () => {
  // Extract cart items and total price from Redux store
  const { cartItems, totalPrice } = useSelector((state) => state.cart);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Order Summary:
      </h2>
      {cartItems && cartItems.length > 0 ? (
        <div className="flex flex-col space-y-4">
          {/* Cart Items */}
          {cartItems.map((item, idx) => (
            <div
              key={item.product._id}
              className="flex items-center border-b border-gray-200 py-2"
            >
              {/* Product Image and Name */}
              <div className="flex-shrink-0 w-20 h-20 mr-4">
                <img
                  src={item.product.images[0]}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="flex flex-col flex-grow">
                <p className="font-medium text-gray-800">{item.product.name}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Quantity: {item.productQuantity}
                </p>
              </div>
              {/* Product Price */}
              <div className="text-right">
                <p className="font-semibold text-gray-800">
                  Rs.{item.product.cost}
                </p>
              </div>
            </div>
          ))}
          {/* Order Total Calculation */}
          <div className="mt-4 space-y-2">
            {/* Subtotal */}
            <div className="flex justify-between text-gray-600">
              <p>Subtotal:</p>
              <p>Rs.{totalPrice.toFixed(2)}</p>
            </div>
            {/* Shipping */}
            <div className="flex justify-between text-gray-600">
              <p>Shipping:</p>
              <p className="text-green-600">Free</p>
            </div>
            {/* Total */}
            <div className="flex justify-between text-lg font-semibold text-gray-800 pt-2 border-t border-gray-200">
              <p>Total:</p>
              <p>Rs.{totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <h1 className="text-xl text-gray-600">Your cart is empty</h1>
        </div>
      )}
    </div>
  );
};

export default CartView;
