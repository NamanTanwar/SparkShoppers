import React from "react";
import { useSelector } from "react-redux";
import WishlistCard from "../components/core/Wishlist/WishlistCard";
import SidebarNav from "../components/core/Navbar/SidebarNav";
import Navbar from "../components/common/Navbar";

const Wishlist = () => {
  const { items, isLoading, error } = useSelector((state) => state.wishlist);
  const { showSidebar } = useSelector((state) => state.UI);
  // if(error){
  //     return <h1>error</h1>
  // }

  // if(isLoading){
  //     return <h1>Loading....</h1>
  // }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Something went wrong</h1>;
  }

  return (
    <div className="relative z-10">
      {
        //conditionally render sidebar
        showSidebar && <SidebarNav />
      }
      <Navbar />
      <div className="container mx-auto px-4 py-8 z-10">
        <h1 className="text-2xl font-semibold mb-4">Wishlist</h1>
        <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 z-10">
          {items ? (
            items.length > 0 ? (
              items.map((item, idx) => (
                <WishlistCard key={item._id} product={item} />
              ))
            ) : (
              <div>No items to show</div>
            )
          ) : (
            <div>No items to show</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
