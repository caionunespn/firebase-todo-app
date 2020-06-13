import { all, takeLatest } from "redux-saga/effects";
import { AuthTypes } from "./auth/types";
import { signIn, signUp, signGithubCredentials, signOut } from "./auth/sagas";
import { addToDo } from "./todos/sagas";
import { ToDoTypes } from "./todos/types";

export default function* rootSaga() {
  return yield all([
    takeLatest(AuthTypes.SIGNIN_REQUEST, signIn),
    takeLatest(AuthTypes.SIGNIN_GITHUB_REQUEST, signGithubCredentials),
    takeLatest(AuthTypes.SIGNUP_REQUEST, signUp),
    takeLatest(AuthTypes.SIGNOUT, signOut),
    takeLatest(ToDoTypes.ADD_TODO_REQUEST, addToDo),
  ]);
}
