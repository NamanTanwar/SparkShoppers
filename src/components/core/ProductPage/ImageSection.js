import React, { useState } from 'react';

const ImageSection = ({ images }) => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  return (
    <div className="flex flex-col lg:flex-row lg:space-x-4 mb-4 lg:mb-0">
      {/* Large screens */}
      <div className="hidden lg:flex lg:flex-col lg:w-1/4 lg:space-y-3 mb-4 lg:mb-0">
        {images.map((image, idx) => (
          <img 
            key={idx} 
            src={image} 
            className="cursor-pointer border-2 border-transparent hover:border-blue-500" 
            onClick={() => setActiveImageIdx(idx)} 
          />
        ))}
      </div>
      <div className="hidden lg:flex lg:w-3/4">
        <img 
          src={images[activeImageIdx]} 
          className="border rounded-lg w-full object-cover" 
          style={{ width: '500px', height: '600px' }} 
        />
      </div>
      {/* Small and medium screens */}
      <div className="lg:hidden flex flex-col space-y-3">
        <img 
          src={images[activeImageIdx]} 
          className="border rounded-lg w-full object-cover mb-4" 
          style={{ height: '400px' }} 
        />
        <div className="flex space-x-3 overflow-x-auto">
          {images.map((image, idx) => (
            <img 
              key={idx} 
              src={image} 
              className="cursor-pointer border-2 border-transparent hover:border-blue-500 w-20 h-20 md:w-24 md:h-24" 
              onClick={() => setActiveImageIdx(idx)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ImageSection;
