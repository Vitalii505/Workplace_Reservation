const initialState = [];

const blockingPlaces = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SEATS_BLOCKING":
      return {
        ...state,
        freePlaces: action.payload,
      };
    default:
      return state;
  }
};

export default blockingPlaces;
