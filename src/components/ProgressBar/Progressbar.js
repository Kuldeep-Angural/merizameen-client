import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import React from 'react';
import '../../pages/Global.scss';

const Spinner = ({ LoadingState }) => {
  return LoadingState ? (
    <Backdrop
    sx={{color: 'skyblue',zIndex: 10, backdropFilter: 'blur(1px)'}}
    open={LoadingState}
  >
    <CircularProgress color="inherit" size={60} />
  </Backdrop>
  ) : null;
};

export default Spinner;

