import React, { useState } from 'react';
import Draggable from 'react-draggable';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Icon, Paper, Typography } from '@mui/material';

const Modal = (props) => {
  const { open: propOpen = false, children, title, subtitle, draggable = false, onClose: propOnClose, onSubmit, style, submitButtonTitle, cancelButtonTitle, hideCreateButton, submitButtonIcon, submitButtonType = 'submit', disabled, loading, closeOnOutsideClick = true } = props;
  const [open, setOpen] = useState(propOpen);
  const [activeDrags, setActiveDrags] = useState(0);

  const onStart = () => setActiveDrags(activeDrags + 1);
  const onStop = () => setActiveDrags(activeDrags - 1);

  const isControlled = () => propOpen !== undefined;
  const isOpen = isControlled() ? propOpen : open;

  const PaperComponent = (innerProps) => (
    <Draggable bounds="parent" onStart={onStart} onStop={onStop} handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper style={props.style ? { ...props.style } : { maxWidth: '100%' }} {...innerProps} />
    </Draggable>
  );

  return (
    <Dialog open={isOpen} disableEnforceFocus disableEscapeKeyDown PaperComponent={PaperComponent} aria-labelledby="draggable-dialog-title">
      <DialogTitle id="draggable-dialog-title" style={{ cursor: draggable ? 'move' : 'default' }}>
        <Typography fontWeight={600} fontSize={'20px'}>
          {title}
        </Typography>
      </DialogTitle>

      <IconButton onClick={propOnClose} sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500] }}>
        <CloseIcon />
      </IconButton>

      <DialogContent>
        {subtitle && <Box style={{ fontSize: '16px', lineHeight: '1.5', margin: '0 0 10px 0', color: 'rgba(0, 0, 0, 0.8)' }} dangerouslySetInnerHTML={{ __html: subtitle }} />}
        {children}
      </DialogContent>

      <DialogActions sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        {!!props.onClose && (
          <Button type="button" variant="text" sx={{ color: 'gray', marginRight: '15px' }} onClick={propOnClose}>
            {cancelButtonTitle || 'Cancel'}
          </Button>
        )}
        {!hideCreateButton && (
          <Button type={submitButtonType} variant="outlined" loading={loading} disabled={disabled} onClick={onSubmit} style={{ marginLeft: '10px' }}>
            {!!submitButtonIcon && <Icon name={submitButtonIcon} raw />}
            {submitButtonTitle || 'Create'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
