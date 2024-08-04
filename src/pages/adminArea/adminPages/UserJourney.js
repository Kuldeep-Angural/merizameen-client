import { EmailOutlined } from '@mui/icons-material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import HandshakeIcon from '@mui/icons-material/Handshake'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import LoyaltyIcon from '@mui/icons-material/Loyalty'
import MessageIcon from '@mui/icons-material/Message'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import PersonIcon from '@mui/icons-material/Person'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone'
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import { Box, Button, Card, CardContent, CardMedia, Divider, Grid, Tooltip, Typography } from '@mui/material'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { dateFormat } from '../../../constants/constant'
import { formatNumber, fullAddress } from '../../../utils/utility'
import { Wrapper } from '../../home/Wrapper'
import { getUser, getUserJourney, selectLoading } from '../adminSlice'
import CircleIcon from '@mui/icons-material/Circle';
import Spinner from '../../../components/ProgressBar/Progressbar'
import Emptyview from '../../../components/emptyView/Emptyview'
import UpdateIcon from '@mui/icons-material/Update';
const UserJourney = () => {

    const params = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = useSelector(selectLoading);

    const [userDetails, setUserDetails] = useState({});
    const [userJourney, setUserJourney] = useState([]);
    const [showMessage, setshowMessage] = useState(false);
    const [showLikes, setShowLikes] = useState(false);
    const [isAsc, setIsAsc] = useState(false);


    const refetchData = () => {
        dispatch(getUser(params)).then((resp) => {
            setUserDetails(resp.payload.data)
        });

        dispatch(getUserJourney(params)).then((resp) => {
            if (resp?.payload?.status === 200 && resp?.payload?.data?.newPropertyWithLikesAndMessages?.length > 0) {
                setUserJourney(resp?.payload?.data?.newPropertyWithLikesAndMessages)
            }
        })
    }

    useEffect(() => {
        refetchData();
    }, [])


    useEffect(() => {
        const data = userJourney.reverse();
        setUserJourney(data);
    }, [isAsc])



    const displayContentWithIcon = ({ text, icon }) => (
        <Grid item md={12} sm={12} xs={12} display="flex" alignItems="center">
            {icon}
            <Typography lineHeight={'35px'} fontWeight={600} letterSpacing={2} fontSize={15} ml={1}>
                {text}
            </Typography>
        </Grid>
    );

    const renderJourneyCards = (item) => {
        return (
            <>
                <Typography align='center' fontWeight={'600'} letterSpacing={2} fontSize={'20px'}>Posted on : {moment(item.postedAt).format(dateFormat.dateAndTime)} </Typography>
                <Grid container spacing={2}>
                    <Grid item md={12} sm={12} xs={12}>
                        <Box display={'flex'} position={'relative'} justifyContent={'center'} alignContent={'center'}>
                            <CardMedia onClick={() => navigate(`/adminArea/userJourney/propertyView/${item._id}`)} component="img" sx={{ borderRadius: '5px', height: '200px', width: '100%' }} src={item.mainImage} />
                        </Box>
                        <Typography fontWeight={550} fontSize={'13px'} >{item.title}</Typography>
                        <Typography fontWeight={550} fontSize={'13px'}>Property Type : {item.propertyType}</Typography>
                        <Typography fontWeight={550} fontSize={'13px'} >Address : {fullAddress(item.location)}</Typography>
                        <Typography fontWeight={600}> &#8377;: {formatNumber(Number(item.price))} /-</Typography>
                    </Grid>

                    <Grid item md={12} sm={12} xs={12}>
                        <Box display={'flex'} justifyContent={'center'} alignContent={'center'}>
                            <Typography mr={2} fontWeight={600}> Total Likes : {item?.likes?.length || 0}</Typography>
                            <Typography ml={2} fontWeight={600}> Total Messages : {item?.messages?.length || 0}</Typography>
                            <Typography ml={2} fontWeight={600}><CircleIcon sx={{ color: item.isActive ? 'green' : 'red' }} />  </Typography>

                        </Box>
                        <Divider />
                    </Grid>

                    {showLikes && item.likes.length > 0 && (
                        <Grid item md={12} sm={12} xs={12}>
                            <Typography fontWeight={600} align='center'>Likes</Typography>
                            <Grid container spacing={2}>
                                <Box display={'flex'} justifyContent={'center'} alignContent={'center'} p={2} gap={2} mt={2}>
                                    {item.likes.map((like) => {
                                        return (
                                            <Grid item md={12} sm={12} xs={12}>
                                                <Typography fontWeight={550} fontSize={'13px'}>{like?.userName || 'n/a'}</Typography>
                                                <Typography fontWeight={550} fontSize={'13px'}>{moment(like?.likedAt).format(dateFormat.dateAndTime)}</Typography>
                                            </Grid>
                                        )
                                    })}

                                </Box>
                            </Grid>
                        </Grid>
                    )}

                    {showMessage && item?.messages?.length > 0 && (
                        <Grid item md={12} sm={12} xs={12}>
                            <Typography fontWeight={600} align='center' mb={2}>Messages</Typography>
                            <Grid container spacing={2}>
                                {item.messages.map((like, index) => {
                                    return (
                                        <Grid item md={12} sm={12} xs={12} mt={2}>
                                            <Box display={'flex'} justifyContent={'center'} alignContent={'center'} p={2} gap={2}>
                                                <Typography fontWeight={550} fontSize={'13px'}>{index + 1}.{like?.requestContent?.name || 'n/a'}</Typography>
                                                <Typography fontWeight={550} fontSize={'13px'}>{like?.requestContent?.email || 'n/a'}</Typography>
                                                <Typography fontWeight={550} fontSize={'13px'}>Mobile:{like?.requestContent?.mobile || 'n/a'}</Typography>
                                                <Typography fontWeight={550} fontSize={'13px'}>Message:{like?.requestContent?.message || 'n/a'}</Typography>
                                                <Typography fontWeight={550} fontSize={'13px'}>At:{moment(like?.requestedAt).format(dateFormat.dateAndTime)}</Typography>
                                            </Box>
                                        </Grid>
                                    )
                                })}

                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </>
        )
    }

    return (
        <Wrapper>
            <Spinner LoadingState={loading} />
            <Grid container spacing={2}>
                <Grid sx={{ margin: 2 }} item md={3} sm={12} xs={12} >
                    <Card >
                        <CardContent>
                            <Box display={'flex'} justifyContent={'center'} alignContent={'center'}>
                                <CardMedia component="img" sx={{ borderRadius: '50%', height: '200px', width: '200px' }} src={userDetails?.profilePic} />
                            </Box>
                            <Grid container spacing={2}>
                                <Grid item md={12} sm={12} xs={12} mt={2}>
                                    <Typography fontWeight={'600'} letterSpacing={2} fontSize={'20px'}>{userDetails?.name}</Typography>
                                </Grid>
                                {displayContentWithIcon({ icon: <EmailOutlined />, text: userDetails?.email })}
                                {displayContentWithIcon({ icon: <PhoneIphoneIcon />, text: userDetails?.mobile ? `+91-${userDetails?.mobile}` : 'n/a' })}
                                {displayContentWithIcon({ icon: <PersonIcon />, text: userDetails?.isGoogleUser ? 'Google' : 'Merizameen' })}
                                {displayContentWithIcon({ icon: <VerifiedUserIcon />, text: userDetails?.isVerified ? 'Verified' : 'unVerified' })}
                                {displayContentWithIcon({ icon: <HandshakeIcon />, text: moment(userDetails?.createdAt).format(dateFormat?.dateAndTime) })}
                                {displayContentWithIcon({ icon: <LoyaltyIcon />, text: userDetails?.memberShip?.type })}
                                {displayContentWithIcon({ icon: <UpdateIcon />, text: moment(userDetails?.updatedAt).format(dateFormat?.dateAndTime)  })}

                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item sx={{ margin: 2 }} md={8} sm={12} xs={12} >
                    <Card>
                        <Grid item md={12} sm={12} xs={12} mt={1}>
                            <Typography align='center' fontWeight={'600'} letterSpacing={2} fontSize={'20px'}>Journey</Typography>
                            <Box display={'flex'} justifyContent={'center'} alignContent={'center'}>
                                <Tooltip title={''}>
                                    <Button variant={isAsc ? 'contained' : 'text'} sx={{ mr: 2 }} onClick={() => setIsAsc(!isAsc)}>
                                        {isAsc ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                                    </Button>

                                </Tooltip>
                                <Tooltip title={showLikes ? 'Hide Likes' : 'Show Likes'}>
                                    <Button variant={showLikes ? 'contained' : 'text'} sx={{ mr: 2 }} onClick={() => setShowLikes(!showLikes)}><FavoriteBorderIcon /></Button>
                                </Tooltip>

                                <Tooltip title={showMessage ? 'Hide Messages' : 'Show Messages'}>
                                    <Button variant={showMessage ? 'contained' : 'text'} sx={{ mr: 2 }} onClick={() => setshowMessage(!showMessage)}><MessageIcon /></Button>
                                </Tooltip>
                            </Box>
                        </Grid>
                        <CardContent style={{ maxHeight: '78vh', overflow: 'scroll' }}>
                            <Grid container spacing={2}>
                                {userJourney?.length > 0 ? (<Grid item md={12} sm={12} xs={12} mt={1}>
                                    {userJourney.map((item) => {
                                        return renderJourneyCards(item);
                                    })}
                                </Grid>) : (
                                    <Grid item md={12} sm={12} xs={12} mt={1}>
                                      <Emptyview/>
                                    </Grid>)
                                }
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

        </Wrapper>
    )
}

export default UserJourney