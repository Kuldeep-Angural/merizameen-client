import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SellIcon from '@mui/icons-material/Sell';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HomeWrapper } from '../../pages/home/HomeWrapper';
import PostAddIcon from '@mui/icons-material/PostAdd';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { getPostedproperties, getSellerLikes, getUserLikes, selectPostedProperties, selectSellerLikes, selectUserLikes } from '../../pages/profile/profileSlice';
import EnhancedTable from '../table/EnhancedTable';
import moment from 'moment/moment';
import { dateFormat } from '../../constants/constant';
import { Link } from 'react-router-dom';

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const userLikes = useSelector(selectUserLikes);
  const sellerLikes = useSelector(selectSellerLikes);
  const postedProperties = useSelector(selectPostedProperties);
  const [selectedCards, setSelectedCards] = useState('likes');

  const handleClick = () => {
    alert('uclicked');
  };

  const analyticsCards = [
    { name: 'likes', title: 'Liked Property', text: 'Properties liked by you and others like yours', color: 'rgba(224, 119, 196,0.5)', count: userLikes?.length + ' / ' + sellerLikes?.length || 0, icon: <FavoriteBorderIcon fontSize="large" style={{ fontSize: '70px' }} /> },
    { name: 'solds', title: 'Sold Property', text: 'Properties Sold by You so far.', color: 'rgba(0, 89, 232 , 0.5)', count: 18, icon: <SellIcon fontSize="large" style={{ fontSize: '70px' }} /> },
    { name: 'post', title: 'Posted Property', text: 'Properties Posted by You.', color: 'rgba(214, 44, 32 , 0.5)', count: postedProperties?.length || 0, icon: <PostAddIcon fontSize="large" style={{ fontSize: '70px' }} /> },
    { name: 'active', title: 'Active Property', text: 'Active Properties by You .', color: 'rgba(255, 166, 0, 0.5)', count: 9, icon: <NotificationsIcon fontSize="large" style={{ fontSize: '70px' }} /> },
  ];
  useEffect(() => {
    dispatch(getUserLikes());
    dispatch(getSellerLikes());
    dispatch(getPostedproperties());
  }, []);


  


  const rows = userLikes?.map(like => ({
    title: like?.title,
    propertyType: like?.propertyType,
    price: like?.price,
    postedAt: moment(like?.postedAt).format(dateFormat.dateAndTime),
    likedAt:moment(like?.userLikes.likedAt).format(dateFormat.dateAndTime),
    link:(<Link to={`/home/${like._id}`}>View</Link>)
  }));

const headCells = [
  { id: 'title', numeric: false, disablePadding: true, label: 'Title' ,},
  { id: 'propertyType', numeric: true, disablePadding: false, label: 'PropertyType' },
  { id: 'price', numeric: true, disablePadding: false, label: 'Price' },

  { id: 'postedAt', numeric: true, disablePadding: false, label: 'postedAt' },
  { id: 'likedAt', numeric: true, disablePadding: false, label: 'LikedAt' },
  { id: 'link', numeric: true, disablePadding: false, label: 'link' },
];

  return (
    <HomeWrapper>
      <Box width={'100%'} height={'100vh'} sx={{ backgroundColor: grey[50] }}>
        <Grid container p={'5px'} spacing={'10px'}>
          {analyticsCards.map(({ title, text, color, icon, count, name }) => {
            return (
              <Grid item mt={2} xs={12} sm={6} md={3}>
                <Card onClick={() => setSelectedCards(name)} sx={{ border: selectedCards === name ? '2px solid green' : '', boxShadow: selectedCards === name ? '2px 5px 10px  green' : ' ', minHeight: '160px', maxHeight: '160px', overflow: 'hidden', backgroundColor: color, borderRadius: '16px', transform: 'all', '&:hover': { boxShadow: 3 } }}>
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
                        <Typography align="center" fontSize={'40px'}>
                          {count}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <Grid mt={2} container>{selectedCards === 'likes' && <Grid item md={12} padding={1}>
        <EnhancedTable showsCheckBox={false} rows={rows} headCells={headCells} title="Likes" />
        </Grid>}
        </Grid>
      </Box>
    </HomeWrapper>
  );
};

export default Dashboard;
