import { Dialog } from '@mui/material';
import React from 'react';
export const APDialog = ({ open, close, content }) => {
  return (
    <Dialog open={open} onClose={close} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      {content}
    </Dialog>
  );
};
