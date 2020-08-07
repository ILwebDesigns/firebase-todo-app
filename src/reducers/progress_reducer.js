import { LOADING_ON, LOADING_OFF } from "../actions/progress_actions";

const initState = 0;

const ProgressReducer = ( state = initState, action ) => {
  switch (action.type) {
    case LOADING_ON:
      return state + 1;
    case LOADING_OFF:
        return Math.max(state - 1, 0);
    default:
      return state;
  }
};


export default ProgressReducer;