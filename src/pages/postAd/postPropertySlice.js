import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createObject } from './postPropertyApi';


const initialState = {
  postLoading:false,
};

export const postProperty = createAsyncThunk('/user/addProperty', async (payload) => {
  const response = await createObject(payload);
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
  },
});

export const selectPostLoading = (state) => state.post.postLoading;

export default postpropertySlice.reducer;
