import { Box, Dialog , DialogContent , IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
export const APDialog = ({ open, close, content, sx ,disableClose =false}) => {
  return (
    <Dialog keepMounted className="test-class" maxWidth={'500'} open={open} onClose={close} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
      <Box style={{ ...sx }}>
      <DialogContent >
        {content}
        {!disableClose &&<IconButton aria-label="close" onClick={close} sx={{ position: 'absolute', right: 8, top: 8, color: 'grey' }}>
      <CloseIcon /></IconButton>}
       </DialogContent>
         
         </Box>
    </Dialog>
  );
};
