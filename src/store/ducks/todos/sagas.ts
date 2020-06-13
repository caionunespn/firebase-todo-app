import { Action } from "redux";
import { call, put } from "redux-saga/effects";
import { addToDoSuccess, addToDoFailure } from "./actions";
import { createToDo } from "../../../services/todos.service";
import { ToDoFormSchema } from "../../../helpers/Forms/schemas";

interface AddToDoAction extends Action {
  payload: ToDoFormSchema;
}

export function* addToDo(action: AddToDoAction) {
  try {
    const newToDo = yield call(createToDo, action.payload);
    yield put(addToDoSuccess(newToDo));
  } catch (err) {
    yield put(addToDoFailure());
  }
}
