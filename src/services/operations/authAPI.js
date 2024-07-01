import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { authEndpoints } from "../apis";
import { setLoading } from "../../slices/categorySlice";
import {
  setAccessToken,
  setIsLoggedIn,
  setUser,
  setTempOtpId,
} from "../../slices/authSlice";
import { handleLogout } from "../../slices/authSlice";
import { setShowLogoutModal } from "../../slices/UISlice";
import { setWishlistItems, clearWishlist } from "../../slices/wishlistSlice";
import { setCart, setTotalPrice, clearCart } from "../../slices/cartSlice";

//Auth API Endpoints
const {
  SEND_OTP_API,
  SIGNUP_API,
  LOGIN_API,
  LOGOUT_API,
  RESET_PASSWORD_API,
  GET_GOOGLE_AUTH_INFO_API,
  RESEND_OTP_TO_USER_API,
  GET_TEST_LOGIN_CREDENTIALS,
} = authEndpoints;

export const signup = (firstname, lastname, email, password, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      //Call to send OTP API -> first step of signup
      const response = await apiConnector(
        "POST",
        SEND_OTP_API,
        {
          firstname,
          lastname,
          email,
          password,
        },
        { "Content-Type": "application/json" }
      );
      //Unsuccessfull Response
      if (!response?.data?.success) {
        throw new Error(response.data?.message);
      }
      //Successfull Response
      dispatch(setLoading(false));
      dispatch(setTempOtpId(response.data.tempOtpKey));
      toast.success("Form submitted successfully");
      navigate("/verify-otp");
    } catch (err) {
      // console.log("Error in signup service:",err)
      toast.error(err.message || "Something went wrong");
    } finally {
      dispatch(setLoading(false));
      toast.dismiss(toastId);
    }
  };
};

export const sendOtp = (otp, tempOtpId, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    //Signup via OTP Verification->2nd step of signup
    try {
      const response = await apiConnector(
        "POST",
        SIGNUP_API,
        {
          otp,
          tempOtpId,
        },
        { "Content-Type": "application/json" }
      );
      //Unsuccessfull Response
      if (!response?.data?.success) {
        throw new Error(response.data?.message);
      }
      //setting user details and accessToken in localstorage
      dispatch(setUser(response.data.userResponse));
      dispatch(setAccessToken(response.data.accessToken.access));
      //navigate user to login
      navigate("/login");
    } catch (err) {
      toast.error(err.message || "Error occured");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
};

export const login = (data, navigate) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    dispatch(setLoading(true));
    try {
      let response = await apiConnector("POST", LOGIN_API, data, {
        "Content-Type": "application/json",
      });
      //Unsuccessfull login
      if (!response?.data?.success) {
        throw new Error(response?.data?.message);
      }
      //Updated user login status and
      //setting user details and accessToken in localstorage
      dispatch(setIsLoggedIn(true));
      dispatch(setUser(response.data.userResponse));
      dispatch(setAccessToken(response.data.accessToken.access));
      dispatch(setWishlistItems(response.data.userResponse.userWishlist));
      dispatch(setCart(response.data.userResponse.userCart));
      dispatch(setTotalPrice(response.data.userResponse.cartTotal));
      toast.success("Login success");
      //Navigate to search-product page on successfull login
      navigate("/search-product");
    } catch (err) {
      // console.log("Error in login service:",err)
      toast.error(err.message || "Error occured");
    }
    toast.dismiss(toastId);
    dispatch(setLoading(false));
  };
};

export const logout = (data, navigate) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const toastId = toast.loading("Loading...");
    try {
      const response = await apiConnector("POST", LOGOUT_API, data, {
        "Content-Type": "application/json",
      });

      if (!response?.data?.success) {
        throw new Error(response.data?.message);
      }

      //setting state tot initial state
      dispatch(handleLogout());
      dispatch(clearWishlist());
      dispatch(clearCart());
      //removing persisited data stored by redux-persist
      localStorage.removeItem("persist-root");
      toast.success("Logout Successfull!");
      dispatch(setShowLogoutModal(false));
      navigate("/");
    } catch (err) {
      //console.log("Error in logout api:",err)
      toast.error(err.message || "Error occured");
    }
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
};

export const resetUserPassword = async (
  password,
  confirmPassword,
  token,
  setLoading,
  navigate
) => {
  const toastId = toast.loading("Loading...");
  try {
    setLoading(true);
    const response = await apiConnector("POST", RESET_PASSWORD_API, {
      password,
      confirmPassword,
      token,
    });
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Password reset successfully");
    setLoading(false);
    navigate("/login");
  } catch (err) {
    //console.log('Error occured in resetUserPassword api:',err)
    toast.error("Something went wrong!");
  } finally {
    toast.dismiss(toastId);
    setLoading(false);
  }
};

export const getGoogleAuthInfo = (token, navigate, setIsLoading) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");
    try {
      setIsLoading(true);
      const response = await apiConnector("POST", GET_GOOGLE_AUTH_INFO_API, {
        token,
      });
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      setIsLoading(false);
      toast.success("redirecting");
      dispatch(setIsLoggedIn(true));
      dispatch(setUser(response.data.userResponse));
      dispatch(setAccessToken(response.data.accessToken.access));
      dispatch(setWishlistItems(response.data.userResponse.userWishlist));
      dispatch(setCart(response.data.userResponse.userCart));
      dispatch(setTotalPrice(response.data.userResponse.cartTotal));
      navigate("/");
    } catch (err) {
      //console.log("Error in getGoogleAuthInfo service", err);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
      toast.dismiss(toastId);
    }
  };
};

export const resendOtpToUser = (tempOtpId) => {
  return async (dispatch) => {
    const toastId = toast.loading("Loading");
    try {
      setLoading(true);
      const response = await apiConnector("POST", RESEND_OTP_TO_USER_API, {
        tempOtpId,
      });
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
      setLoading(false);
      toast.success("OTP resend successfully");
      dispatch(setTempOtpId(response.data.key));
    } catch (err) {
      //console.log('Error occured at resentOtpToUser api',err)
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      toast.dismiss(toastId);
    }
  };
};

export const getTestLoginCredentials = async (
  setIsLoading,
  setEmail,
  setPassword
) => {
  const toastId = toast.loading("Loading...");
  try {
    setIsLoading(false);
    const response = await apiConnector("GET", GET_TEST_LOGIN_CREDENTIALS);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    setEmail(response.data.email);
    setPassword(response.data.password);
    setLoading(false);
    toast.dismiss(toastId);
    return {
      email: response.data.email,
      password: response.data.password,
    };
  } catch (err) {
    //console.log('Error occured at getTestLoginCredentials service:',err)
    toast.error("Something went wrong");
  } finally {
    setLoading(false);
    toast.dismiss(toastId);
  }
};
