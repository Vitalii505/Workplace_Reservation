import React from "react";
import classes from "./BlockingPlaces.module.css";
import Tooltip from "@material-ui/core/Tooltip";

const BlockingPlaces = ({ values, availableSeats, bookedSeats, addSeat }) => {
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
                width: "23px",
                height: "23px",
                position: "absolute",
                color: "white",
              }}
            >
              <span className={classes.seatsName}>{seat.name}</span>
            </div>
          </Tooltip>
        );
      })}
    </>
  );
};

export default BlockingPlaces;
