import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteUserApi,  deletUserProperty, getAll, getAllFeedbacks, getProperty, getUserApi, getUsersProperties, updateSpecificProperty, updateUserDetals, userJourney } from './adminApi';

const initialState = {
    allUsers: [],
    allProperties: [],
    allFeedbacks: [],
    user: {},
    userProperties:[],
    loading: false,
};

export const getAllUsers = createAsyncThunk('admin/getAllUsers', async () => {
    const response = await getAll();
    return response;
});

export const deleteUser = createAsyncThunk('admin/deleteUser', async (payload) => {
    const response = await deleteUserApi(payload);
    return response;
});

export const updateuser = createAsyncThunk('admin/getUupdateusersers', async (payload) => {
    const response = await updateUserDetals(payload);
    return response;
});

export const deleteProperty = createAsyncThunk('admin/deleteProperty', async (payload) => {
    const response = await deletUserProperty(payload);
    return response;
});



export const getUser = createAsyncThunk('admin/getUsers', async (payload) => {
    const response = await getUserApi(payload);
    return response;
});

export const getUserProperties = createAsyncThunk('admin/getUserProperties', async (payload) => {
    const response = await getUsersProperties(payload);
    return response;
});


export const getAllProperties = createAsyncThunk('admin/getAllProperties', async () => {
    const response = await getProperty();
    return response;
});


export const getUserJourney = createAsyncThunk('admin/userJourney', async (payload) => {
    const response = await userJourney(payload);
    return response;
});


export const allFeedbacks = createAsyncThunk('admin/allFeedbacks', async () => {
    const response = await getAllFeedbacks();
    return response;
});



export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                if (action?.payload?.data?.length > 0) {
                    state.allUsers = action.payload.data;
                }
                state.loading = false;
            })
            .addCase(getAllProperties.pending, (state) => {
                state.loading = true
                state.status = 'processing';
            })
            .addCase(getAllProperties.fulfilled, (state, action) => {
                state.loading = false;
                if (action?.payload?.data?.length > 0) {
                    state.allProperties = action.payload.data
                }
            })
            .addCase(allFeedbacks.pending, (state) => {
                state.loading = true
                state.status = 'processing';
            })
            .addCase(allFeedbacks.fulfilled, (state, action) => {
                state.loading = false;
                if (action?.payload?.data?.length > 0) {
                    state.allFeedbacks = action.payload.data
                }
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(getUser.pending, (state) => {
                state.loading = true
            })
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.data) {
                    state.user = action.payload.data
                }
            })
            .addCase(getUserProperties.pending, (state) => {
                state.loading = true
            })
            .addCase(getUserProperties.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.data) {
                    state.userProperties = action.payload.data
                }
            })
            .addCase(updateuser.pending, (state) => {
                state.loading = true
            })
            .addCase(updateuser.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(deleteProperty.pending, (state) => {
                state.loading = true
            })
            .addCase(deleteProperty.fulfilled, (state, action) => {
                state.loading = false;
            }).addCase(getUserJourney.pending, (state) => {
                
                state.loading = true
            })
            .addCase(getUserJourney.fulfilled, (state, action) => {
                state.loading = false;
            });
    },
});

export const selectLoading = (state) => state.admin.loading;
export const selectUser = (state) => state.admin.user;
export const selectUserproperties = (state) => state.admin.userProperties;


export const selectAllUsers = (state) => state.admin.allUsers;
export const selectAllProperties = (state) => state.admin.allProperties;
export const selectAllFeedbacks = (state) => state.admin.allFeedbacks;

export default adminSlice.reducer;
