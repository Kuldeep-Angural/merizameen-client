import { IconButton, Tooltip } from '@mui/material';
import React from 'react';
export const APIconButton = ({ icon, title, sx, style, onClick }) => {
  return (
    <Tooltip title={title}>
      <IconButton aria-label="delete" onClick={onClick} sx={{ ...sx }} style={{ ...style }}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};
