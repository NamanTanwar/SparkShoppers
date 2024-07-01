import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import {
  setLoading,
  setError,
  setWishlistItems,
} from "../../slices/wishlistSlice";
import { wishlistEndpoints } from "../apis";

const { REMOVE_WISHLIST_ITEM_API, ADD_WISHLIST_ITEM_API } = wishlistEndpoints;

export const removeItemFromWishlist = (productId, userToken) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const response = await apiConnector(
        "DELETE",
        REMOVE_WISHLIST_ITEM_API,
        {
          productId,
          userToken,
        },
        {
          Authorization: `Bearer ${userToken}`,
        }
      );

      const updatedWishlist = response.data.data.products;
      dispatch(setWishlistItems(updatedWishlist));
      dispatch(setLoading(false));
      toast.dismiss(toastId);
      return updatedWishlist;
    } catch (err) {
      //console.log("Error in remove from wishlist service:", err);
      dispatch(setError(err));
      toast.error("Error in removing item");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
};

export const addItemToWishlist = (productId, userToken) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const response = await apiConnector(
        "POST",
        ADD_WISHLIST_ITEM_API,
        {
          productId,
          userToken,
        },
        {
          authorization: `Bearer ${userToken}`,
        }
      );

      const updatedWishlist = response.data.updatedWishlist;

      dispatch(setWishlistItems(updatedWishlist));
      dispatch(setLoading(false));
      toast.dismiss(toastId);
      toast.success("Item successfully added to wishlist");
    } catch (err) {
      //  console.log("Error in add item to wishlist service:", err);
      setError(err);
      toast.error("Error in adding to wishlist");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
};
