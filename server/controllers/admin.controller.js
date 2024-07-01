const adminService = require("../services/admin.service");
const httpStatus = require("http-status");
const ratingAndReviewService = require("../services/rating.service");
const productService = require("../services/product.service");

const getAdminData = async (req, res) => {
  try {
    //fetching orders data
    const { month, type, productsOption } = req.body;

    const [
      ordersData, //orders data
      ordersComparisonData, //orders comparison data
      salesComparisonData, //sales comparison data
      recentReviews, //recent reviews
      ratingComparisonData, //rating comparison data
    ] = await Promise.all([
      adminService.getOrdersData(month, type),
      adminService.getOrdersComparisonData(),
      adminService.getSalesComparison(),
      ratingAndReviewService.getRecentReviews(),
      ratingAndReviewService.getRatingComparisonData(),
    ]);

    let productsData = [];
    if (productsOption === "Highest Rated")
      productsData = await productService.getHighestRatedProducts();
    else if (productsOption === "Most Shopped")
      productsData = await productService.getMostShoppedProducts();
    else productsData = await productService.getNewProducts();

    if (
      !ordersData ||
      !ordersComparisonData ||
      !salesComparisonData ||
      !recentReviews ||
      !ratingComparisonData ||
      !productsData
    ) {
      res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: "Error in fetching data",
      });
    }

    res.status(httpStatus.OK).json({
      success: true,
      message: "data fetched successfully",
      ordersData,
      ordersComparisonData,
      salesComparisonData,
      recentReviews,
      ratingComparisonData,
      productsData,
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: err.message,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getAdminData,
};
