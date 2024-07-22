import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, CircularProgress } from '@mui/material';

const LoaderButton = ({ text, type = 'submit', size, color = 'primary', onClick, loading, loadingPosition, startIcon, variant, endicon, sx, style, ...rest }) => {
  return (
    <><Box sx={{ m: 1 }}>
      <LoadingButton type={type} color={color} loadingIndicator={<CircularProgress color="inherit" size={26} />} onClick={onClick} loading={loading} size={size || 'large'} loadingPosition={loadingPosition || "center"} startIcon={startIcon} endIcon={startIcon ? '' : endicon} variant={variant || "outlined"} sx={{ ...sx }} style={{ ...style }} {...rest}>
        <span>{text}</span>
      </LoadingButton>
    </Box>
    </>
  );
};

export default LoaderButton;
