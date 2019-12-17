import validateToken from "../helpers/validateToken";
import _ from "lodash";
import { SET_CURRENT_USER, LOGOUT, DELETE_USER } from "../actions/types";

let initialState = {
  user: {},
  isAuthenticated: false
};

if (validateToken().status)
  initialState = {
    user: validateToken().decoded,
    isAuthenticated: true
  };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        user: action.payload,
        isAuthenticated: !_.isEmpty(action.payload)
      };

    case DELETE_USER:
      return {
        user: {},
        isAuthenticated: false
      };

    case LOGOUT:
      return {
        user: {},
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export default authReducer;
