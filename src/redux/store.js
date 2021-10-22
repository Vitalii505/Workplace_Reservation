import { configureStore } from "@reduxjs/toolkit";
import placesReducer from "./reducers/place";

export const store = configureStore({
  reducer: {
    places: placesReducer,
  },
});
window.store = store;
