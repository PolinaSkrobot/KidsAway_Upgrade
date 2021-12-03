import { React, useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import SitterOrderDetails from "../confirmorder/SitterOrderDetails";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import axios from "axios";
import "./SitterCabinet.css";
import ScheduleLine from "./ScheduleLine";
import NavbarBabysitter from "../NavbarBabysitter";
import formatDate from "../helpers/formatter";
import RateParent from "./RateParent";

export default function SitterCabinet(props) {
  const [confirmWindowOpen, setConfirmWindowOpen] = useState(false);
  const [value, setValue] = useState("1");
  const [schedule, setSchedule] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const [loaded2, setLoaded2] = useState(true);
  const [confirm, setConfirm] = useState("primary");

  const [state, setState] = useState({
    orders: [],
  });

  useEffect(() => {
    return axios.get("/sitter-cabinet").then((res) => {
      setState((prev) => ({ ...prev, orders: res.data }));
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


  // handle the delays on loading data 
  if (!loaded&&!loaded2) {
    // finds last created order
    const order = state.orders[state.orders.length - 1];
    console.log("order-------->", order);

    //Sitter cancells the order
  const handleCancel = (event) => {
    event.preventDefault();

    const status = {
      status: "cancelled",
      id: order.id
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
      id: order.id
    };

    return axios
      .post("/sitter-status", null, { params: { status } })
      .then((response) => {
        console.log("res from Post to /user-review", response);
        setConfirm("secondary");
      });
  };
//--------------------------->Scheduler
    const scheduleChanged = (newItem) => {
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
      console.log("[!]", newSchedule);
      setSchedule(newSchedule);
    };

    const scheduleList = schedule.map((day) => {
      return (
        <ScheduleLine
          item={day}
          day={day.date}
          start_time={day.start_time}
          end_time={day.end_time}
          scheduleChanged={(item) => scheduleChanged(item)}
        />
      );
    });

    const handleSend = () => {
      console.log("LLL");
      return axios.post("/babysitterCabinet", null, { params: { schedule } });
    };


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
              <Tab label="Create New Order" value="2" />
              <Tab label="Previous Orders" value="3" />
            </TabList>
          </Box>

          <TabPanel value="1" className="sch">
            {scheduleList}
            <Button
              component={Link}
              to="/babysitterCabinet"
              color="primary"
              variant="contained"
              onClick={handleSend}
            >
              Send time
            </Button>
          </TabPanel>

          <TabPanel value="2">
            {order.status === "created" || order.status === "confirmed" ? (
              <div>
                <OrderDetails
                  date={formatDate(order.date)}
                  startTime={order.start_time}
                  endTime={order.end_time}
                  address={order.address}
                  numChildren={order.num_of_kids}
                  message={order.comment}
                  status={order.status}
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
          <TabPanel value="3">Item Three</TabPanel>
        </TabContext>
      </Box>
    );
  } else 
  {
    return <div></div>;
  } 
}
