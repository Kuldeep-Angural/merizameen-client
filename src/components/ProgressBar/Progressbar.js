import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import '../../pages/Global.scss';
import { Box } from '@mui/material';
const Progressbar = ({ LoadingState }) => {
  return LoadingState ? 
   
        <Box sx={{width: '100%',position:'absolute'}}>
        <LinearProgress color='info' />
      </Box>
:
    null
};

export default Progressbar;
