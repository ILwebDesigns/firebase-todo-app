// SIGN IN USERS
export const SIGNIN_USER = "SIGNIN_USER";
export const SIGNIN_USER_SUCCESS = "SIGNIN_USER_SUCCESS";
export const SIGNIN_USER_FAILURE = "SIGNIN_USER_FAILURE";

export function signInUser(formValues) {
  const request = formValues;
  return {
    type: SIGNIN_USER,
    payload: request,
  };
}

export function signInUserSuccess(user) {
  return {
    type: SIGNIN_USER_SUCCESS,
    payload: user,
  };
}

export function signInUserFailure(error) {
  return {
    type: SIGNIN_USER_FAILURE,
    payload: error,
  };
}

// LOG OUT USERS
export const LOGOUT_USER = "LOGOUT_USER";
export const LOGOUT_USER_COMPLETE = "LOGOUT_USER_COMPLETE";

export function logoutUser() {
  return {
    type: LOGOUT_USER,
  };
}

export function logoutUserComplete() {
  return {
    type: LOGOUT_USER_COMPLETE,
  };
}

// CSRF TOKENS
export const CSRF_TOKEN = "CSRF_TOKEN";
export const CSRF_TOKEN_SUCCESS = "CSRF_TOKEN_SUCCESS";
export const CSRF_TOKEN_FAILURE = "CSRF_TOKEN_FAILURE";

export function getCsrf() {
  return {
    type: CSRF_TOKEN,
  };
}

export function csrfSuccess() {
  return {
    type: CSRF_TOKEN_SUCCESS
  };
}

export function csrfFailure(error) {
  return {
    type: SIGNIN_USER_FAILURE,
    payload: error,
  };
}
