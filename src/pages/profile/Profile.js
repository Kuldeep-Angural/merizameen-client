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
        console.log(file, reader.result , name , file);
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
        <FormControl required variant="standard" fullWidth sx={{ mt: 1 }}>
          <InputLabel htmlFor="standard-adornment-password">Name</InputLabel>
          <Input name="name" fullWidth onChange={handleChange} value={dataObj?.name || ""} autoComplete="name" autoFocus type="text" />
        </FormControl>
      </Grid>

      <Grid item md={12} sm={12} xs={12}>
        <FormControl required variant="standard" fullWidth sx={{ mt: 1 }}>
          <InputLabel htmlFor="standard-adornment-password">email</InputLabel>
          <Input name="email" fullWidth onChange={handleChange} value={dataObj?.email || ""}  disabled autoComplete="email" autoFocus type="text" />
        </FormControl>
      </Grid>

      <Grid item md={12} sm={12} xs={12}>
        <FormControl required variant="standard" fullWidth sx={{ mt: 1 }}>
          <InputLabel htmlFor="standard-adornment-password">mobile</InputLabel>
          <Input name="mobile" fullWidth onChange={handleChange} value={dataObj?.mobile || ""} autoComplete="tel" autoFocus type="number" />
        </FormControl>
      </Grid>
    {/* using out own Inputfield Componenet Here */}
      <Grid item md={12} sm={12} xs={12}>
        
          <InputField required name="password" onChange={handleChange} value={dataObj.password} label="password" helpertext='Name is required' type="text" />
        
      </Grid>
    </Grid>
  );
};

export default Profile;
