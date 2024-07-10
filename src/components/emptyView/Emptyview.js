import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import ItemNotFound from '../../ui/json/noDataFOund.json';
import Lottie from 'lottie-react';

const Emptyview = ({ title, text }) => {
  return (
    <Grid container md={12} xs={12} display={'flex'} justifyContent={'center'}>
      <Grid item md={12} xs={12}>
        <Lottie loop={true} animationData={ItemNotFound} style={{ height: '190px', cursor: 'pointer' }} />
      </Grid>
      <Grid item md={12} xs={12}>
        <Typography fontSize={'20px'} fontWeight={600} textAlign={'center'}>
          {text}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Emptyview;
