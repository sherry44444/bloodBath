import validateToken from "../helpers/validateToken";

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
    case "SET_CURRENT_USER":
      return {
        user: action.payload,
        isAuthenticated: true
      };

    case "DELETE_USER":
      return {
        user: {},
        isAuthenticated: false
      };

    case "LOGOUT":
      return {
        user: {},
        isAuthenticated: false
      };
    default:
      return state;
  }
};

export default authReducer;
