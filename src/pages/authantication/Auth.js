import { Box, Fab, Grid, Tooltip, Typography } from '@mui/material';
import Lottie from 'lottie-react';
import React, { useEffect } from 'react';
import Building from '../../ui/json/building.json';
import { SignInForm } from './AuthForm';
import { selectForgotPasswordLoading, selectLoginLoading, selectOtpLoading, selectSignUpLoading } from './authSlice';
import { useSelector } from 'react-redux';
import Spinner from '../../components/ProgressBar/Progressbar';
import ContactUs from '../../ui/json/Animation - 1722004930910.json';
import ContactUsModal from '../../components/modal/ContactUsModal';

const Auth = ({ updatePageTitle }) => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const loginLoading = useSelector(selectLoginLoading);
  const signUpLoading = useSelector(selectSignUpLoading);
  const otpLoading = useSelector(selectOtpLoading);
  const forgotPasswordLoading = useSelector(selectForgotPasswordLoading);


  const handleCloseDialog = () => {
    setOpenDialog(false);
  };


  useEffect(() => {
    updatePageTitle('Merizameen');
  }, [updatePageTitle]);

  return (
    <>
      <Spinner LoadingState={signUpLoading || loginLoading || otpLoading || forgotPasswordLoading} />
      <Grid container gap={2} component="main" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} columns={12} justifyContent={'center'} alignItems="center">
        <Grid item sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} md={6}>
          <Typography padding={2} fontWeight={'600'} letterSpacing={'1px'}>
            <Lottie loop={false} animationData={Building} style={{ height: '300px' }} />
            <span style={{ fontWeight: '900' }}>Welcome</span> to <span style={{ color: '#4d87fa' }}>merizameen.com.</span> We have been serving the needs of the real estate industry in India since 2024. Our single platform is designed to meet the needs of buyers, sellers and brokers of India properties. Our success is attributed to our understanding of the needs of our customers and consistently working to meet those needs utilizing innovative e-commerce solutions. If you are interested in purchasing a home or locate a rental property, you'r in perfect place ,
            using our portal to find the right residential property or commercial property to fit your needs. just register with us and get started..
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <SignInForm />
        </Grid>
      </Grid>
      <Box sx={{ position: 'absolute', bottom: '20px', right: '20px', cursor: 'pointer' }}  >
        <Tooltip title="Contact us" onClick={() => setOpenDialog(true)}>
          {/* <img src={ContactUs} height={'80px'} width={'80px'}  /> */}
          <Lottie loop={true} animationData={ContactUs} style={{ height: '80px' , }} />
        </Tooltip>
        <ContactUsModal openDialog={openDialog} handleCloseDialog={handleCloseDialog} />
      </Box>
    </>
  );
};

export default Auth;
