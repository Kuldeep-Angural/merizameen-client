import React, { useState } from 'react';
import Chatbot, { createChatBotMessage } from 'react-chatbot-kit';
import config from './config';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import { Button, Fab, Grid, Tooltip } from '@mui/material';
import { APDialog } from '../modal/APDialog';
import '../chatBot/chatbot.scss';

import HelpOutlineSharpIcon from '@mui/icons-material/HelpOutlineSharp';
const Akira = (prop) => {
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  return (
    <Grid position={'fixed'} bottom={10} right={20}>
      <Tooltip title="Alira. Merizameen Instant help for you">
        <Fab focusVisible  className='help-button' color={'primary'} onClick={() => setOpenDialog(!openDialog)}>
          <HelpOutlineSharpIcon style={{ fontSize: '40px' }} />
        </Fab>
      </Tooltip>
      <APDialog sx={{ position: 'fixed', bottom: '20px', right: '30px' }} open={openDialog} close={handleCloseDialog} content={<Chatbot config={config} disableScrollToBottom messageParser={MessageParser} actionProvider={ActionProvider} headerText="Akira" placeholderText="Input placeholder" />} />
    </Grid>
  );
};

export default Akira;
