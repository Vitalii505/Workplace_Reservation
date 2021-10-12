import React from "react";
import "./Users.css";
import firebase from "./firebase";
import { UserInput } from "./UserInput";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { authApi } from "../../components/api";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import {
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
} from "@material-ui/core";

function Users() {
  const [users, setUsers] = React.useState([]);
  const [newUserName, setNewUserName] = React.useState();
  const [newLastName, setNewLastName] = React.useState();
  const [newEmail, setNewEmail] = React.useState();
  const [newPassword, setnewPassword] = React.useState();

  const [addUserError, setAddUserError] = React.useState();
  // let mId = (Date.now().toString(32).substring(2, 9));

  React.useEffect(() => {
    const db = firebase.firestore();
    return db.collection("users").onSnapshot((snapshot) => {
      const usersdata = [];
      snapshot.forEach((doc) => usersdata.push({ ...doc.data(), id: doc.id }));
      setUsers(usersdata);
    });
  }, []);

  const onReload = () => {
    window.location.reload();
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /// сообщение об успешной регистрации пользователя
  const [openMessage, setOpenMessage] = React.useState(false);

  const handleCloseMessage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenMessage(false);
  };

  const handleSubmit = async () => {
    setAddUserError("");
    await authApi
      .addUser(newEmail, newPassword, newUserName, newLastName)
      .then((response) => {
        console.log(111, response);
        if (!!newEmail.includes("@")) {
          const db = firebase.firestore();
          db.collection("users").add({
            name: response.data.firstname,
            lastName: response.data.lastname,
            email: response.data.email,
            id: response.data.id,
          });
        }
        setOpen(false);
        setOpenMessage(true);
      })
      .catch((err) => {
        if (err.response.data.error) {
          return console.log(setAddUserError(err.response.data.error));
        }
        setAddUserError("Server error");
      });
  };

  return (
    <>
      <div className="user-wrap">
        <div className="creat-wrap">
          <div className="input-wrap">
            <div>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
              >
                Add New User
              </Button>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="FirstName"
                    type="text"
                    minLength="2"
                    value={newUserName}
                    onChange={(e) => setNewUserName(e.target.value)}
                    fullWidth
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="LastName"
                    label="LastName"
                    type="text"
                    minLength="2"
                    value={newLastName}
                    onChange={(e) => setNewLastName(e.target.value)}
                    fullWidth
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email"
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    fullWidth
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setnewPassword(e.target.value)}
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button
                    disabled={
                      !newUserName || !newLastName || !newEmail || !newPassword
                    }
                    onClick={handleSubmit}
                    color="primary"
                  >
                    Confirm
                  </Button>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </div>
        <ul>
          <Table className="Mtable" aria-label="simple table">
            <TableBody>
              <TableHead>
                <TableRow>
                  <TableCell className="MtableHeaderCell">FirstName</TableCell>
                  <TableCell className="MtableHeaderCell">LastName</TableCell>
                  <TableCell className="MtableHeaderCell">Email</TableCell>
                  <TableCell className="MtableHeaderCell"></TableCell>
                  <TableCell className="MtableHeaderCell"></TableCell>
                </TableRow>
              </TableHead>

              {users.map((user) => (
                <li key={user.name}>
                  <UserInput user={user} />
                </li>
              ))}
            </TableBody>
          </Table>
        </ul>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={openMessage}
          autoHideDuration={8000}
          onClose={handleCloseMessage}
          message="User added successfully"
          severity="success"
          action={
            <React.Fragment>
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseMessage}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </React.Fragment>
          }
        />
      </div>
    </>
  );
}
export default Users;
