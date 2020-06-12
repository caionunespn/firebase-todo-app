import { Action } from "redux";
import { firestore as db } from "../../../firebase";
import { call, put } from "redux-saga/effects";
import { signInSuccess, signInFailure } from "./actions";
import { User } from "./types";

interface SignInFormSchema {
  email: string;
  name?: string;
  image?: string;
  password?: string;
}

interface SignInAction extends Action {
  payload: SignInFormSchema;
}

async function checkUserRegistered(email: string) {
  const snapshot = await db
    .collection("users")
    .where("email", "==", email)
    .get();

  if (snapshot.empty) {
    return;
  }

  const docs: User[] = [];

  snapshot.forEach((doc) => {
    const { name, email, image } = doc.data();

    const user = {
      id: doc.id,
      name,
      email,
      image,
    };

    docs.push(user);
  });

  return docs[0];
}

async function registerUser(payload: SignInFormSchema): Promise<User> {
  const newUser = await db.collection("users").add({
    email: payload.email,
    name: payload.name,
    image: payload.image,
  });

  return {
    id: newUser.id,
    email: payload.email,
    name: payload.name || "",
    image: payload.image || "",
  };
}

export function* signInGithub(action: SignInAction) {
  try {
    const checkForCredentials = yield call(
      checkUserRegistered,
      action.payload.email
    );

    if (checkForCredentials) {
      yield put(signInSuccess(checkForCredentials));
    }

    const result = yield registerUser(action.payload);

    yield put(signInSuccess(result));
  } catch (err) {
    yield put(signInFailure());
  }
}
