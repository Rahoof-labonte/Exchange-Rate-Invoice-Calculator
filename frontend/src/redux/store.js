import { configureStore } from "@reduxjs/toolkit";
import conversionReducer from "./conversionSlice";

export const store = configureStore({
  reducer: {
    conversion: conversionReducer
  }
});