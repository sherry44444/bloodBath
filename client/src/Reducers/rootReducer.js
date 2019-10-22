import { combineReducers } from "redux";
import users from "./users";
import auth from "./auth";
import errors from "./errors";
import donations from "./donations";

const rootReducer = combineReducers({ users, auth, errors, donations });

export default rootReducer;
