import { action } from "typesafe-actions";
import { AuthTypes, User } from "./types";
import { SignInGithubSchema } from "../../../helpers/Forms/schemas";

export const signInRequest = (payload: SignInGithubSchema) =>
  action(AuthTypes.SIGNIN_REQUEST, payload);
export const signInSuccess = (user: User) =>
  action(AuthTypes.SIGNIN_SUCCESS, { user });
export const signInFailure = () => action(AuthTypes.SIGNIN_FAILURE);
