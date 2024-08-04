import React, { useEffect, useRef, useState } from 'react'
import { Wrapper } from '../home/Wrapper'
import { allFeedbacks, deleteProperty, deleteUser, getAllProperties, getAllUsers, selectAllFeedbacks, selectAllProperties, selectAllUsers, selectLoading } from './adminSlice'
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
import AlertModal from '../../components/modal/AlertModal'
import DeleteIcon from '@mui/icons-material/Delete';
import APToaster from '../../components/Toaster/APToaster'
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
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
    const alertRef = useRef();
    const toastRef = useRef();

    const allUsers = useSelector(selectAllUsers);
    const allProperties = useSelector(selectAllProperties)
    const feedbacks = useSelector(selectAllFeedbacks);
    const loading = useSelector(selectLoading);
    const [currentTab, setCurrentTab] = useState('user');
    const [selected, setSelected] = useState([]);
    const [singleItem, setSingleItem] = useState('');


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
    }

    const handleJourney = (e) => {
        naviGate(`/adminArea/userJourney/${e}`);
    }


    const handleDeleteUser = async (e) => {
        const res = await alertRef.current.showAlert({title:'Are You Sure You Want To Delete This User'});
            if (res === true) {
                const data = { ids: [e]}
                dispatch(deleteUser(data)).then(() => {
                    toastRef.current.showToast({
                        messageType: 'success',
                        messageText: 'User Deleted Successfully !'
                    })
                    refetchData();
                })
            } 
    }


    const removeSelectedUser = async() => {
        const res = await alertRef.current.showAlert({title:'Are you sure you want to delete this'});
        if (res === true) {
            const data = { ids: selected  }
            dispatch(deleteUser(data)).then(() => {
                toastRef.current.showToast({
                    messageType: 'success',
                    messageText: 'Selected User Deleted Successfully !'
                })
                refetchData();
            })
        }
    }



    const userRow = allUsers?.map((user) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        memberShip: user.memberShip.type,
        posts: user.usage.posts,
        createdAt: moment(user.createdAt).format(dateFormat.date),
        type: user.isGoogleUser === true ? "Google" : 'Merizameen',

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
        isActive: (<CircleIcon style={{ color: property?.isActive === true  && property?.isSold === false ? 'green' : property?.isSold===true ? 'orange' : 'red' }} />)
    }));


    const feedbacksRow = feedbacks?.map((data) => ({
        id: data._id,
        name: data?.name,
        email: data.email,
        feedBack: data?.feedBack,
        createdAt: moment(data.createdAt).format(dateFormat.dateAndTime),

    }));


   
    useEffect(() => {
        refetchData();
    }, [])


    const editProperty  = (id) => {
        naviGate(`/adminArea/property/${id}`)
    }

    const propertyAnalytics  = (id) => {
        
    }

    const deleteProperties  = async(id) => {
        const res = await alertRef.current.showAlert({title:'Are you Sure you want To Delete this property'});
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
                refetchData();
            })
        }
        refetchData();

    }

    
    const removeSelectedProperties = async() => {
        const res = await alertRef.current.showAlert({title:'Are You Sure You Want To Delete This User'});
        if (res === true) {
            
        }
    }


    const userTopAction = [ { title: 'Delete', action: <Button onClick={removeSelectedUser}> <DeleteIcon/> </Button> } ]


    const menuItems = [
        { title: 'Edit', onClick: handleEditClick },
        { title: 'Journey', onClick: handleJourney },
        { title: 'Delete', onClick: handleDeleteUser },
    ];

    const propertiesActionMenu =  [
        { title: 'Edit', onClick: editProperty },
        { title: 'Analytics', onClick:propertyAnalytics  },
        { title: 'Delete', onClick: deleteProperties },
    ];


    return (
        <Wrapper>
            <APToaster ref={toastRef} />
            <AlertModal ref={alertRef} title={'Are you sure you want to delete this'} />
            <Spinner LoadingState={loading} />
            <Box p={2}>
                <Tabs onClick={handleTabClick} current={currentTab} tabItems={tabItems} />
                {currentTab === 'user' && (
                    <Grid container spacing={2} p={2}>
                        <Grid item md={12} sm={12} xs={!2}>
                            <EnhancedTable rows={userRow} headCells={usersHeaders} headerActions={userTopAction} title="Users" hasActions={true} selected={selected} setSelected={setSelected} actionMenu={menuItems} />
                        </Grid>
                    </Grid>
                )}
                {currentTab === 'properties' && (
                    <Grid container spacing={2} p={2}>
                        <Grid item md={12} sm={12} xs={!2}>
                            <EnhancedTable rows={propertiesRow} headCells={propertioesHeaders} headerActions={[]} hasActions={true} selected={selected} setSelected={setSelected} actionMenu={propertiesActionMenu} title="Properties" />
                        </Grid>
                    </Grid>
                )}

                {currentTab === 'feedbacks' && (
                    <Grid container spacing={2} p={2}>
                        <Grid item md={12} sm={12} xs={!2}>
                            <EnhancedTable rows={feedbacksRow} headCells={feedBackHeaders} headerActions={[]} hasActions={true} selected={selected} setSelected={setSelected} title="Feedbacks" />
                        </Grid>
                    </Grid>
                )}
            </Box>
        </Wrapper>
    )
}

export default AdminArea