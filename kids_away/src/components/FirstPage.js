import React from "react";
import "./FirstPage.scss";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import "./NavMain.scss";
import NavMain from './NavMain';

export default function FirstPage(props) {
  return (
    <div>
      <NavMain/>

      <div className="main">
        <img
          className="frontImage"
          src="images/bear.png"
          alt="frontImage"
        ></img>
        <div className="heading">
          <h1 className="first">Perfect </h1>
          <h1 className="second">Babysitter </h1>
          <h1 className="third">is Here</h1>
        </div>
        <Stack spacing={5} direction="row" style={{ width: "50%", display: "flex", justifyContent: "center" }} >
          <Button
            variant="contained"
            component={Link}
            to="/searchBabysitters"
            style={{ width: "30%" }}
          >
            I'm a Parent
          </Button>
          <Button
            variant="contained"
            component={Link}
            to="/babysitterCabinet"
            style={{ width: "30%" }}
          >
            I'm a Babysitter
          </Button>
        </Stack>
      </div>
    </div>
  );
}
