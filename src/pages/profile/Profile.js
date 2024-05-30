import { Button, FormControl, Grid, Input, InputLabel, Tooltip } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserData } from '../authantication/authSlice';
import { getUserDetails, selectDataObj, setData } from './profileSlice';
import imageIcon from '../../ui/images/noImage.webp';
import { InputField } from '../../components/input/InputField';
import EmailIcon from '@mui/icons-material/Email';

const Profile = () => {
  const USER = useSelector(selectUserData);
  const dataObj = useSelector(selectDataObj);
  const dispatch = useDispatch();


  const setDataObj = (data) => {
    dispatch(setData(data));
  }

  const handleChange = (event) => {
    const {name ,value} = event.target;
    console.log(name,value);
    
    if (name==='profilePic') {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setDataObj({ ...dataObj, 'profilePic': reader.result });
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    }else{
      setDataObj({...dataObj,[name]:value})
    }
  };

  useEffect(() => {
    dispatch(getUserDetails(USER._id));
  },[]);


  console.log(dataObj);
  return (

    <Grid container  justifyContent={"center"}>
      <Grid item md={12} sm={12} xs={12} display={'flex'} justifyContent={'center'}>
        <Tooltip title="profile picture">
          <Button  variant="text" component="label" style={{alignItems:'center'}}>
            <img onClick={() => {}} style={{ cursor: 'pointer', borderRadius: '10px' , borderRadius:'50%' }} src={dataObj.profilePic ? dataObj.profilePic : imageIcon} height={'200px'} width={'100%'} alt="upload image" />
            <input onChange={handleChange} accept="image/*" name="profilePic" type="file" hidden />
          </Button>
        </Tooltip>
      </Grid>

      <Grid item md={12} sm={12} xs={12}>
        <FormControl required variant="standard" fullWidth sx={{ mt: 0 }}>
          <InputField name="name" placeholder='Name' fullWidth onChange={handleChange} value={dataObj?.name || ""} autoComplete="name" type="text" />
        </FormControl>
      </Grid>

      <Grid item md={12} sm={12} xs={12}>
        <FormControl required variant="standard" fullWidth sx={{ mt: 1 }}>
          <InputField name="email" placeholder='Email' fullWidth onChange={handleChange} value={dataObj?.email || ""}  disabled autoComplete="email" type="text" />
        </FormControl>
      </Grid>

      <Grid item md={12} sm={12} xs={12}>
        <FormControl required variant="standard" fullWidth sx={{ mt: 1 }}>
          <InputField name="mobile" placeholder='Mobile' fullWidth onChange={handleChange} value={dataObj?.mobile || ""} autoComplete="tel" type="number" />
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default Profile;
