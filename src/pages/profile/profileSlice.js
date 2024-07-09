import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllpostedProperties, getUserDetail, sellerLikes, setpropertyAsSold, updateUserDetails, userLikes } from './profileApi';

const initialState = {
  loading: false,
  likesLoading:false,
  userLikes:[],
  sellerLikes:[],
  postedProperties:[],
  dataObj: {},
};

export const getUserDetails = createAsyncThunk('profile/userDetails', async (credentials) => {
  const response = await getUserDetail({id:credentials});
  return response;
});

export const updateUser = createAsyncThunk('profile/updateProfile', async (credentials) => {
const response = await updateUserDetails(credentials);
return response;
});


export const getUserLikes =  createAsyncThunk('/user/userlike', async (data) => {
  const response = await userLikes(data);
  return response;
});

export const getSellerLikes =  createAsyncThunk('/user/sellerlike', async (data) => {
  const response = await sellerLikes(data);
  return response;
});

export const getPostedproperties =  createAsyncThunk('/user/postedproperties', async (data) => {
  const response = await getAllpostedProperties(data);
  return response;
});


export const setSoldProperty = createAsyncThunk('/user/setSold', async (data) => {
  const response = await setpropertyAsSold(data);
  return response;
});




export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.dataObj = action?.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.dataObj = action?.payload?.data || {};
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        // state.dataObj = action?.payload?.data || {};
      })
      .addCase(getUserLikes.pending, (state) => {
        state.likesLoading = true;
      })
      .addCase(getUserLikes.fulfilled, (state, action) => {
        state.likesLoading = false;
        state.userLikes=action?.payload?.data || []
      })
      .addCase(getSellerLikes.pending, (state) => {
        state.likesLoading = true;
      })
      .addCase(getSellerLikes.fulfilled, (state, action) => {
        state.likesLoading = false;
        state.sellerLikes=action?.payload?.data || []
      })
      .addCase(getPostedproperties.pending, (state) => {
        state.likesLoading = true;
      })
      .addCase(getPostedproperties.fulfilled, (state, action) => {
        state.likesLoading = false;
        state.postedProperties=action?.payload?.data || []
      })
      .addCase(setSoldProperty.pending, (state) => {
        state.loading = true;
      })
      .addCase(setSoldProperty.fulfilled, (state, action) => {
        state.loading = false;
      })
      
  },
});
export const { setData } = profileSlice.actions;

export const selectDataObj = (state) => state.profile.dataObj;
export const selectLoading = (state) => state.profile.loading;
export const selectUserLikes = (state) => state.profile.userLikes;
export const selectSellerLikes = (state) => state.profile.sellerLikes;
export const selectlikesLoading = (state) => state.profile.likesLoading;
export const selectPostedProperties = (state) => state.profile.postedProperties;


export default profileSlice.reducer;
