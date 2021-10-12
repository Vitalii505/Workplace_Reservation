import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';
import Box from '@material-ui/core/Box';
import {paths, userTabs, adminTabs} from '../constants/index'
import { Link } from 'react-router-dom'
import {parseAccessToken} from "../helpers";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const Menu = ({ children }) => {

  const tabsUserOrAdmin = () => {
    const decodedPayload = parseAccessToken();
    if (decodedPayload.role === "admin") {
      return adminTabs;
    } else {
      return userTabs;
    }
  }

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className="toolbar">
          {/* <Typography variant="h6" noWrap>
            User Page/Workplace
          </Typography> */}
          <Box display="flex" justifyContent="space-between" flexDirection="column">
            <PersonIcon className="personIcon"/>
            <Button color="inherit" className='buttonLogOut' component={Link} to={paths.login()}>Log out</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}> 
          <List>
            {tabsUserOrAdmin().map((elem, index) => (
                <ListItem button key={index.toString()} component={Link} to={elem.url}>
                <ListItemText primary={elem.title} />
                </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        <Typography paragraph>
          {children}
        </Typography>
      </main>
    </div>
  );
}

export default Menu;
