import { Button, Grid } from '@mui/material';
import Lottie from 'lottie-react';
import React, { useEffect } from 'react';
import ChatBotAnimation from '../../ui/json/404PageNotFound.json';
export const PageNotFound = ({ updatePageTitle }) => {
  useEffect(() => {
    updatePageTitle('page not found');
  }, []);

  return (
    <Grid container spacing={2} justifyContent={'center'} alignItems={'center'} style={{ minHeight: '100vh' }}>
      <Grid item md={12} xs={12} sm={12}>
        <Lottie loop={false} animationData={ChatBotAnimation} style={{ height: '100vh', cursor: 'pointer' }} />
      </Grid>
      <Grid item>
        <Button style={{ position: 'relative', top: '-123px' }} onClick={() => window.location.reload()} color="primary" variant="text">
          Try Again
        </Button>
      </Grid>
      <Grid item>
        <Button style={{ position: 'relative', top: '-123px' }} onClick={() => window.location.replace('/')} color="primary" variant="text">
          Home Page
        </Button>
      </Grid>
    </Grid>
  );
};
