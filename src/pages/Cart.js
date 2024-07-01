import React from "react";
import CartTable from "../components/core/Cart/CartTable";
import SidebarNav from "../components/core/Navbar/SidebarNav";
import Navbar from "../components/common/Navbar";
import { useSelector } from "react-redux";

const CartPage = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { showSidebar } = useSelector((state) => state.UI);

  return (
    <div>
      {
        //conditionally render sidebar
        showSidebar && <SidebarNav />
      }
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4">Your Shopping Cart</h1>
        <CartTable cartItems={cartItems} />
      </div>
    </div>
  );
};

export default CartPage;
