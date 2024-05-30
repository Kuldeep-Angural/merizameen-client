import { Grid, Card, Box, CardContent, Button, Badge, Tooltip, Divider, Typography, Chip, Checkbox, FormControlLabel, FormControl, OutlinedInput, InputAdornment, FormHelperText } from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { useEffect, useRef, useState } from 'react';
import { HomeWrapper } from '../home/HomeWrapper';
import imageIcon from '../../ui/images/noImage.webp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BackupIcon from '@mui/icons-material/Backup';
import APModal from '../../components/modal/APModal';
import { himachalCities, punjabCities } from '../../constants/cities';
import { amenities, basicInfo, landMarks, medium, propertyTypes, state } from '../../constants/constant';
import { useDispatch, useSelector } from 'react-redux';
import { postProperty, selectPostLoading } from './postPropertySlice';
import { InputField } from '../../components/input/InputField';
import LoaderButton from '../../components/loadingbutton/LoaderButton';
import AddHomeIcon from '@mui/icons-material/AddHome';

export const PostProperty = () => {
  const [cities, setCities] = useState([]);
  const [postAdData, setPostAdData] = useState({
    location: {
      state: 'Punjab',
      city: 'Pathankot',
    },
    basicInfo: {},
    amenities: {},
    landMarks: {},
    propertyType: '2Bhk',
    postFor: 'Sell',
    description:''
  });
  const [openModal, setOpenModal] = useState(false);
  const loading = useSelector(selectPostLoading);
  const dispatch = useDispatch();
 

  useEffect(() => {
    setCities(postAdData?.location?.state === 'Punjab' ? punjabCities : himachalCities);
  }, [postAdData.location]);

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
            setPostAdData({ ...postAdData, ['propertyImages']: imagesArray });
          }
          setOpenModal(true);
        };
        reader.readAsDataURL(files[i]);
      }
    } else {
      setPostAdData({ ...postAdData, [e.target.name] : e.target.value });
    }
  };

  const handleLocationChange = (event) => {
    const { name, value } = event.target;
    setPostAdData({
      ...postAdData,
      location: {
        ...postAdData?.location,
        [name]: value,
      },
    });
  };

  const handleBasicInfo = (event) => {
    const { name, value } = event.target;
    setPostAdData({
      ...postAdData,
      basicInfo: {
        ...postAdData?.basicInfo,
        [name]: value,
      },
    });
  };

  const handleAmenities = (event) => {
    const { name, checked } = event.target;
    setPostAdData({
      ...postAdData,
      amenities: {
        ...postAdData?.amenities,
        [name]: checked === true ? 'Y' : 'N',
      },
    });
  };

  const handleLandMarks = (event) => {
    const { name, value } = event.target;
    setPostAdData({
      ...postAdData,
      landMarks: {
        ...postAdData?.landMarks,
        [name]: value,
      },
    });
  };

  const handlePostButton = () => {
    const formData = new FormData();
    formData.append('mainImage', postAdData?.mainImage);
    formData.append('amenities', JSON.stringify(postAdData?.amenities));
    formData.append('basicInfo', JSON.stringify(postAdData?.basicInfo));
    formData.append('title', postAdData?.title);
    formData.append('location', JSON.stringify(postAdData?.location));
    formData.append('landMarks', JSON.stringify(postAdData?.landMarks));
    formData.append('postFor', postAdData?.postFor);
    formData.append('propertyType', postAdData?.propertyType);
    formData.append('description', postAdData?.description);
    formData.append('price', postAdData?.price);

    if (postAdData?.propertyImages?.length > 0) {
      postAdData.propertyImages.forEach((image, index) => {
        formData.append(`propertyImages[${index}]`, image);
      });
    }
    dispatch(postProperty(formData)).then((resp) => {});
  };
  
  return (
    <HomeWrapper>
      <Grid container spacing={1} p={0}>
        <Grid item md={6} xs={12}>
          <Card>
            <CardContent>
              {/* main Image */}
              <Grid container spacing={2}>
                <Grid item md={4} sm={6} xs={6}>
                  <Tooltip title="Upload Main Image">
                    <Button variant="text" component="label">
                      <img onClick={() => {}} style={{ cursor: 'pointer', borderRadius: '10px' }} src={postAdData.mainImage ? postAdData.mainImage : imageIcon} height={'150px'} width={'100%'} alt="upload image" />
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
                      <TextField fullWidth select defaultValue="2Bhk" value={postAdData?.propertyType || ''} name="propertyType" onChange={handleChange} SelectProps={{ native: true }} helperText="Type of Property" variant="outlined">
                        {propertyTypes.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item md={4} xs={12}>
                      <TextField fullWidth select defaultValue="Sell" name="postFor" value={postAdData?.postFor || ''} onChange={handleChange} SelectProps={{ native: true }} helperText="Post For Sell/Rent" variant="outlined">
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
                      {basicInfo.map((item) => {
                        return (
                          <Grid item md={2} xs={6}>
                              <InputField
                              required
                              label={item.label}
                              helpertext='This Field is Required'
                                onChange={handleBasicInfo}
                                aria-describedby="outlined-weight-helper-text"
                                name={item.name}
                                type="number"
                                value={postAdData?.basicInfo?.[item?.name] || ''}
                              />
                              {/* <FormHelperText id="outlined-weight-helper-text">{item.label}</FormHelperText> */}
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
                        <Grid item md={4} xs={6} sm={6}>
                          <TextField fullWidth select value={postAdData?.location?.state || ''} onChange={handleLocationChange} defaultValue="Punjab" SelectProps={{ native: true }} name="state" variant="standard">
                            {state.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </TextField>
                        </Grid>

                        <Grid item md={4} xs={6} sm={6}>
                          <TextField fullWidth select onChange={handleLocationChange} value={postAdData?.location?.city || ''} defaultValue={cities[0]} SelectProps={{ native: true }} name="city" variant="standard">
                            {cities.map((option) => (
                              <option key={option.name} value={option.name}>
                                {option.name}
                              </option>
                            ))}
                          </TextField>
                        </Grid>

                        <Grid item md={4} xs={6} sm={6}>
                          <FormControl fullWidth variant="outlined">
                            <InputField required label='District' onChange={handleLocationChange} helpertext='This Field is Required' value={postAdData?.location?.district || ''} aria-describedby="outlined-weight-helper-text" name={'district'} />
                          </FormControl>
                        </Grid>

                        <Grid item md={4} xs={6} sm={6}>
                          <FormControl fullWidth variant="outlined">
                            <InputField required label='Pincode' onChange={handleLocationChange} helpertext='This Field is Required' value={postAdData?.location?.pinCode || ''} aria-describedby="outlined-weight-helper-text" name={'pinCode'} type="number" />
                          </FormControl>
                        </Grid>

                        <Grid item md={12} xs={12} sm={12}>
                          <FormControl fullWidth variant="outlined">
                            <InputField onChange={handleChange} label='Property Description' required helpertext='Please add Property Description' aria-describedby="outlined-weight-helper-text" value={postAdData?.description || ''} postAdData name={'description'} type="text" />
                          </FormControl>
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
                    <InputField label='Title' required helpertext='Please enter Property Title' onChange={handleChange} aria-describedby="outlined-weight-helper-text" value={postAdData?.title || ''} name={'title'} />
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
                  {amenities.map((item) => {
                    return (
                      <Grid item md={4}>
                        <FormControlLabel control={<Checkbox value={postAdData?.amenities?.[item?.name] || ''} name={item?.name} />} onClick={handleAmenities} label={item.label} />
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
                  {landMarks.map((item) => {
                    return (
                      <Grid item md={6} xs={12} sm={12}>
                        <FormControl fullWidth>
                          <InputField
                          required
                          helpertext='This Field is Required'
                            endAdornment={<InputAdornment position="end">KM</InputAdornment>}
                            type="number"
                            slotProps={false}
                            name={item?.name}
                            value={postAdData?.landMarks?.[item?.name] || ''}
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
          <Box display={'flex'} justifyContent={'space-between'} mt={3}>
              <InputField
                label='Price(INR)'
                required
                onChange={handleChange}
                aria-describedby="outlined-weight-helper-text"
                name={'price'}
                type="number"
                value={postAdData?.price || ''}
                inputProps={{
                  style: { '-moz-appearance': 'textfield' }, // For Firefox
                  'aria-hidden': true, // Hide arrows from screen readers
                }}
              />
            <LoaderButton text='Preview Ad' variant='contained' color='info'/>
            <LoaderButton startIcon={<AddHomeIcon fontSize='inherit'/>} sx={{mx:'80px'}} text='Post Ad' loading={loading}  variant='contained' onClick={handlePostButton}/> 
          </Box>
        </Grid>
      </Grid>

      <APModal open={openModal} setOpen={setOpenModal}>
        <Box>
          {postAdData?.propertyImages?.map((e) => {
            const index = postAdData.propertyImages.findIndex((i) => i === e);
            return (
              <Grid container spacing={3} mb={2} gap={2}>
                <Grid item md={12} mb={2}>
                  <Card>
                    <img src={e} height={'260px'} width={'300px'} />
                    <Divider />
                  </Card>
                  <Grid item md={12} display={'flex'} justifyContent={'center'}>
                    <Button
                      type="button"
                      className="-gray-text"
                      onClick={() => {
                        const updatedImages = [...postAdData.propertyImages];
                        updatedImages.length > 1 && updatedImages.splice(index, 1);
                        setPostAdData({ ...postAdData, ['propertyImages']: updatedImages });
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
      </APModal>
    </HomeWrapper>
  );
};
