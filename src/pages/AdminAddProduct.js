import React from "react";
import AddProductForm from "../components/core/AdminAddProduct/AddProductForm";
import { useNavigate } from "react-router-dom";

const AdminAddProduct = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center bg-gray-100 py-2 rounded">
        Welcome Admin
      </h1>
      <div className="flex flex-row space-x-4">
        <button
          onClick={() => navigate("/admin-dashboard")}
          className="w-full mb-6 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition duration-300"
        >
          Navigate To Dashboard
        </button>
        <button
          onClick={() => navigate("/")}
          className="w-full mb-6 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition duration-300"
        >
          Navigate to Home
        </button>
      </div>

      {/* form */}
      <AddProductForm />
    </div>
  );
};

export default AdminAddProduct;
