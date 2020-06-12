import { all, takeLatest } from "redux-saga/effects";
import { AuthTypes } from "./auth/types";
import { signInGithub } from "./auth/sagas";

export default function* rootSaga() {
  return yield all([takeLatest(AuthTypes.SIGNIN_REQUEST, signInGithub)]);
}
