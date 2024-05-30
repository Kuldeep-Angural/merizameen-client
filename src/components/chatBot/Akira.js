import { Grid, Tooltip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Chatbot from 'react-chatbot-kit';
import ChatBotAnimation from '../../ui/json/chatBot.json';
import SideArrowAnimation from '../../ui/json/sideArrow.json';
import '../chatBot/chatbot.scss';
import { APDialog } from '../modal/APDialog';
import ActionProvider from './ActionProvider';
import MessageParser from './MessageParser';
import config from './config';

import Lottie from 'lottie-react';
import { addDelay } from '../../utils/utility';
const Akira = (prop) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const [isSideView, setIsSideView] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    addDelay(100).then(() => {
      setIsSideView(true);
    });
  }, [isSideView]);

  return (
    <>
      {!isSideView ? (
        <Grid position={'fixed'} bottom={'10px'} right={'20px'}>
          <Tooltip title="Alira. Merizameen Instant help for you">
            <Lottie onClick={() => setOpenDialog(true)} loop={true} animationData={ChatBotAnimation} style={{ height: '150px', cursor: 'pointer' }} />
          </Tooltip>
        </Grid>
      ) : (
        <Grid position={'fixed'} bottom={'10px'} right={'20px'}>
          <Tooltip title="Click to Open Your Personal Assistant">
            {/* <Lottie loop={true} ani animationData={SideArrowAnimation} style={{ height: '50px', fontSize: '50px', cursor: 'pointer' }} onClick={() => setIsSideView(!isSideView)} /> */}
            <Lottie onClick={() => setIsSideView(!isSideView)} loop={true} animationData={ChatBotAnimation} style={{ height: '50px', cursor: 'pointer' }} />
          </Tooltip>
        </Grid>
      )}
      <APDialog sx={{ position: 'fixed', bottom: '20px', right: '30px' }} open={openDialog} close={handleCloseDialog} content={<Chatbot config={config} disableScrollToBottom messageParser={MessageParser} actionProvider={ActionProvider} headerText="Akira" placeholderText="Input placeholder" />} />
    </>
  );
};

export default Akira;
