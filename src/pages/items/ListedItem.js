import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box, Card, Grid, IconButton, Typography } from '@mui/material';
import Lottie from 'lottie-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Progressbar from '../../components/ProgressBar/Progressbar';
import ItemNotFound from '../../ui/json/noDataFOund.json';
import { addDelay } from '../../utils/utility';
import { allProperties, getAllProperties, likeproperty, selectLoading } from '../postAd/postPropertySlice';
import './Item.scss';
import { logout } from '../authantication/authSlice';



const ListedItems = ({ filterParams, searchParams }) => {
  const naviGate = useNavigate();
  const dispatch = useDispatch();
  const dataObj = useSelector(allProperties);
  const loading = useSelector(selectLoading);
  const [properties, setProperties] = useState([]);
  const [apLoading, setAppLoading] = useState(false);

  const openItem = (id) => {
    naviGate(`/home/${id}`);
  };

  const doLike = (id) => {
    dispatch(likeproperty({ id: id })).then((resp) => {});
  };

  const RenderCard = ({ item }) => {
    return (
      <Grid item md={3} sm={6} xs={12} style={{ cursor: 'pointer' }}>
        <img loading="lazy" style={{ borderRadius: '3%' }} onClick={() => openItem(item._id)} src={item.mainImage} height={'275px'} width={'100%'} />
        <Typography fontWeight={'600'}>{item.title}</Typography>
        <Box display={'flex'}>
          <Typography>Property Type:</Typography>
          <Typography>{item.type}</Typography>
        </Box>
        <Box display={'flex'} alignItems="center">
          <Typography fontSize={'15px'}>{'Price'}:</Typography>
          <Typography display={'flex'} fontSize={'15px'} color={'primary'} fontWeight={'600'}>
            {item.price}
          </Typography>
          <IconButton sx={{ marginLeft: '40px' }} aria-label="Add to Cart" onClick={() => {}}>
            <FavoriteBorderIcon onClick={() => doLike(item._id)} className="like-Button" />
          </IconButton>
        </Box>
      </Grid>
    );
  };




  useEffect(() => {
    setAppLoading(true);
    let data = ![null,undefined,''].includes(filterParams) ?  dataObj?.filter((e) => e.propertyType === filterParams) : dataObj;
    addDelay(2000).then(() => {
      setAppLoading(false);
      setProperties(data);
    });
  }, [filterParams, dataObj]);



  useEffect(() => {
    dispatch(getAllProperties()).then((resp)=>{
      console.log(resp?.payload?.response?.status===403);
      if (resp?.payload?.response?.status===403) {
        dispatch(logout()).then((resp)=>{
          naviGate('/');
        });
      }
    });
  }, []);

  return (
    <>
      <Progressbar LoadingState={loading || apLoading} />
      <Card sx={{ marginTop: '10px', padding: '10px' }}>
        {properties.length > 0 ? (
          <Grid container rowSpacing={3} columnSpacing={3} spacing={3}>
            {properties.map((item, index) => (
              <RenderCard key={index} item={item} />
            ))}
          </Grid>
        ) : (
          <Grid container md={12} xs={12} display={'flex'} justifyContent={'center'}>
            <Grid item md={12} xs={12}>
              <Lottie loop={true} animationData={ItemNotFound} style={{ height: '190px', cursor: 'pointer' }} />
            </Grid>
            <Grid item md={12} xs={12}>
              <Typography fontSize={'20px'} fontWeight={600} textAlign={'center'}>
                sorry we don't have any {filterParams} in your Area{' '}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Card>
    </>
  );
};

export default ListedItems;
