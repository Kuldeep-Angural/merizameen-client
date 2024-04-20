import { Grid, Card, Box, CardContent, Button, Badge, Tooltip, Divider, Typography, Chip, Checkbox, FormControlLabel, FormControl, OutlinedInput, InputAdornment, FormHelperText } from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { useEffect, useRef, useState } from 'react';
import { HomeWrapper } from '../home/HomeWrapper';
import imageIcon from '../../ui/images/noImage.webp';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BackupIcon from '@mui/icons-material/Backup';
import APModal from '../../components/modal/APModal';
import { himachalCities, punjabCities, punjabCitiesIndia } from '../../constants/cities';
import { amenities, basicInfo, landMarks, medium, propertyTypes, state } from '../../constants/constant';

export const PostProperty = () => {
  const [cities, setCities] = useState([]);
  const [postAdData, setPostAdData] = useState({ location: { state: 'Punjab' } });
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setCities(postAdData?.location?.state === 'Punjab' ? punjabCities : himachalCities);
  }, [postAdData]);

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
    }
    if (e.target.name === 'propertyImages') {
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
    }
    if (e.target.name === 'title') {
      setPostAdData({ ...postAdData, [e.target.name]: e.target.value });
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

  const handleSaveButton = () => {};

  return (
    <HomeWrapper>
      <Grid container spacing={2} p={3}>
        <Grid item md={6} xs={12}>
          <Card>
            <CardContent>
              {/* main Image */}
              <Grid container spacing={2}>
                <Grid item md={4} sm={6} xs={6}>
                  <Tooltip title="upload main image">
                    <Button variant="text" component="label">
                      <img onClick={() => {}} style={{ cursor: 'pointer', borderRadius: '10px' }} src={postAdData.mainImage ? postAdData.mainImage : imageIcon} height={'150px'} width={'100%'} alt="upload image" />
                      <input onChange={handleChange} accept="image/*" name="mainImage" type="file" hidden />
                    </Button>
                  </Tooltip>
                </Grid>

                {/* properties Images and bisic info */}
                <Grid item md={8} sm={6} xs={6} display={'flex'}>
                  <Grid container spacing={2}>
                    <Grid item md={4} xs={12}>
                      <Tooltip title="uplad property images">
                        <Button title="uplad property images" fullWidth onClick={postAdData?.propertyImages?.length > 0 ? () => setOpenModal(true) : () => {}} sx={{ height: '60px' }} variant="outlined" component="label">
                          <input style={{ width: '100%' }} onChange={handleChange} accept="image/*" name="propertyImages" multiple type="file" hidden />
                          <Badge bac badgeContent={postAdData?.propertyImages?.length || 0} color="primary">
                            <BackupIcon style={{ fontSize: '60px', color: '#bdbdbd', width: '100%' }} />
                          </Badge>
                        </Button>
                      </Tooltip>
                    </Grid>

                    <Grid item md={4} xs={12}>
                      <TextField fullWidth select defaultValue="2Bhk" SelectProps={{ native: true }} helperText="Please select your property type" variant="outlined">
                        {propertyTypes.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item md={4} xs={12}>
                      <TextField fullWidth select defaultValue="Sell" SelectProps={{ native: true }} helperText="Chose Sell/Rent" variant="outlined">
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
                <Grid md={12}>
                  <Divider></Divider>
                  <Grid item md={12}>
                    <Typography fontWeight={'600'} textAlign={'center'}>
                      Basic info
                    </Typography>
                    <Grid container spacing={2} display={'flex'} justifyContent={'center'}>
                      {basicInfo.map((item) => {
                        return (
                          <Grid item md={2} xs={6}>
                            <FormControl sx={{ m: 1 }} variant="outlined">
                              <OutlinedInput
                                onChange={handleBasicInfo}
                                aria-describedby="outlined-weight-helper-text"
                                name={item.name}
                                type="number"
                                inputProps={{
                                  style: { '-moz-appearance': 'textfield' }, // For Firefox
                                  'aria-hidden': true, // Hide arrows from screen readers
                                }}
                              />
                              <FormHelperText id="outlined-weight-helper-text">{item.label}</FormHelperText>
                            </FormControl>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Grid>
                </Grid>

                <Grid md={12} display={'flex'} justifyContent={'center'}>
                  <Divider></Divider>
                  <Grid item md={12}>
                    <Typography fontWeight={'600'} textAlign={'center'}>
                      Location
                    </Typography>
                    <Grid container spacing={2} pl={1} display={'flex'} justifyContent={'center'}>
                      <Grid item md={4} xs={6} sm={6}>
                        <TextField fullWidth select onChange={handleLocationChange} defaultValue="Punjab" SelectProps={{ native: true }} optio name="state" helperText="State" variant="outlined">
                          {state.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </TextField>
                      </Grid>

                      <Grid item md={4} xs={6} sm={6}>
                        <TextField fullWidth select onChange={handleLocationChange} defaultValue={cities[0]} SelectProps={{ native: true }} optio name="city" helperText="City" variant="outlined">
                          {cities.map((option) => (
                            <option key={option.name} value={option.name}>
                              {option.name}
                            </option>
                          ))}
                        </TextField>
                      </Grid>

                      <Grid item md={4} xs={6} sm={6}>
                        <FormControl fullWidth variant="outlined">
                          <OutlinedInput onChange={handleLocationChange} aria-describedby="outlined-weight-helper-text" name={'district'} />
                          <FormHelperText id="outlined-weight-helper-text">District</FormHelperText>
                        </FormControl>
                      </Grid>

                      <Grid item md={4} xs={6} sm={6}>
                        <FormControl fullWidth variant="outlined">
                          <OutlinedInput onChange={handleLocationChange} aria-describedby="outlined-weight-helper-text" name={'pinCode'} type="number" />
                          <FormHelperText id="outlined-weight-helper-text">Pincode</FormHelperText>
                        </FormControl>
                      </Grid>

                      <Grid item md={12} xs={12} sm={12}>
                        <FormControl fullWidth variant="outlined">
                          <OutlinedInput onChange={handleLocationChange} aria-describedby="outlined-weight-helper-text" name={'discription'} type="number" />
                          <FormHelperText id="outlined-weight-helper-text">Discription</FormHelperText>
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
              <Grid md={12}>
                <Grid item md={12}>
                  <Typography fontWeight={'600'} textAlign={'center'}>
                    Title
                  </Typography>
                </Grid>
                <Grid item md={12} xs={12} sm={12}>
                  <FormControl fullWidth variant="outlined">
                    <OutlinedInput onChange={handleChange} aria-describedby="outlined-weight-helper-text" name={'title'} />
                    <FormHelperText id="outlined-weight-helper-text">Enter title here</FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid md={12}>
                <Grid item md={12}>
                  <Typography fontWeight={'600'} textAlign={'center'}>
                    Amenities
                  </Typography>
                </Grid>
                <Grid container spacing={2}>
                  {amenities.map((item) => {
                    return (
                      <Grid item md={4}>
                        <FormControlLabel control={<Checkbox />} sx={{}} onClick={handleAmenities} name={item.name} label={item.label} />
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
                        <FormControl fullWidth variant="outlined">
                          <OutlinedInput
                            endAdornment={<InputAdornment position="end">km</InputAdornment>}
                            type="number"
                            slotProps={false}
                            name={item.name}
                            onChange={handleLandMarks}
                            inputProps={{
                              inputMode: 'numeric',
                              min: 0,
                              style: { '-moz-appearance': 'textfield', '::-webkit-outer-spin-button': { '-webkit-appearance': 'none', margin: 0 }, '::-webkit-inner-spin-button': { '-webkit-appearance': 'none', margin: 0 } },
                            }}
                          />
                          <FormHelperText id="outlined-weight-helper-text">{item.label}</FormHelperText>
                        </FormControl>
                      </Grid>
                    );
                  })}
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Box display={'flex'} justifyContent={'center'} mt={3}>
            <Button style={{ minWidth: '200px', maxWidth: '400px' }} variant="outlined" onClick={handleSaveButton}>
              post
            </Button>
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
                    <img src={e} height={'200px'} width={'200px'} />
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
