import React from "react";
import Calendar from "./Calendar";
import StartTime from "./StartTime";
import EndTime from "./EndTime";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { styled } from '@mui/material/styles';


export default function ScheduleLine(props) {

  const scheduleLineChanged = (item) => {
    props.scheduleChanged(item);
  }; 

  return (
       
    <Paper
    elevation={3}
    sx={{ width: "100%" }}
    style={{ marginBottom: "10px" }}>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <ListItem alignItems="space-between" spacing={4}>
          <Stack direction="column" spacing={3}>
            <Calendar day={props.day} />
            <Stack direction="row" spacing={5}>
              <StartTime
                start_time={props.start_time}
                item={props.item}
                scheduleLineChanged={(item) => scheduleLineChanged(item)}
              />
              <EndTime
                end_time={props.end_time}
                item={props.item}
                scheduleLineChanged={(item) => scheduleLineChanged(item)}
              />
            </Stack>
          </Stack>
        </ListItem>
      </List>
    </Paper>
  
  
  );
}
