import { createSlice } from '@reduxjs/toolkit';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { IAuthState } from '../../helper/Auth.types';

export const initialState: IAuthState = {
  user: {
    email: null,
    name: null,
    avatarURL: null,
    verify: false,
  },

  isLoggedIn: false,
  isRefreshing: false,
  authError: null,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    createUser: (state, action) => {
      state.user = action.payload.user;
      Notify.success(
        'Verification code sent to your email. Verify your email to SignIn.'
      );
    },
    setUser: (state, action) => {
      if (!action?.payload?.message) {
        state.isRefreshing = false;
        state.isLoggedIn = true;
        state.authError = null;

        state.user = action.payload.user;
      }
      if (action?.payload?.message) {
        state.authError = action?.payload?.message;
        state.isRefreshing = false;
        state.isLoggedIn = false;
        state.user.email = action?.payload?.email;
      }
    },
    removeUser: state => {
      state.isRefreshing = false;
      state.user = {
        name: null,
        email: null,
        avatarURL: null,
        verify: false,
      };

      state.isLoggedIn = false;
    },
    refreshUser: (state, action) => {
      state.user = { ...action.payload };
      state.isLoggedIn = true;
      state.isRefreshing = false;
      state.authError = null;
    },
    refreshToken: (state, action) => {
      state.user = { ...action.payload };
      state.isLoggedIn = true;
      state.isRefreshing = false;
      state.authError = null;
    },
    updatePassword: (state, action) => {
      state.authError = null;
      state.isLoggedIn = true;
      state.isRefreshing = false;
      Notify.success('Password updated success');
    },
    updateAvatar: (state, action) => {
      state.authError = null;
      state.user.avatarURL = action.payload.newAvatar;
      Notify.success('New photo upload success');
    },
    resendVerify: (state, action) => {
      state.user.email = action.payload;
      state.authError = null;
      state.isLoggedIn = false;
      state.isRefreshing = false;
    },
  },
});

export const {
  setUser,
  removeUser,
  refreshUser,
  createUser,
  updatePassword,
  refreshToken,
  updateAvatar,
  resendVerify,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
