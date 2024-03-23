import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Avatar, Box, Button, Card, CardContent, Checkbox, Divider, FormControl, FormControlLabel, Grid, Input, InputAdornment, InputLabel, Link, Typography } from '@mui/material';
import React, { useState } from 'react';
import CompanyLogo from '../../ui/logos/newLogo.png';

import FaceBookImage from '../../ui/png/facebook.png';
import GoogleImage from '../../ui/png/google.png';
import { LinkButton } from '../../components/buttons/LinkButton';
export const SignInForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [isSigninForm, setIsSigninForm] = useState(true);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Grid>
      <CardContent sx={{ textAlign: 'center' }}>
        <img src={CompanyLogo} loading="lazy" height={'100px'} />
      </CardContent>
      {isSigninForm && (
        <Card sx={{ mt: '20px' }} >
          <CardContent>
            <Typography fontWeight={'600'}>Welcome back! Please authorize to begin the journey.</Typography>
            <Box component="form" noValidate mt={3} onSubmit={() => {}}>
              <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
                <Input
                  autoComplete="email"
                  autoFocus
                  required
                  id="standard-adornment-password"
                  type="email"
                  endAdornment={
                    <InputAdornment position="end">
                      <AccountCircleIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>

              <FormControl variant="standard" fullWidth sx={{ mt: 5 }}>
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input fullWidth required id="standard-adornment-password" type={showPassword ? 'text' : 'password'} endAdornment={<InputAdornment position="end">{showPassword ? <VisibilityOff style={{ cursor: 'pointer' }} onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} /> : <Visibility style={{ cursor: 'pointer' }} onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} />}</InputAdornment>} />
              </FormControl>
              <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
              <Grid container textAlign={'center'} display={'flex'} justifyContent={'center'}>
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, width: '200px' }}>
                  Sign In
                </Button>
              </Grid>
              <Divider> or continue using </Divider>
              <Grid container gap={4} textAlign={'center'} display={'flex'} justifyContent={'center'}>
                <Button>
                  <Avatar src={GoogleImage} />
                </Button>
                <Button>
                  <Avatar src={FaceBookImage} />
                </Button>
              </Grid>
              <Grid container>
                <Grid item xs>
                  <LinkButton style={{fontWeight:'600'}} text={'Forgot password?'} />
                </Grid>
                <Grid item>
                  <LinkButton style={{fontWeight:'600'}} onClick={() => setIsSigninForm(false)} text={"Don't have an account? Sign Up"} />
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      )}

      {!isSigninForm && (
        <Card sx={{ mt: '20px' }}>
          <CardContent>
            <Typography fontWeight={'600'}> Welcome to Merizameen. - to begin create Account Please enter your details.</Typography>
            <Box component="form" noValidate mt={3} onSubmit={() => {}}>
              <FormControl variant="standard" fullWidth sx={{ mt: 1 }}>
                <InputLabel htmlFor="standard-adornment-password">Name</InputLabel>
                <Input  autoComplete="name" autoFocus required id="standard-adornment-password" type="text" />
              </FormControl>

              <FormControl variant="standard" fullWidth sx={{ mt: 1 }}>
                <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
                <Input autoComplete="email"  required id="standard-adornment-password" type="email" />
              </FormControl>

              <FormControl variant="standard" fullWidth sx={{ mt: 1 }}>
                <InputLabel htmlFor="standard-adornment-password">Mobile</InputLabel>
                <Input autoComplete="mobile"  required id="standard-adornment-password" htmlAttributes={{ type: 'tele' }} />
              </FormControl>

              <FormControl variant="standard" fullWidth sx={{ mt: 1 }}>
                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                <Input fullWidth required id="standard-adornment-password" type={showPassword ? 'text' : 'password'} endAdornment={<InputAdornment position="end">{showPassword ? <VisibilityOff style={{ cursor: 'pointer' }} onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} /> : <Visibility style={{ cursor: 'pointer' }} onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} />}</InputAdornment>} />
              </FormControl>
              <FormControlLabel control={<Checkbox value="termsAndConditions" color="primary" />} label="i agree to the Terms and conditions " />
              <Grid container textAlign={'center'} display={'flex'} justifyContent={'center'}>
                <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, width: '200px' }}>
                  Sign Up
                </Button>
              </Grid>
              <Divider> or sign-Up using </Divider>
              <Grid container gap={4} textAlign={'center'} display={'flex'} justifyContent={'center'}>
                <Button>
                  <Avatar src={GoogleImage} />
                </Button>
                <Button>
                  <Avatar src={FaceBookImage} />
                </Button>
              </Grid>
              <Grid container textAlign={'center'} display={'flex'} justifyContent={'center'}>
                <Grid md={6} item>
                  <LinkButton onClick={() => setIsSigninForm(true)} style={{fontWeight:'600'}} text={'Already  have an account? Sign in'} />
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      )}
    </Grid>
  );
};
