//Used for rating and reviews in product page
export const calculateAverageRating = (ratingAndReviews) => {
  if (ratingAndReviews.length === 0) {
    return {
      totalAverageRating: 0,
      sortedAverages: [],
    };
  }

  const averageRating = (
    ratingAndReviews.reduce(
      (sum, ratingAndReview) => sum + ratingAndReview.rating,
      0
    ) / ratingAndReviews.length
  ).toFixed(1);

  // Initialize the map with all possible ratings (1 to 5) and default them to 0%
  let averageRatings = new Map();
  for (let i = 1; i <= 5; i++) {
    averageRatings.set(i, 0);
  }

  // Count the occurrences of each rating in the ratingAndReviews array
  for (let i = 0; i < ratingAndReviews.length; i++) {
    let rating = ratingAndReviews[i].rating;
    if (averageRatings.has(rating)) {
      let count = averageRatings.get(rating);
      count += 1;
      averageRatings.set(rating, count);
    }
  }

  // Convert counts to percentages
  for (const [key, value] of averageRatings) {
    averageRatings.set(
      key,
      ((value / ratingAndReviews.length) * 100).toFixed(1)
    );
  }
  const arr = Array.from(averageRatings).sort((a, b) => a[0] - b[0]);
  return {
    totalAverageRating: parseFloat(averageRating), // Convert string back to number
    sortedAverages: arr,
  };
};
