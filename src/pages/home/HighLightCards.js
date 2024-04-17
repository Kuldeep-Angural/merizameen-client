import { Button, Card, Chip, Grid, Typography } from '@mui/material';

import '../../pages/Global.scss';
export const HighLightCards = () => {
  const itemsCount = [
    {
      color: 'rgba(224, 119, 196,0.5)',
      content: (
        <Grid>
          <Typography mt={1} fontWeight={'700'} textAlign={'center'}>
            Post your Property Ads
          </Typography>
          <Typography mt={2} fontWeight={'500'} minHeight={'50px'} maxHeight={'80px'} textAlign={'center'}>
            Sell/Rent out your property & Get <br/>unlimited responses
          </Typography>

          <Grid display={'flex'} justifyContent={'center'}>
            <Button sx={{ color: 'white', display: 'block' }}>
              <Chip className="highlight-buttons" style={{ cursor: 'pointer', '&:hover': { backgroundColor: '#07b0ed' } }} color="primary" label={'Explore Now'} variant="standard" />
            </Button>
          </Grid>
        </Grid>
      ),
    },
    {
      color: 'rgba(0, 89, 232 , 0.5)',
      content: (
        <Grid>
          <Typography mt={1} fontWeight={'700'} textAlign={'center'}>
            Top Property Dealers
          </Typography>

          <Typography mt={2} fontWeight={'500'} textAlign={'center'}>
            Connect with genuine property dealers <br></br>in your city
          </Typography>

          <Grid display={'flex'} justifyContent={'center'}>
            <Button sx={{ color: 'white', display: 'block' }}>
              <Chip className="highlight-buttons" style={{ cursor: 'pointer', '&:hover': { backgroundColor: '#07b0ed' } }} color="primary" label={'Explore Now'} variant="standard" />
            </Button>
          </Grid>
        </Grid>
      ),
    },
    {
      color: 'rgba(214, 44, 32 , 0.5)',
      content: (
        <Grid>
          <Typography mt={1} fontWeight={'700'} textAlign={'center'}>
            Verified Property for Sale
          </Typography>
          <Typography mt={2} fontWeight={'500'} textAlign={'center'}>
            Search for the best commercial or residential <br></br>deal in your city
          </Typography>

          <Grid display={'flex'} justifyContent={'center'}>
            <Button sx={{ color: 'white', display: 'block' }}>
              <Chip className="highlight-buttons" style={{ cursor: 'pointer', '&:hover': { backgroundColor: '#07b0ed' } }} color="primary" label={'Explore Now'} variant="standard" />
            </Button>
          </Grid>
        </Grid>
      ),
    },
    {
      color: 'rgba(255, 166, 0, 0.5)',
      content: (
        <Grid>
          <Typography mt={1} fontWeight={'700'} textAlign={'center'}>
            Upcoming Projects
          </Typography>
          <Typography mt={2} fontWeight={'500'} textAlign={'center'}>
            Obtain information about upcoming projects <br></br>in your city
          </Typography>

          <Grid display={'flex'} justifyContent={'center'}>
            <Button sx={{ color: 'white', display: 'block' }}>
              <Chip className="highlight-buttons" style={{ cursor: 'pointer', '&:hover': { backgroundColor: '#07b0ed' } }} color="primary" label={'Explore Now'} variant="standard" />
            </Button>
          </Grid>
        </Grid>
      ),
    },
  ];

  const Items = ({ color, content }) => {
    return (
      <Grid item md={3} xs={6}>
        <Card sx={{ backgroundColor: color, height: '180px',boxShadow:'0',borderRadius:'16px', transform:'all',"&:hover":{ boxShadow:3} }} >{content}</Card>
      </Grid>
    );
  };

  return (
    <Card sx={{ marginTop: '1px', padding: '10px' }}>
      <Grid container rowSpacing={1} spacing={2}>
        {itemsCount.map((item, index) => {
          return <Items key={index} color={item.color} content={item.content} />;
        })}
      </Grid>
    </Card>
  );
};
