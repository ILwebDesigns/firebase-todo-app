import axios from "axios";

export const GETALL_TODOS = "GETALL_TODOS";
export const GETALL_TODOS_SUCCESS = "GETALL_TODOS";
export const GETALL_TODOS_FAILURE = "GETALL_TODOS";

export const ADDING_TODO = "ADDING_TODO";
export const ADD_TODO_SUCCESS = "ADD_TODO_SUCCESS";
export const ADD_TODO_FAILURE = "ADD_TODO_FAILURE";

export const DELETING_TODO = "DELETE_TODO";
export const DELETE_TODO_SUCCESS = "DELETE_TODO_SUCCESS";
export const DELETE_TODO_FAILURE = "DELETE_TODO_FAILURE";

export const UPDATING_TODO = "UPDATING_TODO";
export const UPDATING_TODO_SUCCESS = "UPDATING_TODO_SUCCESS";
export const UPDATING_TODO_FAILURE = "UPDATING_TODO_FAILURE";

export function getAllTodos() {
  return {
    type: GETALL_TODOS,
  };
}

export function addTodo(formValues) {
  return {
    type: ADDING_TODO,
    payload: formValues,
  };
}

export function addTodoSuccess(todos) {
  return {
    type: ADD_TODO_SUCCESS,
    payload: todos,
  };
}

export function addTodoFailure(error) {
  return {
    type: ADD_TODO_FAILURE,
    payload: error,
  };
}

export function delTodo(todoId) {
  return {
    type: DELETING_TODO,
    payload: todoId
  };
}

export function delTodoSuccess(todos) {  
  return {
    type: DELETE_TODO_SUCCESS,
    payload: todos
  };
}

export function delTodoFailure(error) {
  return {
    type: DELETE_TODO_FAILURE,
    payload: error,
  };
}
