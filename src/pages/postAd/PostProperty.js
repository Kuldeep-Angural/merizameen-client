import { Grid, Card, CardContent, Button, Badge, Tooltip, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { HomeWrapper } from '../home/HomeWrapper';
import imageIcon from '../../ui/png/upload.png';
import BackupIcon from '@mui/icons-material/Backup';
const currencies = [
  {
    value: '1Bhk',
    label: '1Bhk',
  },
  {
    value: '2Bhk',
    label: '2Bhk',
  },
  {
    value: '3Bhk',
    label: '3Bhk',
  },
  {
    value: '3+Bhk',
    label: '3+Bhk',
  },
  {
    value: 'Pg',
    label: 'Pg',
  },
  {
    value: 'Plot',
    label: 'Plot',
  },
  {
    value: 'Commercial',
    label: 'Commercial',
  },
  {
    value: 'Residential',
    label: 'Residential',
  },
];
export const PostProperty = () => {
  const [postAdData, setPostAdData] = useState({});

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
        };

        reader.readAsDataURL(files[i]);
      }
    }
  };

  console.log(postAdData);
  return (
    <HomeWrapper>
      <Grid container spacing={2} p={3}>
        <Grid item md={6} xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item md={4} sm={6} xs={6}>
                  <Card>
                    <Tooltip title="upload main image">
                      <Button variant="text" component="label">
                        <img onClick={() => {}} style={{ cursor: 'pointer' }} src={postAdData.mainImage ? postAdData.mainImage : imageIcon} height={'180px'} width={'100%'} alt="uplad image" />
                        <input onChange={handleChange} accept="image/*" name="mainImage" type="file" hidden />
                      </Button>
                    </Tooltip>
                  </Card>
                </Grid>
                <Grid item md={8} sm={6} xs={6} display={'flex'} justifyContent={'space-between'}>
                  <Tooltip title="uplad property images">
                    <Button title="uplad property images" sx={{ height: '60px' }} variant="outlined" component="label">
                      <input onChange={handleChange} accept="image/*" name="propertyImages" multiple type="file" hidden />
                      <Badge bac badgeContent={postAdData?.propertyImages?.length || 0} color="primary">
                        <BackupIcon style={{ fontSize: '60px', color: '#bdbdbd' }} />
                      </Badge>
                    </Button>
                  </Tooltip>
                  <TextField id="filled-select-currency-native" select label="Property Type" defaultValue="2Bhk" SelectProps={{ native: true }} helperText="Please select your currency" variant="outlined">
                    {currencies.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={6} xs={12}>
          <Card>
            <CardContent></CardContent>
          </Card>
        </Grid>
      </Grid>
    </HomeWrapper>
  );
};
