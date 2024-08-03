import { Box, Button, FormControl, Grid, Input, InputLabel, Typography } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectContactUsLoading, selectUserData, sendFeedBack } from '../../pages/authantication/authSlice'
import { GoogleMap } from '../googleMap/GoogleMap'
import Spinner from '../ProgressBar/Progressbar'
import APToaster from '../Toaster/APToaster'
import Modal from './Modal'

const ContactUsModal = ({ openDialog, handleCloseDialog }) => {
    const [data, setData] = useState({});
    const userData = useSelector(selectUserData);
    const loading = useSelector(selectContactUsLoading);
    const dispatch = useDispatch();
    const toastRef = useRef();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setData({ ...data, [name]: value });

    }

    const submitFeedBack = () => {
        if (data.name && data.email && data.feedBack) {
            dispatch(sendFeedBack(data)).then((resp) => {
                if (resp.payload.status === 200) {
                    toastRef.current.showToast({
                        messageType: "success",
                        messageText: 'Thanks For Sharing Your Valuable FeedBack !'
                    })
                } else {
                    toastRef.current.showToast({
                        messageType: "error",
                        messageText: 'Something went-Wrong!'
                    })
                }
            })
        }
    }


    useEffect(() => {
        if (userData) {
            setData({
                name: userData.name,
                email: userData.email,
            })
        }
    }, [userData])


    return (
        <>
            <APToaster ref={toastRef} />
            <Modal open={openDialog} onClose={handleCloseDialog} >
                <Typography textAlign={'center'} fontWeight={'700'}>
                    Contact Us
                </Typography>
                <Typography>1st Floor, Manchanda Tower opposite Novelty Mall, Pathankot, Punjab, India </Typography>
                <Grid container gap={2}>
                    <Spinner LoadingState={loading} />
                    <Grid item md={12} sm={12} xs={12}>
                        <GoogleMap data={{ city: 'pathankot', country: 'India', state: 'Punjab', zip: '145001' }} />
                        <Box component="form" noValidate mt={3} onSubmit={() => { }}>
                            <FormControl variant="standard" fullWidth>
                                <InputLabel htmlFor="standard-adornment-password">Name</InputLabel>
                                <Input autoComplete="name" name='name' onChange={handleChange} value={data?.name} disabled={userData?.name} required id="standard-adornment-password" type="text" />
                            </FormControl>

                            <FormControl variant="standard" fullWidth>
                                <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
                                <Input autoComplete="email" name='email' value={data?.email} onChange={handleChange} disabled={userData?.email} required id="standard-adornment-password" type="email" />
                            </FormControl>

                            <FormControl variant="standard" fullWidth>
                                <InputLabel htmlFor="standard-adornment-password">Enter your feedback</InputLabel>
                                <Input multiline rowsF={4} autoComplete="text" name='feedBack' value={data?.feedBack} onChange={handleChange} required id="standard-adornment-password" type="email" />
                            </FormControl>
                        </Box>
                        <Box justifyContent={'space-around'} display={'flex'} textAlign={'center'} mt={1}>
                            <Button variant="outlined" onClick={submitFeedBack} textAlign={'center'}>
                                click here to share your query
                            </Button>

                        </Box>
                    </Grid>

                </Grid>

            </Modal>
        </>
    )
}

export default ContactUsModal