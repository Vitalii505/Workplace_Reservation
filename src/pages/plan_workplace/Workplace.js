import React, { useState } from "react";
import {
  coordinatesOfWorkplaces,
  availablePlaces,
} from "../../components/Coordinates";
import { useSelector, useDispatch } from "react-redux";
import { setSeats, setDataTimes } from "../../redux/actions/place";
import {
  setSeatsReserved,
  setObjReservation,
} from "../../redux/actions/reservedPlace";
import ReservationMenu from "./ReservationMenu";
import Places from "./Places";
import Card from "@material-ui/core/Card";

const Workplace = () => {
  const dispatch = useDispatch();
  // const { placeName, dataTimes } = useSelector(
  //   (placeSetIndicator) => placeSetIndicator.places
  // );
  const freePlaces = useSelector(
    (blockingPlaces) => blockingPlaces.blocking.freePlaces
  );

  const onSelectSeats = (seat) => {
    dispatch(setSeats(seat));
  };
  const onSelectDataTimes = (dataT, time) => {
    dispatch(setDataTimes(dataT, time));
  };

  const onSelectObjReservatins = (arrReservations) => {
    dispatch(setObjReservation(arrReservations));
  };
  const documentData = localStorage.getItem("setavailableSeats");
  const freeSeats = documentData.split(",");

  const [availableSeats, setAvailableSeats] = useState(freeSeats);
  const [bookedSeats, setBookedSeats] = useState([]);
  const [bookedStatus, setBookedStatus] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [reservationsList, setReservationsList] = useState([]);

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
      onSelectSeats(seat);
      onSelectDataTimes(dateTime, endTime);
      const setSEARS = (checkSeats) => {
        checkSeats.splice(checkSeats.indexOf(seat), 1);
        return checkSeats;
      };
      setAvailableSeats(setSEARS(availableSeats));
      localStorage.setItem("setavailableSeats", availableSeats);
      console.log("ww--", availableSeats);

      const dataAndTime = { dateTime, endTime };
      const setPlacesList = (seats) => {
        seats.push({ seat, dataAndTime });
        return seats;
      };
      setReservationsList(setPlacesList(reservationsList));
      console.log(reservationsList);

      setBookedStatus((prevState) => {
        return prevState + seat + " !";
      });
    });
    const newAvailableSeats = availableSeats.filter(
      (seat) => !bookedSeats.includes(seat)
    );
    onSelectObjReservatins(reservationsList);
    setAvailableSeats(newAvailableSeats);
    setBookedSeats([]);
    setNumberOfSeats(0);
  };
  const [numberOfSeats, setNumberOfSeats] = useState(0);

  const handleChangeDate = (e) => {
    const value = e.target.value;
    setDateTime(value.trim());
  };
  const handleChangeTime = (e) => {
    const value = e.target.value;
    setEndTime(value.trim());
  };

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
            handleChangeDate={handleChangeDate}
            handleChangeTime={handleChangeTime}
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
