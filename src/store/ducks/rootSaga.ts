import { all, takeLatest } from "redux-saga/effects";
import { AuthTypes } from "./auth/types";
import { signIn, signUp, signGithubCredentials, signOut } from "./auth/sagas";
import { insertToDo } from "./todos/sagas";

export default function* rootSaga() {
  return yield all([
    takeLatest(AuthTypes.SIGNIN_REQUEST, signIn),
    takeLatest(AuthTypes.SIGNIN_GITHUB_REQUEST, signGithubCredentials),
    takeLatest(AuthTypes.SIGNUP_REQUEST, signUp),
    takeLatest(AuthTypes.SIGNOUT, signOut),
  ]);
}
