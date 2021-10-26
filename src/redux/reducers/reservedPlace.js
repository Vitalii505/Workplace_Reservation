// const initialState = {
//   placesL: {
//     array: {
//       seat: "",
//       dataAndTime: { dateTime: "", endTime: "" },
//     },
//   },
// };
const initialState = [];

const reservedPlace = (state = initialState, action) => {
  switch (action.type) {
    case "SET_OBJ_RESERVED":
      return [Object.assign({}, action.reservations)];
    default:
      return state;
  }
};
// const reservedPlace = (state = initialState, action) => {
//   switch (action.type) {
//     case "SET_OBJ_RESERVED":
//       return [
//         Object.assign(
//           {},
//           (state.placesL.array.seat = [action.payload]),
//           (state.placesL.array.dataAndTime.dateTime = [action.payload]),
//           (state.placesL.array.dataAndTime.endTime = [action.payload])
//         ),
//       ];
//     default:
//       return state;
//   }
// };

export default reservedPlace;
