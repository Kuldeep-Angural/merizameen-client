import React, { useEffect, useImperativeHandle, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Tooltip, Button, FormControl, Typography } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { InputField } from '../../components/input/InputField';
import { selectUserData } from '../authantication/authSlice';
import { getUserDetails, selectDataObj, selectLoading, setData, updateUser } from './profileSlice';
import imageIcon from '../../ui/images/noImage.webp';
import moment from 'moment'
import { dateFormat } from '../../constants/constant';


const Profile = React.forwardRef((props, ref) => {
  const USER = useSelector(selectUserData);
  const dataObj = useSelector(selectDataObj);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const [userdata,setUserdata] = useState({})

  const setDataObj = (data) => {
    dispatch(setData(data));
  };

  // useImperativeHandle(ref, () => ({
  //   Update: () => dispatch(updateUser(userdata)).then((resp) => {
  //   })
  // }), []);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setDataObj({ ...userdata, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
  };
  
  const handleInputChange = (event)=>{
    const { name, value, files } = event.target;
    setDataObj({ ...userdata, [name]: value });
  } 
  
  useEffect(()=>{
    setUserdata(dataObj)
  },[dataObj])

  return (
    <Grid container justifyContent="center">
      <Grid item md={12} sm={12} xs={12} display="flex" justifyContent="center">
        <Tooltip title="Profile picture">
          <Button variant="text" component="label" style={{ alignItems: 'center' }}>
            <img
              src={userdata?.profilePic || imageIcon}
              alt="upload image"
              height="200px"
              width="100%"
              style={{ cursor: 'pointer', borderRadius: '10px' }}
            />
            <input
              type="file"
              name="profilePic"
              accept="image/*"
              hidden
              onChange={handleChange}
            />
          </Button>
        </Tooltip>
      </Grid>

      <Grid item md={12} sm={12} xs={12}>
        <FormControl required variant="standard" fullWidth sx={{ mt: 0 }}>
          <InputField name="name" placeholder='Name' fullWidth onChange={handleInputChange} value={userdata?.name || ""} autoComplete="name" type="text" />
        </FormControl>
      </Grid>

      <Grid item md={12} sm={12} xs={12}>
        <FormControl required variant="standard" fullWidth sx={{ mt: 1 }}>
          <InputField name="email" placeholder='Email' fullWidth onChange={handleInputChange} value={userdata?.email || ""}  disabled autoComplete="email" type="text" />
        </FormControl>
      </Grid>

      <Grid item md={12} sm={12} xs={12}>
        <FormControl required variant="standard" fullWidth sx={{ mt: 1 }}>
          <InputField name="mobile" placeholder='Mobile' fullWidth onChange={handleInputChange} value={userdata?.mobile || ""} autoComplete="tel" type="number" />
        </FormControl>
      </Grid>
      <Grid item md={12} sm={12} xs={12} mt={2}>
      <Typography fontSize={'10px'} color={'red'} align={'left'}>Last Updated: {moment(userdata.updatedAt).format(dateFormat.dateAndTime)}</Typography>
      </Grid>
    </Grid>
  );
});

export default Profile;
