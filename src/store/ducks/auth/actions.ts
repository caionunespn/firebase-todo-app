import { action } from "typesafe-actions";
import { AuthTypes, User } from "./types";
import {
  SignInFormSchema,
  SignUpFormSchema,
} from "../../../helpers/Forms/schemas";

export const signInRequest = (payload: SignInFormSchema) =>
  action(AuthTypes.SIGNIN_REQUEST, payload);
export const signInGithub = () => action(AuthTypes.SIGNIN_GITHUB_REQUEST);
export const signInSuccess = (user: User) =>
  action(AuthTypes.SIGNIN_SUCCESS, { user });
export const signInFailure = () => action(AuthTypes.SIGNIN_FAILURE);
export const signUpRequest = (payload: SignUpFormSchema) =>
  action(AuthTypes.SIGNUP_REQUEST, payload);
export const signUpSuccess = (user: User) =>
  action(AuthTypes.SIGNUP_SUCCESS, { user });
export const signUpFailure = () => action(AuthTypes.SIGNUP_FAILURE);
export const signOut = () => action(AuthTypes.SIGNOUT);
