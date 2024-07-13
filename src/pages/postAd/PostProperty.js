import AddHomeIcon from '@mui/icons-material/AddHome';
import BackupIcon from '@mui/icons-material/Backup';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Badge, Box, Button, Card, CardContent, Checkbox, Chip, Divider, FormControl, FormControlLabel, Grid, InputAdornment, TextField, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import LoaderButton from '../../components/loadingbutton/LoaderButton';
import Modal from '../../components/modal/Modal';
import Progressbar from '../../components/ProgressBar/Progressbar';
import APToaster from '../../components/Toaster/APToaster';
import { himachalCities, punjabCities } from '../../constants/cities';
import { medium, propertyTypes, state } from '../../constants/constant';
import imageIcon from '../../ui/images/noImage.webp';
import { Wrapper } from '../home/Wrapper';
import { getAllProperties, getSpecificProperty, postProperty, selectPostLoading } from './postPropertySlice';

export const PostProperty = () => {
  const [cities, setCities] = useState([]);
  const [postAdData, setPostAdData] = useState({});
  const toastRef = useRef();
  const [location, setLocation] = useState({
    state: 'Punjab',
    city: 'Pathankot',
  });

  const [basicInfo, setBasicInfo] = useState({});
  const [amenities, setAmenities] = useState({});
  const [landMarks, setLandMarks] = useState({});

  const [openModal, setOpenModal] = useState(false);
  const loading = useSelector(selectPostLoading);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    setCities(location?.state === 'Punjab' ? punjabCities : himachalCities);
  }, [location]);

  useEffect(()=>{
    if (params?.listId) {
      dispatch(getSpecificProperty(params)).then((resp)=>{
        const data = resp.payload.data || {}
        if (resp.payload.data) {
          setBasicInfo({...data.basicInfo , title:data.title, description:data.description ,price:data.price ,   })
          setAmenities(data.amenities)
          setLandMarks(data.landMarks)
          setPostAdData({
            propertyImages:data.propertyImages,
            mainImage:data.mainImage,
          })

        }
      })
    }
  },[params , dispatch])

  const handleChange = (e) => {
    if (e.target.name === 'mainImage') {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostAdData({ ...postAdData, [e.target.name]: reader.result });
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    } else if (e.target.name === 'propertyImages') {
      const files = e.target.files;
      const imagesArray = [];

      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          imagesArray.push(e.target.result);
          if (imagesArray.length === files.length) {
            setPostAdData({ ...postAdData, propertyImages: imagesArray });
          }
          setOpenModal(true);
        };
        reader.readAsDataURL(files[i]);
      }
    } else {
      setPostAdData({ ...postAdData, [e.target.name]: e.target.value });
    }
  };

  const handleLocationChange = (event) => {
    const { name, value } = event.target;
    setLocation({ ...location, [name]: value });
  };

  const handleStateAndCityChange = (event) => {
    const { name, value } = event.target;
    if (name === 'city') {
      setLocation({ ...location, city: value });
    } else {
      setLocation({ ...location, state: value });
    }
  };

  const handleBasicInfo = (event) => {
    const { name, value } = event.target;
    setBasicInfo({
      ...basicInfo,
      [name]: value,
    });
  };

  const handleAmenities = (event) => {
    const { name, checked } = event.target;
    setAmenities({ ...amenities, [name]: checked === true ? 'Y' : 'N' });
  };

  const handleLandMarks = (event) => {
    const { name, value } = event.target;
    setLandMarks({ ...landMarks, [name]: value });
  };

  const handlePostButton = () => {
    const data = {
      ...postAdData,
      basicInfo: { ...basicInfo },
      landMarks: { ...landMarks },
      amenities: { ...amenities },
      location: { ...location },
    };
    dispatch(postProperty(data)).then((resp) => {
      if (resp?.payload?.message) {
        toastRef.current.showToast({ messageType: 'warning', messageText: resp?.payload?.message });
      }
    });
  };

  const handleUpdateProperty = () => {

  }

  useEffect(() => {
    dispatch(getAllProperties());
  }, [dispatch]);

  const amenitiesConstant = [
    { name: 'carParking', label: 'Car parking' },
    { name: 'maintenance', label: 'Maintenance' },
    { name: 'vastuCompliant', label: 'Vastu compliant' },
    { name: 'powerBackup', label: 'Pawer Backup' },
    { name: 'park', label: 'Park' },
    { name: 'gym', label: 'Gym' },
    { name: 'clubHouse', label: 'Club House' },
  ];

  const landMarksConstant = [
    { name: 'hospital', label: 'Hospital', erroMessage: '' },
    { name: 'atm', label: 'Atm', erroMessage: '' },
    { name: 'bank', label: 'Bank', erroMessage: '' },
    { name: 'railway', label: 'Railway-Station', erroMessage: '' },
    { name: 'metro', label: 'Metro-Station', erroMessage: '' },
    { name: 'airport', label: 'Airport', erroMessage: '' },
  ];

  const basicInfoConstant = [
    { name: 'bedRoom', label: 'Bedroom' },
    { name: 'bathRoom', label: 'Bathroom' },
    { name: 'totalArea', label: `Total (Yards)\u00B2` },
    { name: 'carpetArea', label: `Carpet (Yards)\u00B2` },
    { name: 'propertyAge', label: `Age Of Property` },
  ];

  return (
    <Wrapper>
      <APToaster ref={toastRef} title="" />
      <Progressbar LoadingState={loading} />
      <Grid container spacing={1} p={0}>
        <Grid item md={6} xs={12}>
          <Card>
            <CardContent>
              {/* main Image */}
              <Grid container spacing={2}>
                <Grid item md={4} sm={6} xs={6}>
                  <Tooltip title="Upload Main Image">
                    <Button variant="text" component="label">
                      <img onClick={() => {}} style={{ cursor: 'pointer', borderRadius: '10px' }} src={postAdData.mainImage ? postAdData.mainImage : imageIcon} height={'150px'}  width={'100%'} alt="upload" />
                      <input onChange={handleChange} accept="image/*" name="mainImage" type="file" hidden />
                    </Button>
                  </Tooltip>
                </Grid>

                {/* properties Images and basic info */}
                <Grid item md={8} sm={6} xs={6} display={'flex'}>
                  <Grid container spacing={2}>
                    <Grid item md={4} xs={12}>
                      <Tooltip title="Upload Property Images">
                        <Button fullWidth onClick={postAdData?.propertyImages?.length > 0 ? () => setOpenModal(true) : () => {}} sx={{ height: '60px' }} variant="outlined" component="label">
                          <input style={{ width: '100%' }} onChange={handleChange} accept="image/*" name="propertyImages" multiple type="file" hidden />
                          <Badge bac badgeContent={postAdData?.propertyImages?.length || 0} color="primary">
                            <BackupIcon style={{ fontSize: '60px', color: '#bdbdbd', width: '100%' }} />
                          </Badge>
                        </Button>
                      </Tooltip>
                    </Grid>

                    <Grid item md={4} xs={12}>
                      <TextField fullWidth select defaultValue="2Bhk" value={basicInfo?.propertyType || ''} name="propertyType" onChange={handleBasicInfo} SelectProps={{ native: true }} helperText="Type of Property" variant="outlined">
                        {propertyTypes.map((option) => (
                          <option key={option.label} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item md={4} xs={12}>
                      <TextField fullWidth select defaultValue="Sell" name="postFor" value={basicInfo?.postFor || ''} onChange={handleBasicInfo} SelectProps={{ native: true }} helperText="Post For Sell/Rent" variant="outlined">
                        {medium.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    </Grid>
                  </Grid>
                </Grid>

                {/* Basic Info */}
                <Grid item md={12}>
                  <Divider></Divider>
                  <Grid item md={12}>
                    <Typography fontWeight={'600'} textAlign={'center'}>
                      Basic info
                    </Typography>
                    <Grid container spacing={2} display={'flex'} justifyContent={'center'}>
                      {basicInfoConstant.map((item) => {
                        return (
                          <Grid key={item.label} item md={2} xs={6}>
                            <TextField required label={item.label} helpertext="This Field is Required" onChange={handleBasicInfo} aria-describedby="outlined-weight-helper-text" name={item?.name} type="number" value={Number(basicInfo?.[item?.name]) || ''} />
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                </Grid>
                {/* Location and area */}
                <Grid item md={12} display={'flex'} justifyContent={'center'}>
                  <Divider></Divider>
                  <Grid item md={12}>
                    <Typography fontWeight={'600'} textAlign={'center'}>
                      Location
                    </Typography>
                    <Grid container spacing={2} pl={1} display={'flex'} justifyContent={'center'}>
                      <Grid item md={6} xs={6} sm={6}>
                        <TextField disabled={params?.listId} fullWidth select value={location?.state || ''} onChange={handleStateAndCityChange} defaultValue="Punjab" SelectProps={{ native: true }} name="state" variant="standard">
                          {state.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </TextField>
                      </Grid>

                      <Grid item md={6} xs={6} sm={6}>
                        <TextField fullWidth disabled={params?.listId} select onChange={handleStateAndCityChange} value={location?.city || ''} defaultValue={cities[0]} SelectProps={{ native: true }} name="city" variant="standard">
                          {cities.map((option) => (
                            <option key={option.name} value={option.name}>
                              {option.name}
                            </option>
                          ))}
                        </TextField>
                      </Grid>

                      <Grid item md={6} xs={6} sm={6}>
                        <FormControl fullWidth variant="outlined">
                          <TextField disabled={params?.listId} required label="District" onChange={handleLocationChange} helpertext="This Field is Required" value={location?.district || ''} aria-describedby="outlined-weight-helper-text" name={'district'} />
                        </FormControl>
                      </Grid>

                      <Grid item md={6} xs={6} sm={6}>
                        <FormControl fullWidth variant="outlined">
                          <TextField disabled={params?.listId} required label="Pincode" onChange={handleLocationChange} helpertext="This Field is Required" value={location?.pinCode || ''} aria-describedby="outlined-weight-helper-text" name={'pinCode'} type="number" />
                        </FormControl>
                      </Grid>

                      <Grid item md={12} xs={12} sm={12}>
                        <FormControl fullWidth variant="outlined">
                          <TextField onChange={handleBasicInfo} label="Property Description" required helpertext="Please add Property Description" aria-describedby="outlined-weight-helper-text" value={basicInfo?.description || ''} name={'description'} type="text" />
                        </FormControl>
                      </Grid>

                      <Grid item md={12} xs={12} sm={12}>
                        <TextField
                          label="Price(INR)"
                          required
                          onChange={handleBasicInfo}
                          aria-describedby="outlined-weight-helper-text"
                          name={'price'}
                          type="number"
                          value={basicInfo?.price || ''}
                          inputProps={{
                            style: { '-moz-appearance': 'textfield' }, // For Firefox
                            'aria-hidden': true, // Hide arrows from screen readers
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Amenities and LandMark */}
        <Grid item md={6} xs={12}>
          <Card>
            <CardContent>
              <Grid item md={12}>
                <Grid item md={12}>
                  <Typography fontWeight={'600'} textAlign={'center'}>
                    Title
                  </Typography>
                </Grid>
                <Grid item md={12} xs={12} sm={12}>
                  <FormControl fullWidth variant="outlined">
                    <TextField label="Title" required helpertext="Please enter Property Title" onChange={handleBasicInfo} aria-describedby="outlined-weight-helper-text" value={basicInfo?.title || ''} name={'title'} />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item md={12}>
                <Grid item md={12}>
                  <Typography fontWeight={'600'} textAlign={'center'}>
                    Amenities
                  </Typography>
                </Grid>
                <Grid container spacing={2}>
                  {amenitiesConstant.map((item) => {
                    return (
                      <Grid item md={4}>
                        <FormControlLabel control={<Checkbox checked={amenities?.[item?.name]==='Y'} value={amenities?.[item?.name] || '' } name={item?.name} />} onClick={handleAmenities} label={item.label} />
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
              <Divider />

              <Grid item md={12}>
                <Grid item md={12}>
                  <Typography fontWeight={'600'} textAlign={'center'}>
                    Landmarks
                  </Typography>
                </Grid>
                <Grid container spacing={2}>
                  {landMarksConstant.map((item) => {
                    return (
                      <Grid item md={6} xs={12} sm={12}>
                        <FormControl fullWidth>
                          <TextField
                            required
                            helpertext="This Field is Required"
                            endAdornment={<InputAdornment position="end">KM</InputAdornment>}
                            type="number"
                            slotProps={false}
                            name={item?.name}
                            value={landMarks?.[item?.name] || ''}
                            onChange={handleLandMarks}
                            placeholder={item.label}
                            inputProps={{
                              inputMode: 'numeric',
                              min: 0,
                              style: { '-moz-appearance': 'textfield', '::-webkit-outer-spin-button': { '-webkit-appearance': 'none', margin: 0 }, '::-webkit-inner-spin-button': { '-webkit-appearance': 'none', margin: 0 } },
                            }}
                          />
                        </FormControl>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Box display={'flex'} justifyContent={'center'} mt={3} mb={3}>
            <LoaderButton startIcon={<AddHomeIcon fontSize="inherit" />} sx={{ mx: '80px' , width:'250px' }} text="Post Ad" loading={loading} variant="contained" onClick={!params ?  handlePostButton : handleUpdateProperty} />
          </Box>
        </Grid>
      </Grid>

      <Modal open={openModal} onClose={()=>setOpenModal()}>
        <Box>
          {postAdData?.propertyImages?.map((e) => {
            const index = postAdData.propertyImages.findIndex((i) => i === e);
            return (
              <Grid container spacing={3} mb={2} gap={2}>
                <Grid item md={12} mb={2}>
                  <Card>
                    <img src={e} height={'260px'} width={'300px'} alt='propertyImages'/>
                    <Divider />
                  </Card>
                  <Grid item md={12} display={'flex'} justifyContent={'center'}>
                    <Button
                      type="button"
                      className="-gray-text"
                      onClick={() => {
                        const updatedImages = [...postAdData.propertyImages];
                        updatedImages.length > 1 && updatedImages.splice(index, 1);
                        setPostAdData({ ...postAdData, propertyImages: updatedImages });
                      }}
                    >
                      <DeleteForeverIcon />
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Box>

        <Grid display={'flex'} justifyContent={'center'}>
          <Button sx={{ my: 2, borderRadius: '50%' }} onClick={() => setOpenModal(false)}>
            <Chip className="nav-hover" style={{ cursor: 'pointer', '&:hover': { backgroundColor: '#07b0ed' } }} variant="outlined" sx={{ mt: 2, borderRadius: '20px' }} label="ADD" />
          </Button>
        </Grid>
      </Modal>
    </Wrapper>
  );
};
