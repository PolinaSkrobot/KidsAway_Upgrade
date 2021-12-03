import { React, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Link, Redirect } from "react-router-dom";
import "./BabysitterProfile.scss";



import ChooseDate from "../searchbabysitter/ChooseDate";
import ChooseStartTime from "../searchbabysitter/ChooseStartTime";
import ChooseEndTime from "../searchbabysitter/ChooseEndTime";
import ChooseLanguage from "../searchbabysitter/ChooseLanguage";
import ChooseActivity from "../searchbabysitter/ChooseActivity";
import ChooseAge from "../searchbabysitter/ChooseAge";
import ChooseChildren from "../searchbabysitter/ChooseChildren";
import Stack from "@mui/material/Stack";
import formatDate from "../helpers/formatter";
import axios from "axios";
import { useParams } from "react-router-dom";
import ConfirmWindow from "../confirmorder/ConfirmWindow";
// import { Redirect } from 'react-router'

export default function DialogWindow() {
  const { id } = useParams();
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [activity, setActivity] = useState("");
  const [message, setMessage] = useState("");
  const [number, setNumber] = useState("");
  const [confirmWindowOpen, setConfirmWindowOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const order = {
      sitter_id: id,
      address,
      activity,
      message,
      number,
      phone,
      age: localStorage.getItem("age"),
      date: formatDate(localStorage.getItem("date")),
      startTime: localStorage.getItem("startTime"),
      endTime: localStorage.getItem("endTime"),
      language: localStorage.getItem("language"),
    };

    return axios
      .post("/neworder", null, { params: { order } })
      .then((response) => {
        if (response.status === 200) {
          setConfirmWindowOpen(true);
        }
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button color="primary" variant="contained" onClick={handleClickOpen}>
        Invite Babysitter
      </Button>
      <Dialog open={open} onClose={handleClose}>
        
        <DialogTitle>Invite Babysitter</DialogTitle>
        <DialogContent>
        <Stack direction="column" spacing={2}>      
          <ChooseDate value={localStorage.getItem("date")} disabled />
          <Stack spacing={3} direction="row">
            <ChooseStartTime value={localStorage.getItem("startTime")} disabled readOnly/>
            <ChooseEndTime value={localStorage.getItem("endTime")} disabled readOnly />
          </Stack>

          <ChooseAge value={localStorage.getItem("age")} disabled/>

          <ChooseLanguage value={localStorage.getItem("language")} disabled readOnly/>

          <ChooseChildren
            value={number}
            onChange={(event) => setNumber(event.target.value)}
          />

          <ChooseActivity
            value={activity}
            onChange={(event) => setActivity(event.target.value)}
          />

          <TextField
            autoFocus
            margin="dense"
            id="address"
            label="Address"
            type="text"
            fullWidth
            variant="standard"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="Message"
            label="Message"
            type="text"
            fullWidth
            variant="standard"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />

          <TextField
            autoFocus
            margin="dense"
            id="Phone"
            label="phone"
            type="text"
            fullWidth
            variant="standard"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
           </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} component={Link} to="/user-cabinet">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <ConfirmWindow
        open={confirmWindowOpen}
        onClose={() => setConfirmWindowOpen(false)}
        message={
          "Thank You! Your order has been sent. Babysitter will confirm it shortly. Have a great day!"
        }
      />
    </div>
  );
}
