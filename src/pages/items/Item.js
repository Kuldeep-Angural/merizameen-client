import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button, Card, CardContent, Divider, Grid, IconButton, Tooltip, Typography,Box } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { cardsData } from '../../constants/staticData';
import { HomeWrapper } from '../home/HomeWrapper';
import '../items/Item.scss';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import BathtubIcon from '@mui/icons-material/Bathtub';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import CarRentalIcon from '@mui/icons-material/CarRental';
import CropLandscapeIcon from '@mui/icons-material/CropLandscape';
import DirectionsRailwayIcon from '@mui/icons-material/DirectionsRailway';
import EngineeringIcon from '@mui/icons-material/Engineering';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import GrassIcon from '@mui/icons-material/Grass';
import HouseIcon from '@mui/icons-material/House';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PowerIcon from '@mui/icons-material/Power';
import SubwayIcon from '@mui/icons-material/Subway';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import APImageViewer from '../../components/imageViewer/APImageViewer';
import APModal from '../../components/modal/APModal';
export const Item = () => {
  const [property, setProperty] = useState({});
  const [propertyImages, setPropertyImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [size, setSize] = useState({});
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const params = useParams();

  useEffect(() => {
    const foundItem = cardsData.find((item) => item?.id === params?.listId);
    setProperty(foundItem);
    setPropertyImages(foundItem.images);
    setImageIndex(0);
  }, []);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const ToolTipButton = ({ title, icon, text }) => {
    return (
      <Tooltip title={title}>
        <IconButton variant="text" style={{ backgroundColor: 'transparent' }}>
          {icon}
          <Typography color={'black'} fontSize={'12px'}>
            {text}
          </Typography>
        </IconButton>
      </Tooltip>
    );
  };

  return (
    <HomeWrapper>
      <Grid container spacing={2} mt={1} style={{ padding: '10px' }} >
        <Grid item md={6} xs={12}>
          <Box style={{ position: 'relative', display: 'inline-block', }}>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, backgroundColor: 'rgb(77, 135, 250,0.1)' }} >
              <div id="imgContainer" style={{ position: 'relative', display: 'inline-block',}}>
                <img  onClick={openImageViewer} title="click to view all images" style={{ display: 'block', width:'100%', maxHeight: '400px', minHeight: '400px', cursor: 'pointer' ,borderRadius:'10px'}} id="img" src={propertyImages[imageIndex]} alt="Property Image" />
                <IconButton  style={{ position: 'absolute', top: '10px', right: '10px', opacity: '0', transition: 'opacity 0.3s' }} onMouseEnter={(e) => (e.target.style.opacity = '1')} onMouseLeave={(e) => (e.target.style.opacity = '0')} aria-label="View Image" onClick={openImageViewer}>
                  <FullscreenIcon />
                </IconButton>
              </div>
              <APImageViewer images={propertyImages} isViewerOpen={isViewerOpen} closeImageViewer={closeImageViewer} currentImage={imageIndex} />
            </Box>

            <CardContent sx={{ display: { xs: 'flex', sm: 'flex', md: 'none' }, mr: 1, backgroundColor: 'rgb(77, 135, 250,0.1)' }}>
              <img onClick={openImageViewer} title="click to view all images" style={{ cursor: 'pointer', display: 'block', maxWidth: '100%', minWidth: '350px', maxHeight: '350px', height: '300px',borderRadius:'10px' }} id="img" src={propertyImages[imageIndex]} alt="Property Image" />
              <APImageViewer images={propertyImages} isViewerOpen={isViewerOpen} closeImageViewer={closeImageViewer} currentImage={imageIndex} />
            </CardContent>
          </Box>
        </Grid>

        <Grid item md={6} xs={12} sm={12} sx={{ flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
          <Typography textOverflow={'ellipsis'} style={{ marginTop: 2, fontSize: '10px', fontWeight: 500, textAlign: 'end', marginRight: 5 }}>
            posted on:{property.postedOn}
          </Typography>
          <Typography style={{ marginTop: 2, fontSize: '19px', paddingLeft: 10, fontWeight: 600 }}>{property.title}</Typography>
          <Typography style={{ marginTop: 2, fontSize: '11px', paddingLeft: 10, fontWeight: 500, marginRight: 5 }}>Listing Id #{property.id}</Typography>
          <Typography style={{ marginTop: 2, fontSize: '15px', paddingLeft: 10, fontWeight: 500, marginRight: 5 }}>{property.description}</Typography>

          <CardContent>
            <Card>
              <CardContent sx={{ backgroundColor: 'rgb(77, 135, 250,0.1)' }}>
                <Grid container mt={2} justifyContent={'center'}>
                  <Grid item md={2}>
                    <ToolTipButton title={'bedrooms'} icon={<BedroomParentIcon />} text={property?.propertyOverview?.BedRooms + 'Beds'} />
                  </Grid>

                  <Grid item md={2}>
                    <ToolTipButton title={'bathrooms'} icon={<BathtubIcon />} text={property?.propertyOverview?.BedRooms + 'Baths'} />
                  </Grid>

                  <Grid item md={2}>
                    <ToolTipButton title={'BuiltUpArea'} icon={<FullscreenIcon />} text={`${property?.propertyOverview?.BuiltUpArea}  \u00B2 Yards`} />
                  </Grid>

                  <Grid item md={2}>
                    <ToolTipButton title={'CarpetArea'} icon={<CropLandscapeIcon />} text={`${property?.propertyOverview?.CarpetArea}  \u00B2 Yards`} />
                  </Grid>

                  <Grid item md={2}>
                    <ToolTipButton title={'AgeOfProperty'} icon={<HouseIcon />} text={`${property?.propertyOverview?.AgeOfProperty} year`} />
                  </Grid>
                </Grid>
                <Grid mt={2}>
                  <Typography fontSize={'28px'} color={'primary'} fontWeight={'600'}>
                    &#8377;:{property.price}
                  </Typography>
                </Grid>

                <Grid container spacing={1} mt={3}>
                  <Grid item md={3} xs={4}>
                    <Button variant="outlined">Enquiry Now</Button>
                  </Grid>

                  <Grid item md={3} xs={4}>
                    <Button variant="outlined">Get Phone No</Button>
                  </Grid>

                  <Grid item md={3} xs={4}>
                    <Button variant="outlined">
                      <LocationOnIcon />
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </CardContent>
        </Grid>

        <Grid md={6} xs={12}>
          <CardContent>
            <Typography textAlign={'center'} fontSize={'20px'} color={'text'} fontWeight={'600'}>
              Amenities
            </Typography>
            <Divider></Divider>
            <Grid container spacing={1}>
              <Grid item sx={12} md={3}>
                <ToolTipButton title={property?.landmark?.[0] || ''} icon={<CarRentalIcon style={{ fontSize: '35px' }} />} text={property?.amenities?.[0] || 'n/a'} />
              </Grid>

              <Grid item sx={12} md={3}>
                <ToolTipButton title={property?.amenities?.[1] || ''} icon={<PowerIcon style={{ fontSize: '35px' }} />} text={property?.amenities?.[1] || 'n/a'} />
              </Grid>
              <Grid item sx={12} md={3}>
                <ToolTipButton title={property?.amenities?.[2] || ''} icon={<AllInclusiveIcon style={{ fontSize: '35px' }} />} text={property?.amenities?.[2] || 'n/a'} />
              </Grid>
              <Grid item sx={12} md={3}>
                <ToolTipButton title={property?.amenities?.[3] || ''} icon={<EngineeringIcon style={{ fontSize: '35px' }} />} text={property?.amenities?.[3] || 'n/a'} />
              </Grid>
              <Grid item sx={12} md={3}>
                <ToolTipButton title={property?.amenities?.[4] || ''} icon={<GrassIcon style={{ fontSize: '35px' }} />} text={property?.amenities?.[4] || 'n/a'} />
              </Grid>
            </Grid>
            <Divider></Divider>
          </CardContent>
        </Grid>

        <Grid md={6} xs={12}>
          <CardContent>
            <Typography fontSize={'20px'} textAlign={'center'} color={'text'} fontWeight={'600'}>
              Landmark
            </Typography>
            <Divider></Divider>
            <Grid container spacing={1}>
              <Grid item md={3}>
                <ToolTipButton title={property?.amenities?.Hospitals || ''} icon={<LocalHospitalIcon style={{ fontSize: '35px' }} />} text={`Hospitals ${property?.landmark?.Hospitals}  km` || 'n/a'} />
              </Grid>

              <Grid item md={3}>
                <ToolTipButton title={property?.landmark?.Airport || ''} icon={<FlightTakeoffIcon style={{ fontSize: '35px' }} />} text={`Airport ${property?.landmark?.Airport} km` || 'n/a'} />
              </Grid>

              <Grid item md={3}>
                <ToolTipButton title={property?.landmark?.Atm || ''} icon={<LocalAtmIcon style={{ fontSize: '35px' }} />} text={`Atm ${property?.landmark?.Atm} km` || 'n/a'} />
              </Grid>

              <Grid item md={3}>
                <ToolTipButton title={property?.landmark?.RailwayStation || ''} icon={<DirectionsRailwayIcon style={{ fontSize: '35px' }} />} text={`RailwayStation ${property?.landmark?.RailwayStation} km` || 'n/a'} />
              </Grid>

              <Grid item md={3}>
                <ToolTipButton title={property?.landmark?.MetroStation || ''} icon={<SubwayIcon style={{ fontSize: '35px' }} />} text={` MetroStation ${property?.landmark?.MetroStation} km` || 'n/a'} />
              </Grid>
            </Grid>
            <Divider></Divider>
          </CardContent>
        </Grid>
      </Grid>

     
    </HomeWrapper>
  );
};
