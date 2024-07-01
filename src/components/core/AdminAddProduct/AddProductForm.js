import React, { useState, useEffect } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import { useDispatch, useSelector } from "react-redux";
import { getSuperCategories } from "../../../services/operations/categoryAPI";
import ImageUpload from "./ImageUpload";
import { createProduct } from "../../../services/operations/productAPI";

const AddProductForm = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    superCategory: "",
    cost: 0,
    quantity: 0,
    brand: "",
    sizeOption: [],
    weightOption: [],
    gender: null,
    colorOption: [],
    images: [],
  });

  const { superCategories } = useSelector((state) => state.category);

  const [selectedImages, setSelectedImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useColor("");
  const [colorList, setColorList] = useState([]);
  const [size, setSize] = useState("");
  const [sizeList, setSizeList] = useState([]);
  const [weight, setWeight] = useState("");
  const [weightList, setWeightList] = useState([]);
  const [isGenderApplicable, setIsGenderApplicable] = useState(false);
  const [gender, setGender] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSuperCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setFormData((prevData) => ({
      ...prevData,
      superCategory: e.target.value,
    }));
  };

  const fetchSuperCategories = async () => {
    dispatch(getSuperCategories());
    return;
  };

  useEffect(() => {
    fetchSuperCategories();
  }, []);

  const handleGenderChange = (gender) => {
    setGender(gender);
  };

  const handleGenderApplicability = (isApplicable) => {
    setIsGenderApplicable(isApplicable);
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const addToWeightList = (e) => {
    e.preventDefault();
    if (weight !== "" && !weightList.includes(weight)) {
      setWeightList((prevList) => [...prevList, weight]);
      setWeight("");
    }
  };

  const removeFromWeightList = (idx) => {
    setWeightList((prevList) => prevList.filter((_, i) => i !== idx));
    setFormData((prevData) => ({
      ...prevData,
      weightOption: weightList,
    }));
  };

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  const addColor = (e) => {
    e.preventDefault();
    let newColor = color.hex;
    if (!colorList.includes(newColor)) {
      setColorList((prevList) => [...prevList, newColor]);
    }
    setFormData((prevData) => ({
      ...prevData,
      colorOption: colorList,
    }));
  };

  const addToSizeList = (e) => {
    e.preventDefault();
    if (size !== "") {
      let inputSize = size.trim().toUpperCase();
      setSizeList((prevSizeList) => [...prevSizeList, inputSize]);
    }
    setSize("");
    setFormData((prevData) => ({
      ...prevData,
      sizeOption: sizeList,
    }));
  };

  const removeFromSizeList = (idx) => {
    setSizeList((prevList) => prevList.filter((_, i) => i !== idx));
    setFormData((prevData) => ({
      ...prevData,
      sizeOption: sizeList,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const productResponse = await createProduct(formData, accessToken.access);
      setFormData({
        name: "",
        description: "",
        category: "",
        superCategory: "",
        cost: 0,
        quantity: 0,
        brand: "",
      });
    } catch (err) {
      // console.log("Error  in Submitting Product", err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 p-6 rounded-lg shadow-lg"
    >
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Add New Product</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* General Information */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            General Information
          </h2>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter product name..."
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Product Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={4}
              onChange={handleChange}
              value={formData.description}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <input
              type="text"
              name="category"
              id="category"
              onChange={handleChange}
              value={formData.category}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Category..."
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Supercategory
            </label>
            <select
              onChange={handleSuperCategoryChange}
              value={formData.superCategory}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {superCategories.map((superCategory) => (
                <option key={superCategory._id} value={superCategory._id}>
                  {superCategory.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Pricing and Stock */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Pricing and Stock
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="cost"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Base Price
              </label>
              <input
                type="number"
                name="cost"
                id="cost"
                value={formData.cost}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label
                htmlFor="quantity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Stock
              </label>
              <input
                type="number"
                name="quantity"
                id="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div className="bg-white p-6 rounded-lg shadow col-span-full">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Product Images
          </h2>
          <ImageUpload
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
            formData={formData}
            setFormData={setFormData}
          />
        </div>

        {/* Brand and Options */}
        <div className="bg-white p-6 rounded-lg shadow col-span-full">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Brand and Options
          </h2>

          <div className="mb-4">
            <label
              htmlFor="brand"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Brand Name
            </label>
            <input
              type="text"
              name="brand"
              id="brand"
              value={formData.brand}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sizes */}
            <div>
              <h3 className="text-lg font-medium mb-2">Sizes</h3>
              <div className="flex mb-2">
                <input
                  type="text"
                  name="size"
                  id="size"
                  value={size}
                  onChange={handleSizeChange}
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Size (e.g. S,M,L,XL,15,16,etc)"
                />
                <button
                  onClick={addToSizeList}
                  className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Add
                </button>
              </div>
              <ul className="flex flex-wrap gap-2">
                {sizeList.map((size, idx) => (
                  <li
                    key={idx}
                    className="bg-gray-200 px-2 py-1 rounded flex items-center"
                  >
                    <span>{size}</span>
                    <button
                      onClick={() => removeFromSizeList(idx)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Colors */}
            <div>
              <h3 className="text-lg font-medium mb-2">Colors</h3>
              <ColorPicker color={color} onChange={setColor} />
              <button
                onClick={addColor}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Add Color
              </button>
              <div className="flex flex-wrap gap-2 mt-2">
                {colorList.map((color, idx) => (
                  <div
                    key={idx}
                    style={{ backgroundColor: color }}
                    className="h-8 w-8 rounded-full shadow"
                  ></div>
                ))}
              </div>
            </div>

            {/* Weights */}
            <div>
              <h3 className="text-lg font-medium mb-2">Weights</h3>
              <div className="flex mb-2">
                <input
                  type="text"
                  name="weight"
                  id="weight"
                  value={weight}
                  onChange={handleWeightChange}
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter Weight"
                />
                <button
                  onClick={addToWeightList}
                  className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Add
                </button>
              </div>
              <ul className="flex flex-wrap gap-2">
                {weightList.map((weight, idx) => (
                  <li
                    key={idx}
                    className="bg-gray-200 px-2 py-1 rounded flex items-center"
                  >
                    <span>{weight}</span>
                    <button
                      onClick={() => removeFromWeightList(idx)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Gender */}
            <div>
              <h3 className="text-lg font-medium mb-2">Gender</h3>
              <label className="flex items-center mb-2">
                <input
                  type="checkbox"
                  checked={isGenderApplicable}
                  onChange={(e) => handleGenderApplicability(e.target.checked)}
                  className="mr-2"
                />
                Is gender applicable
              </label>
              {isGenderApplicable && (
                <div className="flex gap-4">
                  {["male", "female", "unisex"].map((g) => (
                    <label key={g} className="flex items-center">
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={gender === g}
                        onChange={(e) => handleGenderChange(e.target.value)}
                        className="mr-1"
                      />
                      {g.charAt(0).toUpperCase() + g.slice(1)}
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-blue-500 text-white py-3 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Product
      </button>
    </form>
  );
};

export default AddProductForm;
