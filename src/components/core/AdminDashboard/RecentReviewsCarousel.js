import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import RatingStars from "../../common/RatingStars";

const RecentReviewsCarousel = () => {
  const { recentReviewsData } = useSelector((state) => state.admin);
  const [shuffledReviews, setShuffledReviews] = useState([]);

  useEffect(() => {
    setShuffledReviews([...recentReviewsData].sort(() => Math.random() - 0.5));
  }, [recentReviewsData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShuffledReviews(
        [...recentReviewsData].sort(() => Math.random() - 0.5)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [recentReviewsData]);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md w-full transition-all duration-300">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white transition-colors duration-300">
        Recent Reviews
      </h2>
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        useKeyboardArrows
        autoPlay
        interval={10000}
        className="rounded-lg relative"
      >
        {shuffledReviews.map((review) => (
          <div
            key={review._id}
            className="p-4 border dark:border-gray-700 rounded-lg flex flex-col items-start space-y-2 bg-gray-50 dark:bg-gray-700 transition-all duration-300"
          >
            <div className="flex items-center space-x-4">
              <img
                src={`https://i.pravatar.cc/150?u=${review.user._id}`}
                alt={`${review.user.firstname} ${review.user.lastname}`}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold text-gray-800 dark:text-white transition-colors duration-300">{`${review.user.firstname} ${review.user.lastname}`}</p>
                <div className="flex items-center">
                  <RatingStars avgRating={review.rating} starSize={20} />
                  <p className="text-sm text-gray-600 dark:text-gray-400 ml-2 transition-colors duration-300">{`(${review.rating})`}</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-300">
              {review.review.slice(0, 150)}...
            </p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default RecentReviewsCarousel;
