import React from "react";
import firebase from './firebase'
import Button from "@material-ui/core/Button";

import {
  TableBody,
  TableCell,
  TableRow,
  Grid,
  Typography
} from '@material-ui/core';

export const UserInput = ({ user }) => {
  const [name, setName] = React.useState(user.name);
  const [lastName, setLastName] = React.useState(user.lastName);
  const [email, setEmail] = React.useState(user.email);

  const onEdit = () => {
    const db = firebase.firestore()
    db.collection('users').doc(user.id).set({ ...user, name })
    db.collection('users').doc(user.id).set({ ...user, lastName })
    db.collection('users').doc(user.id).set({ ...user, email })
  }

  const onDelete = () => {
    const db = firebase.firestore()
    db.collection('users').doc(user.id).delete()
  }

  return (
    <>

      <TableBody>
        <TableRow>
          <TableCell>
            <Grid container>
              <Typography className="MtableName">
                <input
                  type="text"
                  value={name}
                  onChange={e => {
                    setName(e.target.value);
                  }}
                />
              </Typography>
            </Grid>
          </TableCell>

          <TableCell>
            <Grid container>
              <Typography className="MtableName">
                <input
                  type="text"
                  value={lastName}
                  onChange={e => {
                    setLastName(e.target.value);
                  }}
                />
              </Typography>
            </Grid>
          </TableCell>
          <TableCell>
            <Grid container>
              <Typography className="MtableName">
                <input
                  type="email"
                  value={email}
                  onChange={e => {
                    setEmail(e.target.value);
                  }}
                />
              </Typography>
            </Grid>
          </TableCell>
          <TableCell>
            <Grid container>
              <Typography className="MtableName">
                <Button className="edit" variant="contained" color="primary" onClick={onEdit}>
                  Edit
                </Button>
              </Typography>
            </Grid>
          </TableCell>
          <TableCell>
            <Grid container>
              <Typography className="MtableName">
                <Button variant="contained" color="secondary" onClick={onDelete}>
                  Delete
                </Button>
              </Typography>
            </Grid>
          </TableCell>
        </TableRow>
      </TableBody>


    </>
  );
};
