import { Reducer } from "redux";
import { AuthState, AuthTypes } from "./types";

const INITIAL_STATE: AuthState = {
  user: null,
  error: false,
  loading: false,
};

const reducer: Reducer<AuthState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthTypes.SIGNIN_REQUEST:
      return { ...state, loading: true };
    case AuthTypes.SIGNIN_GITHUB_REQUEST:
      return { ...state, loading: true };
    case AuthTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        user: action.payload.user,
      };
    case AuthTypes.SIGNIN_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        user: null,
      };
    case AuthTypes.SIGNUP_REQUEST:
      return { ...state, loading: true };
    case AuthTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        user: action.payload.user,
      };
    case AuthTypes.SIGNUP_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        user: null,
      };
    case AuthTypes.SIGNOUT:
      return {
        user: null,
        error: false,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
