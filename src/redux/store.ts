import { configureStore } from '@reduxjs/toolkit';
import { taskReducer } from './tasks/TaskSlice';
import { authReducer } from './auth/AuthSlice';
// import {
//   persistStore,
//   // persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import { generalApi } from './sliceApi';
// import { setupAxiosInterceptors } from '../helper/axiosInterceptr';
// import authMiddleware from '../helper/authMiddlware';

// const authPersistConfig ={
//   key: 'accessToken',
//   storage,
//   whitelist: ['accessToken'],
// }
// const persistedAuthReducer = persistReducer(authPersistConfig,  authReducer);



export const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer,
    [generalApi.reducerPath]:generalApi.reducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
    })
   .concat(generalApi.middleware)
    ,
    devTools: process.env.NODE_ENV === 'development',
});

// export const persistor= persistStore (store);


// const waitForRehydration = new Promise<void>((resolve) => {
//   const unsubscribe = persistor.subscribe(() => {
//     console.log(persistor.getState());
//     if (persistor.getState()) {
//       unsubscribe();
//       resolve();
//     }
//   });
// });

// waitForRehydration.then(() => {
//   setupAxiosInterceptors(store); // Now setup interceptors after store is rehydrated
// });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

