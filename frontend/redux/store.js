import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./slices/CartSlices";
import AuthReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    cart: CartReducer,
    auth: AuthReducer,
  },
});
