import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { paymentEndpoints } from "../apis";
import { setOrderId } from "../../slices/paymentSlice";

const { CAPTURE_PAYMENT_API, GET_ORDER_DETAILS } = paymentEndpoints;

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };

    document.body.appendChild(script);
  });
}

const initiateRazorpayPayment = (
  orderId,
  amount,
  currency,
  userToken,
  navigate,
  dispatch
) => {
  const options = {
    key: process.env.REACT_APP_RAZORPAY_KEY,
    amount: amount,
    currency: currency,
    name: "SparkShoppers",
    description: "Test transaction",
    order_id: orderId,
    checkout: {
      method: {
        netbanking: 1,
        card: 1,
        upi: 1,
        wallet: 0,
      },
    },
    handler: async (response) => {
      toast.success("Payment verified succssfully");
      dispatch(setOrderId(orderId));
      navigate("/payment-success");
    },
    theme: {
      color: "#F37254",
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.open();
  paymentObject.on("payment.failed", (response) => {
    toast.error("oops, payment failed");
  });
};

export const capturePayment = async (
  formData,
  userToken,
  navigate,
  dispatch
) => {
  const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
  if (!res) {
    toast.error("Razorpay SDK failed to load");
    return;
  }

  const toastId = toast.loading("Loading...");
  try {
    const response = await apiConnector(
      "POST",
      CAPTURE_PAYMENT_API,
      {
        formData,
        userToken,
      },
      {
        authorization: `Bearer ${userToken}`,
      }
    );
    //Successfull payment capture
    if (response.data.success) {
      toast.success("Payment captured successfully");
    }
    const { orderId, amount, currency } = response.data;

    initiateRazorpayPayment(
      orderId,
      amount,
      currency,
      userToken,
      navigate,
      dispatch
    );

    toast.dismiss(toastId);
    return;
  } catch (err) {
    // console.log("Error in capture payment service:", err);
    toast.error("Error occured");
  } finally {
    toast.dismiss(toastId);
  }
};

export const getOrderDetails = async (orderId, setLoading, setError) => {
  const toastId = toast.loading("Loading...");
  try {
    setLoading(true);
    setError(null);
    const response = await apiConnector("POST", GET_ORDER_DETAILS, {
      orderId,
    });
    if (!response.data.success) {
      throw new Error(response.data.message);
    }
    toast.success("Order details fetched successfully");
    setLoading(false);
    return response;
  } catch (err) {
    //console.log('Error in getOrderDetails:',err)
    toast.err("Something went wrong");
    setError(err);
  } finally {
    setLoading(false);
    toast.dismiss(toastId);
  }
};
