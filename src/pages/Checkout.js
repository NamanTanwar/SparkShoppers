import React, { useState, useRef } from "react";
import AddressDetailsForm from "../components/core/Checkout/AddressDetailsForm";
import CartView from "../components/core/Checkout/CartView";
import { useDispatch, useSelector } from "react-redux";
import { capturePayment } from "../services/operations/paymentAPI";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const { accessToken } = useSelector((state) => state.auth);

  //State for address data
  const [addressData, setAddressData] = useState({
    firstName: "",
    streetName: "",
    apartmentFloor: "",
    city: "",
    phoneNumber: "",
    email: "",
  });
  //Refs for form inputs
  const inputRefs = {
    firstName: useRef(null),
    streetName: useRef(null),
    apartmentFloor: useRef(null),
    city: useRef(null),
    phoneNumber: useRef(null),
    email: useRef(null),
  };
  //Form validation
  const validateForm = () => {
    let hasErrors = false;
    let newErrors = {};

    if (addressData.firstName.trim() === "") {
      hasErrors = true;
      newErrors.firstName = "First name is required";
    }
    if (addressData.streetName.trim() === "") {
      hasErrors = true;
      newErrors.streetName = "Street Name is required";
    }
    if (addressData.apartmentFloor.trim() === "") {
      hasErrors = true;
      newErrors.apartmentFloor = "apartment floor is required";
    }
    if (addressData.city.trim() === "") {
      hasErrors = true;
      newErrors.city = "City is required";
    }
    if (addressData.phoneNumber.trim() === "") {
      hasErrors = true;
      newErrors.phoneNumber = "Phone Number is required";
    }
    if (addressData.email.trim() === "") {
      hasErrors = true;
      newErrors.email = "Email address is required";
    }
    return { hasErrors, newErrors };
  };

  const handleCapturePayment = (e) => {
    e.preventDefault();

    const { hasErrors, newErrors } = validateForm();

    if (hasErrors) {
      let firstErrorField = Object.keys(newErrors).find(
        (field) => newErrors[field]
      );

      if (firstErrorField) {
        const inputElement =
          firstErrorField === "firstName"
            ? inputRefs.firstName.current
            : firstErrorField === "streetName"
            ? inputRefs.streetName.current
            : firstErrorField === "apartmentFloor"
            ? inputRefs.apartmentFloor.current
            : firstErrorField === "city"
            ? inputRefs.city.current
            : firstErrorField === "phoneNumber"
            ? inputRefs.phoneNumber.current
            : inputRefs.email.current;

        inputElement.focus();
      }
      return;
    }

    //Process payment
    capturePayment(addressData, accessToken.token, navigate, dispatch);
  };

  return (
    //Main container with responsive padding
    <div className="p-4 md:p-8 lg:p-12 bg-gray-100 min-h-screen">
      {/* Page title */}
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Checkout
      </h1>
      {/* Page title */}
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        {/* Flex container for layout */}
        <div className="flex-1 mb-8 lg:mb-0 bg-white p-6 rounded-lg shadow-md">
          {/* Billing details section */}
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            Billing Details
          </h2>
          <AddressDetailsForm
            addressData={addressData}
            setAddressData={setAddressData}
            inputRefs={inputRefs}
          />
        </div>
        {/* Cart view and order button section */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <CartView />
          <button
            type="submit"
            onClick={handleCapturePayment}
            className="mt-8 w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:-translate-y-1"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
