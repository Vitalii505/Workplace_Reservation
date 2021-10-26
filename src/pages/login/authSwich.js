import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { paths } from "../../constants";

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 38,
    height: 20,
    padding: 2,
    display: "flex",
  },
  switchBase: {
    padding: 2,
    color: theme.palette.grey[500],
    "&$checked": {
      transform: "translateX(12px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 16,
    height: 16,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: theme.palette.primary.main,
  },
  checked: {},
}))(Switch);

export default function CustomizedSwitches({ onClickRole }) {
  const [state, setState] = React.useState({
    checkedB: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <Grid component="label" container spacing={1} className="buttonRoleText">
      <Grid item>User login</Grid>
      <Grid item>
        <AntSwitch
          checked={state.checkedC}
          onChange={handleChange}
          name="checkedC"
          onClick={onClickRole}
        />
      </Grid>
      <Grid item>Admin login</Grid>
    </Grid>
  );
}
