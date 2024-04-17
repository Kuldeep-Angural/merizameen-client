import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../pages/authantication/authSlice';

export const apStore = configureStore({
    reducer:{
        auth:authSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
