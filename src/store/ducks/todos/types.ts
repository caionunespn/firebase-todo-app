export enum ToDoTypes {
  GET_TODOS = "@todos/GET_TODOS",
  ADD_TODO_REQUEST = "@todos/ADD_TODO_REQUEST",
  ADD_TODO_SUCCESS = "@todos/ADD_TODO_SUCCESS",
  ADD_TODO_FAILURE = "@todos/ADD_TODO_FAILURE",
  REMOVE_TODO = "@todos/REMOVE_TODO",
  TOGGLE_TODO = "@todos/TOGGLE_TODO",
}

export interface ToDo {
  id: string;
  title: string;
  description: string;
  checked: boolean;
}

export interface ToDoState {
  readonly data: ToDo[];
  readonly loading: boolean;
  readonly error: boolean;
}
