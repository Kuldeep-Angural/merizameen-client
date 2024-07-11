import LoyaltyIcon from '@mui/icons-material/Loyalty';
import { Avatar, Button, Card, Grid, Typography } from '@mui/material';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Titleheader from '../../components/header/Titleheader';
import { dateFormat, MemberShips, Premium_Access, Standard_Access } from '../../constants/constant';
import { calculateEndDate } from '../../utils/utility';
import { getUserDetails, selectDataObj, selectLoading, updateMemberShip } from '../profile/profileSlice';
import Spinner from '../../components/ProgressBar/Progressbar';

const MemberShip = () => {
  const user = useSelector(selectDataObj);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();

  const refetchData = () => {
    dispatch(getUserDetails(user._id));
  };

  const buyMemberShip = () => {
    const data = {
      mebmerShipDetails: {
        startDate: new Date(),
        endDate: calculateEndDate(new Date(), 1),
        type: MemberShips.Premium_Access,
      },
    };

    dispatch(updateMemberShip(data)).then((resp) => {
      if (resp.payload.status === 200) {
        refetchData();
      }
    });
  };
  return (
    <>
      <Spinner LoadingState={loading} />

      <Grid container spacing={2} mt={0}>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
              <Titleheader align="center" title="Current Plan & Usage" />

              {user?.memberShip?.type === MemberShips.Standard_Access && (
                <Card sx={{ padding: 2 }}>
                  <Typography align="center" lineHeight={1.5}>
                    Plan :{user.memberShip.type}
                  </Typography>

                  <Typography fontWeight={500} lineHeight={1}>
                    {Standard_Access.posts.info}
                  </Typography>

                  <Typography mt={1} align="center" lineHeight={1.5}>
                    Usage :{'Total Properties'}
                  </Typography>

                  <Typography fontWeight={500} lineHeight={1}>
                    {'' + user?.usage.posts || 0} Properties Posted
                  </Typography>
                </Card>
              )}

              {user?.memberShip?.type === MemberShips.Premium_Access && (
                <Card sx={{ padding: 2 }}>
                  <Typography align="center" lineHeight={1.5}>
                    Plan :{user.memberShip.type}
                  </Typography>

                  <Typography fontWeight={500} lineHeight={1}>
                    {'Start Date  : ' + moment(user?.memberShip?.startDate).format(dateFormat.date) || 'n/a'}
                  </Typography>

                  <Typography fontWeight={500} mt={1} lineHeight={1}>
                    {'Start Date  : ' + moment(user?.memberShip?.endDate).format(dateFormat.date) || 'n/a'}
                  </Typography>

                  <Typography mt={1} align="center" lineHeight={1.5}>
                    Usage :{'Total Properties'}
                  </Typography>

                  <Typography fontWeight={500} lineHeight={1}>
                    {'' + user?.usage.posts || 0} Properties Posted
                  </Typography>
                </Card>
              )}
            </Grid>

            <Grid item md={6} xs={12}>
              <Titleheader align="center" title={'Features'} />
              {user?.memberShip?.type === MemberShips.Standard_Access && (
                <Card sx={{ padding: 2 }}>
                  <Typography align="center" lineHeight={1.5}>
                    Posts :{Standard_Access.posts.post}{' '}
                  </Typography>
                  <Typography fontWeight={500} lineHeight={1}>
                    {Standard_Access.posts.info}
                  </Typography>

                  <Typography align="center" mt={2} lineHeight={1.5}>
                    Masking :Yes
                  </Typography>
                  <Typography fontWeight={500} lineHeight={1}>
                    {Standard_Access.masking.locationMasking}
                  </Typography>
                  <Typography fontWeight={500} mt={1} lineHeight={1}>
                    {Standard_Access.masking.contactMasking}
                  </Typography>
                  <Typography fontWeight={500} mt={1} lineHeight={1}>
                    {Standard_Access.masking.likes}
                  </Typography>
                </Card>
              )}

              {user?.memberShip?.type === MemberShips.Premium_Access && (
                <Card sx={{ padding: 2 }}>
                  <Typography align="center" lineHeight={1.5}>
                    Posts :{Premium_Access.posts.post}{' '}
                  </Typography>
                  <Typography fontWeight={500} lineHeight={1}>
                    {Premium_Access.posts.info}
                  </Typography>

                  <Typography align="center" mt={2} lineHeight={1.5}>
                    Masking :No
                  </Typography>
                  <Typography fontWeight={500} lineHeight={1}>
                    {Premium_Access.masking.locationMasking}
                  </Typography>
                  <Typography fontWeight={500} mt={1} lineHeight={1}>
                    {Premium_Access.masking.contactMasking}
                  </Typography>
                  <Typography fontWeight={500} mt={1} lineHeight={1}>
                    {Premium_Access.masking.likes}
                  </Typography>
                </Card>
              )}
            </Grid>
          </Grid>
        </Grid>

        <Grid item md={12}>
          <Card sx={{ padding: 2 }}>
            <Grid container>
              <Grid item md={12}>
                <Grid container>
                  <Grid item md={4} sm={4} xs={12}>
                    <Avatar sx={{ width: 64, height: 64 }}>
                      <LoyaltyIcon />
                    </Avatar>

                    <Button sx={{ mt: 5 }} fullWidth variant="outlined" onClick={buyMemberShip}>
                      {' '}
                      Buy
                    </Button>
                  </Grid>

                  <Grid item md={8}>
                    <Typography align="center" lineHeight={1.5}>
                      Posts :{Premium_Access.posts.post}{' '}
                    </Typography>
                    <Typography fontWeight={500} lineHeight={1}>
                      {Premium_Access.posts.info}
                    </Typography>

                    <Typography align="center" mt={2} lineHeight={1.5}>
                      Masking :No
                    </Typography>
                    <Typography fontWeight={500} lineHeight={1}>
                      {Premium_Access.masking.locationMasking}
                    </Typography>
                    <Typography fontWeight={500} mt={1} lineHeight={1}>
                      {Premium_Access.masking.contactMasking}
                    </Typography>
                    <Typography fontWeight={500} mt={1} lineHeight={1}>
                      {Premium_Access.masking.likes}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item md={12}></Grid>

              <Grid item md={12}></Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default MemberShip;
