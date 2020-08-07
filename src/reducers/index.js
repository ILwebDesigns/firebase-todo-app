import { combineReducers } from "redux";
import UserReducer from "./user_reducer";
import ProgressReducer from './progress_reducer';
import TodoReducer from './todo_reducer';


const rootReducer = combineReducers({
  user: UserReducer,
  progress: ProgressReducer,
  todo: TodoReducer
});

export default rootReducer;
