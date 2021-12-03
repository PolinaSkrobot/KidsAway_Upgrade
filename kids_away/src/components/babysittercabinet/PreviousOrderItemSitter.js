import { React } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";


export default function PreviousOrderItemSitter(props) {
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
            On {props.date} you was taking care of {props.name}'s child
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
    </Card>
  );
}
