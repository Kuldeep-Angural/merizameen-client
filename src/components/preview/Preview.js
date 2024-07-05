import { Box, Grid, Modal, Typography } from '@mui/material';
import React, { useState } from 'react';

const Preview = () => {
    
  const [open,setOpen] = useState(true)
  const handleClose = () => setOpen(false);
  return (
    <>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Grid container md={10}>
        <Box  sx={{width:'100%',height:'100%',bgcolor: 'background.paper',p:2}} >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
        </Grid>
      </Modal>
    </>
  );
};

export default Preview;
