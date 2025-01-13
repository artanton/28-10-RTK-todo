export interface IUser {
  email: string | null;
  name: string | null;
  avatarURL: string | null;
  verify: boolean;
}
export interface IrefreshToken {
  user: IUser;
  accessToken: string;
}

export interface IAuthState {
  user: IUser;
  // accessToken: string | null;
  isLoggedIn: boolean;
  isRefreshing: boolean;
  authError: string | null;
  isLoading: boolean;
}
