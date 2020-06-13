import { Reducer } from "redux";
import { ToDoState, ToDoTypes } from "./types";

const INITIAL_STATE: ToDoState = {
  data: [
    {
      id: 1,
      title: "Todo 1",
      description: "Descrição do primeiro todo",
      checked: true,
    },
  ],
};

const reducer: Reducer<ToDoState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ToDoTypes.ADD_TODO:
      return { ...state, data: [...state.data, action.payload.todo] };
    case ToDoTypes.REMOVE_TODO:
      return {
        ...state,
        data: state.data.filter((todo) => todo.id !== action.payload.id),
      };
    case ToDoTypes.TOGGLE_TODO:
      return {
        ...state,
        data: state.data.filter((todo) => {
          if (todo.id === action.payload.id) {
            return { ...todo, checked: !todo.checked };
          }

          return todo;
        }),
      };
    default:
      return state;
  }
};

export default reducer;
