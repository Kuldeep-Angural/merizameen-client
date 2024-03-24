import { Badge, Card, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { cardsData } from '../../constants/staticData';

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

const ListedItems = () => {
  const naviGate = useNavigate();

  const openItem = (id) => {
    console.log(id);
    naviGate(`/home/${id}`);
  };

  const RenderCard = ({ item }) => {
    return (
      <Grid item md={6} xs={12} onClick={() => openItem(item.id)} style={{ cursor: 'pointer' }}>
        <Card sx={{ backgroundColor: '#ffffff', height: '250px' }}>
          <Grid container spacing={3}>
            <Grid item md={12} sx={12} display={'flex'} justifyContent={'space-between'}>
              <Badge
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                badgeContent={`+${item.images.length - 1}`}
                style={{ fontSize: '15px', fontWeight: '800', color: 'white' }}
              >
                <img src={item.mainImage} height={'200px'} width={'200px'} />
              </Badge>
              <Typography textAlign={'center'} color="text" fontWeight={'600'} padding={'2px'}>
                {item.title}
                <br></br>
                <Grid container spacing={1} sx={{ marginLeft: '20px' }} color={' rgba(0, 128, 255,9)'} height={'100px'}>
                  {item.info.map((i) => {
                    return (
                      <>
                        <Divider orientation="vertical" />
                        <Grid mt={0} width={'100px'} padding={1} item>
                          <RenderChips data={i} />
                        </Grid>
                      </>
                    );
                  })}
                  <Divider orientation="vertical" />
                  <Typography
                    fontWeight={'500'}
                    fontSize={'13px'}
                    textAlign={'center'}
                    sx={{
                      marginRight: '22px',
                      paddingRight: '2px',
                      display: { xs: 'none', sm: 'none', md: 'flex', color: 'black' },
                    }}
                  >
                    {item.description}
                  </Typography>
                </Grid>
              </Typography>
            </Grid>
            <Grid container spacing={2} display={'flex'} justifyContent={'space-between'}>
              <Grid item md={3} mt={1} marginLeft={5}>
                <Divider></Divider>
                <Typography fontWeight={'500'} fontSize={'12px'}>
                  {item.relation}: {item.postedBy}
                </Typography>
                <Typography fontSize={'10px'}>Posted on: {item.postedOn}</Typography>
              </Grid>

              <Grid item md={3} mt={1} marginLeft={5}>
                <Typography fontWeight={'500'} color={'rgba(143, 13, 15,2.4)'} textAlign={'center'} mt={2} mr={1} fontSize={'14px'}>
                  &#8377;:{item.price}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    );
  };

  return (
    <Card sx={{ marginTop: '10px', padding: '10px' }}>
      <Grid container rowSpacing={3} columnSpacing={3} spacing={3}>
        {cardsData.map((item, index) => (
          <RenderCard key={index} item={item} />
        ))}
      </Grid>
    </Card>
  );
};

export default ListedItems;
