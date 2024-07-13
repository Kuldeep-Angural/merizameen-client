import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Paper, Typography } from '@mui/material';

const Modal = ({ open: propOpen = false,children,title,subtitle,draggable = false,onClose: propOnClose,onSubmit,style,submitButtonTitle,cancelButtonTitle,hideCreateButton,hideCloseButton = false,hideCancelButton  = false,submitButtonType = 'submit',disabled,loading,}) => {
  const [open, setOpen] = useState(propOpen);
  const [activeDrags, setActiveDrags] = useState(0);

  useEffect(() => {
    setOpen(propOpen);
  }, [propOpen]);


  const PaperComponent = (innerProps) => (
    <Draggable bounds="parent" handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'} >
      <Paper style={style ? { ...style } : { maxWidth: '100%' }} {...innerProps} />
    </Draggable>
  );

  return (
    <Dialog open={open} disableEnforceFocus disableEscapeKeyDown PaperComponent={draggable ? PaperComponent : Paper} aria-labelledby="draggable-dialog-title" >
      <DialogTitle id="draggable-dialog-title" style={{ cursor: draggable ? 'move' : 'default' }}>
        <Typography fontWeight={600} fontSize={'20px'}>
          {title}
        </Typography>
        {!hideCloseButton && (
          <IconButton
            onClick={propOnClose}
            sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}
          >
            <CloseIcon />
          </IconButton>
        )}
      </DialogTitle>
      <DialogContent>
        {subtitle && (
          <Box style={{ fontSize: '16px', lineHeight: '1.5', margin: '0 0 10px 0', color: 'rgba(0, 0, 0, 0.8)' }} dangerouslySetInnerHTML={{ __html: subtitle }} />
        )}
        {children}
      </DialogContent>
      <DialogActions sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        {!!propOnClose && !hideCancelButton && (
          <Button type="button" variant="text" sx={{ color: 'gray', marginRight: '15px' }} onClick={propOnClose}>
            {cancelButtonTitle || 'Cancel'}
          </Button>
        )}
        {!hideCreateButton && (
          <Button type={submitButtonType} variant="outlined" disabled={disabled} onClick={onSubmit} style={{ marginLeft: '10px' }}>
            {submitButtonTitle || 'Create'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
