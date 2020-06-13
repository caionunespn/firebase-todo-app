export enum ToDoTypes {
  ADD_TODO = "@todos/ADD_TODO",
  REMOVE_TODO = "@todos/REMOVE_TODO",
  TOGGLE_TODO = "@todos/TOGGLE_TODO",
}

export interface ToDo {
  id: number;
  title: string;
  description: string;
  checked: boolean;
}

export interface ToDoState {
  readonly data: ToDo[];
}
