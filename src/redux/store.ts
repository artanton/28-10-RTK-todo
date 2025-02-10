import { configureStore } from '@reduxjs/toolkit';

import { authReducer } from './auth/AuthSlice';

import { generalApi } from './sliceApi';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  
    [generalApi.reducerPath]: generalApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
    
    }).concat(generalApi.middleware),
  devTools: process.env.NODE_ENV === 'development',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
