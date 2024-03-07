import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import lubReducer from "../features/lubSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    lub: lubReducer,
  },
});
