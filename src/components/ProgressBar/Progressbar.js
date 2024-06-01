import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import '../../pages/Global.scss';

const Progressbar = ({ LoadingState }) => {
  return LoadingState ? (
    <div>
      <Backdrop sx={{ color: 'skyblue', zIndex: 10 }} open={LoadingState}>
        <CircularProgress color="inherit" size={60} />
      </Backdrop>
    </div>
  ) : null;
};

export default Progressbar;

// position: 'absolute',top:'50%',left:'50%'
