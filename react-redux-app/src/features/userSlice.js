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
    logoutUser: (state) => {
      state.user = null;
    },
    logoutAdmin: (state) => {
      state.admin = null;
    },
  },
});

export const { loginUser, loginAdmin, logoutUser, logoutAdmin } =
  userSlice.actions;

export const selectUser = (state) => state.user.user;
export const selectAdmin = (state) => state.user.admin;

export default userSlice.reducer;
