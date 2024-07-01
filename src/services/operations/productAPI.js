import { apiConnector } from "../apiConnector";
import { toast } from "react-hot-toast";
import { productEndpoints } from "../apis";
import { isRouteErrorResponse } from "react-router-dom";

const {
  CREATE_PRODUCT_API,
  SEARCH_PRODUCT_API,
  GET_PRODUCT_DATA_API,
  GET_NEW_PRODUCTS_DATA_API,
  GET_BROWSE_USER_PAGE_DATA_API,
} = productEndpoints;

export const createProduct = async (formData, userToken) => {
  const toastId = toast.loading("Loading");
  try {
    let response = await apiConnector("POST", CREATE_PRODUCT_API, formData, {
      "Content-Type": "multipart/form-data",
      authorization: `Bearer ${userToken}`,
    });
    if (!response?.data?.success) {
      throw new Error(response.data?.message);
    }
    toast.success("Product Added Successfully");
    toast.dismiss(toastId);
    return response;
  } catch (err) {
    // console.log("Error in CREATE_PRODUCT_API service:", err);
    // console.log("Error message:", err.message);
    toast.error("Error in submitting form");
  }
  toast.dismiss(toastId);
};

export const getProducts = async (queryKey) => {
  try {
    //extracting searchQuery and page param
    const searchQuery = queryKey.queryKey[1];
    const pageParam = queryKey.pageParam;

    //filters here
    const filters = queryKey.queryKey[2];
    const filteringOption = queryKey.queryKey[3];
    //Constructing url
    let url = `${SEARCH_PRODUCT_API}?q=${searchQuery}&page=${pageParam}&limit=${10}`;
    //appending parameters
    if (filters) {
      if (filters.brands && filters.brands.length > 0) {
        url += `&brands=${filters.brands.join(",")}`;
      }
      if (filters.categories && filters.categories.length > 0) {
        let categoriesToFilter = filters.categories.map(
          (category) => category._id
        );
        url += `&categories=${categoriesToFilter.join(",")}`;
      }
      if (filters.priceRange) {
        url += `&price_start=${filters.priceRange.start}&price_end=${filters.priceRange.end}`;
      }
      if (filteringOption) {
        url += `&filter_option=${filteringOption}`;
      }
    }

    let response = await apiConnector("GET", url);
    return response.data;
  } catch (err) {
    //console.log("Error in getProducts service", err);
  }
};

export const fetchProductData = async (
  productId,
  fetchRelatedProducts,
  setLoading,
  setProductData,
  setError
) => {
  const toastId = toast.loading("Loading...");
  setError(false);
  setLoading(true);
  try {
    const response = await apiConnector(
      "POST",
      `${GET_PRODUCT_DATA_API}/${productId}`,
      {
        getRelatedProducts: fetchRelatedProducts,
      }
    );

    if (!response?.data?.success) {
      throw new Error(response?.data?.message);
    }

    const product = response.data.product;
    const relatedProducts = response.data.relatedProducts;

    toast.success("Product data fetched successfully");
    setLoading(false);
    setError(false);
    setProductData({
      product,
      relatedProducts,
    });
    return response;
  } catch (err) {
    // console.log("Error in fetchProductData service layer:", err);
    // console.log(err.message);
    toast.error("Error in fetching product");
    setError(err.message);
  } finally {
    setLoading(false);
    toast.dismiss(toastId);
  }
};

export const fetchNewProducts = async (
  setIsLoading,
  setError,
  setNewProducts
) => {
  const toastId = toast.loading("Loading....");
  try {
    setIsLoading(true);
    setError(null);
    const response = await apiConnector("GET", GET_NEW_PRODUCTS_DATA_API);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    // toast.success('New Products fetched successfully')
    setIsLoading(false);
    setNewProducts(response.data.newProducts);
    // console.log('response received:',response)
    return response.data.newProducts;
  } catch (err) {
    // console.log("err in fetNewProducts service:", err);
    setError(err.message);
    toast.error("Something went wrong!");
  } finally {
    toast.dismiss(toastId);
    setIsLoading(false);
  }
};

export const getBrowseUserViewData = async (
  setIsLoading,
  setData,
  setError
) => {
  const toastId = toast.loading();
  try {
    setError(null);
    setIsLoading(true);
    const response = await apiConnector("GET", GET_BROWSE_USER_PAGE_DATA_API);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    setIsLoading(false);
    setData(response.data.productData);
  } catch (err) {
    // console.log("Error occured at getBrowseUserView service:", err);
    toast.error("Something went wrong");
    setError(err);
  } finally {
    setIsLoading(false);
    toast.dismiss(toastId);
  }
};
