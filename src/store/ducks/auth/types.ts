export enum AuthTypes {
  SIGNIN_REQUEST = "@auth/SIGNIN_REQUEST",
  SIGNIN_GITHUB_REQUEST = "@auth/SIGNIN_GITHUB_REQUEST",
  SIGNIN_SUCCESS = "@auth/SIGNIN_SUCCESS",
  SIGNIN_FAILURE = "@auth/SIGNIN_FAILURE",
  SIGNUP_REQUEST = "@auth/SIGNUP_REQUEST",
  SIGNUP_SUCCESS = "@auth/SIGNUP_SUCCESS",
  SIGNUP_FAILURE = "@auth/SIGNUP_FAILURE",
  SIGNOUT = "@auth/SIGNOUT",
}

export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

export interface AuthState {
  readonly user: User | null;
  readonly loading: boolean;
  readonly error: boolean;
}
