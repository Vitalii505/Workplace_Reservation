import React from "react";
import classes from "./BookMySeats.module.css";
import { useSelector, useDispatch } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import { setCoordinates } from "../../redux/actions/place";

const Places = ({ values, availableSeats, bookedSeats, addSeat }) => {
  // const dispatch = useDispatch();
  // const setIndicatorPlace = useSelector(
  //   ({ placeSetIndicator }) => placeSetIndicator
  // );
  // const onSelectSeats = (coorY, coorX) => {
  //   dispatch(setCoordinates(coorY, coorX));
  // };
  return (
    <>
      {values.map((seat) => {
        const isAvailable = availableSeats.includes(seat.name);
        const isBooked = bookedSeats.includes(seat.name);
        let seatClass;
        let textTooltip;
        if (!isAvailable) {
          seatClass = classes.disabled;
          textTooltip = "Reserved !";
        } else if (isBooked) {
          seatClass = classes.booked;
          textTooltip = "";
        } else {
          textTooltip = "Free place";
        }
        return (
          <Tooltip title={`${seat.name} ${textTooltip}`} placement="top">
            <div
              className={seatClass}
              onClick={addSeat}
              key={seat.id}
              style={{
                top: seat.coorY,
                left: seat.coorX,
                // border: "solid 2px yellow",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                position: "absolute",
                color: "white",
              }}
            >
              <span className={classes.seatsName}>{seat.name}</span>

              {/* <Button style={{ fontSize: "40%" }}>top</Button> */}
            </div>
          </Tooltip>
        );
      })}
    </>
  );
};

export default Places;
