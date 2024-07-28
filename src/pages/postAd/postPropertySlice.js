import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createObject, deleteSpecificProperty, getAll, getProperty, like, requestForCallBack, updateSpecificProperty } from './postPropertyApi';
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


export const deleteProperty =  createAsyncThunk('/user/deleteProperty', async (data) => {
  const response = await deleteSpecificProperty(data);
  return response;
});


export const updateProperty = createAsyncThunk('/user/updateProperty', async (data) => {
  const response = await updateSpecificProperty(data);
  return response;
});


export const requestCallBack =  createAsyncThunk('/user/requestCallBack', async (data) => {
  const response = await requestForCallBack(data);
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
        state.loading = true;
      })
      .addCase(postProperty.fulfilled, (state, action) => {
        state.status = 'done';
        state.loading = false;
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
      .addCase(requestCallBack.pending,(state)=>{
        state.loading = true;
      })
      .addCase(requestCallBack.fulfilled, (state, action) => {
        state.loading = false;
      })

      .addCase(deleteProperty.pending,(state)=>{
        state.loading = true;
      })
      .addCase(deleteProperty.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(updateProperty.pending,(state)=>{
        state.loading = true;
      })
      .addCase(updateProperty.fulfilled, (state, action) => {
        state.loading = false;
      })
      
  },
});

export const selectPostLoading = (state) => state.post.postLoading;
export const allProperties = (state) => state.post.properties;
export const selectLoading = (state) => state.post.loading;

export default postpropertySlice.reducer;
