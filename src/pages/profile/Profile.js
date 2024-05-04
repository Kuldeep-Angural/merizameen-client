import { Box, Grid } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectUserData } from '../authantication/authSlice';

const Profile = () => {
    const userData = useSelector(selectUserData);
    console.log(userData);

  return (
    <Grid container spacing={1}>
        <Grid item md={12}>
snfllbwf.
        </Grid>
    </Grid>
  )
};

export default Profile;