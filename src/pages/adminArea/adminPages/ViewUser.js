import { Circle as CircleIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { Box, Button, Grid, Tooltip, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { InputField } from '../../../components/input/InputField';
import { Wrapper } from '../../home/Wrapper';

import moment from 'moment';
import Spinner from '../../../components/ProgressBar/Progressbar';
import APToaster from '../../../components/Toaster/APToaster';
import Titleheader from '../../../components/header/Titleheader';
import AlertModal from '../../../components/modal/AlertModal';
import { dateFormat } from '../../../constants/constant';
import { deleteProperty, getUser, getUserProperties, selectLoading, selectUser, selectUserproperties, updateuser } from '../adminSlice';
import { deleteSpecificProperty } from '../../postAd/postPropertyApi';
export const ViewUser = () => {
    const params = useParams();
    const toastRef = useRef();
    const alertModalRef = useRef();
    const loading = useSelector(selectLoading)
    const naviGate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const properties = useSelector(selectUserproperties);
    const [userDetails, setUserDetails] = useState({});
    const [userProperties, setUserproperties] = useState([]);
    const [alertModal , setAlertModal] = useState(false);
    const [singleItem , setSingleItem] = useState('');



    const refetchData = () => {
        dispatch(getUser(params)).then((resp) => {
            setUserDetails(resp.payload.data)
        });
        dispatch(getUserProperties(params)).then((resp) => {
            setUserproperties(resp.payload.data)
        });
    }

    useEffect(() => {
        refetchData();
    }, [])



    const handleUserDetails = (e) => {
        const { name, value } = e.target;
        setUserDetails({ ...userDetails, [name]: value })
        if (name === 'type') {
            setUserDetails({
                ...userDetails, memberShip: {
                    type: value
                }
            })
        }
        if (name === 'roles') {
            setUserDetails({
                ...userDetails, roles: [value]
            })
        }
        if (name === 'posts') {
            setUserDetails({
                ...userDetails, usage: {
                    posts: value
                }
            })
        }
    }


    const handleDeleteProperty = async(id) => {

        const res = await alertModalRef.current.showAlert({title:'Are you Sure You Want to Delete This Property ?'})
      if (res===true) {
        dispatch(deleteProperty({ id: id })).then((resp) => {
            if (resp.payload.status === 200) {
                toastRef.current.showToast({
                    messageType: 'success',
                    messageText: 'Property Deleted  Successfully !'
                })
            } else {
                const message = resp.payload.message;
                toastRef.current.showToast({
                    messageType: message.messageType,
                    messageText: message.messageText,
                })
            }
        })
        refetchData();
      }
        
    }

    const handleOpenPropertyview = () => {
    }

    const handleClick = () => {

    }

    const handleEditProperty = (id) => {
        naviGate(`/adminArea/property/${id}`)
    }

    const onUpdateUser = () => {
        dispatch(updateuser(userDetails)).then((resp) => {
            if (resp.payload.status === 200) {
                toastRef.current.showToast({
                    messageType: 'success',
                    messageText: 'User Update Successfully !'
                })
            }
            else {
                const message = resp.payload.message;
                toastRef.current.showToast({
                    messageType: message.messageType,
                    messageText: message.messageText,
                })
            }
            refetchData()
        });
    }






    const renderPropertyCard = (item, prop) => {
        return (

            <Grid item md={3} sm={6} xs={12} style={{ cursor: 'pointer' }} className={item?.isSold ? 'container-disabled' : 'container'}>
                <Box display='flex' sx={{ position: 'relative', top: '40px', justifyContent: 'space-between', width: '100%' }}>
                    <Tooltip title="Delete">
                        <Button id="fade-button" onClick={(event) => handleDeleteProperty(item._id)}>
                            <DeleteIcon color='primary' sx={{ '&:hover': { color: 'white' } }} />
                        </Button>
                    </Tooltip>
                    <Tooltip title="Edit">
                        <Button id="fade-button" onClick={(event) => handleEditProperty(item._id)}>
                            <EditNoteIcon color='primary' sx={{ '&:hover': { color: 'white' } }} />
                        </Button>
                    </Tooltip>
                </Box>

                <img loading="lazy" style={{ borderRadius: '3%' }} src={item.mainImage} height="200px" width="100%" alt="Property" onClick={() => handleOpenPropertyview(item._id)} />
                <Typography fontWeight="600">   {item?.title.length > 80 ? String(item?.title).slice(0, 80) + '. . .' : item?.title}</Typography>
                <Box display="flex">
                    <Typography>Property Type:</Typography>
                    <Typography>{item.type}</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                    <Typography fontSize="15px">Price:</Typography>
                    <Typography display="flex" fontSize="15px" color="primary" fontWeight="600">
                        {item.price} /- &#8377;
                    </Typography>
                    <Tooltip title={item.isActive ? 'Active' : 'Inactive'}>
                        <CircleIcon style={{ marginLeft: '10px', color: item?.isActive ? '#00cc00' : '#ff0000' }} className="like-Button" />
                    </Tooltip>
                </Box>
                <Box display="flex">
                    <Typography fontSize={'10px'}>Posted At: &nbsp;</Typography>
                    <Typography fontSize={'10px'}>{moment(item?.postedAt).format(dateFormat.dateAndTime)}</Typography>
                </Box>
            </Grid>
        );
    };

  


    return (
        <Wrapper>
            <AlertModal ref={alertModalRef}/>
            <APToaster ref={toastRef} />
            <Spinner LoadingState={loading} />
            <Box p={2}>
                <Titleheader title={'User Details'} />
            </Box>
            <Grid container spacing={2} p={2}>

                <Grid item md={6} sm={12} xs={12} spacing={2}>
                    <InputField name='name' value={userDetails?.name} onChange={handleUserDetails} placeholder={'Name'} />
                    <InputField name='email' value={userDetails?.email} onChange={handleUserDetails} placeholder={'Email'} />
                    <InputField name='mobile' value={userDetails?.mobile} onChange={handleUserDetails} placeholder={'Mobile'} type='number' max={10} />
                    <InputField name='password' value={userDetails?.password} onChange={handleUserDetails} placeholder={'Password'} type='password' max={10} />

                </Grid>

                <Grid item md={6} sm={12} xs={12}>
                    <InputField name='type' value={userDetails?.memberShip?.type} onChange={handleUserDetails} placeholder={'Membership'} />
                    <InputField name='roles' value={userDetails?.roles?.[0]} onChange={handleUserDetails} placeholder={'Role'} />
                    <InputField disabled={true} name='posts' value={userDetails?.usage?.posts || 0} onChange={handleUserDetails} placeholder={'Posts'} type='number' />
                    <InputField disabled={true} name='isVerified' value={userDetails?.isVerified} onChange={handleUserDetails} placeholder={'Verified'} />

                </Grid>

                <Grid item md={6} sm={12} xs={12}>
                    <Button variant='contained' onClick={onUpdateUser} >Update</Button>
                </Grid>
                <Grid item md={12} sm={12} xs={12}>
                    <Titleheader title={'Properties Added By the User'} sx={{ mt: 2 }} />
                    <Grid container spacing={2} mt={2}>
                        { userProperties?.map((item) => renderPropertyCard(item))}
                    </Grid>
                </Grid>
            </Grid>
        </Wrapper>
    )
}
