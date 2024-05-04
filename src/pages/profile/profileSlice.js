import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUser } from './profileApi';

const initialState = {
  loading: false,
  dataObj: {},
};

export const getUserDetails = createAsyncThunk('profile/userDetails', async (credentials) => {
    console.log(credentials);
  const response = await getUser(credentials);
  return response;
});

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setData: (state, action) => {
        console.log(action.payload);
      state.dataObj = action.payload;
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
      });
  },
});
export const { setData } = profileSlice.actions;

export const selectDataObj = (state) => state.profile.dataObj;
export const selectLoading = (state) => state.profile.loginLoading;

export default profileSlice.reducer;
