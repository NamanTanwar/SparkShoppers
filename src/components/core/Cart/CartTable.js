import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../../slices/cartSlice";
import { addItemToCartService } from "../../../services/operations/cartAPI";
import { removeFromCartService } from "../../../services/operations/cartAPI";
import { useNavigate } from "react-router-dom";

const CartTable = ({ cartItems }) => {
  //Initializing useDispatch and useNavigate hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //importing isLoggedIn and accessToken from auth slice
  const { isLoggedIn, accessToken } = useSelector((state) => state.auth);
  //import totalPrice for user cart
  const { totalPrice } = useSelector((state) => state.cart);

  //add to cart handler
  const handleAddToCart = (item) => {
    //dispatching different actions on the basis of
    //if user logged in
    if (!isLoggedIn) {
      dispatch(addItemToCart({ product: item.product, productQuantity: 1 }));
    } else {
      dispatch(addItemToCartService(item.product._id, accessToken.token));
    }
  };

  //remove from cart handler
  const handleRemoveFromCart = (item) => {
    //dispatching different actions on the basis of
    //if user logged in
    if (!isLoggedIn) {
      dispatch(
        removeItemFromCart({ product: item.product, productQuantity: 1 })
      );
    } else {
      dispatch(
        removeFromCartService(item.product._id, accessToken.token, false)
      );
    }
  };

  //img click handler to
  //navigate to product page
  const handleImgClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  //if no items in cart
  if (cartItems.length === 0) {
    return (
      <div>
        <h1>No items added to cart</h1>
      </div>
    );
  }

  return (
    <div className="shadow-md rounded-lg overflow-hidden w-full sm:w-3/4 md:w-1/2 lg:w-1/2 mx-auto mb-8">
      {/* Main container with responsive width and styling */}
      <table className="w-full table-auto">
        {/* Full-width table with automatic column sizing */}
        <thead className="bg-gray-200 text-gray-600 font-semibold">
          {/* Table header with styling */}
          <tr>
            <th className="px-4 py-2 text-left">Product</th>
            <th className="px-4 py-2 text-left">Price</th>
            <th className="px-4 py-2 text-left">Quantity</th>
            <th className="px-4 py-2 text-left">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {/* Table body */}
          {cartItems &&
            cartItems.length > 0 &&
            cartItems.map((item, idx) => (
              // Mapping through cart items if they exist
              <tr key={item.product._id} className="border-b border-gray-200">
                <td className="px-4 py-4 flex flex-col items-center">
                  {/* Product image and name */}
                  {item.product.images && item.product.images.length > 0 && (
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="h-20 w-20 rounded-lg object-cover mb-2 cursor-pointer"
                      onClick={() => handleImgClick(item.product._id)}
                    />
                  )}
                  <p className="text-gray-700 font-medium">
                    {item.product.name}
                  </p>
                </td>
                <td className="px-4 py-4 text-left">
                  {/* Product price */}
                  <p className="text-gray-800 font-medium">
                    Rs. {item.product.cost}
                  </p>
                </td>
                <td className="px-4 py-4 flex items-center">
                  {/* Product quantity with increment/decrement buttons */}
                  <p className="mr-2 text-gray-800 font-medium">
                    {item.productQuantity}
                  </p>
                  <div className="flex flex-row space-x-2">
                    <button
                      className="text-gray-500 hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full px-2 py-1"
                      onClick={() => handleAddToCart(item)}
                    >
                      +
                    </button>
                    <button
                      className="text-gray-500 hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full px-2 py-1"
                      onClick={() => handleRemoveFromCart(item)}
                    >
                      -
                    </button>
                  </div>
                </td>
                <td className="px-4 py-4 text-left">
                  {/* Subtotal for each item */}
                  <p className="text-gray-800 font-medium">
                    Rs. {item.productQuantity * item.product.cost}
                  </p>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex flex-col border-t border-gray-200 pt-4 pl-2">
        {/* Cart total section */}
        <h2>Cart Total</h2>
        <div className="flex flex-row justify-between py-2 px-2">
          <p>Subtotal:</p>
          <p>Rs.{totalPrice}</p>
        </div>
        <div className="flex flex-row justify-between py-2 px-2">
          <p>Shipping:</p>
          <p>Free</p>
        </div>
        <div className="flex flex-row justify-between py-2 px-2">
          <p>Total:</p>
          <p>Rs.{totalPrice}</p>
        </div>
        <div className="flex justify-center py-4 px-2">
          {/* Checkout button */}
          <button
            onClick={() => navigate("/checkout")}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-full px-4 py-2"
          >
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartTable;
