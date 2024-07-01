import React, { useState, useEffect } from "react";
import { getUserReviews } from "../services/operations/userAPI";
import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-hot-toast";
import RatingStars from "../components/common/RatingStars";

const RatingAndReviews = () => {
  const [reviewData, setReviewData] = useState([]);
  const { accessToken } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);
      try {
        const reviews = await getUserReviews(accessToken.token);
        setReviewData(reviews);
        toast.success("Reviews fetched successfully!");
      } catch (err) {
        // console.log("Error in fetching reviews:", err);
        toast.err(err.message || "Something Went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [accessToken.token]);

  if (loading) {
    return (
      <div className="flex justify-center mt-4">
        <ClipLoader color="#3B82F6" loading={loading} size={35} />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-sm mt-2">Something went wrong!</p>;
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-4">Products rated by Me</h1>
      {reviewData && reviewData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviewData.map((review) => (
            <div
              key={review._id}
              className="p-4 border border-gray-200 rounded-md"
            >
              <div className="flex flex-row mb-2">
                <p className="font-semibold">Product Reviewed:</p>
                <p>{review.product.name}</p>
                <p>{review.product.brand}</p>
              </div>
              <div className="flex flex-row mb-2">
                <p className="font-semibold">Rating Given:</p>
                <div className="flex items-center">
                  <RatingStars avgRating={review.rating} starSize={20} />
                  <p className="ml-2 text-sm text-gray-600">
                    ({review.rating})
                  </p>
                </div>
              </div>
              <div>
                <p className="font-semibold">Review Given:</p>
                <p>{review.review}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2 className="text-xl mt-4">No reviews to show</h2>
      )}
    </div>
  );
};

export default RatingAndReviews;
