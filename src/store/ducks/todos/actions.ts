import { action } from "typesafe-actions";
import { ToDoTypes, ToDo } from "./types";

export const addToDo = (todo: ToDo) => action(ToDoTypes.ADD_TODO, { todo });
export const removeToDo = (id: number) => action(ToDoTypes.REMOVE_TODO, { id });
export const toggleToDo = (id: number) => action(ToDoTypes.TOGGLE_TODO, { id });
