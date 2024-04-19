import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginUser, signUpUser } from './authApi';
import { createSession, invalidateSession } from '../../configuration/session';

const initialState = {
  authData: { isAuthenticated: false },
  signUpLoading:false,
  loginLoading:false,
  status: 'done',
};

export const login = createAsyncThunk('auth/login', async (credentials) => {
  const response = await loginUser(credentials);
  return response;
});

export const signUp = createAsyncThunk('auth/signUp', async (credentials) => {
  const response = await signUpUser(credentials);
  return response;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.authData = { isAuthenticated: false };
      state.screenData = undefined;
      invalidateSession();
      window.location.href = window.location.origin + process.env.REACT_APP_BASE_NAME + '/';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUp.pending, (state) => {
        state.status = 'processing';
        state.signUpLoading = true;
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.status = 'done';
        state.signUpLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.loginLoading = true
        state.status = 'processing';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'done';
        state.loginLoading = false
        state.authData = action.payload;
        console.log(action.payload.user);
        createSession(action?.payload?.accessToken);
      });
  },
});
export const { logout } = authSlice.actions;

export const selectAuthData = (state) => state.auth.authData;
export const selectLoginLoading = (state) => state.auth.loginLoading;
export const selectSignUpLoading = (state) => state.auth.signUpLoading;
export const selectAuthStatus = (state) => state.auth.status;

export default authSlice.reducer;
