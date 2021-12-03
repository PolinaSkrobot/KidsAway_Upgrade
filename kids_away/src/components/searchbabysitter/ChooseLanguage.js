import { React } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


export default function ChooseLanguage(props) {


  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Language</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.value}
          label="Language"
          onChange={(event)=>{props.changeLanguage(event.target.value)}}
          inputProps={{ readOnly: props.readOnly , disabled: props.disabled }}

        >
          <MenuItem value={'English'}>English</MenuItem>
          <MenuItem value={'Mandarin'}>Mandarin </MenuItem>
          <MenuItem value={'Farsi'}>Farsi</MenuItem>
          <MenuItem value={'Russian'}>Russian</MenuItem>
          <MenuItem value={'French'}>French</MenuItem>
          <MenuItem value={'Spanish'}>Spanish</MenuItem>

        </Select>
      </FormControl>
    </Box>
  );
}