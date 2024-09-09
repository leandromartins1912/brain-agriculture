import { configureStore } from "@reduxjs/toolkit";
import producerReducer from "./producerSlice";

export const store = configureStore({
  reducer: {
    producers: producerReducer,
  },
});
