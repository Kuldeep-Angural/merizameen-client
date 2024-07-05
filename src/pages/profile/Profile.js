import React, { useEffect, useImperativeHandle } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Tooltip, Button, FormControl } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { InputField } from '../../components/input/InputField';
import { selectUserData } from '../authantication/authSlice';
import { getUserDetails, selectDataObj, selectLoading, setData, updateUser } from './profileSlice';
import imageIcon from '../../ui/images/noImage.webp';

const Profile = React.forwardRef((props, ref) => {
  const USER = useSelector(selectUserData);
  const dataObj = useSelector(selectDataObj);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  const setDataObj = (data) => {
    dispatch(setData(data));
  };

  useImperativeHandle(ref, () => ({
    Update: () => dispatch(updateUser(dataObj)).then((resp) => {
    })
  }), [dataObj, dispatch]);

  const handleChange = (event) => {
    const { name, value, files } = event.target;

    if (name === 'profilePic' && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setDataObj({ ...dataObj, profilePic: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      setDataObj({ ...dataObj, [name]: value });
    }
  };


  return (
    <Grid container justifyContent="center">
      <Grid item md={12} sm={12} xs={12} display="flex" justifyContent="center">
        <Tooltip title="Profile picture">
          <Button variant="text" component="label" style={{ alignItems: 'center' }}>
            <img
              src={dataObj.profilePic || imageIcon}
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
});

export default Profile;
