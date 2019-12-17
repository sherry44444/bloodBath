import { combineReducers } from "redux";
import auth from "./auth";
import errors from "./errors";
import donations from "./donations";
import users from "./users";

const rootReducer = combineReducers({
  auth,
  errors,
  donations,
  users
});

export default rootReducer;
