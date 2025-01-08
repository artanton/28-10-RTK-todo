import {
  createApi,
  //  fetchBaseQuery
} from '@reduxjs/toolkit/query/react';
import {
  // IAuthState,
  IUser,
} from '../../helper/Auth.types';
import {
  refreshUser,
  removeUser,
  setUser,
  createUser,
  updatePassword,
  updateAvatar,
  resendVerify,
  // regenerateToken,
} from './AuthSlice';

import { customFetchBase } from '../../helper/authMutex';
import { errorHandler } from '../../helper/helper';
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
        } catch (error: any) {
          errorHandler(error);
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
        } catch (error: any) {
          const message = error?.error?.data?.message;
          const email = creds.email;
          lifecycleApi.dispatch(setUser({ message, email }));
          errorHandler(error);
        }
      },
    }),
    refresh: builder.query<IUser, void>({
      query: () => {
        // const token = localStorage.getItem('accessToken')
        return {
          url: '/current',
          method: 'GET',
        };
      },
      async onQueryStarted(arg, lifecycleApi) {
        try {
          const { data } = await lifecycleApi.queryFulfilled;
          if (data) {
            lifecycleApi.dispatch(refreshUser(data));
          }
        } catch (error: any) {
          if (error.error.status !== 401) {
            errorHandler(error);
          }
        }
      },
    }),

    updatePassword: builder.mutation({
      query: creds => {
        return {
          url: '/update',
          method: 'PATCH',
          body: creds,
        };
      },
      async onQueryStarted(creds, lifecycleApi) {
        try {
          const { data } = await lifecycleApi.queryFulfilled;
          if (data) {
            lifecycleApi.dispatch(updatePassword(data));
          }
        } catch (error: any) {
          errorHandler(error);
        }
      },
    }),

    updateAvatar: builder.mutation({
      query: formData => {
        return {
          url: '/avatar',
          method: 'PATCH',
          body: formData,
          formData: true,
        };
      },
      async onQueryStarted(formData, lifecycleApi) {
        try {
          const { data } = await lifecycleApi.queryFulfilled;
          if (data) {
            lifecycleApi.dispatch(updateAvatar(data));
          }
        } catch (error: any) {
          errorHandler(error);
        }
      },
    }),

    resendVerify: builder.mutation({
      query: email => {
        return {
          url: '/verify',
          method: 'POST',
          body: { email },
        };
      },
      async onQueryStarted(email, lifecycleApi) {
        try {
          const data = await lifecycleApi.queryFulfilled;
          if (data) {
            lifecycleApi.dispatch(resendVerify(email));
          }
        } catch (error: any) {
          errorHandler(error);
        }
      },
    }),

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
          errorHandler(error);
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
  useUpdatePasswordMutation,
  useUpdateAvatarMutation,
  useResendVerifyMutation,
} = generalApi;
