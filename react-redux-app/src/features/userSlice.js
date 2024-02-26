import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    admin: null,
  },

  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
    },
    loginAdmin: (state, action) => {
      state.admin = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { loginUser, loginAdmin, logout } = userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectAdmin = (state) => state.user.admin;

export default userSlice.reducer;
