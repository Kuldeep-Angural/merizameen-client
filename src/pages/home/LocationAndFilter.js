import { Button, Card, CardContent, Chip, Grid, Typography } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import React, { useEffect, useState } from 'react';
import '../home/home.css';
const filterChips = [
  { name: 'Flats', value: 'Flats' },
  { name: 'PG', value: 'PG' },

  { name: 'Commercial', value: 'Commercial' },
  { name: 'Residential', value: 'Residential' },
  { name: 'Plot', value: 'Plot' },
  { name: 'Rental', value: 'Rental' },

  { name: '1Bhk', value: '1Bhk' },
  { name: '2Bhk', value: '2Bhk' },
  { name: '3Bhk', value: '3Bhk' },
  { name: '3+Bhk', value: '3+Bhk' },
];
export const LocationAndFilter = () => {
  const [location, setLocation] = useState({});

  const getLocationParams = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const { latitude, longitude } = position.coords;
        getExactLocation(latitude, longitude);
      });
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const getExactLocation = async (latitude, longitude) => {
    try {
      const api_key = process.env.REACT_APP_LOCATION_API_KEY;
      const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${api_key}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const { country, state, name } = data[0] || {};
      setLocation({ country: country, state: state, city: name });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    getLocationParams();
  }, []);

  return (
    <Card sx={{ marginTop: '10px', margin: '10px' }}>
      <CardContent>
        <Grid container gap={3}>
          <Grid item md={3} xs={12}>
            <Card>
              <CardContent>
                <Typography textAlign={'center'}>
                  <Button color="text" startIcon={<LocationOnIcon />}>
                    {location?.city||"" + ',' + location?.state||"" + ',' + location?.country||""}
                  </Button>
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item md={8} xs={12}>
            <Card>
              <CardContent>
                <Grid container gap={2}>
                  {filterChips.map((item) => {
                    return (
                      <Grid item>
                        <Chip className="chip-hover" style={{ cursor: 'pointer', '&:hover': { backgroundColor: '#07b0ed' } }} label={item.name} variant="outlined" />
                      </Grid>
                    );
                  })}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
