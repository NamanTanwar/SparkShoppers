import React, { useState, useEffect } from "react";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";
import ProductCard from "./ProductCard";

const Carousal = ({ items, itemsInView }) => {
  const [startIdx, setStartIdx] = useState(0);
  const [endIdx, setEndIdx] = useState(itemsInView - 1);

  const handleClickLeft = () => {
    if (startIdx === 0) {
      return;
    }
    setStartIdx((prevStartIdx) => prevStartIdx - 1);
    setEndIdx((prevEndIdx) => prevEndIdx - 1);
  };

  const handleClickRight = () => {
    if (endIdx === items.length - 1) {
      return;
    }
    setStartIdx((prevStartIdx) => prevStartIdx + 1);
    setEndIdx((prevEndIdx) => prevEndIdx + 1);
  };

  useEffect(() => {
    //ensure endIdx does not exceed the array length
    if (startIdx + itemsInView > items.length)
      setStartIdx(items.length - itemsInView);
  }, [startIdx, items.length, itemsInView]);

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row items-center space-x-4">
        <button
          onClick={handleClickLeft}
          className="text-2xl hover:text-gray-600"
        >
          <FaChevronCircleLeft />
        </button>
        <div className="">
          <div className="flex space-x-4 transition-transform duration-300 ease-in-out">
            {items &&
              items
                .slice(startIdx, endIdx + 1)
                .map((item, idx) => (
                  <ProductCard
                    key={item._id}
                    product={item}
                    height={"340px"}
                    width={"300px"}
                  />
                ))}
          </div>
        </div>
        <button
          onClick={handleClickRight}
          className="text-2xl hover:text-gray-600"
        >
          <FaChevronCircleRight />
        </button>
      </div>
    </div>
  );
};

export default Carousal;
