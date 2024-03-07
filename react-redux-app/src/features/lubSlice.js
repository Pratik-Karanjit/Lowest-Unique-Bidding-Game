import { createSlice } from "@reduxjs/toolkit";

export const lubSlice = createSlice({
  name: "lub",
  initialState: {
    lub: null,
  },

  reducers: {
    setLub: (state, action) => {
      state.lub = action.payload;
    },
  },
});

export const { setLub } = lubSlice.actions;

export const selectLub = (state) => state.lub.lub;

export default lubSlice.reducer;
