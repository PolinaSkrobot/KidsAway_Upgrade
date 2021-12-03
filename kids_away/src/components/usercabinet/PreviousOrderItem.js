import { React } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import { CardActionArea } from "@mui/material";
import Stack from "@mui/material/Stack";


export default function PreviousOrderItem(props) {
  return (
    <Card
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "800px",
        margin: "2rem",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h6" color="primary">
            On {props.date} {props.name} was taking care of your child
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {props.comment}
          </Typography>
          <Rating name="read-only" value={props.rate} size="small" readOnly />
        </CardContent>
      </Box>
      <Stack> 
      <CardActionArea component={Link} to={`/babysitter-profile/${props.id}`}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={props.photo}
          alt="babysitterPhoto"
        />
      </CardActionArea>
      </Stack>
    </Card>
  );
}
