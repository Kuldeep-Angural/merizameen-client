import { Button, Tooltip } from '@mui/material';
import React from 'react';
export const LinkButton = ({ link, name, text, title, color, sx, style, onClick }) => {
  return (
    <Tooltip title={title}>
      <Button color='primary'  sx={{ ...sx }} style={{ ...style, fontSize: '10px', background: 'transparent' }} onClick={onClick} underline="none" variant="body2">
        {text}
      </Button>
    </Tooltip>
  );
};
