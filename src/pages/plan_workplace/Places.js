import React from "react";
import classes from "./BookMySeats.module.css";

const Places = ({ props, placeWork, onClickWorkplace }) => {
  return (
    <div>
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

      {props.values.map((seat) => {
        const isAvailable = props.availableSeats.includes(seat);
        const isBooked = props.bookedSeats.includes(seat);
        let seatClass;
        if (!isAvailable) {
          seatClass = classes.disabled;
        }
        if (isBooked) {
          seatClass = classes.booked;
        }
        return (
          <div
            className={seatClass}
            onClick={props.addSeat}
            key={seat}
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
        );
      })}
    </div>
  );
};

export default Places;
