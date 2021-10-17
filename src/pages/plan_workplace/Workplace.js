import React, { useRef, useState, useEffect } from "react";
import { coordinatesOfWorkplaces, availablePlaces } from "./Coordinates";
import { useSelector, useDispatch } from "react-redux";
import { setWorkplace } from "../../redux/actions/place";
import ReservationMenu from "./ReservationMenu";
import Places from "./Places";
import Card from "@material-ui/core/Card";

const Workplace = () => {
  const dispatch = useDispatch();
  const indicatorWorkplace = useSelector(
    ({ placeIndicator }) => placeIndicator
  );
  const onSelectWorkplace = (index) => {
    dispatch(setWorkplace(index));
  };

  const [availableSeats, setAvailableSeats] = useState(availablePlaces);
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
    setBookedStatus("You have successfully booked your palce:");
    bookedSeats.forEach((seat) => {
      setBookedStatus((prevState) => {
        return prevState + seat + " !";
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
      <div style={{ paddingLeft: "7vw", paddingTop: "20px" }}>
        <Card
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
            boxShadow: "0 0 10px rgba(0,0,0,0.5)",
            padding: "10px",
          }}
        >
          <ReservationMenu
            numberOfSeats={numberOfSeats}
            onChange={(ev) => setNumberOfSeats(ev.target.value)}
            onClickBooking={confirmBooking}
            bookedStatus={bookedStatus}
            seatName={bookedSeats}
          />
          <Places
            // placeWork={coordinatesOfWorkplaces}
            // onClickWorkplace={onSelectWorkplace}
            values={coordinatesOfWorkplaces}
            availableSeats={availableSeats}
            bookedSeats={bookedSeats}
            addSeat={addSeat}
          />
        </Card>
      </div>
    </React.Fragment>
  );
};

export default Workplace;
