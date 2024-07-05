import { Box, Card, CardContent, Divider, FormControl, Grid, Icon, InputLabel, MenuItem, Paper, Select, Stack, Typography } from '@mui/material';
import { blue, grey, teal } from '@mui/material/colors';
import React from 'react';
import { HomeWrapper } from '../../pages/home/HomeWrapper';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SellIcon from '@mui/icons-material/Sell';

const analyticsCards = [
  {title:'Liked Property',text:'Properties Liked by You so far.',color:'lightgreen',count:12,icon:<FavoriteBorderIcon fontSize="large" style={{ fontSize: '70px' }} />},
  {title:'Sold Property',text:'Properties Sold by You so far.',color:'lightblue',count:18,icon:<SellIcon fontSize="large" style={{ fontSize: '70px' }} />},
  {title:'Liked Property',text:'Properties Liked by You so far.',color:'lightslategray',count:23,icon:<FavoriteBorderIcon fontSize="large" style={{ fontSize: '70px' }} />},
  {title:'Liked Property',text:'Properties Liked by You so far.',color:'teal',count:9,icon:<FavoriteBorderIcon fontSize="large" style={{ fontSize: '70px' }} />}
]

const Dashboard = (props) => {
  // const { name, date, time, id, data } = props;
  const handleClick = () => {
    alert('uclicked');
  };
  return (
    <HomeWrapper>
      <Box width={'100%'} height={'100vh'} sx={{ backgroundColor: grey[50] }}>
        <Grid container p={'5px'} spacing={'10px'}>
          {analyticsCards.map(({title,text,color,icon,count})=>{
            return(
              <Grid item mt={2} xs={12} sm={6} md={3} >
            <Card sx={{ minHeight: '160px', maxHeight: '160px', overflow: 'hidden', backgroundColor: color ,boxShadow:'0',borderRadius:'16px', transform:'all',"&:hover":{ boxShadow:3}}}>
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
            )
          })}
        </Grid>
      </Box>
    </HomeWrapper>
  );
};

export default Dashboard;
