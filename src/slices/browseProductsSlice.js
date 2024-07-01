import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brandFilter: [],
  categoryFilter: [],
  priceFilters: {
    start: -Infinity,
    end: Infinity,
  },
  brandsToFilter: [],
  categoriesToFilter: [],
  priceToFilter: {
    start: -Infinity,
    end: Infinity,
  },
};

const browseProductsSlice = createSlice({
  initialState,
  name: "browseProducts",
  reducers: {
    setBrandFilter: (state, action) => {
      state.brandFilter = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload;
    },
    setPriceFilter: (state, action) => {
      state.priceFilters = action.payload;
    },
    setBrandsToFilter: (state, action) => {
      if (state.brandsToFilter.includes(action.payload)) return state;
      return {
        ...state,
        brandsToFilter: [...state.brandsToFilter, action.payload],
      };
    },
    setCategoriesToFilter: (state, action) => {
      if (
        state.categoriesToFilter.some(
          (element) => element._id === action.payload._id
        )
      )
        return state;

      return {
        ...state,
        categoriesToFilter: [...state.categoriesToFilter, action.payload],
      };
    },
    setPriceToFilter: (state, action) => {
      if (
        state.priceFilters.start === action.payload.start &&
        state.priceFilters.end === action.payload.end
      )
        return state;
      return {
        ...state,
        priceToFilter: {
          ...state.priceToFilter,
          start: action.payload.start,
          end: action.payload.end,
        },
      };
    },
    removeCategoryFilter: (state, action) => {
      return {
        ...state,
        categoriesToFilter: state.categoriesToFilter.filter(
          (category) => category._id !== action.payload
        ),
      };
    },
    removeBrandFilter: (state, action) => {
      return {
        ...state,
        brandsToFilter: state.brandsToFilter.filter(
          (brand) => brand !== action.payload
        ),
      };
    },
    removePriceFilter: (state, action) => {
      return {
        ...state,
        priceToFilter: {
          start: -Infinity,
          end: Infinity,
        },
      };
    },
  },
});

export const {
  setBrandFilter,
  setCategoryFilter,
  setPriceFilter,
  setBrandsToFilter,
  setCategoriesToFilter,
  setPriceToFilter,
  removeCategoryFilter,
  removeBrandFilter,
  removePriceFilter,
} = browseProductsSlice.actions;
export default browseProductsSlice.reducer;
