export enum AuthTypes {
  SIGNIN_REQUEST = "@auth/SIGNIN_REQUEST",
  SIGNIN_SUCCESS = "@auth/SIGNIN_SUCCESS",
  SIGNIN_FAILURE = "@auth/SIGNIN_FAILURE",
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
