import React, { useRef, useState, useEffect } from "react";
import { coordinatesOfWorkplaces } from "./Coordinates";
import { useSelector, useDispatch } from "react-redux";
import { setWorkplace } from "../../redux/actions/place";
import Places from "./Places";
import classes from "./BookMySeats.module.css";

const Workplace = () => {
  const dispatch = useDispatch();
  const indicatorWorkplace = useSelector(
    ({ placeIndicator }) => placeIndicator
  );
  const onSelectWorkplace = (index) => {
    dispatch(setWorkplace(index));
  };

  const [availableSeats, setAvailableSeats] = useState([
    "1A",
    "1B",
    "1D",
    "2A",
  ]);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [bookedStatus, setBookedStatus] = useState("");
  const addSeat = (ev) => {
    console.log(numberOfSeats);
    if (numberOfSeats && !ev.target.className.includes("disabled")) {
      const seatsToBook = parseInt(numberOfSeats, 10);
      if (bookedSeats.length <= seatsToBook) {
        if (bookedSeats.includes(ev.target.innerText)) {
          const newAvailable = bookedSeats.filter(
            (seat) => seat !== ev.target.innerText
          );
          setBookedSeats(newAvailable);
        } else if (bookedSeats.length < numberOfSeats) {
          setBookedSeats([...bookedSeats, ev.target.innerText]);
        } else if (bookedSeats.length === seatsToBook) {
          bookedSeats.shift();
          setBookedSeats([...bookedSeats, ev.target.innerText]);
        }
      }
    }
  };

  const confirmBooking = () => {
    setBookedStatus("You have successfully booked the following seats:");
    bookedSeats.forEach((seat) => {
      setBookedStatus((prevState) => {
        return prevState + seat + " ";
      });
    });
    const newAvailableSeats = availableSeats.filter(
      (seat) => !bookedSeats.includes(seat)
    );
    setAvailableSeats(newAvailableSeats);
    setBookedSeats([]);
    setNumberOfSeats(0);
  };
  const [numberOfSeats, setNumberOfSeats] = useState(0);

  return (
    <React.Fragment>
      <div style={{}}>
        <p>How many seats would you like to book?</p>
        <input
          value={numberOfSeats}
          onChange={(ev) => setNumberOfSeats(ev.target.value)}
        />
        <div style={{ padding: 20 }}>
          <div
            style={{
              display: "inline-block",
              // border: "2px solid red",
              width: 1000,
              height: 500,
              backgroundImage:
                "url(https://www.arstelle-office.ru/public/userfiles/images/planirovka_ofisa_arstelle_office_01.png)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
              backgroundPosition: "center",
              position: "relative",
            }}
          >
            <Places
              // placeWork={coordinatesOfWorkplaces}
              // onClickWorkplace={onSelectWorkplace}
              values={coordinatesOfWorkplaces}
              availableSeats={availableSeats}
              bookedSeats={bookedSeats}
              addSeat={addSeat}
            />
          </div>
        </div>
        <button onClick={confirmBooking}>Book seats</button>
        <p>{bookedStatus}</p>
      </div>
    </React.Fragment>
  );
};

export default Workplace;
