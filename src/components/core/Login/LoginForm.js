import React, { useState, useEffect, useCallback } from "react";
import CTAButton from "../../common/CTAButton";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { googleLogin, login } from "../../../services/operations/authAPI";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      dispatch(login(formData, navigate));
      setFormData({
        email: "",
        password: "",
      });
      setErrors({});
    }
  };

  const validateForm = (formData) => {
    const errors = {};
    if (!formData.email) {
      errors.email = "Email is required";
    }
    if (!formData.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const handleGoogleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    window.location.href = `${process.env.REACT_APP_BASE_URL}/auth/google`;
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-3 mt-4">
      <div className="flex flex-col justify-around">
        <label htmlFor="email" className="mb-1">
          Enter Email
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
        {errors.email && <span className="text-red-500">{errors.email}</span>}
      </div>

      <div className="flex flex-col justify-around">
        <label htmlFor="password" className="mb-1">
          Enter Password
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
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <IoEye /> : <IoEyeOff />}
          </button>
        </div>
        {errors.password && (
          <span className="text-red-500">{errors.password}</span>
        )}
      </div>

      <div className="flex flex-row space-x-2 justify-center">
        <CTAButton type={"submit"} text={"Login"} path={null} />
        <CTAButton
          type={"button"}
          text={"Forgot Password"}
          path={"/forgot-password"}
        />

        <Link to="#" onClick={handleGoogleClick}>
          <button className="flex items-center bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
            <FaGoogle className="mr-2" size={24} />
            Sign in with Google
          </button>
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
