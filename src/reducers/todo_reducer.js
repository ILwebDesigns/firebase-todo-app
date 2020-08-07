import {
  GETALL_TODOS,
  ADDING_TODO,
  ADD_TODO_SUCCESS,
  ADD_TODO_FAILURE,
  DELETING_TODO,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAILURE,
} from "../actions/todos_actions";

const INITIAL_STATE = {
  todos: null,
  status: null,
  error: null,
  new: null,
  loading: false,
};

export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {
    case GETALL_TODOS:
      return {
        ...state,
        loading: true,
      };
    case ADDING_TODO:
      return {
        ...state,
        new: action.payload,
        status: "adding",
        error: null,
        loading: true,
      };
    case ADD_TODO_SUCCESS:
      return {
        ...state,
        todos: action.payload,
        new: null,
        status: "addsuccess",
        error: null,
        loading: false,
      };
    case ADD_TODO_FAILURE:
      error = action.payload;
      return {
        ...state,
        status: "adderror",
        error: error,
        new: null,
        loading: false,
      };
    case DELETING_TODO:
      return {
        ...state,
        new: action.payload,
        status: "deltodo",
        error: null,
        loading: true,
      };
    case DELETE_TODO_SUCCESS:
      return {
        ...state,
        todos: action.payload,
        new: null,
        status: "delsuccess",
        error: null,
        loading: false,
      };
    case DELETE_TODO_FAILURE:
      error = action.payload;
      return {
        ...state,
        status: "delerror",
        error: error,
        new: null,
        loading: false,
      };

    default:
      return state;
  }
}
