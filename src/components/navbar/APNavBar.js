import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';
import PhoneIcon from '@mui/icons-material/Phone';
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import { Badge, Card, CardContent, DialogActions, Divider, FormControl, Grid, Input, InputLabel, TextField } from '@mui/material';
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
import { GoogleMap } from '../../utils/utility';
import { APDialog } from '../modal/APDialog';
const pages = ['Products', 'Pricing', 'Blog'];

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const options = [
  { value: 'Agent', label: 'Agent' },
  { value: 'Builder', label: 'Builder' },
  { value: 'Individual', label: 'Individual' },
  { value: 'Other', label: 'Other' },
];

export const APNavBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openQueryPannel, setOpenQueryPannel] = React.useState(false);
  const [openCallBack, setOpenCallBack] = React.useState(false);

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
    return true;
  };

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

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Grid sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <img src={CompanyLogo} loading="lazy" height={'60px'} />
          </Grid>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
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
                <Typography textAlign="center">Buy</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Rent</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Agents</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Services</Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography textAlign="center">Post Property</Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Grid sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
            <img src={CompanyLogo} loading="lazy" height={'60px'} />
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
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
              Buy
            </Button>
            <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
              Rent
            </Button>
            <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
              Agents
            </Button>
            <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
              Services
            </Button>

            <Tooltip title="Post Property">
              <Button onClick={handleCloseNavMenu} variant="outlined" color="inherit" sx={{ my: 2, marginLeft: '130px', color: 'white', display: 'block', borderRadius: '30px' }}>
                <Badge badgeContent={'free'} style={{ padding: 10, fontSize: '10px' }} color="success">
                  Post Property
                </Badge>
              </Button>
            </Tooltip>
          </Box>

          <Tooltip title="contact us">
            <IconButton
              onClick={() => {
                setOpenDialog(true);
              }}
              variant="outlined"
              color="secondary"
              sx={{ my: 2, marginRight: '30px', color: 'white', display: 'block', borderRadius: '30px' }}
            >
              <InfoIcon style={{ fontSize: '20px', color: 'inherit' }} />
            </IconButton>
          </Tooltip>

          <Box sx={{ flexGrow: 0 }}>
            {isLoggedIn() ? (
              <Tooltip title="profile settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={'Kuldeep Kumar'} src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Signin / create account">
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
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
            <Card>
              <CardContent>
                <Typography textAlign={'center'} fontWeight={'700'}>
                  Contact Us
                </Typography>
                <Typography>1st Floor, Manchanda Tower opposite Novelty Mall, Pathankot, Punjab, India </Typography>

                <Typography>9:30AM to 6:00PM IST</Typography>

                <Grid container gap={2}>
                  <Tooltip title="call">
                    <Button variant="outlined" sx={{ fontSize: '10px' }} color="text" md={6} startIcon={<PhoneIcon style={{ paddingTop: '0px' }} />}>
                      9877726857
                    </Button>
                  </Tooltip>
                  <Tooltip title="call">
                    <Button variant="outlined" sx={{ fontSize: '10px' }} onClick={() => openCallBackDailog()} color="text" md={6} startIcon={<PhoneForwardedIcon style={{ paddingTop: '3px' }} />}>
                      Request a callBack
                    </Button>
                  </Tooltip>
                </Grid>

                <Divider sx={{ mt: 2 }}></Divider>
                {GoogleMap()}
                <Grid textAlign={'center'} mt={2}>
                  <Button variant="outlined" onClick={() => openQuery()} textAlign={'center'}>
                    click here to share your query
                  </Button>
                </Grid>
              </CardContent>
              <DialogActions>
                <Button fullWidth variant="outlined" onClick={handleCloseDialog}>
                  close
                </Button>
              </DialogActions>
            </Card>
          </>
        }
      />

      {/* Contact Call-Back dialog */}
      <APDialog
        open={openCallBack}
        close={handleCloseCallBackDailog}
        content={
          <>
            <Card>
              <CardContent>
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
              </CardContent>

              <DialogActions>
                <Button fullWidth variant="outlined" onClick={handleCloseCallBackDailog}>
                  close
                </Button>

                <Button fullWidth variant="outlined" onClick={handleSendCallBackRequest}>
                  Send
                </Button>
              </DialogActions>
            </Card>
          </>
        }
      />

      {/* Feedback / query  Dialoug */}

      <APDialog
        open={openQueryPannel}
        close={handleCloseFeedback}
        content={
          <>
            <Card>
              <CardContent>
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
              </CardContent>

              <DialogActions>
                <Button fullWidth variant="outlined" onClick={handleCloseFeedback}>
                  close
                </Button>
                <Button fullWidth variant="outlined" onClick={handleSendFeedBack}>
                  Send
                </Button>
              </DialogActions>
            </Card>
          </>
        }
      />
    </AppBar>
  );
};
