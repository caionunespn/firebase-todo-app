import { action } from "typesafe-actions";
import { ToDoTypes, ToDo } from "./types";
import { ToDoFormSchema } from "../../../helpers/Forms/schemas";

export const getTodos = (data: ToDo[]) => action(ToDoTypes.GET_TODOS, { data });
export const addToDoRequest = (todo: ToDoFormSchema) =>
  action(ToDoTypes.ADD_TODO_REQUEST, todo);
export const addToDoSuccess = (todo: ToDo) =>
  action(ToDoTypes.ADD_TODO_SUCCESS, { todo });
export const addToDoFailure = () => action(ToDoTypes.ADD_TODO_FAILURE);
export const removeToDo = (id: string) => action(ToDoTypes.REMOVE_TODO, { id });
export const toggleToDo = (id: string) => action(ToDoTypes.TOGGLE_TODO, { id });
