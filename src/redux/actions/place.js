export const setSeats = (seat) => ({
  type: "SET_SEATS",
  payload: seat,
});
export const setCoordinates = (coorY, coorX) => ({
  type: "SET_COORDINATES",
  payload: { coorY, coorX },
});
export const setDataTimes = (dataTime, time) => ({
  type: "SET_DATA",
  payload: { dataTime, time },
});
