import {React , useState}  from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';

export default function ChooseCity(props) {
  const [open, setOpen] = useState(false);
 
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl fullWidth >
        <InputLabel id="demo-controlled-open-select-label">Activity</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={props.activity}
          label="Activity"
          onChange={props.onChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Put to sleep"}>Put to sleep</MenuItem>
          <MenuItem value={"Pick up from school"}>Pick up from school</MenuItem>
          <MenuItem value={"Spend time at home"}>Spend time at home</MenuItem>
          <MenuItem value={"Arts and Crafts"}> Arts and Crafts</MenuItem>
          <MenuItem value={"Go for a walk "}>Go for a walk</MenuItem>

        </Select>
      </FormControl>
    </div>
  );
}



