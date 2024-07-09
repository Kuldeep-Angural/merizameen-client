import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import '../../pages/Global.scss';

const Spinner = ({ LoadingState }) => {
  return LoadingState ? (
    <div>
      <Backdrop sx={{ color: 'skyblue', zIndex: 10 }} open={LoadingState}>
        <CircularProgress color="inherit" size={60} />
      </Backdrop>
    </div>
  ) : null;
};

export default Spinner;

