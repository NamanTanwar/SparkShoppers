import React from "react";
import RatingStars from "../../common/RatingStars";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProductTable = () => {
  const navigate = useNavigate();
  const { productsData } = useSelector((state) => state.admin);

  return (
    <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all duration-300">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Photo
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Name
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Price
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Brand
            </th>
            <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Rating
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {productsData.map((product) => (
            <tr
              key={product._id}
              className="transition-all hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => navigate(`/product/${product._id}`)}
            >
              <td className="py-4 px-6 flex items-center">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
              </td>
              <td className="py-4 px-6 text-gray-800 dark:text-white">
                {product.name}
              </td>
              <td className="py-4 px-6 text-gray-800 dark:text-white">
                Rs. {product.cost.toLocaleString()}
              </td>
              <td className="py-4 px-6 text-gray-800 dark:text-white">
                {product.brand}
              </td>
              <td className="py-4 px-6">
                {product.ratingAndReviews.length > 0 ? (
                  <RatingStars
                    avgRating={product.ratingAndReviews[0].rating}
                    starSize={20}
                  />
                ) : (
                  <span className="text-gray-500 dark:text-gray-400">
                    No reviews yet
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
