import { 
  createApi,
  //  fetchBaseQuery 
  } from '@reduxjs/toolkit/query/react';
import { IAuthState, IUser } from '../../helper/Auth.types';
import {
  refreshUser,
  removeUser,
  setUser,
  createUser,
  regenerateToken,
} from './AuthSlice';

import { customFetchBase } from '../../helper/authMutex';
import { Notify } from 'notiflix';
// import { Notify } from 'notiflix';
// import { persistedToken } from '../../helper/helper';

// const defaultURL = `${process.env.REACT_APP_API_URL}/api/users`;

export const generalApi = createApi({
  reducerPath: 'authApi',
  // baseQuery: fetchBaseQuery({
  //   baseUrl: defaultURL,
  //   credentials: 'include',
  //   prepareHeaders: headers => {
  //     const token = localStorage.getItem('accessToken');
  //     if (token) {
  //       headers.set('authorization', `Bearer ${token}`);
  //     }
  //     return headers;
  //   },
  // }),
  baseQuery: customFetchBase,
  endpoints: builder => ({
    register: builder.mutation({
      query: registerData => ({
        url: '/register',
        method: 'POST',
        body: registerData,
      }),
      async onQueryStarted(arg, lifecycleApi) {
        try {
          const { data } = await lifecycleApi.queryFulfilled;
          if (data) {
            lifecycleApi.dispatch(createUser(data));
          }
        } catch (error: any ) {
          Notify.failure(error?.error?.data?.message as string)
        }
      },
    }),
    login: builder.mutation({
      query: creds => ({
        url: '/login',
        method: 'POST',
        body: creds,
      }),
      async onQueryStarted(creds, lifecycleApi) {
        try {
          const { data } = await lifecycleApi.queryFulfilled;

          if (data) {
            lifecycleApi.dispatch(setUser(data));

            localStorage.setItem('accessToken', data.accessToken);
          }
        } catch (error:any) {        
         
          Notify.failure(error?.error?.data?.message as string)
        }
      },
    }),
    refresh: builder.query<IUser, void>({
      query: () => {
        // const token = localStorage.getItem('accessToken')
        return {
          url: '/current',
          method: 'GET',
          // headers: {
          //   authorization: `Bearer ${token}`,
          // },
        };
      },
      async onQueryStarted(arg, lifecycleApi) {
        // const { data } = await lifecycleApi.queryFulfilled;
        // lifecycleApi.dispatch(refreshUser(data));
        try {
          const { data } = await lifecycleApi.queryFulfilled;
          if (data) {
            lifecycleApi.dispatch(refreshUser(data));
          }
        } catch (error: any) {
          if (error.error.status=== 401) {
           
            // lifecycleApi.dispatch(generalApi.endpoints.regenerate.initiate());
          }
        }
      },
    }),

    // regenerate: builder.query<IAuthState, void>({
    //   query: () => {
    //     return {
    //       url: '/regenerate',
    //       method: 'GET',
    //       withCredentials: true,
    //     };
    //   },

    //   async onQueryStarted(arg, lifecycleApi) {
    //     try {
    //       const { data } = await lifecycleApi.queryFulfilled;
    //       if (data) {
    //         lifecycleApi.dispatch(regenerateToken(data));
    //         localStorage.setItem('accessToken', data.accessToken as string);
    //       }
    //     } catch (error:any) {
    //        if (error.error.status=== 401 ) {
            
    //         lifecycleApi.dispatch(removeUser());
    //       }
    //     }
    //   },
    // }),

    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, lifecycleApi) {
        try {
          await lifecycleApi.queryFulfilled;

          lifecycleApi.dispatch(removeUser());

          localStorage.setItem('accessToken', '');
        } catch (error: any) {
          Notify.failure(error?.error?.data?.message as string)
        }
      },
    }),
  }),
});
export const {
  useRefreshQuery,
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  
} = generalApi;
