import { Card, Grid, Typography, Box, IconButton } from '@mui/material';
import Lottie from 'lottie-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cardsData } from '../../constants/staticData';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ItemNotFound from '../../ui/json/noDataFOund.json';
import './Item.scss';
const RenderChips = ({ data }) => {
  const key = Object.keys(data)[0];
  const value = data[key];
  return (
    <>
      <Typography fontWeight={'600'} mt={2} lineHeight={'0.8'} fontSize={'12px'} color={'InfoText'}>
        {String(key).toUpperCase()}
        <Typography fontWeight={'500'} fontSize={'12px'} color={'InfoText'}>
          {value}
        </Typography>
      </Typography>
    </>
  );
};

const ListedItems = ({ filterParams,searchParams }) => {
  const naviGate = useNavigate();
  const [properties, setProperties] = useState([]);

  const openItem = (id) => {
    naviGate(`/home/${id}`);
  };

  const RenderCard = ({ item }) => {
    return (
      <Grid item md={3} sm={6} xs={12}  style={{ cursor: 'pointer' }}>
        <img style={{ borderRadius: '3%' }} onClick={() => openItem(item.id)} src={item.mainImage} height={'275px'} width={'100%'} />
        <Typography fontWeight={'600'}>{item.title}</Typography>
        <Box display={'flex'}>
          <Typography>Property Type:</Typography>
          <Typography>{item.type}</Typography>
        </Box>
        <Box display={'flex'} alignItems="center">
          <Typography fontSize={'15px'}>{'Price'}:</Typography>
          <Typography display={'flex'}  fontSize={'15px'} color={'primary'} fontWeight={'600'}>
            {item.price}
          </Typography>
          <IconButton sx={{ marginLeft: '40px' }}   aria-label="Add to Cart" onClick={() => {}}>
            <FavoriteBorderIcon  className='like-Button'/>
          </IconButton>
        </Box>
      </Grid>
    );
  };

  useEffect(() => {
      let data = cardsData.filter((e) => e.type === filterParams);
      setProperties(data);
  
  }, [filterParams]);

 


  return (
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
              {' '}
              sorry we don't have any {filterParams} in your Area{' '}
            </Typography>
          </Grid>
        </Grid>
      )}
    </Card>
  );
};

export default ListedItems;
