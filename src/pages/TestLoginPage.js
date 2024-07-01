import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import TestLoginImg from "../assets/TestLoginImg.png";
import { getTestLoginCredentials, login } from "../services/operations/authAPI";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const TestLoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showEmail, setShowEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Basic validation
    let newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
  };

  useEffect(() => {
    let fetchData = async () => {
      let response = await getTestLoginCredentials(
        setIsLoading,
        setEmail,
        setPassword
      );
    };

    fetchData();
  }, []);

  const handleTestLoginClick = () => {
    dispatch(
      login(
        {
          email: email,
          password: password,
        },
        navigate
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row items-center justify-center px-6 py-8 mx-auto">
      <div className="md:w-1/2 mb-12 md:mb-0 md:pr-8">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Welcome!</h1>
        <p className="text-lg text-gray-600 mb-8">
          Log in using the already provided credentials.
        </p>
        <img
          src={TestLoginImg}
          alt="Login"
          className="w-full max-w-md mx-auto rounded-lg shadow-lg"
        />
      </div>

      <div className="w-full md:w-1/2 bg-white rounded-lg shadow-xl p-8 max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">
          Test Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <div className="relative">
              <input
                type={showEmail ? "text" : "email"}
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="name@company.com"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowEmail(!showEmail)}
              >
                {showEmail ? (
                  <FaEyeSlash className="text-gray-400" />
                ) : (
                  <FaEye className="text-gray-400" />
                )}
              </button>
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-gray-400" />
                ) : (
                  <FaEye className="text-gray-400" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">{errors.password}</p>
            )}
          </div>
          {errors.form && <p className="text-sm text-red-600">{errors.form}</p>}
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            disabled={isLoading}
            onClick={handleTestLoginClick}
          >
            {isLoading ? "Loading" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TestLoginPage;
