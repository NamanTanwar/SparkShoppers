import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../common/ProductCard";
import { fetchSuperCategoryPageData } from "../../../services/operations/superCategoryAPI";

const ProductList = ({ categoryName, selectedOption }) => {
  //Ref for intersection observer
  const observerRef = useRef(null);
  const lastProductRef = useRef(null);

  //Initializing useDispatch hook
  const dispatch = useDispatch();

  //Select relevent state from redux store
  const {
    products,
    page,
    limit,
    isLoading,
    filteredProducts,
    hasNextPage,
    categoriesFilters,
    brandsFilters,
    priceFilters,
  } = useSelector((state) => state.superCategory);

  //Effect to fetch initial data when component mounts or filter change
  useEffect(() => {
    dispatch(
      fetchSuperCategoryPageData(
        categoryName,
        1,
        10,
        selectedOption,
        hasNextPage,
        categoriesFilters,
        brandsFilters,
        priceFilters
      )
    );
  }, [
    selectedOption,
    categoryName,
    categoriesFilters,
    brandsFilters,
    priceFilters,
    dispatch,
  ]);

  //Effect for infinite scrolling
  useEffect(() => {
    //Only executed if next page available from backend
    if (hasNextPage) {
      //Disconnect previous observer if any->Effect can run multiple times
      //due to the component lifecycle( due to change in dependencies )
      if (observerRef.current) observerRef.current.disconnect();
      //Create new intersection observer
      const observer = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting && !isLoading && hasNextPage) {
          //Fetch next part of data when last product comes in view
          //and also next page is available
          dispatch(
            fetchSuperCategoryPageData(
              categoryName,
              page,
              limit,
              selectedOption,
              hasNextPage,
              categoriesFilters,
              brandsFilters,
              priceFilters
            )
          );
        }
      });
      //Observe the last product element
      if (lastProductRef.current) observer.observe(lastProductRef.current);
      //Store observer in ref for cleanup
      observerRef.current = observer;
      //Cleanup function to disconnect observer
      return () => {
        if (observerRef.current) observerRef.current.disconnect();
      };
    }
  }, [
    dispatch,
    page,
    limit,
    isLoading,
    categoryName,
    selectedOption,
    lastProductRef.current,
    hasNextPage,
    categoriesFilters,
    brandsFilters,
    priceFilters,
  ]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Render filtered products if available, otherwise render all products */}
        {filteredProducts && filteredProducts.length > 0
          ? filteredProducts.map((product, idx) => (
              <ProductCard
                key={product._id}
                product={product}
                refInput={
                  idx + 1 === filteredProducts.length ? lastProductRef : null
                }
                productsLength={filteredProducts.length}
              />
            ))
          : products &&
            products.map((product, idx) => (
              <ProductCard
                key={product._id}
                product={product}
                refInput={idx + 1 === products.length ? lastProductRef : null}
                productsLength={products.length}
                height={"340px"}
                width={"300px"}
              />
            ))}
      </div>
      {/* Display message when there are no more products to load */}
      {!hasNextPage && (
        <div className="flex justify-center items-center mt-4">
          <div className="text-center text-gray-500 font-medium">
            Nothing more to show
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
