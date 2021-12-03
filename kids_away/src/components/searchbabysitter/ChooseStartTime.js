import {React } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function ChooseStartTime(props) {
  
  return (
    <div>
      <FormControl sx={{  minWidth: 120 }}>
        <InputLabel id="demo-simple-select-label">Start Time</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.value}
          label="Start Time"
          onChange={(event)=> props.changeStartTime(event.target.value)}
          inputProps={{ readOnly: props.readOnly , disabled: props.disabled }}

        >
           <MenuItem value={"06:00:00"}>6am</MenuItem>
          <MenuItem value={"07:00:00"}>7am</MenuItem>
          <MenuItem value={"08:00:00"}>8am</MenuItem>
          <MenuItem value={"09:00:00"}>9am</MenuItem>
          <MenuItem value={"10:00:00"}>10am</MenuItem>
          <MenuItem value={"11:00:00"}>11am</MenuItem>
          <MenuItem value={"12:00:00"}>12pm</MenuItem>
          <MenuItem value={"13:00:00"}>1pm</MenuItem>
          <MenuItem value={"14:00:00"}>2pm</MenuItem>
          <MenuItem value={"15:00:00"}>3pm</MenuItem>
          <MenuItem value={"16:00:00"}>4pm</MenuItem>
          <MenuItem value={"17:00:00"}>5pm</MenuItem>
          <MenuItem value={"18:00:00"}>6pm</MenuItem>
          <MenuItem value={"19:00:00"}>7pm</MenuItem>
          <MenuItem value={"20:00:00"}>8pm</MenuItem>
          <MenuItem value={"21:00:00"}>9pm</MenuItem>
          <MenuItem value={"22:00:00"}>10pm</MenuItem>
          <MenuItem value={"23:00:00"}>11pm</MenuItem>
        </Select>
      </FormControl>
      
    </div>
  );
}