import { configureStore } from "@reduxjs/toolkit";
import blockingPlacesReducer from "./reducers/blockingPlaces";
import placesReducer from "./reducers/place";
import reservPlaceReducer from "./reducers/reservedPlace";

export const store = configureStore({
  reducer: {
    blocking: blockingPlacesReducer,
    places: placesReducer,
    placesList: reservPlaceReducer,
  },
});
window.store = store;
