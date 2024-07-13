import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';
import PhoneIcon from '@mui/icons-material/Phone';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import { DialogActions, FormControl, Grid, Input, InputLabel, Link, TextField } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import CompanyLogo from '../../ui/logos/newLogo.png';
import { APDialog } from '../modal/APDialog';
import '../../pages/Global.scss';
import { useNavigate } from 'react-router-dom';
import { SESSION_KEYS, options, userSettings } from '../../constants/constant';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUserData } from '../../pages/authantication/authSlice';
import Profile from '../../pages/profile/Profile';
import Modal from '../modal/Modal';
import LoaderButton from '../loadingbutton/LoaderButton';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import Progressbar from '../ProgressBar/Progressbar';
import { APRoutes } from '../../constants/routes';
import { getUserDetails, selectDataObj, setData } from '../../pages/profile/profileSlice';
import { useEffect } from 'react';
import { GoogleMap } from '../googleMap/GoogleMap';
import MemberShip from '../../pages/memberShip/MemberShip';
export const APNavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openQueryPannel, setOpenQueryPannel] = React.useState(false);
  const [openCallBack, setOpenCallBack] = React.useState(false);
  const [profileModal, setProfileModal] = React.useState(false);
  const [planModal, setPlanModal] = React.useState(false);

  const[loadingstate,setLoadingState] = React.useState(false)
  const profileRef = React.useRef();
  const dataObj = useSelector(selectDataObj);

  const USER = useSelector(selectUserData);
  const naviGate = useNavigate();
  const dispatch = useDispatch();
  const modalRef = React.useRef();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseFeedback = () => {
    setOpenQueryPannel(false);
  };

  const openQuery = () => {
    setOpenDialog(false);
    setOpenQueryPannel(true);
  };

  const isLoggedIn = () => {
    const USER = localStorage.getItem(SESSION_KEYS.USER);
    if (USER) {
      return true;
    } else {
      return false;
    }
  };

  React.useEffect(() => {
    isLoggedIn();
  }, [USER]);

  const openCallBackDailog = () => {
    setOpenDialog(false);
    setOpenCallBack(true);
  };

  const handleCloseCallBackDailog = () => {
    setOpenCallBack(false);
  };

  const handleSendCallBackRequest = () => {
    setOpenCallBack(false);
  };

  const handleSendFeedBack = () => {
    setOpenQueryPannel(false);
  };

  const handlePostPropertyEvent = React.useCallback(() => {
    naviGate('/postAd');
  }, [USER]);

  const handleUserClick = (eventName) => {
    if (eventName === 'Logout') {
      setLoadingState(true)
      dispatch(logout()).then((resp) => {
        naviGate('/');
      });
    }
    else if(eventName === 'Dashboard'){
      naviGate('/dashboard')
    }
    if (eventName === 'Profile') {
      setProfileModal(true);
    }
    if (eventName === 'Plans') {
      setPlanModal(true);
    }
    return handleCloseUserMenu();
  };

  const onSubmitCLick = () => {
    profileRef?.current?.Update();
  }

  useEffect(()=>{
    dispatch(getUserDetails(USER._id));
  },[])


 


  return (
    <>
    <Progressbar LoadingState={loadingstate}/>
      <AppBar elevation={0} position="static" color='transparent'>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Grid sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
              <Link
                onClick={() => {
                  naviGate('/');
                }}
                style={{ cursor: 'pointer' }}
              >
                <img src={CompanyLogo} loading="lazy" height={'60px'} />
              </Link>
            </Grid>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            ></Typography>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Agents</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">Services</Typography>
                </MenuItem>
                <MenuItem onClick={handlePostPropertyEvent}>
                  <Typography textAlign="center">Post Property</Typography>
                </MenuItem>
              </Menu>
            </Box>

            <Grid sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
              <Link
                onClick={() => {
                  naviGate('/');
                }}
                style={{ cursor: 'pointer' }}
              >
                <img src={CompanyLogo} loading="lazy" height={'60px'} />
              </Link>
            </Grid>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            ></Typography>
            <Box sx={{ flexGrow: 1,flexShrink:2, display: { xs:'none',sm: 'none', md: 'flex' } }}>
              
              <LoaderButton onClick={handleCloseNavMenu} variant='outlined' text="Agents" sx={{ my: 1, color: 'black', borderRadius:'180px'}}>
              </LoaderButton>
              <LoaderButton onClick={handleCloseNavMenu} variant='outlined' text="Services" sx={{ my: 1, color: 'black', borderRadius:'180px'}}>
              </LoaderButton>
                <LoaderButton endicon={<AddHomeWorkIcon/>} onClick={handlePostPropertyEvent} text='Post Property' variant="contained" sx={{ marginLeft: {md:'30px'}, margin:1, borderRadius: '50px' }}/>
            </Box>

            <Tooltip title="Contact us">
              <IconButton
                onClick={() => {
                  setOpenDialog(true);
                }}
                variant="outlined"
                sx={{ my: 2, marginRight: '15px', display: 'block', borderRadius: '30px' }}
              >
                <InfoIcon style={{ fontSize: '20px', color: 'inherit' }} />
              </IconButton>
            </Tooltip>

            <Box sx={{ flexGrow: 0 }}>
              {isLoggedIn() ? (
                <Tooltip title="Profile settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={USER?.name} src={dataObj?.profilePic || '/static/images/avatar/2.jpg'} />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="Signin / Create Account">
                  <IconButton sx={{ p: 0 }}>
                    <AccountCircleIcon style={{ fontSize: '40px', color: 'inherit' }} />
                  </IconButton>
                </Tooltip>
              )}
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {userSettings.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleUserClick(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
        {/* Contact Dialoug */}
        <APDialog
          open={openDialog}
          close={handleCloseDialog}
          content={
            <>
              <Typography textAlign={'center'} fontWeight={'700'}>
                Contact Us
              </Typography>
              <Typography>1st Floor, Manchanda Tower opposite Novelty Mall, Pathankot, Punjab, India </Typography>

              <Typography>9:00AM to 6:00PM IST</Typography>

              <Grid container gap={2}>
                <Tooltip title="Call">
                  <Button variant="outlined" sx={{ fontSize: '10px' }} color="text" md={6} startIcon={<PhoneIcon style={{ paddingTop: '0px' }} />}>
                    9877726857
                  </Button>
                </Tooltip>
                <Tooltip title="Request a callBack">
                  <Button variant="outlined" sx={{ fontSize: '10px' }} onClick={() => openCallBackDailog()} color="text" md={6} startIcon={<PhoneForwardedIcon style={{ paddingTop: '3px' }} />}>
                    Request a callBack
                  </Button>
                </Tooltip>
              </Grid>
              {GoogleMap({ city:'pathankot', country:'India', state:'Punjab', zip:'145001'})}
              <Box justifyContent={'space-around'} display={'flex'} textAlign={'center'} mt={1}>
                <Button variant="outlined" onClick={() => openQuery()} textAlign={'center'}>
                  click here to share your query
                </Button>
                <Button variant="outlined" onClick={handleCloseDialog}>
                  close
                </Button>
              </Box>
            </>
          }
        />

        {/* Contact Call-Back dialog */}
        <APDialog
          open={openCallBack}
          close={handleCloseCallBackDailog}
          content={
            <>
              <Typography textAlign={'center'} fontWeight={'600'}>
                Call Back Request
              </Typography>
              <Box component="form" noValidate mt={3} onSubmit={() => {}}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel htmlFor="standard-adornment-password">Name</InputLabel>
                  <Input autoComplete="name" required id="standard-adornment-password" type="text" />
                </FormControl>

                <FormControl variant="standard" fullWidth>
                  <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
                  <Input autoComplete="email" required id="standard-adornment-password" type="email" />
                </FormControl>

                <FormControl variant="standard" fullWidth>
                  <InputLabel htmlFor="standard-adornment-password">Mobile</InputLabel>
                  <Input autoComplete="mobile" required id="standard-adornment-password" type="Mobile" />
                </FormControl>

                <FormControl variant="standard" fullWidth sx={{ mt: 2 }}>
                  <InputLabel htmlFor="standard-adornment-password"> </InputLabel>
                  <TextField id="outlined-select-currency" variant="standard" label="i am " select>
                    {options.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </FormControl>

                <FormControl variant="standard" fullWidth>
                  <InputLabel htmlFor="standard-adornment-password">Query</InputLabel>
                  <Input multiline rowsF={4} autoComplete="text" required id="standard-adornment-password" type="text" />
                </FormControl>
              </Box>

              <DialogActions>
                <Button fullWidth variant="outlined" onClick={handleCloseCallBackDailog}>
                  close
                </Button>

                <Button fullWidth variant="outlined" onClick={handleSendCallBackRequest}>
                  Send
                </Button>
              </DialogActions>
            </>
          }
        />

        {/* Feedback / query  Dialoug */}

        <APDialog
          open={openQueryPannel}
          close={handleCloseFeedback}
          content={
            <>
              <Typography textAlign={'center'} fontWeight={'600'}>
                Feedback Form
              </Typography>
              <Box component="form" noValidate mt={3} onSubmit={() => {}}>
                <FormControl variant="standard" fullWidth>
                  <InputLabel htmlFor="standard-adornment-password">Name</InputLabel>
                  <Input autoComplete="name" autoFocus required id="standard-adornment-password" type="text" />
                </FormControl>

                <FormControl variant="standard" fullWidth>
                  <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
                  <Input autoComplete="email" autoFocus required id="standard-adornment-password" type="email" />
                </FormControl>

                <FormControl variant="standard" fullWidth>
                  <InputLabel htmlFor="standard-adornment-password">Enter your feedback</InputLabel>
                  <Input multiline rowsF={4} autoComplete="email" autoFocus required id="standard-adornment-password" type="email" />
                </FormControl>
              </Box>

              <DialogActions>
                <Button fullWidth variant="outlined" onClick={handleCloseFeedback}>
                  close
                </Button>
                <Button fullWidth variant="outlined" onClick={handleSendFeedBack}>
                  Send
                </Button>
              </DialogActions>
            </>
          }
        />
        <Modal open={profileModal}   hideCancelButton={true} draggable={true} hideCreateButton={true} submitButtonTitle={"Update"} onClose={()=>setProfileModal(false)} title="" style={{minWidth:'150px' , maxWidth:'360px'}}>
            <Profile dataObj={dataObj}  ref={profileRef}/>
        </Modal>

        <Modal open={planModal} hideCreateButton={true} hideCancelButton={true} draggable={true} title="" style={{maxWidth:'600px'}} onClose={()=>setPlanModal(false)} >
            <MemberShip />
        </Modal>      
      </AppBar>
    </>
  );
};
