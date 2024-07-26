import { Circle as CircleIcon, FavoriteBorder as FavoriteBorderIcon, MoreVert as MoreVertIcon, Notifications as NotificationsIcon, PostAdd as PostAddIcon, Sell as SellIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import { Box, Button, Card, CardContent, Fade, Grid, Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { dateFormat } from '../../constants/constant';
import { Wrapper } from '../../pages/home/Wrapper';
import { deleteProperty } from '../../pages/postAd/postPropertySlice';
import { getPostedproperties, getSellerLikes, getUserLikes, selectLoading, selectPostedProperties, selectSellerLikes, selectUserLikes, setActiveProperty, setSoldProperty } from '../../pages/profile/profileSlice';
import { addDelay } from '../../utils/utility';
import Emptyview from '../emptyView/Emptyview';
import Spinner from '../ProgressBar/Progressbar';
import { selectUserData } from '../../pages/authantication/authSlice';

const Dashboard = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLikes = useSelector(selectUserLikes);
  const sellerLikes = useSelector(selectSellerLikes);
  const postedProperties = useSelector(selectPostedProperties);
  const isLoading = useSelector(selectLoading);
  const userData = useSelector(selectUserData);

  const [selectedCards, setSelectedCards] = useState('likes');
  const [menuState, setMenuState] = useState({ anchorEl: null, propertyId: null });
  const [activeProperties, setActiveProperties] = useState([]);
  const [soldProperties, setSoldProperties] = useState([]);
  const [inActiveProperties, setInactiveProperties] = useState([]);
  const [selectedproperties, setSelectedProperties] = useState([]);
  const [openEditingModal, setOpenEditingModal] = useState(false)

  const [loading, setLoading] = useState(false);
  const open = Boolean(menuState.anchorEl);

  const refetchData = () => {
    setLoading(true)
    dispatch(getUserLikes());
    dispatch(getSellerLikes());
    dispatch(getPostedproperties());
    setLoading(false)
  };

  useEffect(() => {
    setLoading(true);
    addDelay(3000).then(() => {
      refetchData();
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setActiveProperties(postedProperties?.filter((p) => p?.isActive));
    setSoldProperties(postedProperties?.filter((p) => p?.isSold === true));
    setInactiveProperties(postedProperties?.filter((p) => !p?.isSold && !p?.isActive));
  }, [postedProperties]);


  const handleClick = (event, id) => {
    setMenuState({ anchorEl: event.currentTarget, propertyId: id });
  };

  const handleClose = () => {
    setMenuState({ anchorEl: null, propertyId: null });
  };

  const handleOpenPropertyview = (id) => {
    return navigate('/home/' + id);
  };

  const handleClickSold = () => {
    dispatch(setSoldProperty({ propertyId: menuState.propertyId })).then((resp) => {
      if (resp.payload.status === 200) {
        refetchData();
      }
    });
    handleClose();
  };

  const handleDeleteProperty = (id) => {
    dispatch(deleteProperty({ id: id })).then((resp) => {
      if (resp.payload.status === 200) {
        setLoading(true);
        addDelay(3000).then(() => {
          refetchData();
          setLoading(false);
        });
      }
    });
  };

  const handleCardCLick = (name) => {
    setSelectedCards(name);
    setLoading(true);
    addDelay(3000).then(() => {
      setLoading(false);
    });
  };

  const handleEditClick = (event, id) => {
    return navigate('/edit/property/' + id);

  }

  const handleClickActive = () => {
    dispatch(setActiveProperty({ propertyId: menuState.propertyId })).then((resp) => {
      if (resp.payload.status === 200) {
        refetchData();
      }
    });
    handleClose();
  }

  const useAnalyticsCards = (userLikes, sellerLikes, soldProperties, postedProperties, activeProperties) => {
    return useMemo(() => {
      const cardData = [
        {
          name: 'likes', title: 'Liked Property', text: 'Properties liked ', color: 'rgba(224, 119, 196,0.5)',
          count: userLikes?.length || 0, icon: <FavoriteBorderIcon fontSize="large" style={{ fontSize: '70px' }} />,
        },
        {
          name: 'solds', title: 'Sold Property', text: 'Properties Sold by You so far.', color: 'rgba(0, 89, 232 , 0.5)',
          count: soldProperties?.length || 0, icon: <SellIcon fontSize="large" style={{ fontSize: '70px' }} />,
        },
        {
          name: 'post', title: 'Posted Property', text: 'Properties Posted by You.', color: 'rgba(214, 44, 32 , 0.5)',
          count: postedProperties?.length || 0, icon: <PostAddIcon fontSize="large" style={{ fontSize: '70px' }} />,
        },
        {
          name: 'active', title: 'Active Property', text: 'Active Properties by You.', color: 'rgba(255, 166, 0, 0.5)',
          count: activeProperties?.length || 0, icon: <NotificationsIcon fontSize="large" style={{ fontSize: '70px' }} />,
        },
        {
          name: 'inActive', title: 'In-Active Property', text: 'Your In-Active Properties.', color: 'rgba(215, 16, 207, 0.5)',
          count: inActiveProperties?.length || 0, icon: <NotificationsOffIcon fontSize="large" style={{ fontSize: '70px' }} />,
        },
      ];

      return cardData;
    }, [userLikes, sellerLikes, soldProperties, postedProperties, activeProperties, inActiveProperties]);
  };

  const renderPropertyCard = (item, prop) => {
    return (
      <Grid item md={3} sm={6} xs={12} style={{ cursor: 'pointer' }} className={item?.isSold ? 'container-disabled' : 'container'}>
        <Box display='flex' sx={{ position: 'absolute', justifyContent: 'space-between' }}>
          {prop === 'post' && !item.isSold && (
            <Tooltip title="Edit">
              <Button id="fade-button" aria-controls={open ? 'fade-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={(event) => handleEditClick(event, item._id)}>
                <EditNoteIcon style={{ color: 'white' }} />
              </Button>
            </Tooltip>
          )}

          {!item?.isSold ? (
            <Tooltip title="Menu">
              <Button id="fade-button" aria-controls={open ? 'fade-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={(event) => handleClick(event, item._id)}>
                <MoreVertIcon style={{ color: 'white' }} />
              </Button>
            </Tooltip>
          ) : (
            <Tooltip title="Delete">
              <Button id="fade-button" onClick={(event) => handleDeleteProperty(item._id)}>
                <DeleteIcon style={{ color: 'white' }} sx={{ '&:hover': { color: 'white' } }} />
              </Button>
            </Tooltip>
          )}
        </Box>
        {!item?.isSold && <Menu id="fade-menu" MenuListProps={{ 'aria-labelledby': 'fade-button' }} anchorEl={menuState.anchorEl} open={open} onClose={handleClose} TransitionComponent={Fade}>
          {prop !== 'inactive' ? <MenuItem onClick={handleClickSold}>Mark as Sold</MenuItem> : <MenuItem onClick={handleClickActive}>Set Active</MenuItem>}
        </Menu>}
        <img loading="lazy" style={{ borderRadius: '3%' }} src={item.mainImage} height="200px" width="100%" alt="Property" onClick={() => handleOpenPropertyview(item._id)} />
        <Typography fontWeight="600">   {item?.title.length > 80 ? String(item?.title).slice(0, 80) + '. . .' : item?.title}</Typography>
        <Box display="flex">
          <Typography>Property Type:</Typography>
          <Typography>{item.type}</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography fontSize="15px">Price:</Typography>
          <Typography display="flex" fontSize="15px" color="primary" fontWeight="600">
            {item.price} /- &#8377;
          </Typography>
          <Tooltip title={item.isActive ? 'Active' : 'Inactive'}>
            <CircleIcon style={{ marginLeft: '10px', color: item?.isActive ? '#00cc00' : '#ff0000' }} className="like-Button" />
          </Tooltip>
        </Box>
      </Grid>
    );
  };

  const renderPropertyLikesCard = (item) => {
    const { userName, likedAt, property, } = item;
    const { _id, mainImage, propertyType, isActive, isSold, price, title } = property || {}
    return (
      <Grid item md={6} sm={6} xs={12} style={{ cursor: 'pointer' }}>
        <Card>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <img loading="lazy" style={{ borderRadius: '3%' }} src={mainImage} height="200px" width="100%" alt="Property" onClick={() => handleOpenPropertyview(_id)} />
            </Grid>
            <Grid item md={6} xs={12}>
              <Typography fontWeight="600">{title.length > 80 ? String(title).slice(0, 80) + '. . .' : title}</Typography>
              <Box display="flex">
                <Typography>Property Type:</Typography>
                <Typography>{propertyType}</Typography>
              </Box>

              <Box display="flex" alignItems="center">
                <Typography fontSize="15px">Price:</Typography>
                <Typography display="flex" fontSize="15px" color='primary' fontWeight="600">
                  {price} /- &#8377;
                </Typography>
              </Box>

              <Box display="flex">
                <Typography>{userName ? 'Liked On' : 'Liked At'}:</Typography>
                <Typography>{moment(likedAt).format(dateFormat.dateAndTime2)}</Typography>
              </Box>

              {userName && (
                <Box display="flex">
                  <Typography>{'Liked by'}:</Typography>
                  <Typography>{userName}</Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </Card>
      </Grid>
    );
  };

  return (
    <Box>

      <Wrapper>
        <Spinner LoadingState={loading || isLoading} />
        <Box width="100%" height="100vh" sx={{ backgroundColor: grey[50] }}>
          <Grid container p="5px" spacing="10px">
            {useAnalyticsCards(userLikes, sellerLikes, soldProperties, postedProperties, activeProperties).map(({ name, title, text, color, icon, count }) => (
              <Grid item mt={2} xs={12} sm={6} md={2.4} key={name}>
                <Card
                  onClick={() => handleCardCLick(name)}
                  sx={{ border: selectedCards === name ? '3px solid green' : '', minHeight: '160px', maxHeight: '160px', overflow: 'hidden', backgroundColor: color, borderRadius: '16px', transform: 'all', cursor: 'pointer', '&:hover': { boxShadow: 3 }, }}>
                  <CardContent>
                    <Grid container>
                      <Grid item xs={4} md={4} sm={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                        {icon}
                      </Grid>
                      <Grid item xs={8} md={8} sm={8}>
                        <Typography align="center" fontWeight={600}>
                          {title.length > 80 ? String(title).slice(0, 80) + '. . .' : title}
                        </Typography>
                        <Typography align="center" height={'30px'}>
                          {text}
                        </Typography>
                        <Typography align="center" fontSize="40px">
                          {count}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Grid mt={2} container padding={1}>
            {selectedCards === 'likes' && (
              <>
                <Typography>You likes Someone properties</Typography>
                <Grid container spacing={2}>
                  {userLikes?.length > 0 ? userLikes?.map((item) => renderPropertyLikesCard(item)) : <Emptyview text={"You haven't liked any properties."} />}
                </Grid>
                <Typography mt={3}>Someone likes your properties.</Typography>
                <Grid container spacing={2}>
                  {sellerLikes?.length > 0 ? sellerLikes?.map((item) => renderPropertyLikesCard(item)) : <Emptyview text={' No one has liked your properties.'} />}
                </Grid>
              </>
            )}
            {selectedCards === 'post' && (
              <Grid item md={12} padding={1}>
                <Grid container spacing={2}>
                  {postedProperties?.length > 0 ? postedProperties?.map((item) => renderPropertyCard(item, 'post')) : <Emptyview text={'No properties are currently posted.'} />}
                </Grid>
              </Grid>
            )}
            {selectedCards === 'active' && (
              <Grid item md={12} padding={1}>
                <Grid container spacing={2}>
                  {activeProperties?.length > 0 ? activeProperties?.map((item) => renderPropertyCard(item)) : <Emptyview text={'You currently have no active properties.'} />}
                </Grid>
              </Grid>
            )}
            {selectedCards === 'solds' && (
              <Grid item md={12} padding={1}>
                <Grid container spacing={2}>
                  {soldProperties?.length > 0 ? soldProperties?.map((item) => renderPropertyCard(item)) : <Emptyview text={'You currently have no sold properties.'} />}
                </Grid>
              </Grid>
            )}

            {selectedCards === 'inActive' && (
              <Grid item md={12} padding={1}>
                <Grid container spacing={2}>
                  {inActiveProperties?.length > 0 ? inActiveProperties?.map((item) => renderPropertyCard(item, 'inactive')) : <Emptyview text={'You currently have no sold properties.'} />}
                </Grid>
              </Grid>
            )}
          </Grid>
        </Box>
      </Wrapper>
    </Box>

  );
};
export default Dashboard;