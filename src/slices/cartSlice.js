import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalPrice: 0,
  isLoading: false,
  error: null,
};

const calculateTotalPrice = (cartItem, state, add = true, productQuantity) => {
  const productCost = cartItem.cost;
  return add
    ? state.totalPrice + productCost * productQuantity
    : state.totalPrice - productCost;
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCart: (state, action) => {
      state.cartItems = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },

    addItemToCart: (state, action) => {
      let products = state.cartItems.map((item) => item);

      const { product, productQuantity } = action.payload;

      if (
        state.cartItems.length === 0 ||
        !state.cartItems.find((item) => item.product._id === product._id)
      ) {
        const updatedCartTotal = calculateTotalPrice(
          product,
          state,
          true,
          productQuantity
        );
        return {
          ...state,
          cartItems: [
            ...state.cartItems,
            { product: product, productQuantity: productQuantity },
          ],
          totalPrice: updatedCartTotal,
        };
      }
      const existingItem = state.cartItems.find(
        (item) => item.product._id === product._id
      );
      if (existingItem) {
        let updatedCartItems = state.cartItems.map((item) => {
          if (item.product._id === product._id) {
            return {
              ...item,
              productQuantity: item.productQuantity + productQuantity,
            };
          } else {
            return item;
          }
        });
        const updatedCartTotal = calculateTotalPrice(
          product,
          state,
          true,
          productQuantity
        );

        return {
          ...state,
          cartItems: updatedCartItems,
          totalPrice: updatedCartTotal,
        };
      } else {
        const updatedCartTotal = calculateTotalPrice(product, state, true);
        return {
          ...state,
          cartItems: [
            ...state.cartItems,
            { product: product, quantity: productQuantity },
          ],
          totalPrice: updatedCartTotal,
        };
      }
    },

    removeItemFromCart: (state, action) => {
      const { product } = action.payload;
      const productId = product._id;

      let updatedCartItems = [];
      let updatedCartTotal;

      updatedCartItems = state.cartItems.filter(
        (item) => item.product._id !== productId
      );
      let cartItem = state.cartItems.find(
        (item) => item.product._id === productId
      );
      if (cartItem.productQuantity > 1) {
        updatedCartItems.push({
          product: cartItem.product,
          productQuantity: cartItem.productQuantity - 1,
        });
      }

      updatedCartTotal = calculateTotalPrice(product, state, false, 1);

      return {
        ...state,
        cartItems: updatedCartItems,
        totalPrice: updatedCartTotal,
      };
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
    clearCart: () => {
      return initialState;
    },
  },
});

export const {
  setLoading,
  setCart,
  setError,
  addItemToCart,
  removeItemFromCart,
  setTotalPrice,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
