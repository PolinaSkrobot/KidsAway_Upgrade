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
      <FormControl sx={{ m: 1, width: 260 }} >
        <InputLabel id="demo-controlled-open-select-label">City</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          // value={city}
          label="city"
          onChange={(event) => props.changeCity(event.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Coquitlam"}>Coquitlam</MenuItem>
          <MenuItem value={"Burnaby"}>Burnaby</MenuItem>
          <MenuItem value={"Langley"}>Langley</MenuItem>
          <MenuItem value={"Vancouver"}>Vancouver</MenuItem>
          <MenuItem value={"Maple Ridge"}>Maple Ridge</MenuItem>

        </Select>
      </FormControl>
    </div>
  );
}