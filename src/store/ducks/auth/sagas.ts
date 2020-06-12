import { Action } from "redux";
import { call, put } from "redux-saga/effects";
import { signInSuccess, signInFailure } from "./actions";
import {
  checkUserRegistered,
  createUser,
} from "../../../services/auth.service";
import { SignInGithubSchema } from "../../../helpers/Forms/schemas";

interface SignInGithubAction extends Action {
  payload: SignInGithubSchema;
}

export function* signInGithub(action: SignInGithubAction) {
  try {
    const checkForCredentials = yield call(
      checkUserRegistered,
      action.payload.email
    );

    if (checkForCredentials) {
      yield put(signInSuccess(checkForCredentials));
    }

    const result = yield createUser(action.payload);

    yield put(signInSuccess(result));
  } catch (err) {
    yield put(signInFailure());
  }
}
