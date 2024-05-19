import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box } from '@mui/material';

const LoaderButton = ({ text,type, size, color, onClick, loading,loadingPosition, startIcon, variant,endicon, sx, style, ...rest }) => {
  return (
    <><Box sx={{m:1}}>
      <LoadingButton type={type || 'submit'} color={color || 'success'} onClick={onClick} loading={loading} size={size || 'medium'} loadingPosition={"center"|| loadingPosition} startIcon={startIcon} endIcon={startIcon ? '' : endicon} variant={variant || 'contained'} sx={{ sx }} style={{ style }} {...rest}>
        <span>{text}</span>
      </LoadingButton>
    </Box>
    </>
  );
};

export default LoaderButton;
