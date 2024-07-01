import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { adminEndpoints } from "../apis";
import {
  setChartData,
  setOrdersComparisonData,
  setProductsData,
  setRatingsComparisonData,
  setSalesComparisonData,
  setRecentReviewsData,
  setIsLoading,
  setError,
} from "../../slices/adminSlice";

const { GET_ADMIN_PAGE_DATA } = adminEndpoints;

export const getAdminPageData = (month, type, productsOption, userToken) => {
  return async (dispatch) => {
    const toastId = toast.loading();
    try {
      dispatch(setError(null));
      dispatch(setIsLoading(true));
      const response = await apiConnector(
        "POST",
        GET_ADMIN_PAGE_DATA,
        {
          month,
          type,
          productsOption,
        },
        {
          authorization: `Bearer ${userToken}`,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setChartData(response.data.ordersData));
      dispatch(setOrdersComparisonData(response.data.ordersComparisonData));
      dispatch(setSalesComparisonData(response.data.salesComparisonData));
      dispatch(setRecentReviewsData(response.data.recentReviews));
      dispatch(setRatingsComparisonData(response.data.ratingComparisonData));
      dispatch(setProductsData(response.data.productsData));
      toast.success("Admin Data fetched successfully");
      dispatch(setIsLoading(false));
      toast.dismiss(toastId);
      return;
    } catch (err) {
      //console.log('Error occured in getAdminPage data service:',err)
      toast.error("Something went wrong");
      dispatch(setError(err));
    } finally {
      toast.dismiss(toastId);
    }
  };
};
