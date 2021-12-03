import React from "react";
import "./NavbarBabysitter.scss";
import Button from '@mui/material/Button';
import { AccountCircleOutlined , FavoriteBorderOutlined , EmailOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import logoElefant from '../images/logoImage.webp'
import { useHistory } from "react-router-dom";


export default function NavbarBabysitter(props) {
  const history = useHistory();
  const handleRoute = () =>{ 
    history.push("/");
  }
  const logoStyle = {
    cursor: 'pointer'
  }
 
  return (
    <div className="navigation">
      <>
      <div className="logo" onClick={handleRoute} style={logoStyle}>
        <img 
          className="logoImage"
          src={logoElefant}
          alt="logoImage">
        </img>
        <h2>KidsAway</h2>
      </div>
      </>
      <div className="navButtons">
        <Stack direction="row">
          <h2>Hello, Sobina!</h2>
          <IconButton component={Link} to="/babysitterCabinet">
            <AccountCircleOutlined color="secondary" fontSize="large" />
          </IconButton>
          <IconButton component={Link} to="/messages">
            <EmailOutlined color="secondary" fontSize="large" />
          </IconButton>       
          <Button variant="outlined" fontSize="large" component={Link} to="/" typography="fontFamily" > Logout</Button>
        </Stack>
      </div>
    </div>
  );
};