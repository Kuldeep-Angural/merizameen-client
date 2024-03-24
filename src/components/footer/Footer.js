import { Grid, Link, Typography } from '@mui/material';
import React from 'react';
export const Footer = () => {
  return (
    <Grid display={'flex'} mt={4} position={'static'} bottom={2} justifyContent={'center'} left={'20%'} right={'20%'} alignContent={'center'} alignItems="center">
      <Typography variant="body2" fontWeight={'600'} textAlign={'center'} color="inherit">
        {'Copyright © '}
        <Link style={{ cursor: 'pointer' }} color="inherit" href="https://merizameen.com/">
          merizameen
        </Link>
        <span style={{ marginLeft: '6px' }}>{new Date().getFullYear()}</span>
      </Typography>
    </Grid>
  );
};
