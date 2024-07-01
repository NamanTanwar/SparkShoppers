import { apiConnector } from "../apiConnector";
import { toast } from "react-hot-toast";
import { userEndpoints } from "../apis";

const {
  GET_USER_ORDER_HISTORY,
  ADD_USER_RATING_AND_REVIEW_API,
  GET_USER_RATING_AND_REVIEW_API,
  SUBMIT_CONTACT_US_FORM,
  SEND_FORGOT_PASSWORD_EMAIL,
} = userEndpoints;

export const getUserOrderHistory = async (userToken) => {
  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector("GET", GET_USER_ORDER_HISTORY, null, {
      authorization: `Bearer ${userToken}`,
    });

    toast.success("Orders fetched successfully");
    return response.data.orderDetails;
  } catch (err) {
    toast.error("Somenthing went wrong");
  } finally {
    toast.dismiss(toastId);
  }
};

export const addRatingAndReview = async (
  userToken,
  rating,
  review,
  productId
) => {
  try {
    const response = await apiConnector(
      "POST",
      ADD_USER_RATING_AND_REVIEW_API,
      {
        rating,
        userToken,
        review,
        productId,
      },
      {
        authorization: `Bearer ${userToken}`,
      }
    );
    return response;
  } catch (err) {
    // console.log("Error in addRatingAndReview service:", err);
    throw err;
  }
};

export const getUserReviews = async (userToken) => {
  try {
    const response = await apiConnector(
      "POST",
      GET_USER_RATING_AND_REVIEW_API,
      {
        userToken,
      }
    );
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    // console.log('response is:',response)
    return response.data.reviews;
  } catch (err) {
    // console.log("Error in getUserReview service:", err);
    throw err;
  }
};

export const submitContactForm = async (formData, setLoading) => {
  const toastId = toast.loading("Loading...");
  try {
    setLoading(true);
    const response = await apiConnector(
      "POST",
      SUBMIT_CONTACT_US_FORM,
      formData
    );

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Form Submitted Successfully");
    toast.dismiss(toastId);
    setLoading(false);
  } catch (err) {
    //console.log("Error in submitContactForm:", err);
    toast.error("Something went wrong");
  } finally {
    toast.dismiss(toastId);
    setLoading(false);
  }
};

export const sendForgotPasswordEmail = async (
  email,
  setLoading,
  navigate,
  setShowConfirmation
) => {
  const toastId = toast.loading("Loading...");
  try {
    setLoading(true);
    const response = await apiConnector("POST", SEND_FORGOT_PASSWORD_EMAIL, {
      email,
    });
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    setLoading(false);
    toast.success("Verification Email sent Successfully");
    toast.success("Kindly check your registered email");
    setShowConfirmation(true);
    return;
  } catch (err) {
    // console.log("Error in sendForgotPasswordEmail:", err);
    toast.error("Something went wrong");
  } finally {
    toast.dismiss(toastId);
    setLoading(false);
  }
};
