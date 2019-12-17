import { GET_USERS, GET_USER, CLEAR_CURRENT_PROFILE } from "../actions/types";

let initialState = { user: null, users: null };

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return { ...state, users: action.payload };

    case GET_USER:
      return { ...state, user: action.payload };

    case CLEAR_CURRENT_PROFILE:
      return { ...state, user: null };

    default:
      return state;
  }
};

export default userReducer;
