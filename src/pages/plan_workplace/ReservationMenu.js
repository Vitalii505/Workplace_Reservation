import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    marginBottom: "10px",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 190,
  },
  textFieldClock: {
    width: 80,
  },
}));

const ReservationMenu = ({
  numberOfSeats,
  onChange,
  values,
  onClickBooking,
  bookedStatus,
  seatName,
}) => {
  const classes = useStyles();
  return (
    <>
      <Card className="reservationMenuNumber">
        <CardContent>
          <FormControl component="fieldset" className="radioNumberOfSeats">
            <FormLabel component="legend">
              How many places would you like to book?
            </FormLabel>
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={values}
              onChange={onChange}
            >
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="Place for one"
              />
              <FormControlLabel
                value="4"
                control={<Radio />}
                label="More places for the team"
              />
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>
      <Card className="reservationMenuDate">
        <CardContent>
          <Typography color="textSecondary" variant="h6">
            Selected place: <span className="seatNameClick">{seatName}</span>
          </Typography>
          <form className={classes.container} noValidate>
            <TextField
              id="datetime-local"
              label="Start working"
              type="datetime-local"
              defaultValue="2021-10-15T09:30"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="time"
              label="End time"
              type="time"
              defaultValue="07:30"
              className={classes.textFieldClock}
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
            />
          </form>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<SaveIcon />}
            onClick={onClickBooking}
          >
            Book your place
          </Button>
          <p className="bookedStatusStyle">{bookedStatus}</p>
        </CardContent>
      </Card>
    </>
  );
};

export default ReservationMenu;
