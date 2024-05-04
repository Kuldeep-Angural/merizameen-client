import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../pages/authantication/authSlice';
import postPropertySlice from '../pages/postAd/postPropertySlice';
import  profileSlice from '../pages/profile/profileSlice';

export const apStore = configureStore({
    reducer:{
        auth:authSlice,
        post:postPropertySlice,
        profile:profileSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
