import { Box, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
export const APDialog = ({ open, close, content, sx, disableClose = false , title="" }) => {
  return (
    <Dialog keepMounted className="test-class" maxWidth={'500'} open={open} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <DialogContent>
        <DialogTitle>{title&& title}</DialogTitle>
        {content}
        {!disableClose && (
          <IconButton aria-label="close" onClick={close} sx={{ position: 'absolute', right: 1, top: 18, color: 'grey' }}>
            <CloseIcon />
          </IconButton>
        )}
      </DialogContent>
    </Dialog>
  );
};
