import React, { useEffect, useState } from "react";
import BrowseProductsSidebar from "../components/core/BrowseProducts/BrowseProductsSidebar";
import { filterOptions } from "../data/BrowseProductsData";
import Navbar from "../components/common/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getProducts } from "../services/operations/productAPI";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/common/ProductCard";
import {
  setBrandFilter,
  setCategoryFilter,
  setPriceFilter,
} from "../slices/browseProductsSlice";
import SelectedFiltersTab from "../components/common/SelectedFiltersTab";
import {
  removeCategoryFilter,
  removeBrandFilter,
  removePriceFilter,
} from "../slices/browseProductsSlice";
import BrowseUserView from "../components/core/BrowseProducts/BrowseUserView";

const BrowseProducts = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  //Get search query and filter states from redux store
  const { searchQuery } = useSelector((state) => state.products);
  const { brandsToFilter, categoriesToFilter, priceToFilter } = useSelector(
    (state) => state.browseProducts
  );
  //Local state for storing selected option and dropdown visibility
  const [option, setOption] = useState("Recomended");
  const [showDropDown, setShowDropDown] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    //Check if the current url has a q parameter
    const query = new URLSearchParams(location.search).has("q");
    setIsSearch(Boolean(query)); //search only if q parameter is present
  }, [location.search]);

  //Using react query useInfiniteQuery for fetching paginated product data
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery({
    queryKey: [
      "products",
      searchQuery,
      {
        brands: brandsToFilter,
        categories: categoriesToFilter,
        priceRange: priceToFilter,
      },
      option,
    ],
    queryFn: getProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: !!searchQuery, // Automatically execute the query if searchQuery exists
  });
  //Refetch data when isSearch or searchQuery changes
  useEffect(() => {
    if (isSearch && searchQuery) {
      refetch();
    }
  }, [
    isSearch,
    searchQuery,
    brandsToFilter,
    categoriesToFilter,
    priceToFilter,
    refetch,
  ]);

  //Update filter options in redux store when data is successfully fetched
  useEffect(() => {
    if (status === "success" && data.pages[0]) {
      dispatch(setBrandFilter(data.pages[0].brands));
      dispatch(setCategoryFilter(data.pages[0].categories));
      dispatch(setPriceFilter(data.pages[0].priceRanges));
    }
  }, [status, data, dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 overflow-x-hidden z-10">
      <Navbar />
      <div className="container mx-auto p-4 flex flex-col md:flex-row">
        {!isSearch ? (
          // Show BrowseUserView if not on a search result page
          //when user logs in is navigated to this ui
          <BrowseUserView />
        ) : (
          // Show search results and filters if on a search result page
          <div className="w-full md:flex md:flex-row">
            {/* Sidebar with filter options */}
            <div className="w-full md:w-1/4">
              <BrowseProductsSidebar />
            </div>
            {/* Main content area */}
            <div className="w-full md:w-3/4 flex flex-col ml-4">
              {status === "loading" && <p>Loading...</p>}
              {status === "error" && <p>Error: {error.message}</p>}
              {status === "success" && (
                <>
                  {/* Header section with search results info and sorting options */}
                  <div className="flex flex-col md:flex-row items-center justify-between mb-4">
                    <h1 className="text-xl font-bold">
                      Showing results for {searchQuery}
                    </h1>
                    {/* Display selected filters if any */}
                    {(categoriesToFilter.length ||
                      brandsToFilter.length ||
                      priceToFilter) && (
                      <SelectedFiltersTab
                        selectedCategories={categoriesToFilter}
                        selectedBrands={brandsToFilter}
                        selectedPriceRange={priceToFilter}
                        removeCategoryFilter={removeCategoryFilter}
                        removeBrandFilter={removeBrandFilter}
                        removePriceFilter={removePriceFilter}
                      />
                    )}
                    {/* Sorting dropdown */}
                    <div className="relative ml-8">
                      <p
                        className="cursor-pointer px-4 py-2 bg-white border border-gray-300 rounded"
                        onMouseEnter={() => setShowDropDown(true)}
                        //onMouseLeave={() => setShowDropDown(false)}
                      >
                        {option}
                      </p>
                      {/* Dropdown menu for sorting options */}
                      <div
                        className={`absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg ${
                          showDropDown ? "block" : "hidden"
                        } z-20`}
                        onMouseEnter={() => setShowDropDown(true)}
                        onMouseLeave={() => setShowDropDown(false)}
                      >
                        {filterOptions.map((filterOption) => (
                          <button
                            key={filterOption.id}
                            className="w-full text-left px-4 py-2 hover:bg-gray-200"
                            onClick={() => setOption(filterOption.option)}
                          >
                            {filterOption.option}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Grid of product cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 z-10">
                    {data.pages.map((page) =>
                      page.products.map((product, idx) => (
                        <ProductCard
                          key={idx}
                          product={product.product.product}
                          height={"340px"}
                          width={"300px"}
                        />
                      ))
                    )}
                  </div>
                  {/* Load more button */}
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={() => fetchNextPage()}
                      disabled={!hasNextPage || isFetchingNextPage}
                      className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                    >
                      {isFetchingNextPage
                        ? "Loading more..."
                        : hasNextPage
                        ? "Load More"
                        : "Nothing more to load"}
                    </button>
                  </div>
                  {/* Loading indicator for fetching more data */}
                  <div className="mt-2 text-center">
                    {isFetching && !isFetchingNextPage ? "Fetching..." : null}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseProducts;
