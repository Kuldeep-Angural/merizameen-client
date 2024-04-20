import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../pages/authantication/authSlice';
import postPropertySlice from '../pages/postAd/postPropertySlice';

export const apStore = configureStore({
    reducer:{
        auth:authSlice,
        post:postPropertySlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
