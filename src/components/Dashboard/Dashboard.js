import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Box, Button, Card, CardContent, Fade, Grid, Menu, MenuItem, Tooltip, Typography, IconButton } from '@mui/material';
import { grey } from '@mui/material/colors';
import { FavoriteBorder as FavoriteBorderIcon, Notifications as NotificationsIcon, PostAdd as PostAddIcon, Sell as SellIcon, Circle as CircleIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import { dateFormat } from '../../constants/constant';
import { Wrapper } from '../../pages/home/Wrapper';
import { getPostedproperties, getSellerLikes, getUserLikes, selectPostedProperties, selectSellerLikes, selectUserLikes, setSoldProperty } from '../../pages/profile/profileSlice';
import EnhancedTable from '../table/EnhancedTable';
import Spinner from '../ProgressBar/Progressbar';
import { addDelay } from '../../utils/utility';

const headCells = [
  { id: 'title', numeric: false, disablePadding: true, label: 'Title' },
  { id: 'propertyType', numeric: true, disablePadding: false, label: 'PropertyType' },
  { id: 'price', numeric: true, disablePadding: false, label: 'Price' },
  { id: 'postedAt', numeric: true, disablePadding: false, label: 'Posted At' },
  { id: 'likedAt', numeric: true, disablePadding: false, label: 'Liked At' },
  { id: 'link', numeric: true, disablePadding: false, label: 'Link' },
];

const headCellsSeller = [
  { id: 'title', numeric: false, disablePadding: true, label: 'Title' },
  { id: 'propertyType', numeric: true, disablePadding: false, label: 'PropertyType' },
  { id: 'price', numeric: true, disablePadding: false, label: 'Price' },
  { id: 'postedAt', numeric: true, disablePadding: false, label: 'Posted At' },
  { id: 'postFor', numeric: true, disablePadding: false, label: 'Post For' },
  { id: 'userName', numeric: true, disablePadding: false, label: 'Liked By' },
  { id: 'link', numeric: true, disablePadding: false, label: 'Link' },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLikes = useSelector(selectUserLikes);
  const sellerLikes = useSelector(selectSellerLikes);
  const postedProperties = useSelector(selectPostedProperties);

  const [selectedCards, setSelectedCards] = useState('likes');
  const [menuState, setMenuState] = useState({ anchorEl: null, propertyId: null });
  const [activeProperties, setActiveProperties] = useState([]);
  const [soldProperties, setSoldProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  const open = Boolean(menuState.anchorEl);

  const refetchData = () => {
    dispatch(getUserLikes());
    dispatch(getSellerLikes());
    dispatch(getPostedproperties());
  };

  useEffect(() => {
    setLoading(true)
    addDelay(3000).then(()=>{
      refetchData();
      setLoading(false)
    })
  }, []);

  useEffect(() => {
    setActiveProperties(postedProperties?.filter((p) => p?.isActive));
    setSoldProperties(postedProperties?.filter((p) => p?.isSold === true));
  }, [postedProperties]);

  const handleClick = (event, id) => {
    setMenuState({ anchorEl: event.currentTarget, propertyId: id });
  };

  const handleClose = () => {
    setMenuState({ anchorEl: null, propertyId: null });
  };

  const handleClickSold = () => {
    dispatch(setSoldProperty({ propertyId: menuState.propertyId })).then((resp) => {
      if (resp.payload.status === 200) {
        refetchData();
      }
    });
    handleClose();
  };

  const handleOpenPropertyview = (id) => {
    return navigate('/home/' + id);
  };

  const useAnalyticsCards = (userLikes, sellerLikes, soldProperties, postedProperties, activeProperties) => {
    return useMemo(() => {
      const cardData = [
        {
          name: 'likes',
          title: 'Liked Property',
          text: 'Properties liked by you and others like yours',
          color: 'rgba(224, 119, 196,0.5)',
          count: `${userLikes?.length}` || 0,
          icon: <FavoriteBorderIcon fontSize="large" style={{ fontSize: '70px' }} />,
        },
        {
          name: 'solds',
          title: 'Sold Property',
          text: 'Properties Sold by You so far.',
          color: 'rgba(0, 89, 232 , 0.5)',
          count: soldProperties?.length || 0,
          icon: <SellIcon fontSize="large" style={{ fontSize: '70px' }} />,
        },
        {
          name: 'post',
          title: 'Posted Property',
          text: 'Properties Posted by You.',
          color: 'rgba(214, 44, 32 , 0.5)',
          count: postedProperties?.length || 0,
          icon: <PostAddIcon fontSize="large" style={{ fontSize: '70px' }} />,
        },
        {
          name: 'active',
          title: 'Active Property',
          text: 'Active Properties by You.',
          color: 'rgba(255, 166, 0, 0.5)',
          count: activeProperties?.length || 0,
          icon: <NotificationsIcon fontSize="large" style={{ fontSize: '70px' }} />,
        },
      ];

      return cardData;
    }, [userLikes, sellerLikes, soldProperties, postedProperties, activeProperties]);
  };

  const rows = userLikes?.map((like) => ({
    title: like?.title,
    propertyType: like?.propertyType,
    price: like?.price,
    postedAt: moment(like?.postedAt).format(dateFormat.dateAndTime),
    likedAt: moment(like?.userLikes.likedAt).format(dateFormat.dateAndTime),
    link: <Link to={`/home/${like._id}`}>View</Link>,
  }));

  const sellerRows = sellerLikes?.map((like) => ({
    title: like?.title,
    propertyType: like?.propertyType,
    price: like?.price,
    postedAt: moment(like?.postedAt).format(dateFormat.dateAndTime),
    likedAt: moment(like?.userLikes?.likedAt).format(dateFormat.dateAndTime),
    userName: like?.sellerLikes?.userName,
    link: <Link to={`/home/${like._id}`}>View</Link>,
  }));

  const renderPropertyCard = (item) => {
    return (
      <Grid item md={3} sm={6} xs={12} style={{ cursor: 'pointer' }} className={item?.isSold ? 'container-disabled' : 'container'}>
        {!item?.isSold && (
          <Button id="fade-button" sx={{ position: 'absolute' }} aria-controls={open ? 'fade-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined} onClick={(event) => handleClick(event, item._id)}>
            <MoreVertIcon />
          </Button>
        )}
        <Menu id="fade-menu" MenuListProps={{ 'aria-labelledby': 'fade-button' }} anchorEl={menuState.anchorEl} open={open} onClose={handleClose} TransitionComponent={Fade}>
          <MenuItem onClick={handleClickSold}>Mark as Sold</MenuItem>
        </Menu>
        <img loading="lazy" style={{ borderRadius: '3%' }} src={item.mainImage} height="200px" width="100%" alt="Property" onClick={() => handleOpenPropertyview(item._id)} />
        <Typography fontWeight="600">{item.title}</Typography>
        <Box display="flex">
          <Typography>Property Type:</Typography>
          <Typography>{item.type}</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Typography fontSize="15px">Price:</Typography>
          <Typography display="flex" fontSize="15px" color="primary" fontWeight="600">
            {item.price}
          </Typography>
          <Tooltip title={item.isActive ? 'Active' : 'Inactive'}>
            <CircleIcon style={{ marginLeft: '10px', color: item.isActive ? '#00cc00' : '#ff0000' }} className="like-Button" />
          </Tooltip>
        </Box>
      </Grid>
    );
  };

  const handleCardCLick = (name) => {
    setSelectedCards(name);
    setLoading(true);
    addDelay(3000).then(() => {
      setLoading(false);
    });
  };

  return (
    <Wrapper>
      <Spinner LoadingState={loading} />
      <Box width="100%" height="100vh" sx={{ backgroundColor: grey[50] }}>
        <Grid container p="5px" spacing="10px">
          {useAnalyticsCards(userLikes, sellerLikes, soldProperties, postedProperties, activeProperties).map(({ name, title, text, color, icon, count }) => (
            <Grid item mt={2} xs={12} sm={6} md={3} key={name}>
              <Card
                onClick={() => handleCardCLick(name)}
                sx={{
                  border: selectedCards === name ? '3px solid green' : '',
                  minHeight: '160px',
                  maxHeight: '160px',
                  overflow: 'hidden',
                  backgroundColor: color,
                  borderRadius: '16px',
                  transform: 'all',
                  cursor: 'pointer',
                  '&:hover': { boxShadow: 3 },
                }}
              >
                <CardContent>
                  <Grid container>
                    <Grid item xs={4} md={4} sm={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                      {icon}
                    </Grid>
                    <Grid item xs={8} md={8} sm={8}>
                      <Typography align="center" fontWeight={600}>
                        {title}
                      </Typography>
                      <Typography align="center">{text}</Typography>
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

        <Grid mt={2} container>
          {selectedCards === 'likes' && (
            <Grid item md={12} padding={1}>
              <EnhancedTable showsCheckBox={false} rows={rows} headCells={headCells} title="Properties Liked by You" />
              <EnhancedTable showsCheckBox={false} rows={sellerRows} headCells={headCellsSeller} title="Your Properties Liked By Someone" />
            </Grid>
          )}
          {selectedCards === 'post' && (
            <Grid item md={12} padding={1}>
              <Grid container spacing={2}>
                {postedProperties?.length > 0 && postedProperties?.map((item) => renderPropertyCard(item))}
              </Grid>
            </Grid>
          )}
          {selectedCards === 'active' && (
            <Grid item md={12} padding={1}>
              <Grid container spacing={2}>
                {activeProperties?.map((item) => renderPropertyCard(item))}
              </Grid>
            </Grid>
          )}
          {selectedCards === 'solds' && (
            <Grid item md={12} padding={1}>
              <Grid container spacing={2}>
                {soldProperties?.map((item) => renderPropertyCard(item))}
              </Grid>
            </Grid>
          )}
        </Grid>
      </Box>
    </Wrapper>
  );
};

export default Dashboard;
