import {
  SIGNIN_USER,
  SIGNIN_USER_SUCCESS,
  SIGNIN_USER_FAILURE,
  LOGOUT_USER,
  LOGOUT_USER_COMPLETE,
  CSRF_TOKEN,
  CSRF_TOKEN_FAILURE,
  CSRF_TOKEN_SUCCESS,
} from "../actions/users_actions";

const INITIAL_STATE = {
  auth: null,
  status: null,
  error: null,
  loading: false
};

export default function (state = INITIAL_STATE, action) {
  let error;
  switch (action.type) {
    case SIGNIN_USER: // sign in user,  set loading = true and status = signin
      return {
        ...state,
        auth: action.payload,
        status: "signin",
        error: null,
        loading: true,
      };
    case SIGNIN_USER_SUCCESS: //return authenticated user,  make loading = false and status = authenticated
      return {
        ...state,
        auth: action.payload,
        status: "authenticated",
        error: null,
        loading: false,
      }; //<-- authenticated
    case SIGNIN_USER_FAILURE: // return error and make loading = false
      error = action.payload;
      return {
        ...state,
        auth: null,
        status: "errorSignIn",
        error: [state.error, error],
        loading: false,
      };
    case LOGOUT_USER:
      return {
        ...state,
        auth: null,
        status: "logout",
        error: null,
        loading: true,
      };
    case LOGOUT_USER_COMPLETE:
      return {
        ...state,
        auth: null,
        status: "logoutcomplete",
        error: null,
        loading: false,
      };
    case CSRF_TOKEN:
      return {
        ...state,
        loading: true,
        status: "getcsrf",
      };
    case CSRF_TOKEN_SUCCESS:
      return {
        ...state,
        status: "csrfsuccess",
        loading: false,
      };
    case CSRF_TOKEN_FAILURE:
      error = action.payload;
      return {
        ...state,
        csrf_token: null,
        error: error,
        loading: false,
      };
    default:
      return state;
  }
}
