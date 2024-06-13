import { Box, Grid } from '@mui/material';
import React from 'react';

const UserDashboard = (props) => {
  const { name, date, time, id, data } = props;
  return (
    <Box>
      <Grid container width={'100%'} height={'100vh'} sx={{backgroundColor:'rebeccapurple'}}>
        <Grid item xs={12} md={6} >
          <span>this is UserDashboard</span>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserDashboard;
