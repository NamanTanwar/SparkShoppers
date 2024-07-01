import { apiConnector } from "../apiConnector";
import { toast } from "react-hot-toast";
import { categoryEndpoints } from "../apis";
import {
  setLoading,
  setError,
  setProducts,
  setBrandNames,
  setCategoryNames,
  appendProducts,
  setPriceRanges,
  setPage,
  setHasNextPage,
} from "../../slices/superCategorySlice";

const {
  GET_SUPER_CATEGORIES_PAGE_DATA_API,
  GET_SUPER_CATEGORIES_CATEGORY_DATA_API,
  GET_SUPER_CATEGORIES_BRAND_DATA_API,
} = categoryEndpoints;

const removeDuplicates = (list) => {
  return list.reduce((acc, current) => {
    if (!acc.includes(current)) {
      acc.push(current);
    }
    return acc;
  }, []);
};

export const fetchSuperCategoryPageData = (
  superCategoryName,
  page = 1,
  limit = 10,
  option,
  hasNextPage,
  categoriesFilters,
  brandsFilters,
  priceFilters
) => {
  return async (dispatch) => {
    //if there is no next page and it's not the first page return
    if (!hasNextPage && page !== 1) return;
    //Extract category Ids from categories Filters
    let categoriesIdsFilter = categoriesFilters.map((category) => category._id);
    //Show loading toast
    const toastId = toast.loading("Loading Category");
    //if all parameters equate to initial State->(No filters applied)->reset page to 1
    if (
      priceFilters.length === 0 &&
      categoriesFilters.length === 0 &&
      priceFilters.start === -Infinity &&
      priceFilters.end === -Infinity
    ) {
      page = 1;
    }

    try {
      //Set loading state and clear any previous errors
      dispatch(setLoading(true));
      dispatch(setError(null));
      //Make API call to fetch data
      let response = await apiConnector(
        "POST",
        GET_SUPER_CATEGORIES_PAGE_DATA_API,
        {
          superCategoryName,
          option,
          categoriesFilters: categoriesIdsFilter,
          brandsFilters,
          priceFilters,
        },
        null,
        {
          page,
          limit,
        }
      );
      //Destructure response
      const {
        products,
        categories,
        brands,
        priceRanges,
        page: responsePage,
        hasNextPage,
      } = response.data;
      //Setting value of hasNextPage received from backend
      dispatch(setHasNextPage(hasNextPage));
      const uniqueBrands = removeDuplicates(brands);
      const uniqueCategories = categories.reduce((acc, curr) => {
        if (!acc.find((item) => item._id === curr._id)) acc.push(curr);
        return acc;
      }, []);
      //Update products based on whether filters are applied
      if (
        categoriesFilters.length > 0 ||
        brandsFilters.length > 0 ||
        (priceFilters.start !== -Infinity && priceFilters.end !== Infinity)
      ) {
        dispatch(setProducts(products));
        if (hasNextPage) dispatch(setPage(page + 1)); // Reset page to 2 for subsequent fetches if filters are applied
      } else {
        if (page === 1) dispatch(setProducts(products));
        else dispatch(appendProducts(products));
        dispatch(setPage(responsePage + 1)); // Increment page for non-filtered results
      }
      //Update category names, brand names, and price ranges
      dispatch(setCategoryNames(uniqueCategories));
      dispatch(setBrandNames(uniqueBrands));
      dispatch(setPriceRanges(priceRanges));
      //Check if there are no more products
      if (products.length === 0) {
        toast.success("No more products to show !!");
        dispatch(setHasNextPage(false));
      }
    } catch (err) {
      //console.log('Error in fetching superCategory data:', err);
      toast.error("Error in fetching category data");
      dispatch(setError(err));
    } finally {
      //Dismiss loading toast and set loading to false
      toast.dismiss(toastId);
      dispatch(setLoading(false));
    }
  };
};

export const fetchSuperCategoryCategoryData = (
  categoryId,
  superCategoryName
) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading....");
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const response = await apiConnector(
        "POST",
        GET_SUPER_CATEGORIES_CATEGORY_DATA_API,
        {
          categoryId,
          superCategoryName,
        }
      );
      dispatch(setProducts(response.data.products));
      dispatch(setBrandNames(response.data.brands));
      dispatch(setCategoryNames(response.data.categories));
      dispatch(setPriceRanges(response.data.priceRanges));
      dispatch(setPage(response.data.page));
      toast.success("data fetched successfully");
    } catch (err) {
      console.log(
        "Error in fetchSuperCategoryCategoryData service",
        err.message
      );
      toast.error("Something went wrong!");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
};

export const fetchSuperCategoryBrandData = (
  superCategoryName,
  brandName,
  page = 1,
  limit = 10
) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading....");

    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      const response = await apiConnector(
        "POST",
        GET_SUPER_CATEGORIES_BRAND_DATA_API +
          `/${superCategoryName}/${brandName}`,
        {
          superCategoryName,
          brandName,
        },
        null,
        {
          page,
          limit,
        }
      );

      if (!response.data.success) {
        throw new Error(response.data.message);
      }

      dispatch(setProducts(response.data.products));
      dispatch(setCategoryNames(response.data.categories));
      dispatch(setPriceRanges(response.data.priceRanges));
      dispatch(setBrandNames(response.data.brands));
      toast.success("data fetched!");
      return response.data;
    } catch (err) {
      // console.log("Error in fetchSuperCategoryBrandData", err);
      // toast.error("Something went wrong!");
      dispatch(setError(err));
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
};
