import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createObject, getAll, getProperty, like } from './postPropertyApi';
import { ReplyAll } from '@mui/icons-material';


const initialState = {
  postLoading:false,
  loading:false,
  properties:[],
};

export const postProperty = createAsyncThunk('/user/addProperty', async (payload) => {
  const response = await createObject(payload);
  return response;
});

export const getSpecificProperty = createAsyncThunk('/user/getproperty', async (payload) => {
  const response = await getProperty(payload);
  return response;
});

export const getAllProperties = createAsyncThunk('/user/allProperties', async () => {
  const response = await getAll();
  return response;
});

export const likeproperty =  createAsyncThunk('/user/like', async (data) => {
  const response = await like(data);
  return response;
});



export const postpropertySlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(postProperty.pending, (state) => {
        state.status = 'processing';
        state.postLoading = true;
      })
      .addCase(postProperty.fulfilled, (state, action) => {
        state.status = 'done';
        state.postLoading = false;
      })
      .addCase(getAllProperties.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProperties.fulfilled, (state, action) => {
        state.loading = false;
        state.properties=action?.payload?.data || []
      })
      .addCase(getSpecificProperty.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSpecificProperty.fulfilled, (state, action) => {
        state.loading = false;
      })
      
  },
});

export const selectPostLoading = (state) => state.post.postLoading;
export const allProperties = (state) => state.post.properties;
export const selectLoading = (state) => state.post.loading;

export default postpropertySlice.reducer;
