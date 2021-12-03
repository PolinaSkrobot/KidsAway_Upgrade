import React from "react";
import "./NavMain.scss";
import Button from '@mui/material/Button';
import { AccountCircleOutlined , FavoriteBorderOutlined , EmailOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import logoElefant from '../images/logoImage.webp'
import { useHistory } from "react-router-dom";


export default function Navbar(props) {
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
          <Button variant="outlined" fontSize="large" component={Link} to="/" typography="fontFamily" > Registration</Button>
        </Stack>
      </div>
    </div>
  );
};