import { Box, Button, Card, CardContent, Chip, Grid, Typography } from '@mui/material';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import { FormControl, OutlinedInput } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import React, { useCallback, useEffect } from 'react';
import '../../pages/Global.scss';
import backgroundImageUrl from '../../ui/images/peakpx.jpg';
import { filterChips } from '../../constants/constant';
import './home.scss';
import { debounce } from '../../utils/utility';
import Marquee from 'react-fast-marquee';

export const HighLightCards = ({ setFilterParams, filterParams, searchParams, setSearchParams, location, setLocation }) => {

  const itemsCount = [
    {
      color: 'rgba(224, 119, 196,0.5)',
      content: (
        <Grid>
          <Typography mt={1} fontWeight={'700'} textAlign={'center'}>
            Post your Property Ads
          </Typography>
          <Typography mt={2} fontWeight={'500'} minHeight={'50px'} maxHeight={'80px'} textAlign={'center'}>
            Sell/Rent out your property & Get <br />unlimited responses
          </Typography>

          <Grid display={'flex'} justifyContent={'center'}>
            <Button sx={{ color: 'white', display: 'block' }}>
              <Chip className="highlight-buttons" style={{ cursor: 'pointer', '&:hover': { backgroundColor: '#07b0ed' } }} color="primary" label={'Explore Now'} variant="standard" />
            </Button>
          </Grid>
        </Grid>
      ),
    },
    {
      color: 'rgba(0, 89, 232 , 0.5)',
      content: (
        <Grid>
          <Typography mt={1} fontWeight={'700'} textAlign={'center'}>
            Top Property Dealers
          </Typography>

          <Typography mt={2} fontWeight={'500'} textAlign={'center'}>
            Connect with genuine property dealers <br></br>in your city
          </Typography>

          <Grid display={'flex'} justifyContent={'center'}>
            <Button sx={{ color: 'white', display: 'block' }}>
              <Chip className="highlight-buttons" style={{ cursor: 'pointer', '&:hover': { backgroundColor: '#07b0ed' } }} color="primary" label={'Explore Now'} variant="standard" />
            </Button>
          </Grid>
        </Grid>
      ),
    },
    {
      color: 'rgba(214, 44, 32 , 0.5)',
      content: (
        <Grid>
          <Typography mt={1} fontWeight={'700'} textAlign={'center'}>
            Verified Property for Sale
          </Typography>
          <Typography mt={2} fontWeight={'500'} textAlign={'center'}>
            Search for the best commercial or residential <br></br>deal in your city
          </Typography>

          <Grid display={'flex'} justifyContent={'center'}>
            <Button sx={{ color: 'white', display: 'block' }}>
              <Chip className="highlight-buttons" style={{ cursor: 'pointer', '&:hover': { backgroundColor: '#07b0ed' } }} color="primary" label={'Explore Now'} variant="standard" />
            </Button>
          </Grid>
        </Grid>
      ),
    },
    {
      color: 'rgba(255, 166, 0, 0.5)',
      content: (
        <Grid>
          <Typography mt={1} fontWeight={'700'} textAlign={'center'}>
            Upcoming Projects
          </Typography>
          <Typography mt={2} fontWeight={'500'} textAlign={'center'}>
            Obtain information about upcoming projects <br></br>in your city
          </Typography>

          <Grid display={'flex'} justifyContent={'center'}>
            <Button sx={{ color: 'white', display: 'block' }}>
              <Chip className="highlight-buttons" style={{ cursor: 'pointer', '&:hover': { backgroundColor: '#07b0ed' } }} color="primary" label={'Explore Now'} variant="standard" />
            </Button>
          </Grid>
        </Grid>
      ),
    },
  ];

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
    if (item.name === 'all') {
      setSelectedChip('');
    } else {
      setSelectedChip(item.name);
    }
  };

  const handleSearch = (e) => {
    debouncedChangeHandler(e.target.value)
  }


  const debouncedChangeHandler = useCallback(
    debounce((value) => {
      setSearchParams(value)
    }, 700),
    []
  );



  const Items = ({ color, content }) => {
    return (
      <Grid item md={3} xs={6}>
        <Card sx={{ backgroundColor: color, height: '180px', boxShadow: '0', borderRadius: '16px', transform: 'all', "&:hover": { boxShadow: 3 } }} >{content}</Card>
      </Grid>
    );
  };

  const handleResetFilters = () => {
    setFilterParams(undefined);
    setSearchParams(undefined);
  }

  return (
    <Grid container sx={{ marginTop: '1px', padding: '10px' }} >
      <Marquee style={{ color: "#2196F3" }} speed={80} pauseOnHover={true}>
        We are currently available in Punjab and Himachal. For more information, please contact us.
      </Marquee>
      <Grid item md={12} sm={12} xs={12} p={2} style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.9)), url(${backgroundImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '400px', opacity: '1' }}>
        <Grid container gap={1} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
          <Grid item md={3} xs={12} >
            <Card variant="outlined" >
              <CardContent style={{ backgroundColor: '#f5f5f5' }}>
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
          <Grid item md={5} xs={12} >
            <CardContent>
              <Grid container gap={2}>
                {filterChips.map((item, index) => {
                  return (
                    <Grid key={index} item onClick={() => handleChipClick(item)}>
                      <Chip style={{ cursor: 'pointer', backgroundColor: filterParams === item.name ? '#2196F3' : '#f5f5f5' }} label={item.name} o variant="filled" />
                    </Grid>
                  );
                })}
                <Chip onClick={handleResetFilters} style={{ cursor: 'pointer', backgroundColor: '#2196F3' }} label={'Reset Filters'} o variant="filled" />
              </Grid>
            </CardContent>
          </Grid>

          <Grid item md={3} xs={12} display={'flex'} justifyContent={'center'}>
            <FormControl sx={{ m: 1, width: '30ch', color: '#F5F5F5' }} variant="standard">
              <OutlinedInput fullWidth sx={{
                borderRadius: '33px',
                color: '#F5F5F5',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#F5F5F5',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#F5F5F5',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#F5F5F5',
                },
              }} style={{ borderRadius: '33px', color: '#F5F5F5', borderColor: '#F5F5F5', }} endAdornment={<SearchIcon style={{ cursor: 'pointer', borderRadius: '50%', fontSize: '40px', color: 'rgb(184,207,253)' }} onClick={() => { }} />} aria-describedby="outlined-weight-helper-text" onChange={handleSearch} placeholder="Search" />
            </FormControl>
          </Grid>
        </Grid>
        <Grid item md={12} sm={12} xs={12}>
          <Typography align='center' mt={5} fontSize={40} fontWeight={650} color={'#F5F5F5'}>
            Discover Your Dream House.
          </Typography>
        </Grid>
      </Grid>


    </Grid>
  );
};
