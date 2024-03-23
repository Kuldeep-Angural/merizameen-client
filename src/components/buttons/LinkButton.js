import { Button, Tooltip } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
export const LinkButton = ({ link, name, text, title, color, sx, style , onClick }) => {
  return (
    <Tooltip title={title}>
      <Button  sx={{...sx}} style={{ ...style,fontSize: '10px', background: 'transparent' }} onClick={onClick} underline="none" variant="body2">
       {text}
      </Button>
    </Tooltip>
  );
};
