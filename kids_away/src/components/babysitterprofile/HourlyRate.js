import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Typography from "@mui/material/Typography";



export default function HourlyRate(props) {
  return ( 
    
    // <List sx={{ width: '80%',  bgcolor: 'background.paper' }} alignItems="center" justify="space-between">
      <Grid container
        direction="column"
        alignItems="center"
        justify="flex-start"
        style={{width: "300px", paddingLeft: "30px", paddingTop: "30px" } } >
       
          <ListItem >
            <ListItemAvatar >
              <Avatar >
                < Typography> {props.prices[0].onekid_onehour}$</Typography>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="1 child" secondary="1 hour"/>
          </ListItem>
          <ListItem >
            <ListItemAvatar >
              <Avatar >
                < Typography> {props.prices[0].twokids_onehour}$</Typography>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="2 children" secondary="1 hour"/>
          </ListItem>
          <ListItem >
            <ListItemAvatar >
              <Avatar >
                < Typography> {props.prices[0].threekids_onehour}$</Typography>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="3 children" secondary="1 hour"/>
          </ListItem>
      </Grid>

  );
}