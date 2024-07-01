import React, { useState } from "react";
import CTAButton from "../../common/CTAButton";
import { useDispatch } from "react-redux";
import { signup } from "../../../services/operations/authAPI";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignupForm = () => {
  //Initializing useDispatch and useNavigate hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //State for formData
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  //State for errors forms
  const [errors, setErrors] = useState({});
  //States for show password and confirmPassword fields to user
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  //Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  //Handle form submission
  const handleSubmit = (e) => {
    //Prevent default submit behaviour
    e.preventDefault();
    //Set errors to empty object
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      //Dispatch signup action if no errors exist
      dispatch(
        signup(
          formData.firstname,
          formData.lastname,
          formData.email,
          formData.password,
          navigate
        )
      );
      //Reset form data after dispatch
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      //Reset errors
      setErrors({});
    }
  };

  //Validate form data
  const validateForm = (data) => {
    let formErrors = {};
    //Validation for each field
    if (!data.firstname) {
      formErrors.firstname = "First name is required";
    }

    if (!data.lastname) {
      formErrors.lastname = "Last name is required";
    }

    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      formErrors.email = "Valid email is required";
    }

    if (!data.password || data.password.length < 6) {
      formErrors.password = "Password must be at least 6 characters";
    }

    if (data.password !== data.confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match";
    }

    return formErrors;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center space-y-4 w-full max-w-md mx-auto mb-6"
    >
      {/* First Name Input */}
      <div className="flex flex-col w-full">
        <label htmlFor="firstname" className="text-gray-600 mb-1">
          First Name <span className="text-red-500">*</span>:
        </label>
        <input
          type="text"
          name="firstname"
          id="firstname"
          value={formData.firstname}
          onChange={handleChange}
          className={`border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 ${
            errors.firstname ? "border-red-500" : ""
          }`}
        />
        {/*Rendering errors if present */}
        {errors.firstname && (
          <span className="text-red-500">{errors.firstname}</span>
        )}
      </div>
      {/* Last Name Input */}
      <div className="flex flex-col w-full">
        <label htmlFor="lastname" className="text-gray-600 mb-1">
          Last Name <span className="text-red-500">*</span>:
        </label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          value={formData.lastname}
          onChange={handleChange}
          className={`border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 ${
            errors.lastname ? "border-red-500" : ""
          }`}
        />
        {/*Rendering errors if present */}
        {errors.lastname && (
          <span className="text-red-500">{errors.lastname}</span>
        )}
      </div>
      {/* Email Input */}
      <div className="flex flex-col w-full">
        <label htmlFor="email" className="text-gray-600 mb-1">
          Email <span className="text-red-500">*</span>:
        </label>
        <input
          type="text"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className={`border border-gray-300 rounded-md p-2 focus:outline-none focus:border-blue-500 ${
            errors.email ? "border-red-500" : ""
          }`}
        />
        {/*Rendering errors if present */}
        {errors.email && <span className="text-red-500">{errors.email}</span>}
      </div>
      {/* Password Input */}
      <div className="flex flex-col w-full">
        <label htmlFor="password" className="text-gray-600 mb-1">
          Password <span className="text-red-500">*</span>:
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className={`border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500 ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          {/* Toggle password visibility button */}
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.password && (
          <span className="text-red-500">{errors.password}</span>
        )}
      </div>
      {/* Confirm Password Input */}
      <div className="flex flex-col w-full">
        <label htmlFor="confirmPassword" className="text-gray-600 mb-1">
          Confirm Password <span className="text-red-500">*</span>:
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:border-blue-500 ${
              errors.confirmPassword ? "border-red-500" : ""
            }`}
          />
          {/* Toggle show password visibility button */}
          <button
            type="button"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword}</span>
        )}
      </div>
      {/* Submit Button and Login Link */}
      <div className="flex flex-col w-full items-center">
        <CTAButton type={"submit"} text={"Sign Up"} />
        <div className="flex flex-row items-center space-x-2 mt-4">
          <p>Already have an account?</p>
          <CTAButton text="Login" />
        </div>
      </div>
    </form>
  );
};

export default SignupForm;
