import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ComputerIcon from "@material-ui/icons/Computer";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    pading: "20px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Reserved = () => {
  const classes = useStyles();
  const { placeName, dataTimes } = useSelector(
    (placeSetIndicator) => placeSetIndicator.places
  );

  console.log(placeName, dataTimes);
  console.log(dataTimes.dataTime);

  return (
    <>
      <Card className="reservstionBox">
        <Card className={classes.root}>
          <Grid container justifyContent="space-between">
            <Grid item style={{ margin: "13px" }}>
              <ComputerIcon style={{ fontSize: "400%" }} />
            </Grid>
            <Grid item style={{ margin: "10px" }}>
              <Typography variant="h5" component="h2">
                <span className="textReserv">times reservation: </span>
              </Typography>
              <Typography variant="h5" component="h2">
                <span className="textReserv">place reservation: </span>
              </Typography>
            </Grid>
            <Grid item style={{ margin: "15px" }}>
              <Typography variant="h5" component="h2">
                {`${dataTimes.dataTime}-${dataTimes.time}`}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {placeName}
              </Typography>
            </Grid>
            <Grid item>
              <Button color="secondary" style={{ margin: "30px" }}>
                delete
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Card>
    </>
  );
};

export default Reserved;
