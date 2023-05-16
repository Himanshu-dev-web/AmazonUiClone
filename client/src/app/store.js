import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../slices/basketSlice";
 
//tthe global store
export const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
});
