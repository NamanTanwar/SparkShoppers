import React, { useState } from "react";
import RatingStars from "../../common/RatingStars";

const ProductDescription = ({
  productName,
  productTotalReviews,
  productAvgRating,
  productPrice,
  productDescription,
  productOptions,
  productQuantity,
  setSelectedProductOptions,
}) => {
  const [selectedOptions, setSelectedOptions] = useState({});

  const handleOptionClick = (optionType, option) => {
    setSelectedProductOptions((prevValue) => ({
      ...prevValue,
      [optionType]: option,
    }));
  };

  return (
    <div className="flex flex-col space-y-4 p-4">
      <h1 className="text-3xl font-bold">{productName}</h1>
      <div className="flex items-center space-x-2">
        <RatingStars avgRating={productAvgRating} starSize={20} />
        <div>{`(${productTotalReviews} Reviews)`}</div>
        <span>|</span>
        {productQuantity > 0 ? (
          <p className="text-green-600">In Stock</p>
        ) : (
          <p className="text-red-600">Out of Stock</p>
        )}
      </div>
      <h2 className="text-2xl font-semibold">Rs. {productPrice}</h2>
      <p className="text-gray-700">{productDescription}</p>
      <hr className="my-4" />
      <div className="flex flex-col space-y-2">
        {productOptions.options.map((productOption) => (
          <div key={productOption._id} className="flex flex-col space-y-1">
            <span className="font-medium">
              {productOption.name === "colorOption"
                ? "Color Options"
                : productOption.name === "sizeOption"
                ? "Size Options"
                : productOption.name}
              :
            </span>
            <div className="flex space-x-2">
              {productOption.name === "colorOption" &&
                productOption.values.map((color, index) => (
                  <div
                    key={index}
                    className={`w-6 h-6 rounded-full cursor-pointer ${
                      selectedOptions["colorOption"] === color
                        ? "ring-2 ring-blue-500"
                        : ""
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleOptionClick("colorOption", color)}
                  ></div>
                ))}
              {productOption.name === "sizeOption" &&
                productOption.values.map((size, index) => (
                  <div
                    key={index}
                    className={`w-8 h-8 flex items-center justify-center border rounded-md cursor-pointer ${
                      selectedOptions["sizeOption"] === size
                        ? "ring-2 ring-blue-500"
                        : ""
                    }`}
                    onClick={() => handleOptionClick("sizeOption", size)}
                  >
                    {size}
                  </div>
                ))}
              {productOption.name !== "colorOption" &&
                productOption.name !== "sizeOption" &&
                productOption.values.map((value, index) => (
                  <span
                    key={index}
                    className={`cursor-pointer ${
                      selectedOptions[productOption.name] === value
                        ? "font-bold underline"
                        : ""
                    }`}
                    onClick={() => handleOptionClick(productOption.name, value)}
                  >
                    {value}
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDescription;
