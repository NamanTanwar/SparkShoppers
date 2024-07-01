import React, { useState, useEffect } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaTruckFast } from "react-icons/fa6";
import { TbTruckReturn } from "react-icons/tb";
import { useLocation } from "react-router-dom";
import { fetchProductData } from "../services/operations/productAPI";
import ImageSection from "../components/core/ProductPage/ImageSection";
import ProductDescription from "../components/core/ProductPage/ProductDescription";
import RatingAndReviews from "../components/core/ProductPage/RatingAndReviews";
import RelatedProductsSection from "../components/core/ProductPage/RelatedProductsSection";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/core/Navbar/SidebarNav";
import Navbar from "../components/common/Navbar";
import { addItemToCart } from "../slices/cartSlice";
import { addItemToCartService } from "../services/operations/cartAPI";
import { toast } from "react-hot-toast";
import { addToWishlist } from "../slices/wishlistSlice";
import { addItemToWishlist } from "../services/operations/wishlistAPI";

const ProductPage = () => {
  //Initializing useLocation and
  //useDispatch hook
  const location = useLocation();
  const dispatch = useDispatch();
  //Importing from UI and auth slice
  const { showSidebar } = useSelector((state) => state.UI);
  const { isLoggedIn, accessToken } = useSelector((state) => state.auth);
  //Extrating productId from url
  const productId = location.pathname.split("/")[2];
  // State variables for managing product data, loading state, and user interactions
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productQuantity, setProductQuantity] = useState(1);
  const [selectedProductOptions, setSelectedProductOptions] = useState({});

  // useEffect hook to fetch product data when component mounts or productId changes
  useEffect(() => {
    (async () => {
      const response = await fetchProductData(
        productId,
        true,
        setLoading,
        setProductData,
        setError
      );
    })();
    //fetchProduct()
  }, [productId]);

  // Functions to handle quantity increment/decrement
  const handleProductCountInc = () => {
    if (productQuantity === 1) toast.error("Quantity should be at least 1");
    else setProductQuantity((prevValue) => prevValue - 1);
  };

  const handleProductCountDec = () => {
    if (productQuantity === productData.product.quantity)
      toast.error("Maximum quantity selected");
    else setProductQuantity((prevValue) => prevValue + 1);
  };
  // Function to handle adding item to cart
  const handleAddToCart = () => {
    let productToAdd = {
      _id: productData.product._id,
      name: productData.product.name,
      brand: productData.product.brand,
      cost: productData.product.cost,
      images: productData.product.images,
      ratingAndReviews: productData.product.ratingAndReviews,
      productOptions: selectedProductOptions,
    };
    if (!isLoggedIn) {
      dispatch(
        addItemToCart({
          product: productToAdd,
          productQuantity: productQuantity,
        })
      );
      toast.success("Item added to cart successsfully");
    } else {
      dispatch(
        addItemToCartService(
          productData.product._id,
          accessToken.token,
          selectedProductOptions,
          productQuantity
        )
      );
    }
  };
  // Function to handle adding item to wishlist
  const handleAddToWishlist = () => {
    if (!isLoggedIn) {
      let productToAdd = {
        _id: productData.product._id,
        name: productData.product.name,
        brand: productData.product.brand,
        cost: productData.product.cost,
        images: productData.product.images,
        ratingAndReviews: productData.product.ratingAndReviews,
      };
      dispatch(addToWishlist(productToAdd));
    } else {
      dispatch(addItemToWishlist(productData.product._id, accessToken.token));
    }
  };

  return (
    <div>
      {
        //conditionally render sidebar
        showSidebar && <Sidebar />
      }
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Product PAGE</h1>
        {productData && (
          <>
            <div className="flex flex-col lg:flex-row mb-8">
              <ImageSection images={productData.product.images} />
              <div className="flex flex-col lg:w-1/2 space-y-4">
                <ProductDescription
                  productName={productData.product.name}
                  productTotalReviews={
                    productData.product.ratingAndReviews.length
                  }
                  productAvgRating={4}
                  productPrice={productData.product.cost}
                  productDescription={productData.product.description}
                  productOptions={productData.product.productOptions}
                  productQuantity={productData.product.quantity}
                  setSelectedProductOptions={setSelectedProductOptions}
                />
                {/* Quantity selector and Add to Cart/Wishlist buttons */}
                <div className="flex flex-row items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <button
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                      onClick={handleProductCountInc}
                    >
                      -
                    </button>
                    <button className="px-4 py-2 border">
                      {productQuantity}
                    </button>
                    <button
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded"
                      onClick={handleProductCountDec}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={handleAddToWishlist}
                    className="ml-2 border rounded px-4 py-2 hover:bg-gray-200"
                  >
                    <FaRegHeart />
                  </button>
                </div>
                {/* Delivery and Returns information */}
                <div className="mb-8">
                  <div className="flex items-center mb-4 border p-4 rounded-lg">
                    <FaTruckFast className="mr-2 text-2xl" />
                    <div>
                      <h3 className="font-semibold">Free Delivery</h3>
                      <p>Enter your postal code for Delivery Availability</p>
                    </div>
                  </div>
                  <div className="flex items-center border p-4 rounded-lg">
                    <TbTruckReturn className="mr-2 text-2xl" />
                    <div>
                      <h3 className="font-semibold">Free Returns</h3>
                      <p>Enter your postal code for Returns Availability</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {productData && (
              <RatingAndReviews
                ratingAndReviews={productData.product.ratingAndReviews}
              />
            )}
          </>
        )}
        <div>
          {productData && (
            <RelatedProductsSection
              relatedProducts={productData.relatedProducts}
              itemsToShow={4}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
