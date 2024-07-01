import React, { useState } from "react";
import { toast } from "react-hot-toast";

const ImageUpload = ({
  selectedImages,
  setSelectedImages,
  formData,
  setFormData,
}) => {
  const [imageUrls, setImageUrls] = useState([]);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    //Converting filelist to array
    const newImages = Array.from(e.target.files);
    if (newImages.length > 4) {
      toast.error("You can only select a maximum of 4 images");
      return;
    }

    const updatedImages = [...selectedImages, ...newImages];
    setSelectedImages(updatedImages.slice(0, 4));

    setFormData((prevData) => ({
      ...prevData,
      images: updatedImages.slice(0, 4),
    }));

    const newImageUrls = updatedImages.map((image) =>
      URL.createObjectURL(image)
    );
    setImageUrls(newImageUrls);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closePreview = () => {
    setSelectedImage(null);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Image Preview */}
      {selectedImage !== null && (
        <div className="mb-6">
          <div className="relative">
            <img
              src={selectedImage}
              alt="Selected preview"
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
            <button
              onClick={() => closePreview()}
              className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Upload Section */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">
          Upload Images
        </h3>
        <label className="flex items-center justify-center px-4 py-6 bg-gray-100 text-gray-600 rounded-lg border-2 border-dashed border-gray-300 hover:bg-gray-200 transition-colors cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <span className="text-sm font-medium">
            Choose files or drag and drop
          </span>
          <input
            type="file"
            multiple
            name="image"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {imageUrls.map((imageUrl, idx) => (
          <div
            key={idx}
            className={`relative cursor-pointer group ${
              selectedImage === imageUrl ? "ring-2 ring-blue-500" : ""
            }`}
            onClick={() => handleImageClick(imageUrl)}
          >
            <img
              src={imageUrl}
              alt={`Uploaded image ${idx + 1}`}
              className="w-full h-24 object-cover rounded-md shadow-sm"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-md flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
