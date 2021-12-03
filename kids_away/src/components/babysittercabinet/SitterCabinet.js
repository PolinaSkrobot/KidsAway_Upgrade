import { React, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SitterOrderDetails from "./SitterOrderDetails";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import axios from "axios";
import "./SitterCabinet.css";
import ScheduleLine from "./ScheduleLine";
import NavbarBabysitter from "../NavbarBabysitter";
import formatDate from "../helpers/formatter";
import RateParent from "./RateParent";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

import PreviousOrderListSitter from "./PreviousOrderListSitter";

export default function SitterCabinet(props) {
  const [confirmWindowOpen, setConfirmWindowOpen] = useState(false);
  const [value, setValue] = useState("1");
  const [schedule, setSchedule] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const [loaded2, setLoaded2] = useState(true);
  const [confirm, setConfirm] = useState("primary");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("Created");

  const [state, setState] = useState({
    orders: [],
  });

  useEffect(() => {
    return axios.get("/sitter-cabinet").then((res) => {
      setState((prev) => ({ ...prev, orders: res.data }));
      setConfirm(
        res.data[res.data.length - 1].status === "created"
          ? "primary"
          : "secondary"
      );
      setStatus(res.data[res.data.length - 1].status);
      setLoaded2(false);
    });
  }, []);

  useEffect(() => {
    return axios.get("/babysitterCabinet").then((res) => {
      console.log(res.data);
      setSchedule(res.data);
      setLoaded(false);
      console.log("resdata", res.data);
    });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // handle the delays on loading data from axios
  if (!loaded && !loaded2) {
    // finds last created order
    const order = state.orders[state.orders.length - 1];

    //Sitter cancells the order
    const handleCancel = (event) => {
      event.preventDefault();
      const status = {
        status: "cancelled",
        id: order.id,
      };
      return axios
        .post("/sitter-status", null, { params: { status } })
        .then((response) => {
          console.log("res from Post to /user-review", response);
          setState({
            ...state,
            orders: state.orders.slice(0, state.orders.length - 1),
          });
        });
    };
    //Sitter confirms hw accepts the order
    const handleSubmit = (event) => {
      event.preventDefault();
      const status = {
        status: "confirmed",
        id: order.id,
      };

      return axios
        .post("/sitter-status", null, { params: { status } })
        .then((response) => {
          console.log("sent", response);
          setConfirm("secondary");
          setStatus("confirmed");
        });
    };
    //--------------------------->Scheduler
    const scheduleChanged = (newItem) => {//user's input of schedule
      let newSchedule = schedule;
      let itemToChange = newSchedule.filter(
        (item) => item.date === newItem.date
      )[0];
      if (
        newItem.start_time !==
        newSchedule[newSchedule.indexOf(itemToChange)].start_time
      ) {
        newSchedule[newSchedule.indexOf(itemToChange)].start_time =
          newItem.start_time;
      }
      if (
        newItem.end_time !==
        newSchedule[newSchedule.indexOf(itemToChange)].end_time
      ) {
        newSchedule[newSchedule.indexOf(itemToChange)].end_time =
          newItem.end_time;
      }
      setSchedule(newSchedule);
    };
    const dayNames = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    const scheduleList = schedule.map((day, index) => {
      //display day and it name
      const name = dayNames[index];
      return (
        <Grid item xs={6} md={3} lg={3}>
          <label>{name}</label>
          <ScheduleLine
            item={day}
            day={day.date}
            start_time={day.start_time.trim()}
            end_time={day.end_time.trim()}
            scheduleChanged={(item) => scheduleChanged(item)}
            style={{ backgroundColor: "red" }}
          />
        </Grid>
      );
    });

    const handleSend = () => {
      axios
        .post("/babysitterCabinet", null, { params: { schedule } })
        .then(setOpen(true))
        .catch((err) => {
          console.log("err", err);
        });
    };

    let newInvites = "";//to display +1 new order
    let createdNum = state.orders.filter(
      (order) => order.status === "created"
    ).length;

    if (createdNum > 0) {
      newInvites = `+(${createdNum}) new`;
    }

    return (
      <Box sx={{ width: "100%", typography: "body1" }}>
        <NavbarBabysitter />
        <TabContext value={value}>
          <Box
            sx={{ borderBottom: 1, borderColor: "divider" }}
            style={{ justifyContent: "space-evenly", display: "flex" }}
          >
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Your week schedule" value="1" />
              <Tab label={`Current orders ${newInvites}`} value="2" />
              <Tab label="Previous Orders" value="3" />
            </TabList>
          </Box>

          <TabPanel value="1" className="sch">
            <Stack direction="column">
              <Grid container spacing={1}>
                {scheduleList}
              </Grid>
              <Collapse in={open} sx={{ width: "50%", alignSelf: "center" }}>
                <Alert
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{ mb: 2 }}
                >
                  Your schedule was recorded!
                </Alert>
              </Collapse>
              <Button
                component={Link}
                to="/babysitterCabinet"
                color="primary"
                variant="contained"
                onClick={handleSend}
                style={{ width: "30%", marginLeft: "30%", marginTop: "2%" }}
              >
                Send time
              </Button>
            </Stack>
          </TabPanel>

          <TabPanel value="2">
            {order.status === "created" || order.status === "confirmed" ? (
              <div>
                <SitterOrderDetails
                  date={formatDate(order.date)}
                  startTime={order.start_time}
                  endTime={order.end_time}
                  address={order.address}
                  numChildren={order.num_of_kids}
                  message={order.comment}
                  status={status}
                  phone={order.contact_phone}
                  hours={order.hours}
                  onFinish={() => setConfirmWindowOpen(true)}
                  onDelete={handleCancel}
                  onClick={handleCancel}
                  buttonName="reject order"
                  onSubmit={handleSubmit}
                  color={confirm}
                />
                <RateParent
                  open={confirmWindowOpen}
                  onClose={() => {
                    setConfirmWindowOpen(false);
                    setState({
                      ...state,
                      orders: state.orders.slice(0, state.orders.length - 1),
                    });
                  }}
                  id={order.id}
                />
              </div>
            ) : null}
          </TabPanel>
          <TabPanel value="3">
            <PreviousOrderListSitter orders={state.orders} />
          </TabPanel>
        </TabContext>
      </Box>
    );
  } else {
    return <div></div>;
  }
}
