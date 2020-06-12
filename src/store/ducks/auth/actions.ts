import { action } from "typesafe-actions";
import { AuthTypes, User } from "./types";

interface SignInFormSchema {
  email: string;
  name?: string;
  image?: string;
  password?: string;
}

export const signInRequest = (payload: SignInFormSchema) =>
  action(AuthTypes.SIGNIN_REQUEST, payload);
export const signInSuccess = (user: User) =>
  action(AuthTypes.SIGNIN_REQUEST, { user });
export const signInFailure = () => action(AuthTypes.SIGNIN_FAILURE);
