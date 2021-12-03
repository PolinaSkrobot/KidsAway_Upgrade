import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import night from '../../images/night.jpg';
import craft from '../../images/crafts.jpg';
import outside from '../../images/outside.jpg';
import swimming from '../../images/swimming.jpg';
import pet from '../../images/pet.jpg';
import pickup from '../../images/pickup.jpg';

export default function ServicesCard() {
  return (
    
      <Grid container 
      direction="row"
      alignItems="center"
      justify="space-between"
      width="80%" >
        <Grid item xs={6} sm={4} md={4} lg={4}>
          <Card sx={{ width: 120, height: 140 }} style={{ margin: "5px" }}>
            <CardMedia
              component="img"
              width="120"
              image={night}
              alt="Overnight"
            />
            <CardContent>
              <Typography gutterBottom variant="p" component="div">
                Overnight Nanny
        </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} sm={4} md={4} lg={4}>
          <Card sx={{ width: 120, height: 140 }} style={{ margin: "5px" }}>
            <CardMedia
              component="img"

              width="120"

              image={craft}
              alt="Craft"
            />
            <CardContent>
              <Typography gutterBottom variant="p" component="div">
                Arts and Crafts
      </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} sm={4} md={4} lg={4}>
          <Card sx={{ width: 120, height: 140 }} style={{ margin: "5px" }}>
            <CardMedia
              component="img"
              width="120"
              image={outside}
              alt="Outside"
            />
            <CardContent>
              <Typography gutterBottom variant="p" component="div">
                Outside Play
      </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} sm={4} md={4} lg={4}>
          <Card sx={{ width: 120, height: 140 }} style={{ margin: "5px" }}>
            <CardMedia
              component="img"

              width="120"

              image={swimming}
              alt="Swimming"
            />
            <CardContent>
              <Typography gutterBottom variant="p" component="div">
                Swimming Supervision
      </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} sm={4} md={4} lg={4}>
          <Card sx={{ width: 120, height: 140 }} style={{ margin: "5px" }}>
            <CardMedia
              component="img"

              width="120"

              image={pet}
              alt="Pet"
            />
            <CardContent>
              <Typography gutterBottom variant="p" component="div">
                Pet Care
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={6} sm={4} md={4} lg={4}>
          <Card sx={{ width: 120, height: 140 }} style={{ margin: "5px" }}>
            <CardMedia
              component="img"

              width="120"

              image={pickup}
              alt="Pickup"
            />
            <CardContent>
              <Typography gutterBottom variant="p" component="div">
                Pick Up/Drop Off
      </Typography>
            </CardContent>
          </Card>
        </Grid>


      </Grid>

  );
}