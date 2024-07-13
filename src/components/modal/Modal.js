import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Paper } from '@mui/material';
import React, { Component } from 'react';
import Draggable from 'react-draggable';


export default class Modal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: this.isControlled() ? this.props.open : false, 
      activeDrags: 0,};
  }

  onStart = () => { this.setState({activeDrags: ++this.state.activeDrags})};
  onStop = () => { this.setState({activeDrags: --this.state.activeDrags})};
  isControlled = () => this.props.open !== undefined;
  open = () => this.setState({ open: true });
  close = () => this.setState({ open: false });
  isOpen = () => this.state.open;

  
  PaperComponent = (props) => {
  const dragHandlers = {onStart: this.onStart, onStop: this.onStop};
    return (
      <Draggable bounds="parent"  {...dragHandlers} handle="#draggable-dialog-title"  cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper style={this.props.style?{...this.props.style}:{maxWidth:'100%'}}  {...props} />
      </Draggable>
    );
  }

  render() {
    const { children, title, subtitle, disableClose, draggable = true } = this.props;
    const { open } = this.state;
    const isOpen = this.isControlled() ? this.props.open : open;

    return (
        <Dialog open={isOpen}disableEnforceFocus  disableEscapeKeyDown={true}
          // onClose={disableClose ? disableClose : !this.props.closeOnOutsideClick || this.close}
          PaperComponent={this.PaperComponent } aria-labelledby="draggable-dialog-title">

          <Modal.Title draggable> {title && title} </Modal.Title>
          <Modal.Content>
            {subtitle && <Modal.Subtitle>{subtitle}</Modal.Subtitle>}
            {!disableClose && <Modal.Close onClick={this.props.onClose || this.close} />}
            {children}
          </Modal.Content>
        </Dialog>
    );
  };
}

Modal.Title = (props) => {
  return (
    <DialogTitle id="draggable-dialog-title" style={{ cursor: props.draggable ? 'move' : 'default' }}>
      {props.children}
    </DialogTitle>
  )
};


Modal.Content = (props) => {
  return (<DialogContent >{props.children} </DialogContent>)
};

Modal.Subtitle = (props) => {
  const { children } = props;
  return (<Box style={{ fontSize: '16px', lineHeight: '1.5', margin: '0 0 10px 0', color: 'rgba(0, 0, 0, 0.8)' }} dangerouslySetInnerHTML={{ __html: children }} /> )
};


Modal.Footer = (props) => {
  const { onClose, onSubmit, style, submitButtonTitle, cancelButtonTitle, hideCreateButton, submitButtonIcon, submitButtonType = 'submit', disabled, loading } = props;

  return (
    <DialogActions sx={{display:'flex' , justifyContent:'flex-end' , mt:2}}>
      {!!onClose && (
        <Button type='button' variant="outlined"  className='-gray -text' onClick={onClose}>{cancelButtonTitle || 'Cancel'}</Button>
      )}
      {!hideCreateButton && (
        <Button type={submitButtonType} loading={loading} disabled={disabled} onClick={onSubmit} style={{ marginLeft: '10px' }}>
          {submitButtonTitle || 'Create'}
        </Button>
      )}
    </DialogActions>
  );
};



Modal.Close = (props) => {
  return (
    <IconButton aria-label="close" onClick={props.onClick} sx={{ position: 'absolute', right: 8, top: 8, color: theme => theme.palette.grey[500] }}>
      <CloseIcon /></IconButton>
  );
};











