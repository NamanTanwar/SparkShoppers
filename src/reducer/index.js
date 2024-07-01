import { combineReducers } from "@reduxjs/toolkit";
import UISlice from '../slices/UISlice'
import categorySlice from "../slices/categorySlice";
import authSlice from "../slices/authSlice"
import adminSlice from "../slices/adminSlice";
import productSlice from "../slices/productSlice";
import cartSlice from "../slices/cartSlice";
import wishlistSlice from "../slices/wishlistSlice";
import superCategorySlice from "../slices/superCategorySlice";
import browseProductsSlice from "../slices/browseProductsSlice";
import paymentSlice from "../slices/paymentSlice";

const rootReducer=combineReducers({
       UI: UISlice,
       category: categorySlice,
       auth: authSlice,
       admin: adminSlice,
       products: productSlice,
       cart: cartSlice,
       wishlist: wishlistSlice,
       superCategory: superCategorySlice,
       browseProducts: browseProductsSlice, 
       payments: paymentSlice
})     

export default rootReducer;