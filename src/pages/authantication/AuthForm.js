import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, Button, Card, CardContent, Checkbox, Divider, FormControl, FormControlLabel, Grid, Input, InputAdornment, InputLabel, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkButton } from '../../components/buttons/LinkButton';
import LoaderButton from '../../components/loadingbutton/LoaderButton';
import APToaster from '../../components/Toaster/APToaster';
import CompanyLogo from '../../ui/logos/newLogo.png';
import GoogleImage from '../../ui/png/google.png';
import { addDelay, isInValidData } from '../../utils/utility';
import { changePassword, login, loginWithGoogle, selectForgotPasswordLoading, selectLoginLoading, selectOtpLoading, selectSignUpLoading, sentOtprequest, signUp, verifyOtp } from './authSlice';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LoginIcon from '@mui/icons-material/Login';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PhoneIcon from '@mui/icons-material/Phone';
import { InputField } from '../../components/input/InputField';
import Modal from '../../components/modal/Modal';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import Spinner from '../../components/ProgressBar/Progressbar';

export const SignInForm = ({ route }) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isSigninForm, setIsSigninForm] = useState(true);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const [credentials, setCredentials] = useState({});
  const [forgotPasswordData, setForgotPasswordData] = useState({});

  const [isOpenForgotPassword, setIsOpenForgotPassword] = useState(false);
  const [loading, setloading] = useState(false)

  const [isOpen, setIsOpen] = useState(false);
  const [otp, setOtp] = useState({
    id: '',
  });

  const dispatch = useDispatch();
  const toastRef = useRef();

  const loginLoading = useSelector(selectLoginLoading);
  const signUpLoading = useSelector(selectSignUpLoading);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const onSubmit = (e, input) => {
    e.preventDefault();
    const { email, password, mobile, name } = credentials;
    if (input === 'login') {
      if (isInValidData(email) || isInValidData(password)) {
        toastRef.current.showToast({ messageType: 'warning', messageText: 'Email or Password required' });
      } else if (!email.includes('@') || !email.endsWith('.com')) {
        toastRef.current.showToast({ messageType: 'warning', messageText: 'Invalid email entered' });
      } else {
        dispatch(login({ email, password })).then((resp) => {
          if (!resp || !resp.payload || !resp.payload.message) {
            toastRef.current.showToast({ messageType: 'error', messageText: 'Internal server error or network error' });
          } else if (resp.payload.message.messageType === 'error') {
            toastRef.current.showToast(resp.payload.message);
          }
        });
      }
    } else {
      if (isInValidData(name) || isInValidData(mobile) || isInValidData(email) || isInValidData(password)) {
        toastRef.current.showToast({ messageType: 'warning', messageText: 'All Fields Are Required' });
      } else if (!email.includes('@') || !email.endsWith('.com')) {
        toastRef.current.showToast({ messageType: 'warning', messageText: 'Invalid email entered' });
      } else {
        dispatch(signUp({ name: name, mobile: mobile, email: email, password: password })).then((resp) => {
          if (resp?.payload?.message === 'Network Error') {
            toastRef.current.showToast({ messageType: 'warning', messageText: resp.payload.message });
          } else if (resp?.payload?.message) {
            toastRef.current.showToast(resp?.payload?.message);
            setOtp({ id: resp?.payload?.data?.id });
            resp.payload.message.messageType === 'success' && (
              addDelay(2000).then(() => {
                setIsOpen(true);
              }))
          }
        });
      }
    }
  };

  const otpSubmission = (event) => {
    event.preventDefault();
    if (otp) {
      dispatch(verifyOtp(otp)).then((resp) => {
        if (resp.payload.status === 200) {
          setIsOpen(false);
          setIsSigninForm(true);
        }
      });
    }
  };

  const handleOtpChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setOtp({ ...otp, [name]: value });
  };

  const handleChangeForgotPassword = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setForgotPasswordData({ ...forgotPasswordData, [name]: value });
  };

  const sendOtp = () => {
    if (forgotPasswordData?.email) {
      dispatch(sentOtprequest(forgotPasswordData.email)).then((resp) => {
        toastRef.current.showToast(resp?.payload?.message);
        if (resp.payload.status === 200) {
          setForgotPasswordData({ id: resp.payload.data.id });
          addDelay(2000).then(() => {
            setIsEmailSent(true);
          });
        }else {
          addDelay(2000).then(()=>{
            setIsOpenForgotPassword(false)
          })
        }
      });
    }
  };

  const submitForgotpasswordRequest = () => {
    if (forgotPasswordData?.otp && forgotPasswordData.confirmPassword && forgotPasswordData?.password) {
      dispatch(changePassword({ otp: forgotPasswordData?.otp, password: forgotPasswordData.password, id: forgotPasswordData?.id })).then((resp) => {
        toastRef.current.showToast({ messageType: 'warning', messageText: resp?.payload?.message });
        addDelay(2000).then(() => {
          setIsOpenForgotPassword(false);
          setIsEmailSent(false);
        });
      });
    }
  };

  const onSuccess = (resp) => {
    setloading(true)
    if (resp?.credential) {
      dispatch(loginWithGoogle({
        credentials:
        resp?.credential })).then((resp)=>{
         toastRef.current.showToast({ messageType: resp?.payload?.message.messageType, messageText: resp?.payload?.message.messageText });
        setloading(false)
      })
    }
  }

  const onFailure = (error) => {
    toastRef.current.showToast({ messageType: 'error', messageText: 'Something went-wrong' });
  }


  return (
    <Grid>
      <Spinner LoadingState={loading}/>
      <APToaster ref={toastRef} title="" />
      <CardContent sx={{ textAlign: 'center' }}>
        <img src={CompanyLogo} alt='logo' loading="lazy" height={'70px'} />
      </CardContent>
      {isSigninForm && (
        <Card elevation={0}>
          <CardContent>
            <Typography fontWeight={'600'} sx={{ textAlign: 'center' }}>
              Welcome back! Please authorize to begin the journey.
            </Typography>
            <Box component="form" noValidate mt={3} onSubmit={() => { }}>
              <InputField
                sx={{ mb: 2 }}
                icon={<PermIdentityIcon />}
                value={credentials.email}
                label='Email'
                autoComplete="email"
                required
                
                name="email"
                type="email"
                onChange={handleChange}
              />
              <InputField label='Password' value={credentials.password} name="password" required onChange={handleChange} type='password' />
              {/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" /> */}
              <Grid container textAlign={'center'} display={'flex'} justifyContent={'center'} mt={2}>
                <LoaderButton type="submit" startIcon={<LoginIcon />} text={'Sign in'} loading={loginLoading} color='info' onClick={(e) => onSubmit(e, 'login')} variant="contained" size="large" sx={{ width: '180px' }} />
              </Grid>
              <Divider>or continue</Divider>
              <Grid container textAlign={'center'} display={'flex'} justifyContent={'center'}>
                <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}
                  buttonText="Login with Google"
                  onSuccess={onSuccess}
                  onFailure={onFailure}
                  cookiePolicy={'single_host_origin'}
                  isSignedIn={true}
                />
              </Grid>
              <Grid container>
                <Grid item xs>
                  <LinkButton
                    style={{ textTransform: 'capitalize', fontWeight: '600' }}
                    onClick={() => {
                      setIsOpenForgotPassword(true);
                    }}
                    text={'Forgot password?'}
                  />
                </Grid>
                <Grid item>
                  <LinkButton style={{ textTransform: 'capitalize', fontWeight: '600' }} onClick={() => setIsSigninForm(false)} text={"Don't have an account? Sign Up"} />
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      )}

      {!isSigninForm && (
        <Card elevation={0}>
          <CardContent>
            <Typography fontWeight={'600'}> Welcome to Merizameen. - to begin create Account Please enter your details.</Typography>
            <Box component="form" noValidate mt={3} onSubmit={() => { }}>
              <InputField sx={{ mb: 1 }} required icon={<PermIdentityIcon />} label='Name' value={credentials?.name || ''} name="name" onChange={handleChange} autoComplete="name" type="text" />

              <InputField sx={{ mb: 1 }} icon={<AlternateEmailIcon />} value={credentials?.email || ''} label='Email' name="email" onChange={handleChange} autoComplete="email" required type="email" />

              <InputField
                sx={{ mb: 1 }}
                label='Mobile'
                icon={<PhoneIcon />}
                value={credentials?.mobile}
                name="mobile"
                type="number"
                onChange={handleChange}
                inputProps={{
                  style: { '-moz-appearance': 'textfield' },
                  'aria-hidden': true,
                }}
              />

              <InputField sx={{ mb: 1 }} name="password" value={credentials?.password || ''} label='Password' onChange={handleChange} required type='password' />

              <FormControlLabel sx={{ textTransform: 'capitalize' }} control={<Checkbox value="termsAndConditions" color="primary" />} label="I agree to the Terms and conditions " />
              <Grid container textAlign={'center'} display={'flex'} justifyContent={'center'}>
                <LoaderButton type="submit" text='Sign Up' endicon={<PersonAddAltIcon />} color='info' onClick={(e) => onSubmit(e, 'signup')} loading={signUpLoading} variant="contained" sx={{ mt: 0, mb: 0, width: '270px' }} />
              </Grid>
              <Grid mt={0} container gap={4} textAlign={'center'} display={'flex'} justifyContent={'center'}>
                {/* <LoaderButton onClick={googleSignUp} variant='contained' color='error' startIcon={<img src={GoogleImage} alt='img' style={{ height: '25px' }} />} text="&nbsp; Sign up with Google" /> */}
              </Grid>
              <Grid container textAlign={'center'} display={'flex'} justifyContent={'center'}>
                <Grid md={6} item>
                  <LinkButton sx={{ textTransform: 'capitalize' }} onClick={() => setIsSigninForm(true)} style={{ fontWeight: '600' }} text={'Already  have an account? Sign in'} />
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      )}

      {/* Otp Verification */}

      <Modal open={isOpen} disableClose={true} >
        <Box sx={{ padding: 2 }}>
          <Typography textAlign={'center'}>Verify Your Email</Typography>
          <FormControl variant="standard" fullWidth sx={{ mt: 1 }}>
            <InputLabel htmlFor="standard-adornment-password">Enter Your OTP</InputLabel>
            <Input
              autoComplete="otp"
              name="otp"
              id="standard-adornment-password"
              type="number"
              onChange={handleOtpChange}
              inputProps={{
                style: { '-moz-appearance': 'textfield' },
                'aria-hidden': true,
              }}
            />
          </FormControl>
          <Box mt={3} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Button variant="outlined" onClick={otpSubmission}>
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Forgot PAssword */}

      <Modal open={isOpenForgotPassword} disableClose={true}>
        <Box sx={{ padding: 2 }}>
          <Typography textAlign={'center'}>Forgot Password</Typography>
          {isEmailSent && (
            <>
              <FormControl variant="standard" fullWidth sx={{ mt: 1 }}>
                <InputLabel htmlFor="standard-adornment-password">Otp</InputLabel>
                <Input
                  autoComplete="otp"
                  name="otp"
                  id="standard-adornment-password"
                  type="number"
                  onChange={handleChangeForgotPassword}
                  inputProps={{
                    style: { '-moz-appearance': 'textfield' },
                    'aria-hidden': true,
                  }}
                />
              </FormControl>
              <FormControl variant="standard" fullWidth sx={{ mt: 1 }}>
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>

                <Input name="password" onChange={handleChangeForgotPassword} fullWidth required type={showPassword ? 'text' : 'password'} endAdornment={<InputAdornment position="end">{showPassword ? <VisibilityOff style={{ cursor: 'pointer' }} onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} /> : <Visibility style={{ cursor: 'pointer' }} onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} />}</InputAdornment>} />
              </FormControl>
              <FormControl variant="standard" fullWidth sx={{ mt: 1 }}>
                <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>

                <Input name="confirmPassword" onChange={handleChangeForgotPassword} fullWidth required type={showPassword ? 'text' : 'password'} endAdornment={<InputAdornment position="end">{showPassword ? <VisibilityOff style={{ cursor: 'pointer' }} onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} /> : <Visibility style={{ cursor: 'pointer' }} onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} />}</InputAdornment>} />
              </FormControl>
            </>
          )}

          {!isEmailSent && (
            <FormControl variant="standard" fullWidth sx={{ mt: 1 }}>
              <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
              <Input
                autoComplete="email"
                name="email"
                id="standard-adornment-password"
                type="email"
                onChange={handleChangeForgotPassword}
                inputProps={{
                  style: { '-moz-appearance': 'textfield' },
                  'aria-hidden': true,
                }}
              />
            </FormControl>
          )}

          <Box mt={3} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <Button variant="outlined" onClick={!isEmailSent ? () => sendOtp() : () => submitForgotpasswordRequest()}>
              {!isEmailSent ? 'send email' : 'Change Password'}
            </Button>
          </Box>
        </Box>

      </Modal>
    </Grid >
  );
};
