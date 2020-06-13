import { Reducer } from "redux";
import { ToDoState, ToDoTypes } from "./types";

const INITIAL_STATE: ToDoState = {
  data: [],
  loading: false,
  error: false,
};

const reducer: Reducer<ToDoState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ToDoTypes.GET_TODOS:
      return { ...state, data: action.payload.data };
    case ToDoTypes.ADD_TODO_REQUEST:
      return { ...state, loading: true };
    case ToDoTypes.ADD_TODO_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.payload.todo],
        loading: false,
        error: false,
      };
    case ToDoTypes.ADD_TODO_FAILURE:
      return { ...state, error: true, loading: false };
    case ToDoTypes.REMOVE_TODO:
      return {
        ...state,
        data: state.data.filter((todo) => todo.id !== action.payload.id),
      };
    case ToDoTypes.TOGGLE_TODO:
      return {
        ...state,
        data: state.data.map((todo) => {
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
