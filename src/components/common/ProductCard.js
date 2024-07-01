import React, { useState } from "react";
import ProductImageCarousel from "./ProductImageCarousel";
import { FaHandPointLeft, FaStar } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { addToWishlist } from "../../slices/wishlistSlice";
import { addItemToWishlist } from "../../services/operations/wishlistAPI";
import { addItemToCart } from "../../slices/cartSlice";
import { addItemToCartService } from "../../services/operations/cartAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const calculateAverageRating = (reviews) => {
  // Check if the array is empty
  if (!reviews || reviews.length === 0) {
    return 0; // Return 0 if there are no reviews
  }
  // Sum up all the ratings
  const totalRating = reviews.reduce((sum, review) => {
    // Ensure the rating is a number and is valid
    const rating = Number(review.rating);
    return sum + (isNaN(rating) ? 0 : rating);
  }, 0);

  // Calculate the average
  const averageRating = totalRating / reviews.length;

  // Round to one decimal place
  return Math.round(averageRating * 10) / 10;
};

const ProductCard = ({
  product,
  refInput,
  height = "350px",
  width = "350px",
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn, accessToken } = useSelector((state) => state.auth);
  const [isHover, setIsHover] = useState(false);
  const { _id, images, name, brand, cost, ratingAndReviews } = product;
  const avgProductRating = calculateAverageRating(ratingAndReviews);
  //Handler to add item to wishlist
  const handleAddToWishlist = (e) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      dispatch(addToWishlist(product));
      toast.success("Item added to wishlist");
    } else {
      dispatch(addItemToWishlist(_id, accessToken.token));
    }
  };

  //Handler for navigation to product view
  const navigateToView = () => {
    navigate(`/product/${_id}`);
  };

  return (
    <div
      className={`relative flex flex-col bg-white shadow-md rounded-lg transition-shadow duration-300 cursor-pointer`}
      style={{ height, width }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      ref={refInput}
      onClick={() => navigate(`/product/${_id}`)}
    >
      {/* Product Image Carousel */}
      <div className="flex justify-center items-center h-40 bg-gray-200">
        <ProductImageCarousel images={images} width="100%" height="100%" />
      </div>
      {/* Rating and Review Count */}
      <div className="absolute top-2 left-2 flex items-center space-x-1 bg-yellow-100 p-1 rounded">
        <div className="text-yellow-600 flex items-center">
          {avgProductRating} <FaStar />
        </div>
        <span>|</span>
        <div>{ratingAndReviews?.length}</div>
      </div>
      {/* Product Details */}
      <div className="flex flex-col mt-4 text-center flex-grow">
        <h1 className="text-lg font-semibold">{name}</h1>
        <h2 className="text-sm text-gray-600">{brand}</h2>
        <p className="text-lg text-blue-600">{cost}</p>
      </div>
      {/* Hover Actions */}
      {isHover && (
        <div className="absolute bottom-0 left-0 right-0 flex flex-col space-y-2 bg-white p-2 rounded shadow-md">
          <button
            className="bg-red-500 text-white py-1 rounded hover:bg-red-600"
            onClick={handleAddToWishlist}
          >
            Wishlist
          </button>
          <button
            className="bg-green-500 text-white py-1 rounded hover:bg-green-600"
            onClick={navigateToView}
          >
            View Product
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
