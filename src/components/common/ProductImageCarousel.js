import React, { useState, useEffect } from "react";

const ProductImageCarousel = ({
  images,
  width = "200px",
  height = "200px",
}) => {
  //State to keep track of the current image index
  const [imageToShowIdx, setImageToShowIdx] = useState(0);

  //State to keep track if the user is hovering over the carousal
  const [isHovering, setIsHovering] = useState(false);
  //Duration between image transistions (in milliseconds)
  const intervalDuration = 500;

  //Function to move to the next image
  const handleNext = () => {
    setImageToShowIdx((prevValue) => (prevValue + 1) % images.length);
  };

  //Effect ti handle automatic image rotation when hovering
  useEffect(() => {
    let intervalId;

    if (isHovering) {
      //Start the interval while hovering
      intervalId = setInterval(() => handleNext(), intervalDuration);
    } else {
      //Clear interval if not hovering
      clearInterval(intervalId);
    }
    //cleanup to clear interval and set image to show to initial state
    return () => {
      clearInterval(intervalId);
      setImageToShowIdx(0);
    };
  }, [isHovering]);

  return (
    <div
      className="relative flex justify-center items-center"
      style={{ width, height }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <img
        src={images[imageToShowIdx]}
        alt={`Product image ${imageToShowIdx}`}
        className="object-contain w-full h-full"
      />
    </div>
  );
};

export default ProductImageCarousel;
