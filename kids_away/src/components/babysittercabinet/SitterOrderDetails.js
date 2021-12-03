import { React } from "react";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";


export default function SitterOrderDetails(props) {

  return (
    <Paper
      elevation={3}
      sx={{ width: 450 }}
      style={{ margin: "10px", padding: "10px" }}
    >
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Stack
          direction="row"
          spacing={13}
          style={{
            justifyContent: "space-between",
            // alignItems: "flex-end",
            display: "flex",
            margin: "20px",
          }}
        >
          <Typography color="secondary" variant="h5" fontWeight="600">
            Order Details
          </Typography>
          <Chip
          color={props.color}
            label={props.status}
             onClick={props.onSubmit}
             style={{
              width: "7rem"
            }}
           
          />
        </Stack>

        <ListItem>
          <ListItemText primary="1. Date " />
          <Typography color="primary" style={{ fontWeight: 600 }}>
            {props.date}
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemText primary="2. Time " />
          <Typography color="primary" style={{ fontWeight: 600 }}>
            {props.startTime}-{props.endTime}
          </Typography>
        </ListItem>

        <ListItem>
          <ListItemText primary="3. Number of children " />
          <Typography color="primary" style={{ fontWeight: 600 }}>
            {props.numChildren}
          </Typography>
        </ListItem>


        <ListItem>
          <ListItemText primary="4. Phone" />
          <Typography color="primary" style={{ fontWeight: 600 }}>
            {props.phone}
          </Typography>
        </ListItem>

        <ListItem>
          <ListItemText primary="5. Address " />
          <Typography color="primary" style={{ fontWeight: 600 }}>
            {props.address}
          </Typography>
        </ListItem>

        <ListItem>
          <ListItemText primary="6. Message " />
          <Typography color="primary" style={{ fontWeight: 600 }}>
            {props.message}
          </Typography>
        </ListItem>
      </List>
      <Button
          variant="contained"
          onClick={props.onSubmit}
          color="secondary"
          style={{ width: "60%", marginLeft: "20%" }}
        >
          Confirm Order
        </Button>

      <Stack
        spacing={5}
        direction="row"
        alignItems="center"
        justifyContent="center"
        margin="20px"
      >
        <Button
          variant="contained"
          onClick={props.onFinish}
          style={{ width: "40%" }}
        >
          Finish order
        </Button>
        <Button
          variant="contained"
          onClick={props.onDelete}
          style={{ width: "40%" }}
        >
          {props.buttonName}
        </Button>
      </Stack>
    </Paper>
  );
}
