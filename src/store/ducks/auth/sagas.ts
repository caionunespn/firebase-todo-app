import { Action } from "redux";
import { call, put } from "redux-saga/effects";
import { signInFailure, signUpSuccess, signUpFailure } from "./actions";
import { getUser, createUser } from "../../../services/auth.service";
import { auth, githubProvider } from "../../../firebase";
import {
  SignInFormSchema,
  SignUpFormSchema,
} from "../../../helpers/Forms/schemas";

interface SignUpAction extends Action {
  payload: SignUpFormSchema;
}

interface SignInAction extends Action {
  payload: SignInFormSchema;
}

export function* signIn(action: SignInAction) {
  try {
    yield call(
      [auth, auth.signInWithEmailAndPassword],
      action.payload.email,
      action.payload.password || ""
    );
  } catch (err) {
    yield put(signInFailure());
  }
}

export function* signGithubCredentials() {
  try {
    const response = yield call([auth, auth.signInWithPopup], githubProvider);
    const profile = response.additionalUserInfo.profile;

    if (profile) {
      const { avatar_url: image, name, email } = profile;
      const checkForUser = yield call(getUser, email);

      if (!checkForUser) {
        yield call(createUser, {
          name,
          image,
          email,
        });
      }
    }
  } catch (err) {
    yield put(signInFailure());
  }
}

export function* signUp(action: SignUpAction) {
  try {
    const { user } = yield call(
      [auth, auth.createUserWithEmailAndPassword],
      action.payload.email,
      action.payload.password || ""
    );

    if (user) {
      const response = yield call(createUser, action.payload);
      yield put(signUpSuccess(response));
    }
  } catch (error) {
    yield put(signUpFailure());
  }
}

export function* signOut() {
  yield call([auth, auth.signOut]);
}
