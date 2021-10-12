const initialState = {
  place: null,
  isLoaded: false,
};

const placeIndicator = (state = initialState, action) => {
  if (action.type === "SET_WORKPLACE") {
    return {
      ...state,
      place: action.payload,
    };
  }
  return state;
};

export default placeIndicator;
