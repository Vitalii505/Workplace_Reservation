import { configureStore } from "@reduxjs/toolkit";

import palcesReducer from "./reducers/place";

export const store = configureStore({
  reducer: {
    palces: palcesReducer,
  },
});
window.store = store;
