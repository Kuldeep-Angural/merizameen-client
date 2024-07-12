import React, { useState, useEffect } from 'react';
import Draggable from 'react-draggable';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Button, makeStyles, styled, Paper, Typography } from '@mui/material';


const useStyles = styled({
  root: {
    '& css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
      color: 'white',
      maxWidth: '100%',
      width:'100%'

    },
  },

});
const Modal = ({
  open: propOpen = false,
  children,
  title,
  subtitle,
  draggable = false,
  onClose: propOnClose,
  onSubmit,
  style,
  submitButtonTitle,
  cancelButtonTitle,
  hideCreateButton,
  hideCloseButton = false,
  hideCancelButton = false,
  submitButtonType = 'submit',
  disabled,
  loading,
  ...rest
}) => {
  const [open, setOpen] = useState(propOpen);
  const [activeDrags, setActiveDrags] = useState(0);

  useEffect(() => {
    setOpen(propOpen);
  }, [propOpen]);

  const onStart = () => { setActiveDrags({ activeDrags: ++activeDrags }) };
  const onStop = () => { setActiveDrags({ activeDrags: --activeDrags }) };





  const PaperComponent = (innerProps) => {
    const dragHandlers = { onStart: onStart, onStop: onStop };
    const classes = useStyles();
    return (
      <Draggable bounds="parent"  {...dragHandlers} handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper sx={{ '& .MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation24 MuiDialog-paper MuiDialog-paperScrollPaper MuiDialog-paperWidthSm css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
             maxWidth:'100%'
            },}} className={classes?.root} style={style ? { ...style } : { maxWidth: '100%' }}  {...rest} />
      </Draggable>
    );
  }

  const paperComp = ()=>(
    <Paper sx={{ '& .MuiPaper-root MuiPaper-elevation MuiPaper-rounded MuiPaper-elevation24 MuiDialog-paper MuiDialog-paperScrollPaper MuiDialog-paperWidthSm css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
      maxWidth:'100%'
     },}}  style={style ? { ...style } : { maxWidth: '100%' }}  {...rest} />
  )

  return (
    <Dialog
      open={open}
      disableEnforceFocus
      disableEscapeKeyDown
      // PaperComponent={draggable ? PaperComponent : paperComp}
      // onClose={closeOnOutsideClick ? propOnClose : undefined}
      aria-labelledby="draggable-dialog-title"
      style={{ ...style }}
    >
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
