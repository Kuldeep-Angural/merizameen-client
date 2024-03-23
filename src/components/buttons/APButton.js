import { Button, Tooltip } from '@mui/material';
import React from 'react';

export const ApButton = ({ tooltip, text, sx, childreen, style, icon, ...rest }) => {
  return (
    <Tooltip title={tooltip || ''}>
      <Button sx={{ ...sx }} style={{ ...style }} {...rest}>
        {text || icon}
      </Button>
    </Tooltip>
  );
};
