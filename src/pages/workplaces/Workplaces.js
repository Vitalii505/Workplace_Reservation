import React, { useState } from "react";
import {
  coordinatesOfWorkplaces,
  availablePlaces,
} from "../../components/Coordinates";
import { useSelector, useDispatch } from "react-redux";
import BlockingPlaces from "./BlockingPlaces";
import Card from "@material-ui/core/Card";
import { setSeatsReserved } from "../../redux/actions/blockingPlaces";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const Workplace = () => {
  const dispatch = useDispatch();
  const onSelectSeatsReserved = (seats) => {
    dispatch(setSeatsReserved(seats));
  };
  const [availableSeats, setAvailableSeats] = useState(availablePlaces);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [bookedStatus, setBookedStatus] = useState("");

  const addSeat = (ev) => {
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
      console.log(availableSeats);
      const setSEARS = (checkSeats) => {
        checkSeats.splice(checkSeats.indexOf(seat), 1);
        return checkSeats;
      };
      setAvailableSeats(setSEARS(availableSeats));

      setBookedStatus((prevState) => {
        return prevState + seat + ", ";
      });
    });
    const newAvailableSeats = availableSeats.filter(
      (seat) => !bookedSeats.includes(seat)
    );
    localStorage.setItem("setavailableSeats", availableSeats);
    onSelectSeatsReserved(availableSeats);
    setAvailableSeats(newAvailableSeats);
    setBookedSeats([]);
    setNumberOfSeats("");
  };
  const [numberOfSeats, setNumberOfSeats] = useState("");

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
          <BlockingPlaces
            values={coordinatesOfWorkplaces}
            availableSeats={availableSeats}
            bookedSeats={bookedSeats}
            addSeat={addSeat}
          />
          <Card className="reservationMenuNumber">
            <TextField
              id="outlined-basic"
              label="Number of places to block"
              variant="outlined"
              value={numberOfSeats}
              onChange={(ev) => setNumberOfSeats(ev.target.value)}
              style={{ margin: "10px" }}
            />
            <Button
              variant="contained"
              color="primary"
              disableElevation
              onClick={confirmBooking}
              style={{ marginTop: "20px" }}
            >
              Block places
            </Button>
          </Card>
          <Typography color="secondary">{bookedStatus}</Typography>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default Workplace;
