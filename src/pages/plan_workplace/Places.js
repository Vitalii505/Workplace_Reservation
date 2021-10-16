import React from "react";
import classes from "./BookMySeats.module.css";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";

const Places = ({ values, availableSeats, bookedSeats, addSeat }) => {
  return (
    <div className={classes.section}>
      {/* {placeWork.map((seat, index) => (
        <div
          onClick={() => onClickWorkplace(index)}
          style={{
            top: seat.coorY,
            left: seat.coorX,
            border: "solid 2px yellow",
            borderRadius: "50%",
            width: "20px",
            height: "20px",
            position: "absolute",
          }}
        ></div>
      ))} */}

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
          <Tooltip title={textTooltip} placement="top">
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
    </div>
  );
};

export default Places;
