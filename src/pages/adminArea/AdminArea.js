import React, { useEffect, useState } from 'react'
import { Wrapper } from '../home/Wrapper'
import { allFeedbacks, deleteUser, getAllProperties, getAllUsers, selectAllFeedbacks, selectAllProperties, selectAllUsers, selectLoading } from './adminSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Grid } from '@mui/material'
import EnhancedTable from '../../components/table/EnhancedTable'
import { formatNumber } from '../../utils/utility'
import CircleIcon from '@mui/icons-material/Circle';
import Tabs from '../../components/tab/Tabs'
import moment from 'moment'
import { dateFormat } from '../../constants/constant'
import { useNavigate } from 'react-router-dom'
import Spinner from '../../components/ProgressBar/Progressbar'

const propertioesHeaders = [
    { id: 'title', numeric: false, disablePadding: true, label: 'Title', width: '220px' },
    { id: 'price', numeric: true, disablePadding: false, label: 'Price', width: '50px' },
    { id: 'location', numeric: false, disablePadding: false, label: 'Location', width: '100px' },
    { id: 'bedrooms', numeric: true, disablePadding: false, label: 'Bedrooms', width: '30px' },
    { id: 'bathrooms', numeric: true, disablePadding: false, label: 'Bathrooms', width: '20px' },
    { id: 'totalArea', numeric: true, disablePadding: false, label: 'Total Area', width: '80px' },
    { id: 'carpetArea', numeric: true, disablePadding: false, label: 'Carpet Area', width: '80px' },
    { id: 'ageOfProperty', numeric: true, disablePadding: false, label: 'Age', width: '30px' },
    { id: 'isActive', numeric: false, disablePadding: false, label: 'Status', width: '80px' },
];

const usersHeaders = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Name', width: '180px' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email', width: '50px' },
    { id: 'mobile', numeric: false, disablePadding: false, label: 'Mobile', width: '100px' },
    { id: 'createdAt', numeric: true, disablePadding: false, label: 'Joined on', width: '30px' },
    { id: 'memberShip', numeric: true, disablePadding: false, label: 'MemberShip', width: '20px' },
    { id: 'posts', numeric: true, disablePadding: false, label: 'Posts', width: '80px' },
    { id: 'type', numeric: false, disablePadding: false, label: 'Joined By', width: '80px' },
];

const feedBackHeaders = [
    { id: 'name', numeric: false, disablePadding: true, label: 'Name', width: '80px' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email', width: '50px' },
    { id: 'feedBack', numeric: false, disablePadding: false, label: 'Message', width: '180px' },
    { id: 'createdAt', numeric: false, disablePadding: false, label: 'Received At', width: '30px' },

];

const tabItems = [{ value: 'user', label: 'User' }, { value: 'properties', label: 'Properties' }, { value: 'feedbacks', label: 'Feedbacks' }]


const AdminArea = () => {
    const dispatch = useDispatch();
    const naviGate = useNavigate();

    const allUsers = useSelector(selectAllUsers);
    const allProperties = useSelector(selectAllProperties)
    const feedbacks = useSelector(selectAllFeedbacks);
    const loading = useSelector(selectLoading);
    const [currentTab, setCurrentTab] = useState('user');
    const [selected, setSelected] = useState([]);


    const refetchData = () => {
        dispatch(getAllUsers())
        dispatch(getAllProperties());
        dispatch(allFeedbacks());
    }

    const handleTabClick = (e) => {
        setCurrentTab(e)
        setSelected([])
    }

    const handleEditClick = (e) => {
        naviGate(`/adminArea/user/${e}`)
        console.log(e);
    }

    const handleJourney = (e) => {
        console.log(e);
    }

    const handleDelete = (e) => {
        const data = {
            ids:[e]
        }
        dispatch(deleteUser(data)).then(() => {
            refetchData();
        })
    }

    const removeSelected = () => {
        const data = {
            ids:selected
        }
        dispatch(deleteUser(data)).then(() => {
            refetchData();
            setSelected([]);
        })
    }


    const userRow = allUsers?.map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        memberShip: user.memberShip.type,
        posts: user.usage.posts,
        createdAt: moment(user.createdAt).format(dateFormat.date),
        type: user.isGoogleUser == true ? "Google" : 'Merizameen',

    }));


    const propertiesRow = allProperties?.map((property) => ({
        id: property._id,
        title: property?.title?.length > 80 ? String(property.title).slice(0, 80) + '...' : property?.title,
        price: formatNumber(property?.price),
        location: `${property.location.city}, ${property.location.state}`,
        bedrooms: property?.basicInfo?.bedRooms,
        bathrooms: property?.basicInfo?.bathRooms,
        totalArea: property?.basicInfo?.totalArea,
        carpetArea: property?.basicInfo?.carPetArea,
        ageOfProperty: property?.basicInfo?.ageOfProperty,
        isActive: (<CircleIcon style={{ color: property?.isActive === true ? 'green' : 'red' }} />)
    }));


    const feedbacksRow = feedbacks?.map((data) => ({
        id: data._id,
        name: data?.name,
        email: data.email,
        feedBack: data?.feedBack,
        createdAt: moment(data.createdAt).format(dateFormat.dateAndTime),

    }));


    const propertiesTopActions = [
        { title: 'Delete', action: <Button onClick={removeSelected}> Delete</Button> }
    ]

    const userTopAction = [
        { title: 'Delete', action: <Button onClick={removeSelected}> Delete</Button> }
    ]

    useEffect(() => {
        refetchData();
    }, [])


    const menuItems = [
        { title: 'Edit', onClick: handleEditClick },
        { title: 'Journey', onClick: handleJourney },
        { title: 'Delete', onClick: handleDelete },
    ];


    return (
        <Wrapper>
            <Spinner LoadingState={loading} />
            <Box p={2}>
                <Tabs onClick={handleTabClick} current={currentTab} tabItems={tabItems} />
                {currentTab === 'user' && (
                    <Grid container spacing={2} p={2}>
                        <Grid item md={12} sm={12} xs={!2}>
                            <EnhancedTable rows={userRow} headCells={usersHeaders} topActions={userTopAction} title="Users" hasActions={true} selected={selected} setSelected={setSelected} actionMenu={menuItems} />
                        </Grid>
                    </Grid>
                )}
                {currentTab === 'properties' && (
                    <Grid container spacing={2} p={2}>
                        <Grid item md={12} sm={12} xs={!2}>
                            <EnhancedTable rows={propertiesRow} headCells={propertioesHeaders} topActions={propertiesTopActions} hasActions={true} selected={selected} setSelected={setSelected} title="Properties" />
                        </Grid>
                    </Grid>
                )}

                {currentTab === 'feedbacks' && (
                    <Grid container spacing={2} p={2}>
                        <Grid item md={12} sm={12} xs={!2}>
                            <EnhancedTable rows={feedbacksRow} headCells={feedBackHeaders} topActions={propertiesTopActions} hasActions={true} selected={selected} setSelected={setSelected} title="Feedbacks" />
                        </Grid>
                    </Grid>
                )}
            </Box>
        </Wrapper>
    )
}

export default AdminArea