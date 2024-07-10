import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Button, Card, CardContent, Chip, Grid, Typography,FormControl,OutlinedInput,Fab } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import Skeleton from '@mui/material/Skeleton';
import '../home/home.scss';
import { filterChips } from '../../constants/constant';

export const LocationAndFilter = ({ setFilterParams, filterParams,searchParams, setSearchParams }) => {
  const [location, setLocation] = useState({});

  const setSelectedChip = (name) => {
    setFilterParams(name);
  };

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
      const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&appid=${api_key}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      const { country, state, name } = data[0] || {};
      
      setLocation({ country, state, city: name });
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  useEffect(() => {
    getLocationParams();
  }, []);

  const handleChipClick = (item) => {
    setSelectedChip(item.name);
  };

  const handleSearch = (e) => {
    setSearchParams(e.target.value)
  }

  return (
    <Card elevation={2} sx={{ marginTop: '5px', margin: '5px', padding: '4px',alignItems:'center' }}>
      <Grid container gap={1} sx={{display:'flex' ,justifyContent:'center', alignItems:'center', alignContent:'center' }}>
        <Grid item md={3} xs={12} >
          <Card variant="outlined" >
            <CardContent style={{ backgroundColor: 'rgb(77, 135, 250,0.4)' }}>
              <Typography textAlign={'center'}>
                {location.city ? (
                  <Button size="small" color="text" sx={{ p: '0px' }} startIcon={<LocationOnIcon />}>
                    <Typography fontWeight={500}>
                      {location?.city || ''},<span> {location?.state || ''}</span>, {location?.country || ''}
                    </Typography>
                  </Button>
                ) : (
                  <Skeleton variant="rounded" width={300} />
                )}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item md={5} xs={12}>
          <CardContent>
            <Grid container gap={2}>
              {filterChips.map((item, index) => {
                return (
                  <Grid key={index} item onClick={() => handleChipClick(item)}>
                    <Chip className={'chip-hover'} style={{ cursor: 'pointer', backgroundColor: filterParams === item.name && 'rgba(39, 195, 44, 0.7)' }} label={item.name} variant="filled" />
                  </Grid>
                );
              })}
            </Grid>
          </CardContent>
        </Grid>

        <Grid item md={3} xs={12} display={'flex'} justifyContent={'center'}>
          <CardContent>
            <Grid container gap={2}>
              <FormControl sx={{ m: 1, width: '30ch' }} variant="standard">
                <OutlinedInput style={{ borderRadius: '33px', color: 'grey', borderColor: 'grey' }} fullWidth endAdornment={<SearchIcon style={{ cursor: 'pointer', borderRadius: '50%', fontSize: '40px' }} onClick={() => alert('search')} />} aria-describedby="outlined-weight-helper-text" onChange={handleSearch} placeholder="Search" />
              </FormControl>
            </Grid>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};
