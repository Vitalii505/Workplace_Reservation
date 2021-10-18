const initialState = {
  placeName: null,
  dataTimes: {
    DataAndTime: "2021-10-15T09:30",
    EndTime: "07:30",
  },
};

const placeSetIndicator = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SEATS":
      return {
        ...state,
        placeName: action.payload,
      };
    case "SET_DATA":
      return {
        ...state,
        dataTimes: action.payload,
      };
    default:
      return state;
  }
};

export default placeSetIndicator;
