import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    product: null,
  },

  reducers: {
    products: (state, action) => {
      state.product = action.payload;
    },
  },
});

export const { products } = productSlice.actions;

export const selectProduct = (state) => state.product.product;

export default productSlice.reducer;
