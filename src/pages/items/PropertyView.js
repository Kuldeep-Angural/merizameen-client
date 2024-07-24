import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import BathtubIcon from '@mui/icons-material/Bathtub';
import BedroomParentIcon from '@mui/icons-material/BedroomParent';
import CarRentalIcon from '@mui/icons-material/CarRental';
import CropLandscapeIcon from '@mui/icons-material/CropLandscape';
import DirectionsRailwayIcon from '@mui/icons-material/DirectionsRailway';
import EngineeringIcon from '@mui/icons-material/Engineering';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import GrassIcon from '@mui/icons-material/Grass';
import Groups2Icon from '@mui/icons-material/Groups2';
import HouseIcon from '@mui/icons-material/House';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PowerIcon from '@mui/icons-material/Power';
import SubwayIcon from '@mui/icons-material/Subway';
import { Box, Button, Card, CardContent, Divider, Grid, IconButton, Tooltip, Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import moment from 'moment/moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GoogleMap } from '../../components/googleMap/GoogleMap';
import APImageViewer from '../../components/imageViewer/APImageViewer';
import Modal from '../../components/modal/Modal';
import Spinner from '../../components/ProgressBar/Progressbar';
import { dateFormat } from '../../constants/constant';
import { Wrapper } from '../home/Wrapper';
import '../items/Item.scss';
import { getSpecificProperty, selectLoading } from '../postAd/postPropertySlice';
import { InputField } from '../../components/input/InputField';
export const PropertyView = () => {
  const [property, setProperty] = useState({});
  const [callBackData, setCallBackData] = useState({});

  const [propertyImages, setPropertyImages] = useState([]);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [locationModal, setLocatiionModal] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const params = useParams();
  const loading = useSelector(selectLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSpecificProperty({ id: params?.listId })).then((resp) => {
      if (resp.payload.data) {
        const foundItem = resp.payload.data;
        setProperty(foundItem);
        let images = [foundItem?.mainImage];
        foundItem &&
          foundItem?.propertyImages.map((element) => images.push(element));
        setPropertyImages(images);
        setImageIndex(0);
      }
    });
  }, [dispatch, params]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  }, []);

  const openImageViewer = useCallback((index) => {
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
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

  const handleCallBack = (e) => {
    const {name , value} = e.target;
    setCallBackData({...callBackData, [name]:value});
  }

  const submitCallBackRequest = () => {
    console.log(callBackData);
    alert('under progress')
  }

  return (
    <Wrapper>
      <Spinner LoadingState={loading} />
      <Grid container spacing={2} mt={1} style={{ padding: '10px' }}>
        <Grid item md={6} sm={12} xs={12}>
          <Box >
            <img onClick={openImageViewer} title="click to view all images" style={{ cursor: 'pointer', display: 'block', width: '100%', borderRadius: '10px' }} src={propertyImages[imageIndex]} alt="Property" />
            <APImageViewer images={propertyImages} isViewerOpen={isViewerOpen} closeImageViewer={closeImageViewer} currentImage={imageIndex} />
          </Box>
        </Grid>

        <Grid item md={6} xs={12} sm={12} sx={{ flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
          <Typography textOverflow={'ellipsis'} style={{ marginTop: 2, fontSize: '10px', fontWeight: 500, textAlign: 'end', marginRight: 5 }}>
            posted At:{moment(property?.postedAt).format(dateFormat.dateAndTime)}
          </Typography>
          <Typography style={{ marginTop: 2, fontSize: '19px', paddingLeft: 10, fontWeight: 600 }}>{property?.title}</Typography>
          <Typography style={{ marginTop: 2, fontSize: '11px', paddingLeft: 10, fontWeight: 500, marginRight: 5 }}>Listing Id #{property?.id}</Typography>
          <Typography style={{ marginTop: 2, fontSize: '15px', paddingLeft: 10, fontWeight: 500, marginRight: 5 }}>{property?.description}</Typography>

          <CardContent sx={{ mt: 4.5 }}>
            <Card>
              <CardContent sx={{ backgroundColor: 'rgb(77, 135, 250,0.1)' }}>
                <Grid container mt={2} justifyContent={'center'}>
                  <Grid item md={2}>
                    <ToolTipButton title={'bedrooms'} icon={<BedroomParentIcon />} text={property?.basicInfo?.bedRooms || 0 + 'Beds'} />
                  </Grid>

                  <Grid item md={2}>
                    <ToolTipButton title={'bathrooms'} icon={<BathtubIcon />} text={property?.basicInfo?.bathRooms || 0 + 'Baths'} />
                  </Grid>

                  <Grid item md={2}>
                    <ToolTipButton title={'BuiltUpArea'} icon={<FullscreenIcon />} text={`${property?.basicInfo?.totalArea || 0}  \u00B2 Yards`} />
                  </Grid>

                  <Grid item md={2}>
                    <ToolTipButton title={'CarpetArea'} icon={<CropLandscapeIcon />} text={`${property?.basicInfo?.carPetArea || 0}  \u00B2 Yards`} />
                  </Grid>

                  <Grid item md={2}>
                    <ToolTipButton title={'AgeOfProperty'} icon={<HouseIcon />} text={`${property?.basicInfo?.ageOfProperty || 0} year`} />
                  </Grid>
                </Grid>
                <Grid mt={2}>
                  <Typography fontSize={'28px'} color={'primary'} fontWeight={'600'}>
                    &#8377;:{property?.price}  /-
                  </Typography>
                </Grid>

                {/* <Grid container spacing={1} mt={3}>
                  <Grid item md={3} xs={4}>
                    <Button size='small' variant="outlined">Enquiry Now</Button>
                  </Grid>

                  <Grid item md={3} xs={4}>
                    <Button size='small' variant="outlined">Get Phone No</Button>
                  </Grid>

                  <Grid item md={3} xs={4}>
                    <Button size='small' variant="outlined">
                      <LocationOnIcon onClick={() => setLocatiionModal(true)} />
                    </Button>
                  </Grid>
                </Grid> */}
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
                <ToolTipButton title={property?.amenities?.[0] || ''} icon={<CarRentalIcon style={{ fontSize: '35px', color: property?.amenities?.carParking === 'Y' ? 'green' : 'grey' }} />} text={'Car Parking'} />
              </Grid>
              <Grid item sx={12} md={3}>
                <ToolTipButton title={property?.amenities?.[1] || ''} icon={<PowerIcon style={{ fontSize: '35px', color: property?.amenities?.powerBackup === 'Y' ? 'green' : 'grey' }} />} text={'Power Backup'} />
              </Grid>
              <Grid item sx={12} md={3}>
                <ToolTipButton title={property?.amenities?.[2] || ''} icon={<AllInclusiveIcon style={{ fontSize: '35px', color: property?.amenities?.vastuCompliant === 'Y' ? 'green' : 'grey' }} />} text={'Vastu Compliant'} />
              </Grid>
              <Grid item sx={12} md={3}>
                <ToolTipButton title={property?.amenities?.[3] || ''} icon={<EngineeringIcon style={{ fontSize: '35px', color: property?.amenities?.mainMaintenance === 'Y' ? 'green' : 'grey' }} />} text={'Maintenance'} />
              </Grid>
              <Grid item sx={12} md={3}>
                <ToolTipButton title={property?.amenities?.[4] || ''} icon={<FitnessCenterIcon style={{ fontSize: '35px', color: property?.amenities?.gym === 'Y' ? 'green' : 'grey' }} />} text={'Gym'} />
              </Grid>
              <Grid item sx={12} md={3}>
                <ToolTipButton title={property?.amenities?.[4] || ''} icon={<Groups2Icon style={{ fontSize: '35px', color: property?.amenities?.clubHouse === 'Y' ? 'green' : 'grey' }} />} text={'Club House'} />
              </Grid>
              <Grid item sx={12} md={3}>
                <ToolTipButton title={property?.amenities?.[5] || ''} icon={<GrassIcon style={{ fontSize: '35px', color: property?.amenities?.park === 'Y' ? 'green' : 'grey' }} />} text={'Park'} />
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
                <ToolTipButton icon={<LocalHospitalIcon style={{ fontSize: '35px', color: property?.landMarks?.hospital ? 'green' : 'grey' }} />} text={`Hospital ${property?.landMarks?.hospital || 0}  km`} />
              </Grid>

              <Grid item md={3}>
                <ToolTipButton icon={<FlightTakeoffIcon style={{ fontSize: '35px', color: property?.landMarks?.airport ? 'green' : 'grey' }} />} text={`Airport ${property?.landMarks?.airport || 0} km`} />
              </Grid>

              <Grid item md={3}>
                <ToolTipButton icon={<LocalAtmIcon style={{ fontSize: '35px', color: property?.landMarks?.atm ? 'green' : 'grey' }} />} text={`Atm ${property?.landMarks?.atm || 0} km`} />
              </Grid>

              <Grid item md={3}>
                <ToolTipButton icon={<DirectionsRailwayIcon style={{ fontSize: '35px', color: property?.landMarks?.railway ? 'green' : 'grey' }} />} text={`RailwayStation ${property?.landMarks?.railway || 0} km`} />
              </Grid>

              <Grid item md={3}>
                <ToolTipButton icon={<SubwayIcon style={{ fontSize: '35px', color: property?.landMarks?.metro ? 'green' : 'grey' }} />} text={` MetroStation ${property?.landMarks?.metro || 0} km`} />
              </Grid>
            </Grid>
            <Divider></Divider>
          </CardContent>
        </Grid>

        <Grid item md={6} sm={12} xs={12} p={3}>
          <GoogleMap data={{ state: property?.location?.state, city: property?.location?.city, country: 'India', zip: property?.location?.pinCode }} />
        </Grid>

        <Grid item md={6} sm={12} xs={12} p={3}>
          <Card>
            <CardContent sx={{mt:1}}>
              <Typography align='center' mb={2}>Request CallBack</Typography>
              <InputField sx={{mt:2}}  style={{marginTop:'19'}} onChange={handleCallBack} name={'name'} value={callBackData.name} placeholder={'Name'}/>
              <InputField style={{marginTop:'19'}}  onChange={handleCallBack} name={'email'} value={callBackData.email} placeholder={'Email'}/>
              <InputField style={{marginTop:'19'}} onChange={handleCallBack} name={'mobile'} value={callBackData.mobile} placeholder={'Mobile'}/>
              <InputField style={{marginTop:'19'}} onChange={handleCallBack} name={'message'} value={callBackData.message} placeholder={'Message'}/>
              <Box  display={'flex'} justifyContent={'center'} alignContent={'center'}>
              <Button variant='contained'  sx={{marginTop:'30px' , width:'120px'}} onClick={submitCallBackRequest}> Send </Button>

              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Modal open={locationModal} onSubmit={() => { }} hideCreateButton={true} onClose={() => setLocatiionModal(false)} title="" >
        <Grid container>
          <Grid item md={12}>
            <Typography fontWeight={550}>{property?.location?.city + ' ,' + property?.location?.state + ' ,' + property?.location?.pinCode}</Typography>
          </Grid>
          <Grid item md={12} sm={12} xs={12}>
            <CardMedia sx={{ height: '400px', position: 'relative' }}>
              <GoogleMap data={{ state: property?.location?.state, city: property?.location?.city, country: 'India', zip: property?.location?.pinCode }} />
            </CardMedia>
          </Grid>
        </Grid>
      </Modal>

    </Wrapper>
  );
};
