import { Button, FormControl, Grid, Input, Tooltip, Typography } from '@mui/material';
import moment from 'moment';
import React, { useEffect, useImperativeHandle, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Progressbar from '../../components/ProgressBar/Progressbar';
import { dateFormat } from '../../constants/constant';
import imageIcon from '../../ui/images/noImage.webp';
import { selectDataObj, selectInitialState, selectLoading, setData, updateUser } from './profileSlice';
import { isBothObjectEqual } from '../../utils/utility';

const Profile = React.forwardRef((ref) => {
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const dataObj = useSelector(selectDataObj);
  const initialData = useSelector(selectInitialState);

  const setDataObj = (data) => {
    dispatch(setData(data));
  };

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    const file = files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setDataObj({ ...dataObj, profilePic: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDataObj({ ...dataObj, [name]: value });
  };

  const onSubmitCLick = () => {
    dispatch(updateUser(dataObj)).then((resp) => {
    });
  };

  return (
    <>
      <Progressbar LoadingState={loading} />
      <Grid container justifyContent="center">
        <Grid item md={12} sm={12} xs={12} display="flex" justifyContent="center">
          <Tooltip title="Profile picture">
            <Button variant="text" component="label" style={{ alignItems: 'center' }}>
              <img src={dataObj?.profilePic || imageIcon} alt="upload image" height="200px" width="100%" style={{ cursor: 'pointer', borderRadius: '10px' }} />
              <input type="file" name="profilePic" accept="image/*" hidden onChange={handleChange} />
            </Button>
          </Tooltip>
        </Grid>

        <Grid item md={12} sm={12} xs={12}>
          <FormControl required variant="standard" fullWidth sx={{ mt: 0 }}>
            <Input name="name" placeholder="Name" fullWidth onChange={handleInputChange} value={dataObj?.name || ''} type="text" />
          </FormControl>
        </Grid>

        <Grid item md={12} sm={12} xs={12}>
          <FormControl required variant="standard" fullWidth sx={{ mt: 1 }}>
            <Input name="email" placeholder="Email" fullWidth onChange={handleInputChange} value={dataObj?.email || ''} disabled autoComplete="email" type="text" />
          </FormControl>
        </Grid>

        <Grid item md={12} sm={12} xs={12}>
          <FormControl required variant="standard" fullWidth sx={{ mt: 1 }}>
            <Input name="mobile" placeholder="Mobile" fullWidth onChange={handleInputChange} value={dataObj?.mobile || ''} type="number" />
          </FormControl>
        </Grid>

        <Grid item md={12} sm={12} xs={12} mt={2}>
          <Typography fontSize={'10px'} color={'red'} align={'left'}>
            Last Updated: {moment(dataObj?.updatedAt || '').format(dateFormat.dateAndTime)}
          </Typography>
        </Grid>

        <Grid>
          <Button variant='outlined' onClick={onSubmitCLick}> Update </Button>
        </Grid>
      </Grid>
    </>
  );
});

export default Profile;
